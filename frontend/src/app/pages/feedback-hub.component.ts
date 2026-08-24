import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../core/api.service';
import { AuthService } from '../core/auth.service';
import { FeedbackDetail, FeedbackReservation } from '../core/models';
import { TranslatePipe } from '../core/translate.pipe';

type CriterionLabel = { code:string; en:string; fr:string };

const CRITERIA:CriterionLabel[] = [
  {code:'VENUE',en:'Venue',fr:'Salle'},
  {code:'SETTING_DECOR',en:'Setting & Decor',fr:'Cadre et décor / arrangement'},
  {code:'STARTING_CLOSING_TIME',en:'Starting & Closing Time',fr:'Respect des horaires d’ouverture et de fermeture'},
  {code:'SNACKS_QUALITY',en:'Quality of Snacks',fr:'Qualité des pauses-café'},
  {code:'SNACKS_QUANTITY',en:'Quantity of Snacks',fr:'Quantité des pauses-café'},
  {code:'LUNCH_QUALITY',en:'Quality of Lunch',fr:'Qualité du déjeuner'},
  {code:'LUNCH_QUANTITY',en:'Quantity of Lunch',fr:'Quantité du déjeuner'},
  {code:'WASHROOM_CLEANLINESS',en:'Cleanliness of Washrooms',fr:'Propreté des toilettes'},
  {code:'DINNER_TIME',en:'Time of Dinner',fr:'Heure du dîner'},
  {code:'DINNER_QUALITY',en:'Quality of Dinner',fr:'Qualité du dîner'},
  {code:'DINNER_QUANTITY',en:'Quantity of Dinner',fr:'Quantité du dîner'},
  {code:'EVENT_SCHEDULE',en:'Schedule of Events',fr:'Programme'},
  {code:'HOTEL_ROOMS_QUALITY',en:'Quality of Hotel Rooms',fr:'Qualité de l’hébergement'},
  {code:'AIRPORT_PICKUP',en:'Timely Pick-up from the Airport',fr:'Transfert aéroport'},
  {code:'VISA_PROCESS',en:'Visa Acquisition Process',fr:'Processus d’acquisition de visa'},
  {code:'PRE_CONFERENCE_COMMUNICATION',en:'Communication before the Conference',fr:'Communication avant la conférence'},
  {code:'NETWORK_INTERNET',en:'Network Connection & Internet',fr:'Connexion réseau et Internet'},
  {code:'AUDIO_VISUAL_QUALITY',en:'Quality of Audio Visual Items',fr:'Qualité de l’audio-visuel'},
  {code:'OVERALL_PROGRAMME',en:'Overall Programme',fr:'Programme global'}
];

@Component({
  standalone:true,
  imports:[CommonModule,RouterLink,TranslatePipe],
  template:`
    <header class="page-head">
      <div>
        <p class="eyebrow">FEEDBACK · SATISFACTION</p>
        <h1>{{(isRequester?'Mes feedbacks':'Feedbacks des réservations')|tr:(isRequester?'My feedback':'Reservation feedback')}}</h1>
        <p>{{(isRequester?'Répondez au questionnaire à partir de J+1 pour vos réservations confirmées et passées.':'Consultez les avis reçus, regroupés par réservation.')|tr:(isRequester?'Complete the questionnaire from D+1 for your confirmed past reservations.':'Review submitted feedback, grouped by reservation.')}}</p>
      </div>
    </header>

    @if(loading){<section class="panel loading">{{'Chargement des feedbacks…'|tr:'Loading feedback…'}}</section>}
    @else if(error){<div class="alert error">{{error}}</div>}
    @else if(isRequester){
      <section class="feedback-summary-strip">
        <article><strong>{{myItems.length}}</strong><span>{{'Réunions passées'|tr:'Past meetings'}}</span></article>
        <article><strong>{{pendingCount}}</strong><span>{{'Avis à renseigner'|tr:'Feedback due'}}</span></article>
        <article><strong>{{submittedCount}}</strong><span>{{'Avis envoyés'|tr:'Submitted'}}</span></article>
      </section>
      @if(myItems.length===0){
        <section class="panel empty feedback-empty"><span>◇</span><b>{{'Aucune réservation passée à évaluer'|tr:'No past reservation to review'}}</b><p>{{'Une réservation confirmée apparaîtra ici le lendemain de sa dernière occurrence.'|tr:'A confirmed reservation will appear here on the day after its last occurrence.'}}</p></section>
      } @else {
        <section class="feedback-reservation-grid">
          @for(item of myItems;track item.requestId){
            <article class="panel feedback-reservation-card">
              <div class="feedback-card-top"><div><small class="ref">{{item.reference}}</small><h2>{{item.subject}}</h2></div><span class="badge" [attr.data-status]="item.submitted?'CONFIRMED':'SUBMITTED'">{{(item.submitted?'Envoyé':'À renseigner')|tr:(item.submitted?'Submitted':'Feedback due')}}</span></div>
              <dl><div><dt>{{'Date de la réunion'|tr:'Meeting date'}}</dt><dd>{{item.eventDate|date:'dd/MM/yyyy'}}</dd></div><div><dt>{{'Salle'|tr:'Room'}}</dt><dd>{{item.roomName||'—'}}</dd></div><div><dt>{{'Disponible depuis'|tr:'Available since'}}</dt><dd>{{item.availableFrom|date:'dd/MM/yyyy'}}</dd></div></dl>
              @if(item.submitted){<div class="feedback-score"><strong>{{item.average|number:'1.1-2'}}/5</strong><span>{{'Note globale'|tr:'Overall rating'}}</span></div>}
              @else if(item.eligible){<a class="btn primary" [routerLink]="['/feedback',item.requestId]">{{'Remplir le formulaire'|tr:'Complete questionnaire'}}</a>}
            </article>
          }
        </section>
      }
    } @else {
      <section class="feedback-summary-strip staff">
        <article><strong>{{results.length}}</strong><span>{{'Réponses reçues'|tr:'Responses received'}}</span></article>
        <article><strong>{{overallAverage|number:'1.1-2'}}/5</strong><span>{{'Satisfaction moyenne'|tr:'Average satisfaction'}}</span></article>
      </section>
      @if(results.length===0){
        <section class="panel empty feedback-empty"><span>◇</span><b>{{'Aucun feedback reçu'|tr:'No feedback received'}}</b><p>{{'Les réponses des demandeurs apparaîtront ici après leur envoi.'|tr:'Requester responses will appear here after submission.'}}</p></section>
      } @else {
        <section class="feedback-results">
          @for(item of results;track item.id){
            <details class="panel feedback-result">
              <summary>
                <div><small class="ref">{{item.reference}}</small><h2>{{item.subject}}</h2><p>{{item.respondentName}} · {{item.roomName||'—'}} · {{item.eventDate|date:'dd/MM/yyyy'}}</p></div>
                <div class="feedback-result-score"><strong>{{item.average|number:'1.1-2'}}/5</strong><small>{{'Note globale'|tr:'Overall rating'}} · {{item.createdAt|date:'dd/MM/yyyy HH:mm'}}</small><span>{{'Voir le détail'|tr:'View details'}}⌄</span></div>
              </summary>
              <div class="feedback-answer-grid">
                @for(answer of item.answers;track answer.criterion){
                  <article><div><b>{{criterion(answer.criterion).en}}</b><small>{{criterion(answer.criterion).fr}}</small></div><span [attr.data-rating]="answer.rating">{{ratingLabel(answer.rating)}}</span></article>
                }
              </div>
              <div class="feedback-result-comment"><b>{{'Commentaire'|tr:'Comment'}}</b><p>{{item.comment||('Aucun commentaire.'|tr:'No comment.')}}</p></div>
            </details>
          }
        </section>
      }
    }
  `
})
export class FeedbackHubComponent {
  private api=inject(ApiService);
  private auth=inject(AuthService);
  loading=true; error=''; myItems:FeedbackReservation[]=[]; results:FeedbackDetail[]=[];
  get isRequester(){ return this.auth.hasRole('USER'); }
  get pendingCount(){ return this.myItems.filter(item=>item.eligible&&!item.submitted).length; }
  get submittedCount(){ return this.myItems.filter(item=>item.submitted).length; }
  get overallAverage(){ return this.results.length?this.results.reduce((sum,item)=>sum+item.average,0)/this.results.length:0; }
  ngOnInit(){
    if(this.isRequester){
      this.api.myFeedbacks().subscribe({next:items=>{this.myItems=items;this.loading=false},error:()=>{this.error='Impossible de charger les feedbacks.';this.loading=false}});
    }else{
      this.api.feedbackResults().subscribe({next:items=>{this.results=items;this.loading=false},error:()=>{this.error='Impossible de charger les feedbacks.';this.loading=false}});
    }
  }
  criterion(code:string){ return CRITERIA.find(item=>item.code===code)??{code,en:code,fr:code}; }
  ratingLabel(rating:number){ return rating===5?'Very good · Très bon':rating===3?'Good · Bon':'Poor · Mauvais'; }
}
