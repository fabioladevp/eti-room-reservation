import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth.service';
import { Role } from './core/models';
import { NavIconComponent } from './core/nav-icon.component';
import { LanguageService } from './core/language.service';
import { NotificationCenterService } from './core/notification-center.service';

interface NavItem { label:{fr:string;en:string}; path:string; roles:Role[] }

@Component({
  selector:'app-root', standalone:true, imports:[CommonModule,RouterOutlet,RouterLink,RouterLinkActive,NavIconComponent],
  template:`
    @if (!auth.isAuthenticated()) { <router-outlet /> }
    @else {
      <div class="app-shell">
        <header class="topbar">
          <a class="brand" routerLink="/accueil" aria-label="Accueil ETI"><img src="/brand/ecobank-logo.svg" alt="Ecobank, la banque panafricaine"><i></i><strong>ETI</strong><small>Gestion des salles</small></a>
          <div class="top-search"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-4.3-4.3m2.3-5.2A7.5 7.5 0 1 1 4 11.5a7.5 7.5 0 0 1 15 0Z"/></svg><input [attr.aria-label]="tr('Rechercher','Search')" [placeholder]="tr('Rechercher une salle, une demande…','Search for a room or request…')"></div>
          <div class="profile"><div class="locale" role="group" [attr.aria-label]="tr('Choisir la langue','Choose language')"><button type="button" [class.active]="language.current()==='fr'" [attr.aria-pressed]="language.current()==='fr'" (click)="language.set('fr')">FR</button><span aria-hidden="true">/</span><button type="button" [class.active]="language.current()==='en'" [attr.aria-pressed]="language.current()==='en'" (click)="language.set('en')">EN</button></div><a class="top-notifications" routerLink="/notifications" [title]="notificationLabel" [attr.aria-label]="notificationLabel"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-11 12h4"/></svg>@if(notificationCenter.unreadCount()>0){<span class="notification-count" aria-live="polite">{{notificationBadge}}</span>}</a><span class="avatar">{{initials}}</span><span class="who"><b>{{auth.user()?.fullName}}</b><small>{{roleLabel}}</small></span><button class="icon-btn" (click)="auth.logout()" [title]="tr('Se déconnecter','Sign out')" [attr.aria-label]="tr('Se déconnecter','Sign out')"><svg viewBox="0 0 24 24"><path d="M10 17l5-5-5-5m5 5H3m10-9h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"/></svg></button></div>
        </header>
        <aside class="sidebar">
          <p class="nav-title">{{tr('ESPACE DE TRAVAIL','WORKSPACE')}}</p>
          <nav aria-label="Navigation principale">
            @for(item of visibleNav; track item.path){
              <a [routerLink]="item.path" routerLinkActive="active"><span class="nav-icon-wrap"><app-nav-icon [name]="iconName(item.path)" />@if(item.path==='/notifications'&&notificationCenter.unreadCount()>0){<span class="notification-count" aria-hidden="true">{{notificationBadge}}</span>}</span>{{navLabel(item)}}</a>
            }
          </nav>
          <div class="availability"><span></span><div><b>{{tr('Disponibilité en temps réel','Real-time availability')}}</b><small>{{tr('Catalogue administrable','Managed catalogue')}}</small></div></div>
          <a class="help" href="mailto:support.rooms@ecobank.com">?&nbsp;&nbsp; {{tr('Besoin d’aide ?','Need help?')}}</a>
          <small class="platform">{{tr('Plateforme interne Ecobank ETI','Ecobank ETI internal platform')}}</small>
        </aside>
        <main class="content"><router-outlet /></main>
      </div>
    }`
})
export class AppComponent {
  auth=inject(AuthService);
  language=inject(LanguageService);
  notificationCenter=inject(NotificationCenterService);
  nav:NavItem[]=[
    {label:{fr:'Tableau de bord',en:'Dashboard'},path:'/tableau-de-bord',roles:['ADMIN']},
    {label:{fr:'Accueil',en:'Home'},path:'/accueil',roles:['USER','FACILITY','IT']},
    {label:{fr:'Planning',en:'Schedule'},path:'/planning',roles:['USER','ADMIN','FACILITY','IT']},
    {label:{fr:'Mes demandes',en:'My requests'},path:'/mes-demandes',roles:['USER']},
    {label:{fr:'Nouvelle demande',en:'New request'},path:'/nouvelle-demande',roles:['USER','ADMIN']},
    {label:{fr:'Salles',en:'Rooms'},path:'/salles',roles:['USER','ADMIN','FACILITY','IT']},
    {label:{fr:'Feedback',en:'Feedback'},path:'/feedbacks',roles:['USER','ADMIN','FACILITY','IT']},
    {label:{fr:'Demandes & assignations',en:'Requests & assignments'},path:'/administration/demandes',roles:['ADMIN']},
    {label:{fr:'Validations Facility',en:'Facility approvals'},path:'/validations/facility',roles:['FACILITY']},
    {label:{fr:'Validations IT',en:'IT approvals'},path:'/validations/it',roles:['IT']},
    {label:{fr:'Équipements',en:'Equipment'},path:'/equipements',roles:['ADMIN','IT']},
    {label:{fr:'Utilisateurs',en:'Users'},path:'/administration/utilisateurs',roles:['ADMIN']},
    {label:{fr:'Rapports',en:'Reports'},path:'/rapports',roles:['ADMIN']},
    {label:{fr:'Journal d’audit',en:'Audit log'},path:'/audit',roles:['ADMIN']},
    {label:{fr:'Notifications',en:'Notifications'},path:'/notifications',roles:['USER','ADMIN','FACILITY','IT']},
    {label:{fr:'Tutoriels d’utilisation',en:'User tutorials'},path:'/tutoriels',roles:['USER','ADMIN','FACILITY','IT']}
  ];
  get visibleNav(){ const role=this.auth.role(); return role?this.nav.filter(n=>n.roles.includes(role)):[]; }
  iconName(path:string){ return ({
    '/tableau-de-bord':'dashboard','/accueil':'home','/planning':'calendar','/mes-demandes':'document',
    '/nouvelle-demande':'plus','/salles':'rooms','/administration/demandes':'tasks',
    '/validations/facility':'check','/validations/it':'it','/equipements':'equipment',
    '/administration/utilisateurs':'users','/rapports':'reports','/audit':'audit','/notifications':'bell','/feedbacks':'feedback','/tutoriels':'tutorial'
  } as Record<string,string>)[path]??'document'; }
  navLabel(item:NavItem){ return item.label[this.language.current()]; }
  tr(french:string,english:string){ return this.language.text(french,english); }
  get initials(){ return (this.auth.user()?.fullName??'ET').split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase(); }
  get notificationBadge(){const count=this.notificationCenter.unreadCount();return count>5?'5+':String(count);}
  get notificationLabel(){const count=this.notificationCenter.unreadCount();return count?this.tr(`${count} nouvelle${count>1?'s':''} notification${count>1?'s':''}`,`${count} new notification${count>1?'s':''}`):this.tr('Aucune nouvelle notification','No new notifications');}
  get roleLabel(){
    const labels={USER:{fr:'Demandeur',en:'Requester'},ADMIN:{fr:'Administrateur',en:'Administrator'},FACILITY:{fr:'Facility',en:'Facility'},IT:{fr:'Personnel IT',en:'IT staff'}} as Record<string,{fr:string;en:string}>;
    return labels[this.auth.role()??'']?.[this.language.current()]??'';
  }
}
