import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../core/api.service';
import { LanguageService } from '../core/language.service';
import { FeedbackStatus, Reservation } from '../core/models';
import { TranslatePipe } from '../core/translate.pipe';

type Criterion = {code:string; en:string; fr:string};

@Component({standalone:true,imports:[CommonModule,FormsModule,RouterLink,TranslatePipe],template:`
<header class="page-head"><div><p class="eyebrow">FEEDBACK · SATISFACTION</p><h1>{{'Questionnaire de satisfaction'|tr:'Satisfaction questionnaire'}}</h1><p>{{reservation?.reference}} @if(reservation){· {{reservation.subject}}}</p></div><a class="btn secondary" routerLink="/feedbacks">← Feedback</a></header>
@if(loading){<div class="panel loading">{{'Chargement du questionnaire…'|tr:'Loading questionnaire…'}}</div>}
@else if(error){<div class="alert error">{{error}}</div>}
@else if(status?.submitted){<section class="panel feedback-state"><span>✓</span><h2>{{'Merci, votre avis a déjà été enregistré.'|tr:'Thank you, your feedback has already been submitted.'}}</h2><a class="btn primary" routerLink="/feedbacks">{{'Retour aux feedbacks'|tr:'Back to feedback'}}</a></section>}
@else if(!status?.eligible){<section class="panel feedback-state"><span>◷</span><h2>{{'Le questionnaire sera disponible à J+1.'|tr:'The questionnaire will be available on D+1.'}}</h2><p>{{'Date d’ouverture'|tr:'Available from'}} : <b>{{status?.availableFrom|date:'dd/MM/yyyy'}}</b></p></section>}
@else if(sent){<section class="panel feedback-state"><span>✓</span><h2>{{'Merci pour votre participation.'|tr:'Thank you for your feedback.'}}</h2><p>{{'Votre réponse a été enregistrée.'|tr:'Your response has been recorded.'}}</p><a class="btn primary" routerLink="/feedbacks">{{'Retour aux feedbacks'|tr:'Back to feedback'}}</a></section>}
@else{<form class="panel feedback-form" (ngSubmit)="submit()">
  <div class="feedback-intro"><h2>Description / Description</h2><p>{{'Les critères sont facultatifs : choisissez « Non concerné » lorsqu’un élément ne s’applique pas à la réunion.'|tr:'Criteria are optional: select “Not applicable” when an item does not apply to the meeting.'}}</p></div>
  <div class="feedback-table-head"><b>Description</b><b>Very good<br><small>Très bon</small></b><b>Good<br><small>Bon</small></b><b>Poor<br><small>Mauvais</small></b><b>N/A<br><small>Non concerné</small></b></div>
  <div class="feedback-rows">@for(item of criteria;track item.code){<div class="feedback-row"><div class="feedback-label"><b>{{item.en}}</b><small>{{item.fr}}</small></div><label><input type="radio" [name]="item.code" [value]="5" [(ngModel)]="answers[item.code]"><span>Very good</span></label><label><input type="radio" [name]="item.code" [value]="3" [(ngModel)]="answers[item.code]"><span>Good</span></label><label><input type="radio" [name]="item.code" [value]="1" [(ngModel)]="answers[item.code]"><span>Poor</span></label><label class="not-applicable"><input type="radio" [name]="item.code" [value]="0" [(ngModel)]="answers[item.code]"><span>Non concerné</span></label></div>}</div>
  <section class="feedback-overall">
    <div><h2>{{'Évaluation globale de la prestation'|tr:'Overall service rating'}}</h2><p>{{'Cette note globale sur 5 est obligatoire.'|tr:'This overall rating out of 5 is required.'}}</p></div>
    <div class="overall-rating" role="radiogroup" [attr.aria-label]="'Évaluation globale sur 5'|tr:'Overall rating out of 5'">
      @for(score of scores;track score){<label><input type="radio" name="overallRating" [value]="score" [(ngModel)]="overallRating"><span><b>{{score}}</b><small>★</small></span></label>}
    </div>
    <div class="overall-scale"><span>{{'1 · Insuffisant'|tr:'1 · Poor'}}</span><span>{{'5 · Excellent'|tr:'5 · Excellent'}}</span></div>
  </section>
  <label class="feedback-comment"><b>{{'Commentaire complémentaire'|tr:'Additional comment'}}</b><textarea name="comment" [(ngModel)]="comment" maxlength="2000" rows="5" [placeholder]="'Votre commentaire (facultatif)'|tr:'Your comment (optional)'"></textarea><small>{{comment.length}} / 2000</small></label>
  @if(submitError){<div class="alert error">{{submitError}}</div>}
  <footer class="form-actions"><a class="btn secondary" routerLink="/feedbacks">{{'Annuler'|tr:'Cancel'}}</a><button class="btn primary" type="submit" [disabled]="saving">{{saving?('Enregistrement…'|tr:'Saving…'):('Envoyer mon avis'|tr:'Submit feedback')}}</button></footer>
</form>}
`})
export class FeedbackComponent {
  private api=inject(ApiService);private route=inject(ActivatedRoute);language=inject(LanguageService);
  id=Number(this.route.snapshot.paramMap.get('id'));status:FeedbackStatus|null=null;reservation:Reservation|null=null;
  loading=true;error='';submitError='';saving=false;sent=false;answers:Record<string,number>={};overallRating:number|null=null;comment='';scores=[1,2,3,4,5];
  criteria:Criterion[]=[
    {code:'VENUE',en:'Venue',fr:'Salle'},
    {code:'SETTING_DECOR',en:'Setting & Decor',fr:'Cadre et décor / arrangement'},
    {code:'STARTING_CLOSING_TIME',en:'Starting & Closing Time',fr:'Respect des horaires d’ouverture et de fermeture de la session'},
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
    {code:'PRE_CONFERENCE_COMMUNICATION',en:'Communication of Information before the Conference',fr:'Communication des informations avant la conférence'},
    {code:'NETWORK_INTERNET',en:'Network Connection & Internet',fr:'Connexion réseau et Internet'},
    {code:'AUDIO_VISUAL_QUALITY',en:'Quality of Audio Visual Items',fr:'Qualité de l’audio-visuel'},
    {code:'OVERALL_PROGRAMME',en:'Overall Programme',fr:'Programme global'}
  ];
  ngOnInit(){if(!Number.isInteger(this.id)||this.id<1){this.loading=false;this.error=this.language.text('Réservation invalide.','Invalid booking.');return}this.api.mine().subscribe({next:items=>this.reservation=items.find(item=>item.id===this.id)??null});this.api.feedbackStatus(this.id).subscribe({next:status=>{this.status=status;this.loading=false},error:e=>{this.loading=false;this.error=this.language.server(e.error?.message)||this.language.text('Questionnaire inaccessible.','Questionnaire unavailable.')}})}
  submit(){this.submitError='';if(this.overallRating===null){this.submitError=this.language.text('Veuillez attribuer une note globale sur 5.','Please provide an overall rating out of 5.');return}const relevantAnswers=Object.fromEntries(Object.entries(this.answers).filter(([,rating])=>[1,3,5].includes(rating)));this.saving=true;this.api.submitFeedback(this.id,{answers:relevantAnswers,overallRating:this.overallRating,comment:this.comment.trim(),language:this.language.current()}).subscribe({next:()=>{this.saving=false;this.sent=true},error:e=>{this.saving=false;this.submitError=this.language.server(e.error?.message)||this.language.text('Enregistrement impossible.','Unable to save feedback.')}})}
}
