import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiService } from '../core/api.service';
import { AuthService } from '../core/auth.service';
import { LanguageService } from '../core/language.service';
import { Reservation } from '../core/models';
import { TranslatePipe } from '../core/translate.pipe';

type OccurrenceForm = FormGroup<{
  date: FormControl<string>;
  startTime: FormControl<string>;
  endTime: FormControl<string>;
}>;

@Component({standalone:true,imports:[CommonModule,ReactiveFormsModule,RouterLink,TranslatePipe],template:`
<header class="page-head"><div><p class="eyebrow">{{editing?('MODIFICATION'|tr:'EDIT REQUEST'):('NOUVELLE DEMANDE'|tr:'NEW REQUEST')}}</p><h1>{{editing?('Modifier la demande'|tr:'Edit request'):('Organiser une réunion'|tr:'Organize a meeting')}}</h1><p>{{editing?('Mettez à jour votre demande tant que son statut reste Soumise.'|tr:'Update your request while its status remains Submitted.'):('Décrivez votre besoin. La salle sera vérifiée et assignée par l’administrateur.'|tr:'Describe your needs. The room will be checked and assigned by the administrator.')}}</p></div><a class="btn secondary" [routerLink]="auth.hasRole('ADMIN')?'/administration/demandes':'/mes-demandes'">{{'Annuler'|tr:'Cancel'}}</a></header>
<div class="form-layout"><form class="panel request-form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
  @if(loadingEdit){<div class="loading">{{'Chargement de la demande…'|tr:'Loading request…'}}</div>}
  <section><div class="section-title"><span>1</span><div><h2>{{'Informations générales'|tr:'General information'}}</h2><p>{{'Contexte et dimension de la réunion'|tr:'Meeting context and size'}}</p></div></div>
    <div class="form-grid"><label class="full">{{'Objet de la réunion'|tr:'Meeting subject'}} *<input formControlName="subject" [placeholder]="'Ex. Formation conformité régionale'|tr:'E.g. Regional compliance training'"><small *ngIf="invalid('subject')">{{'L’objet est obligatoire (200 caractères maximum).'|tr:'The subject is required (200 characters maximum).'}}</small></label>
    <label>{{'Nombre de participants'|tr:'Number of participants'}} *<input type="number" min="1" formControlName="participantCount"><small *ngIf="invalid('participantCount')">{{'Indiquez au moins 1 participant.'|tr:'Enter at least 1 participant.'}}</small></label>
    <label>{{'Disposition souhaitée'|tr:'Preferred layout'}} *<select formControlName="layout"><option value="">{{'Sélectionner'|tr:'Select'}}</option><option value="BOARDROOM">{{'Conseil'|tr:'Boardroom'}}</option><option value="U_SHAPE">{{'Forme en U'|tr:'U-shape'}}</option><option value="CLASSROOM">{{'Classe'|tr:'Classroom'}}</option><option value="THEATRE">{{'Théâtre'|tr:'Theatre'}}</option><option value="COCKTAIL">Cocktail</option></select></label>
    <label class="full">Description<textarea rows="3" formControlName="description" [placeholder]="'Objectif, public, contexte…'|tr:'Purpose, audience, context…'"></textarea></label></div>
  </section>
  <section><div class="section-title"><span>2</span><div><h2>{{'Période et horaires'|tr:'Dates and times'}}</h2><p>{{'Indiquez un horaire commun ou des horaires différents pour chaque date'|tr:'Enter common times or different times for each date'}}</p></div></div>
    <div class="form-grid"><label>{{'Date de début'|tr:'Start date'}} *<input type="date" formControlName="startDate"></label><label>{{'Date de fin'|tr:'End date'}} *<input type="date" formControlName="endDate"></label>
      @if(!isMultiDay||form.controls.sameTimeEachDay.value){<label>{{'Heure de début'|tr:'Start time'}} *<input type="time" formControlName="startTime"></label><label>{{'Heure de fin'|tr:'End time'}} *<input type="time" formControlName="endTime"></label>}
    </div>
    @if(isMultiDay){
      <label class="same-schedule-toggle"><input type="checkbox" formControlName="sameTimeEachDay"><span><b>{{'Mêmes horaires chaque jour'|tr:'Same times every day'}}</b><small>{{'Décochez pour préciser les heures de chaque journée.'|tr:'Uncheck to set the times for each day.'}}</small></span></label>
      @if(form.controls.sameTimeEachDay.value){<p class="hint">{{'Les heures ci-dessus seront appliquées à toutes les dates de la période.'|tr:'The times above will be applied to every date in the period.'}}</p>}
      @else{
        <div class="daily-schedule" formArrayName="occurrences">
          <div class="daily-schedule-head"><span>{{'Journée'|tr:'Date'}}</span><span>{{'Heure de début'|tr:'Start time'}}</span><span>{{'Heure de fin'|tr:'End time'}}</span></div>
          @for(schedule of occurrenceControls;track schedule.controls.date.value;let i=$index){
            <div class="daily-schedule-row" [formGroupName]="i">
              <input type="hidden" formControlName="date"><div class="daily-date"><b>{{formatDate(schedule.controls.date.value)}}</b><small>{{weekday(schedule.controls.date.value)}}</small></div>
              <label><span>{{'Début'|tr:'Start'}}</span><input type="time" formControlName="startTime"></label>
              <label><span>{{'Fin'|tr:'End'}}</span><input type="time" formControlName="endTime"></label>
            </div>
          }
        </div>
      }
    }
    @else if(form.controls.startDate.value&&form.controls.endDate.value){<p class="hint">{{'Cette réservation concerne une seule journée.'|tr:'This reservation covers one day.'}}</p>}
  </section>
  <section><div class="section-title"><span>3</span><div><h2>{{'Besoins'|tr:'Requirements'}}</h2><p>{{'Les équipements seront contrôlés sur chaque occurrence'|tr:'Equipment will be checked for every occurrence'}}</p></div></div>
    <fieldset formGroupName="tech" class="check-grid"><legend>{{'Besoins techniques'|tr:'Technical requirements'}}</legend><label><input type="checkbox" formControlName="WIFI"> Wi-Fi</label><label><input type="checkbox" formControlName="PROJECTION"> Projection</label><label><input type="checkbox" formControlName="SOUND"> {{'Sonorisation'|tr:'Sound system'}}</label><label><input type="checkbox" formControlName="VIDEO_CONF"> {{'Vidéoconférence'|tr:'Video conference'}}</label><label><input type="checkbox" formControlName="INTERPRETATION"> {{'Interprétation'|tr:'Interpretation'}}</label><label><input type="checkbox" formControlName="WHITEBOARD"> {{'Tableau blanc mobile'|tr:'Mobile whiteboard'}}</label></fieldset>
    <div class="form-grid"><label class="full">{{'Besoins physiques'|tr:'Physical requirements'}}<textarea rows="2" formControlName="physicalNeeds" [placeholder]="'Mobilier, accessibilité, climatisation…'|tr:'Furniture, accessibility, air conditioning…'"></textarea></label><label class="full">{{'Observations'|tr:'Notes'}}<textarea rows="2" formControlName="observations"></textarea></label></div>
    @if(auth.hasRole('ADMIN')){<label class="priority"><input type="checkbox" formControlName="priority"> {{'Demande prioritaire de la hiérarchie'|tr:'Priority management request'}}</label>}
  </section>
  @if(error){<div class="alert error" role="alert">{{error}}</div>}@if(success){<div class="alert success" role="status">{{success}}</div>}
  <div class="form-actions"><button type="button" class="btn secondary" (click)="reset()">{{'Réinitialiser'|tr:'Reset'}}</button><button class="btn primary" [disabled]="form.invalid||sending||loadingEdit">{{sending?(editing?('Enregistrement…'|tr:'Saving…'):('Envoi en cours…'|tr:'Submitting…')):(editing?('Enregistrer les modifications'|tr:'Save changes'):('Soumettre la demande'|tr:'Submit request'))}}</button></div>
</form><aside class="panel form-help"><h2>{{'Comment ça marche ?'|tr:'How does it work?'}}</h2><ol><li><span>1</span><div><b>{{'Vous exprimez le besoin'|tr:'You describe the need'}}</b><small>{{'Aucune salle n’est choisie ici.'|tr:'No room is selected here.'}}</small></div></li><li><span>2</span><div><b>{{'L’administrateur vérifie'|tr:'The administrator checks'}}</b><small>{{'Les 14 salles restent visibles, avec les motifs d’incompatibilité.'|tr:'All 14 rooms remain visible with incompatibility reasons.'}}</small></div></li><li><span>3</span><div><b>{{'Facility et IT valident'|tr:'Facility and IT approve'}}</b><small>{{'Les contraintes physiques et techniques sont contrôlées.'|tr:'Physical and technical constraints are checked.'}}</small></div></li><li><span>4</span><div><b>{{'La réservation est confirmée'|tr:'The reservation is confirmed'}}</b><small>{{'Vous recevez une notification persistante.'|tr:'You receive a persistent notification.'}}</small></div></li></ol><div class="note"><b>Important</b><p>{{'La modification est autorisée uniquement lorsque le statut est Soumise et plus d’une heure avant la prochaine occurrence.'|tr:'Editing is allowed only while the status is Submitted and more than one hour before the next occurrence.'}}</p></div></aside></div>`})
export class RequestFormComponent implements OnInit {
  private fb=inject(FormBuilder);private api=inject(ApiService);private router=inject(Router);private route=inject(ActivatedRoute);private language=inject(LanguageService);private destroyRef=inject(DestroyRef);
  auth=inject(AuthService);sending=false;loadingEdit=false;error='';success='';editId:number|null=null;private loadedRequest:Reservation|null=null;
  form=this.fb.nonNullable.group({subject:['',[Validators.required,Validators.maxLength(200)]],description:'',participantCount:[1,[Validators.required,Validators.min(1)]],startDate:['',Validators.required],endDate:['',Validators.required],startTime:['09:00',Validators.required],endTime:['17:00',Validators.required],sameTimeEachDay:true,occurrences:this.fb.array<OccurrenceForm>([]),layout:['',Validators.required],physicalNeeds:'',observations:'',priority:false,tech:this.fb.nonNullable.group({WIFI:false,PROJECTION:false,SOUND:false,VIDEO_CONF:false,INTERPRETATION:false,WHITEBOARD:false})});

  ngOnInit(){
    merge(this.form.controls.startDate.valueChanges,this.form.controls.endDate.valueChanges,this.form.controls.sameTimeEachDay.valueChanges).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(()=>this.syncOccurrenceControls());
    const rawId=this.route.snapshot.paramMap.get('id');
    if(rawId!==null){const id=Number(rawId);if(Number.isInteger(id)&&id>0){this.editId=id;this.loadForEdit()}else{this.error=this.language.text('Identifiant de demande invalide.','Invalid request identifier.');this.form.disable()}}
  }
  get editing(){return this.editId!==null}
  get isMultiDay(){const start=this.form.controls.startDate.value,end=this.form.controls.endDate.value;return !!start&&!!end&&end>start}
  get occurrenceControls(){return this.form.controls.occurrences.controls}
  invalid(name:keyof typeof this.form.controls){const c=this.form.controls[name];return c.touched&&c.invalid}
  formatDate(value:string){return value?new Intl.DateTimeFormat(this.language.current()==='en'?'en-GB':'fr-FR',{day:'2-digit',month:'2-digit',year:'numeric',timeZone:'UTC'}).format(new Date(`${value}T00:00:00Z`)):''}
  weekday(value:string){return value?new Intl.DateTimeFormat(this.language.current()==='en'?'en-GB':'fr-FR',{weekday:'long',timeZone:'UTC'}).format(new Date(`${value}T00:00:00Z`)):''}

  submit(){
    this.form.markAllAsTouched();if(this.form.invalid)return;
    const v=this.form.getRawValue(),dates=this.periodDates();
    if(!dates.length){this.error=this.language.text('La date de fin doit être égale ou postérieure à la date de début.','The end date must be the same as or later than the start date.');return}
    let occurrences:{date:string;startTime:string;endTime:string}[];
    if(!this.isMultiDay||v.sameTimeEachDay) occurrences=dates.map(date=>({date,startTime:v.startTime,endTime:v.endTime}));
    else occurrences=v.occurrences;
    const invalidSchedule=occurrences.find(item=>!item.startTime||!item.endTime||item.endTime<=item.startTime);
    if(invalidSchedule){this.error=this.language.text(`L’heure de fin doit suivre l’heure de début pour le ${this.formatDate(invalidSchedule.date)}.`,`End time must be after start time for ${this.formatDate(invalidSchedule.date)}.`);return}
    const technicalNeeds=Object.entries(v.tech).filter(([,on])=>on).map(([code])=>code).join(',');
    const payload={...v,startTime:occurrences[0].startTime,endTime:occurrences.at(-1)!.endTime,priority:v.priority?'PRIORITY':'NORMAL',occurrences,technicalNeeds,sameTimeEachDay:undefined,tech:undefined};
    this.sending=true;this.error='';
    const operation=this.editId===null?this.api.createRequest(payload):this.api.updateRequest(this.editId,payload);
    operation.subscribe({next:r=>{this.sending=false;this.success=this.editing?this.language.text(`La demande ${r.reference} a été modifiée.`,`Request ${r.reference} was updated.`):this.language.text(`La demande ${r.reference} a été soumise avec ${r.occurrences.length} occurrence(s).`,`Request ${r.reference} was submitted with ${r.occurrences.length} occurrence(s).`);setTimeout(()=>this.router.navigateByUrl(this.auth.hasRole('USER')?'/mes-demandes':'/administration/demandes'),1200)},error:e=>{this.sending=false;this.error=this.language.server(e.error?.message)||this.language.text(this.editing?'Impossible de modifier la demande.':'Impossible de soumettre la demande.',this.editing?'Unable to update the request.':'Unable to submit the request.')}})
  }

  reset(){if(this.loadedRequest){this.fillForm(this.loadedRequest)}else{this.form.reset({participantCount:1,startTime:'09:00',endTime:'17:00',sameTimeEachDay:true,tech:{WIFI:false,PROJECTION:false,SOUND:false,VIDEO_CONF:false,INTERPRETATION:false,WHITEBOARD:false}});this.form.controls.occurrences.clear()}this.error='';this.success=''}

  private loadForEdit(){
    if(this.editId===null)return;this.loadingEdit=true;this.form.disable();
    this.api.request(this.editId).subscribe({next:r=>{this.loadingEdit=false;if(r.status!=='SUBMITTED'){this.error=this.language.text('Seule une demande au statut Soumise peut être modifiée.','Only a request with Submitted status can be edited.');return}this.loadedRequest=r;this.fillForm(r);this.form.enable()},error:e=>{this.loadingEdit=false;this.error=this.language.server(e.error?.message)||this.language.text('Impossible de charger la demande.','Unable to load the request.')}})
  }

  private fillForm(request:Reservation){
    const occurrences=[...request.occurrences].sort((a,b)=>a.date.localeCompare(b.date));
    const first=occurrences[0],last=occurrences.at(-1);const sameTime=!!first&&occurrences.every(item=>item.startTime.slice(0,5)===first.startTime.slice(0,5)&&item.endTime.slice(0,5)===first.endTime.slice(0,5));
    const startTime=(first?.startTime??request.startTime).slice(0,5),endTime=(sameTime?(first?.endTime??request.endTime):(last?.endTime??request.endTime)).slice(0,5);
    const needs=new Set((request.technicalNeeds??'').split(/[;,]/).map(code=>code.trim().toUpperCase()).filter(Boolean));
    this.form.patchValue({subject:request.subject,description:request.description??'',participantCount:request.participantCount,startDate:request.startDate,endDate:request.endDate,startTime,endTime,sameTimeEachDay:sameTime,layout:request.layout,physicalNeeds:request.physicalNeeds??'',observations:request.observations??'',priority:request.priority==='PRIORITY',tech:{WIFI:needs.has('WIFI'),PROJECTION:needs.has('PROJECTION'),SOUND:needs.has('SOUND'),VIDEO_CONF:needs.has('VIDEO_CONF'),INTERPRETATION:needs.has('INTERPRETATION'),WHITEBOARD:needs.has('WHITEBOARD')}},{emitEvent:false});
    this.form.controls.occurrences.clear();if(request.startDate!==request.endDate&&!sameTime)for(const item of occurrences)this.form.controls.occurrences.push(this.createOccurrence(item.date,item.startTime.slice(0,5),item.endTime.slice(0,5)));
  }

  private syncOccurrenceControls(){
    if(!this.isMultiDay||this.form.controls.sameTimeEachDay.value){this.form.controls.occurrences.clear();return}
    const existing=new Map(this.form.controls.occurrences.getRawValue().map(item=>[item.date,item]));
    this.form.controls.occurrences.clear();
    for(const date of this.periodDates()){
      const previous=existing.get(date);
      this.form.controls.occurrences.push(this.createOccurrence(date,previous?.startTime??this.form.controls.startTime.value,previous?.endTime??this.form.controls.endTime.value));
    }
  }
  private createOccurrence(date:string,startTime:string,endTime:string):OccurrenceForm{return this.fb.nonNullable.group({date:[date,Validators.required],startTime:[startTime,Validators.required],endTime:[endTime,Validators.required]})}
  private periodDates(){
    const start=this.form.controls.startDate.value,end=this.form.controls.endDate.value;
    if(!start||!end||end<start)return [];
    const dates:string[]=[];let cursor=new Date(`${start}T00:00:00Z`),last=new Date(`${end}T00:00:00Z`);
    while(cursor<=last&&dates.length<=366){dates.push(cursor.toISOString().slice(0,10));cursor=new Date(cursor.getTime()+86400000)}
    return dates;
  }
}
