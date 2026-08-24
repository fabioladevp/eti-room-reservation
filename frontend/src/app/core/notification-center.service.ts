import { DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { Notification } from './models';

@Injectable({providedIn:'root'})
export class NotificationCenterService {
  private api=inject(ApiService);
  private auth=inject(AuthService);
  private pollHandle:number|undefined;
  private loading=false;
  private clearingAll=false;
  readonly unreadCount=signal(0);

  constructor(){
    effect(()=>this.auth.isAuthenticated()?this.startPolling():this.stopPolling());
    inject(DestroyRef).onDestroy(()=>this.stopPolling());
  }

  refresh(){
    if(!this.auth.isAuthenticated()||this.loading)return;
    this.loading=true;
    this.api.unreadNotificationCount().subscribe({
      next:result=>{if(!this.clearingAll)this.unreadCount.set(result.unread);this.loading=false;},
      error:()=>this.loading=false
    });
  }

  sync(items:Notification[]){this.unreadCount.set(items.filter(item=>!item.read).length);}

  markAsRead(id:number){
    return this.api.readNotification(id).pipe(tap(()=>this.unreadCount.update(count=>Math.max(0,count-1))));
  }

  markAllAsRead(){
    const previousCount=this.unreadCount();
    this.clearingAll=true;
    this.unreadCount.set(0);
    return this.api.readAllNotifications().pipe(tap({
      next:()=>{this.clearingAll=false;this.unreadCount.set(0);},
      error:()=>{this.clearingAll=false;this.unreadCount.set(previousCount);}
    }));
  }

  private startPolling(){
    this.stopTimer();
    this.refresh();
    this.pollHandle=window.setInterval(()=>this.refresh(),5000);
  }

  private stopPolling(){this.stopTimer();this.loading=false;this.clearingAll=false;this.unreadCount.set(0);}
  private stopTimer(){if(this.pollHandle!==undefined){window.clearInterval(this.pollHandle);this.pollHandle=undefined;}}
}
