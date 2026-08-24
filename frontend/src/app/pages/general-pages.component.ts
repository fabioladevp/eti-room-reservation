import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { ApiService } from '../core/api.service';
import { Reservation } from '../core/models';
import { LanguageService } from '../core/language.service';
import { TranslatePipe } from '../core/translate.pipe';

@Component({standalone:true,imports:[CommonModule,RouterLink,TranslatePipe],template:`
<header class="page-head"><div><p class="eyebrow">{{'AUJOURD’HUI'|tr:'TODAY'}} · {{today|date:'dd MMMM yyyy':'':locale}}</p><h1>{{'Bonjour'|tr:'Hello'}}, {{firstName}}</h1><p>{{'Voici les informations utiles de votre espace de travail.'|tr:'Here is the useful information from your workspace.'}}</p></div><a *ngIf="auth.hasRole('USER','ADMIN')" class="btn primary" routerLink="/nouvelle-demande">＋ {{'Nouvelle demande'|tr:'New request'}}</a></header>
<section class="metric-grid">
  <article class="metric"><span class="metric-icon teal">▦</span><div><small>{{'Salles référencées'|tr:'Listed rooms'}}</small><strong>14</strong><p>{{'3 bâtiments ETI'|tr:'3 ETI buildings'}}</p></div></article>
  <article class="metric"><span class="metric-icon blue">◷</span><div><small>{{auth.hasRole('USER')?('Mes demandes'|tr:'My requests'):('File de validation'|tr:'Approval queue')}}</small><strong>{{items.length}}</strong><p>{{'Données actualisées'|tr:'Updated data'}}</p></div></article>
  <article class="metric"><span class="metric-icon amber">≡</span><div><small>{{'En attente'|tr:'Pending'}}</small><strong>{{pending}}</strong><p>{{'Action ou suivi requis'|tr:'Action or follow-up required'}}</p></div></article>
  <article class="metric"><span class="metric-icon purple">✓</span><div><small>{{'Confirmées'|tr:'Confirmed'}}</small><strong>{{confirmed}}</strong><p>{{'Réservations actives'|tr:'Active reservations'}}</p></div></article>
</section>
<section class="panel-grid"><article class="panel span2"><div class="panel-head"><div><h2>{{'Activité récente'|tr:'Recent activity'}}</h2><p>{{'Dernières demandes accessibles'|tr:'Latest available requests'}}</p></div><a [routerLink]="auth.hasRole('USER')?'/mes-demandes':'/notifications'">{{'Voir tout'|tr:'View all'}} →</a></div>
  @if(loading){<div class="loading">{{'Chargement…'|tr:'Loading…'}}</div>} @else if(!items.length){<div class="empty"><b>{{'Aucune activité à afficher'|tr:'No activity to display'}}</b><p>{{'Les prochaines demandes apparaîtront ici.'|tr:'Upcoming requests will appear here.'}}</p></div>} @else {
  <div class="meeting-list">@for(r of items.slice(0,4);track r.id){<div class="meeting"><time>{{r.startTime.slice(0,5)}}<small>{{r.startDate|date:'dd/MM'}}</small></time><i></i><div><b>{{r.subject}}</b><small>{{r.assignedRoom?.name||('Salle à assigner'|tr:'Room to assign')}} · {{r.participantCount}} {{'participants'|tr:'participants'}}</small></div><span class="badge" [attr.data-status]="r.status">{{label(r.status)}}</span></div>}</div>}
</article><article class="panel quick"><div class="panel-head"><div><h2>{{'Accès rapides'|tr:'Quick access'}}</h2><p>{{'Actions fréquentes'|tr:'Frequent actions'}}</p></div></div><a routerLink="/salles">{{'Consulter les 14 salles'|tr:'Browse the 14 rooms'}} <span>→</span></a><a routerLink="/planning">{{'Ouvrir le planning'|tr:'Open schedule'}} <span>→</span></a><a routerLink="/notifications">{{'Voir mes notifications'|tr:'View my notifications'}} <span>→</span></a></article></section>`,styles:[`.badge[data-status="EXPIRED"]{background:#fdecea;color:#a12820}`]})
export class HomeComponent{
  auth=inject(AuthService);api=inject(ApiService);language=inject(LanguageService);today=new Date();items:Reservation[]=[];loading=true;
  get locale(){return this.language.current()==='fr'?'fr':'en-US'}
  get firstName(){return this.auth.user()?.fullName.split(' ')[0]??''} get pending(){return this.items.filter(x=>!['CONFIRMED','CANCELLED','COMPLETED','EXPIRED'].includes(x.status)).length} get confirmed(){return this.items.filter(x=>x.status==='CONFIRMED').length}
  ngOnInit(){const source=this.auth.hasRole('USER')?this.api.mine():this.auth.hasRole('FACILITY')?this.api.facilityQueue():this.auth.hasRole('IT')?this.api.itQueue():this.api.allRequests();source.subscribe({next:r=>{this.items=r;this.loading=false},error:()=>this.loading=false});}
  label(s:string){const labels:Record<string,[string,string]>={SUBMITTED:['Soumise','Submitted'],PENDING_FACILITY:['En attente Facility','Pending Facility'],PENDING_IT:['En attente IT','Pending IT'],CONFIRMED:['Confirmée','Confirmed'],CANCELLED:['Annulée','Cancelled'],COMPLETED:['Terminée','Completed'],EXPIRED:['Expirée','Expired'],REJECTED_FACILITY:['Rejetée par Facility','Rejected by Facility'],REJECTED_IT:['Rejetée par IT','Rejected by IT'],TO_REASSIGN:['À réassigner','To reassign']};const value=labels[s];return value?this.language.text(...value):s.replaceAll('_',' ')}
}

@Component({standalone:true,imports:[CommonModule,TranslatePipe],template:`<header class="page-head"><div><p class="eyebrow">{{'CALENDRIER PARTAGÉ'|tr:'SHARED CALENDAR'}}</p><h1>{{'Planning des salles'|tr:'Room schedule'}}</h1><p>{{'Vue non confidentielle des créneaux confirmés.'|tr:'Non-confidential view of confirmed time slots.'}}</p></div></header><section class="panel"><div class="calendar-head"><button type="button" class="btn secondary" (click)="changeWeek(-1)">← {{'Semaine précédente'|tr:'Previous week'}}</button><h2>{{weekLabel}}</h2><button type="button" class="btn secondary" (click)="changeWeek(1)">{{'Semaine suivante'|tr:'Next week'}} →</button></div><div class="calendar-grid"><div class="calendar-time"></div>@for(d of days;track d.key){<div class="calendar-day"><b>{{d.label}}</b><small>{{d.dateLabel}}</small></div>}@for(t of times;track t){<div class="calendar-time">{{t}}</div>@for(d of days;track d.key){<div class="calendar-slot" [class.busy]="isCurrentWeek&&((t==='09:00'&&d.key==='MON')||(t==='14:00'&&d.key==='WED'))"><span *ngIf="isCurrentWeek&&t==='09:00'&&d.key==='MON'">{{'Réunion confirmée'|tr:'Confirmed meeting'}}</span><span *ngIf="isCurrentWeek&&t==='14:00'&&d.key==='WED'">{{'Créneau occupé'|tr:'Occupied slot'}}</span></div>}}</div></section>`})
export class PlanningComponent{
  language=inject(LanguageService);
  weekStart=this.startOfWeek(new Date());
  times=['08:00','09:00','10:00','11:00','12:00','14:00','15:00','16:00','17:00'];

  get days(){
    const locale=this.language.current()==='en'?'en-GB':'fr-FR';
    const keys=['MON','TUE','WED','THU','FRI'];
    return keys.map((key,index)=>{
      const date=this.addDays(this.weekStart,index);
      return {key,label:new Intl.DateTimeFormat(locale,{weekday:'short'}).format(date),dateLabel:new Intl.DateTimeFormat(locale,{day:'2-digit',month:'2-digit'}).format(date)};
    });
  }
  get weekLabel(){
    const locale=this.language.current()==='en'?'en-GB':'fr-FR';
    const end=this.addDays(this.weekStart,4);
    const startLabel=new Intl.DateTimeFormat(locale,{day:'2-digit',month:'short'}).format(this.weekStart);
    const endLabel=new Intl.DateTimeFormat(locale,{day:'2-digit',month:'short',year:'numeric'}).format(end);
    return `${startLabel} – ${endLabel}`;
  }
  get isCurrentWeek(){return this.weekStart.getTime()===this.startOfWeek(new Date()).getTime()}
  changeWeek(direction:number){this.weekStart=this.addDays(this.weekStart,direction*7)}
  private startOfWeek(value:Date){const date=new Date(value.getFullYear(),value.getMonth(),value.getDate());const day=date.getDay()||7;date.setDate(date.getDate()-day+1);return date}
  private addDays(value:Date,days:number){const date=new Date(value);date.setDate(date.getDate()+days);return date}
}

@Component({standalone:true,imports:[RouterLink,TranslatePipe],template:`<section class="error-page"><strong>{{code}}</strong><h1>{{title}}</h1><p>{{message}}</p><a class="btn primary" [routerLink]="homePath">{{'Retour à l’accueil'|tr:'Back to home'}}</a></section>`})
export class ErrorPageComponent{private route=inject(ActivatedRoute);private language=inject(LanguageService);private auth=inject(AuthService);code=this.route.snapshot.data['code'];get title(){return this.code==='403'?this.language.text('Accès refusé','Access denied'):this.language.text('Page introuvable','Page not found')}get message(){return this.code==='403'?this.language.text('Vous ne disposez pas des droits nécessaires pour consulter cette page.','You do not have permission to view this page.'):this.language.text('La page demandée n’existe pas ou a été déplacée.','The requested page does not exist or has been moved.')}get homePath(){return this.auth.hasRole('ADMIN')?'/tableau-de-bord':'/accueil'} }
