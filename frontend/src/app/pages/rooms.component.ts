import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiService } from '../core/api.service';
import { Equipment, Room } from '../core/models';
import { filterRooms } from '../core/catalog-filter';
import { AuthService } from '../core/auth.service';
import { LanguageService } from '../core/language.service';
import { TranslatePipe } from '../core/translate.pipe';

@Component({standalone:true,imports:[CommonModule,ReactiveFormsModule,RouterLink,TranslatePipe],template:`
<header class="page-head">
  <div><p class="eyebrow">CATALOGUE ETI</p><h1>{{'Nos salles'|tr:'Our rooms'}}</h1><p>{{'Explorez les espaces ETI et leurs capacités par disposition.'|tr:'Explore ETI spaces and their capacities by layout.'}}</p></div>
  <div class="page-actions">
    @if(auth.hasRole('ADMIN')){<button class="btn secondary" type="button" (click)="openCreate()">＋ {{'Ajouter une salle'|tr:'Add a room'}}</button>}
    <a class="btn primary" routerLink="/nouvelle-demande">＋ {{'Nouvelle demande'|tr:'New request'}}</a>
  </div>
</header>
@if(success){<div class="alert success">{{success}}</div>}
<section class="filter-panel" [formGroup]="filters">
  <label class="search-field"><span>{{'Rechercher'|tr:'Search'}}</span><input formControlName="q" [placeholder]="'Nom d’une salle'|tr:'Room name'"></label>
  <label><span>{{'Bâtiment'|tr:'Building'}}</span><select formControlName="building"><option value="">{{'Tous'|tr:'All'}}</option><option>Académie</option><option>PAC</option><option>Grand bâtiment</option></select></label>
  <label><span>{{'Disposition'|tr:'Layout'}}</span><select formControlName="layout"><option value="">{{'Toutes'|tr:'All'}}</option><option value="BOARDROOM">{{'Conseil'|tr:'Boardroom'}}</option><option value="U_SHAPE">{{'Forme en U'|tr:'U-shape'}}</option><option value="CLASSROOM">{{'Classe'|tr:'Classroom'}}</option><option value="THEATRE">{{'Théâtre'|tr:'Theatre'}}</option><option value="COCKTAIL">Cocktail</option></select></label>
  <label><span>{{'Capacité minimale'|tr:'Minimum capacity'}}</span><input type="number" min="1" formControlName="capacity" placeholder="Ex. 20"></label>
  <label><span>{{'Équipement'|tr:'Equipment'}}</span><select formControlName="equipment"><option value="">{{'Tous'|tr:'All'}}</option><option value="WIFI">Wi-Fi</option><option value="PROJECTION">Projection</option><option value="SOUND">{{'Sonorisation'|tr:'Sound system'}}</option><option value="VIDEO_CONF">{{'Vidéoconférence'|tr:'Video conference'}}</option></select></label>
  <button class="btn secondary reset" type="button" (click)="reset()">{{'Réinitialiser'|tr:'Reset'}}</button>
</section>
<div class="result-line"><b>{{filtered.length}} {{filtered.length>1?('salles'|tr:'rooms'):('salle'|tr:'room')}}</b><span>{{'Filtres combinables · état synchronisé dans l’URL'|tr:'Combinable filters · state synchronized in the URL'}}</span></div>
@if(loading){<div class="loading panel">{{'Chargement du catalogue…'|tr:'Loading catalogue…'}}</div>}
@else if(error){<div class="alert error">{{error}} <button class="btn secondary" (click)="load()">{{'Réessayer'|tr:'Retry'}}</button></div>}
@else if(!filtered.length){<div class="empty panel"><b>{{'Aucune salle ne correspond'|tr:'No matching room'}}</b><p>{{'Modifiez les critères ou réinitialisez les filtres.'|tr:'Change the criteria or reset the filters.'}}</p><button class="btn secondary" (click)="reset()">{{'Réinitialiser'|tr:'Reset'}}</button></div>}
@else{<section class="room-grid">@for(room of filtered;track room.id){<article class="room-card">
  <div class="room-photo"><img [src]="room.photoUrl" [alt]="'Vue neutre de '+room.name"><span class="status-dot" [class.off]="room.status!=='AVAILABLE'">{{status(room.status)}}</span></div>
  <div class="room-body"><p class="room-building">{{room.building}} · {{room.location}}</p><h2>{{room.name}}</h2>
  <div class="capacity-list">@for(c of room.capacities;track c.layout){<span><b>{{c.capacity}}</b> {{layout(c.layout)}}</span>}</div>
  <div class="equipment-line">@for(e of room.equipment;track e.id){<span>{{e.name}}</span>}</div>
  <div class="room-foot"><small>{{'Temps de battement'|tr:'Buffer time'}}</small><b>{{room.bufferMinutes}} min</b></div>
  @if(auth.hasRole('ADMIN')){<div class="room-admin-actions"><button class="btn secondary" type="button" (click)="openEdit(room)">{{'Modifier'|tr:'Edit'}}</button><button class="btn danger-btn" type="button" (click)="openDelete(room)">{{'Supprimer'|tr:'Delete'}}</button></div>}</div>
</article>}</section>}

@if(createOpen){
  <div class="modal-backdrop" role="presentation">
    <section class="modal" role="dialog" aria-modal="true" aria-labelledby="create-room-title">
      <header class="modal-head"><div><h2 id="create-room-title">{{editingRoom?('Modifier la salle'|tr:'Edit room'):('Ajouter une salle'|tr:'Add a room')}}</h2><p>{{editingRoom?('Modifiez son identité, son bâtiment, ses capacités et ses équipements.'|tr:'Update its identity, building, capacities and equipment.'):('Renseignez l’identité, les capacités et les équipements fixes.'|tr:'Enter the room identity, capacities and fixed equipment.')}}</p></div><button class="icon-btn dark" type="button" (click)="closeCreate()" [attr.aria-label]="'Fermer'|tr:'Close'">×</button></header>
      <form class="room-admin-form" [formGroup]="roomForm" (ngSubmit)="saveRoom()">
        @if(createError){<div class="alert error">{{createError}}</div>}
        <div class="form-grid">
          <label>{{'Code unique'|tr:'Unique code'}} *<input formControlName="code" placeholder="Ex. PAC-03" maxlength="30"><span class="field-help">{{'Lettres, chiffres et tirets uniquement.'|tr:'Letters, numbers and hyphens only.'}}</span></label>
          <label>{{'Nom de la salle'|tr:'Room name'}} *<input formControlName="name" [placeholder]="'Ex. Salle Projet'|tr:'E.g. Project Room'"></label>
          <label>{{'Bâtiment'|tr:'Building'}} *<select formControlName="buildingCode"><option value="ACADEMIE">Académie</option><option value="PAC">PAC</option><option value="GRAND">Grand bâtiment</option></select></label>
          <label>{{'Localisation'|tr:'Location'}} *<input formControlName="location" [placeholder]="'Ex. 3e étage'|tr:'E.g. 3rd floor'"></label>
          <label>{{'Temps de battement (minutes)'|tr:'Buffer time (minutes)'}} *<input type="number" min="0" formControlName="bufferMinutes"></label>
          <label>{{'État'|tr:'Status'}} *<select formControlName="status"><option value="AVAILABLE">{{'Disponible'|tr:'Available'}}</option><option value="BLOCKED">{{'Bloquée'|tr:'Blocked'}}</option><option value="MAINTENANCE">Maintenance</option></select></label>
          <label class="full">{{'Illustration'|tr:'Illustration'}}<select formControlName="photoUrl"><option value="/assets/rooms/meeting.svg">{{'Salle de réunion'|tr:'Meeting room'}}</option><option value="/assets/rooms/auditorium.svg">Auditorium</option><option value="/assets/rooms/boardroom.svg">{{'Salle de conseil'|tr:'Boardroom'}}</option><option value="/assets/rooms/banquet.svg">Banquet</option><option value="/assets/rooms/hall.svg">Hall</option><option value="/assets/rooms/vip.svg">{{'Salon VIP'|tr:'VIP lounge'}}</option></select></label>
          <div class="photo-editor full"><img [src]="roomForm.controls.photoUrl.value" [alt]="'Aperçu de la photo'|tr:'Photo preview'"><div>@if(editingRoom){<label class="btn secondary photo-upload">{{photoBusy?('Téléversement…'|tr:'Uploading…'):('Choisir une photo'|tr:'Choose photo')}}<input type="file" accept="image/png,image/jpeg,image/webp" [disabled]="photoBusy" (change)="uploadPhoto($event)"></label><button class="btn danger-btn" type="button" [disabled]="photoBusy||!hasCustomPhoto" (click)="removePhoto()">{{'Supprimer la photo'|tr:'Delete photo'}}</button><small>{{'PNG, JPEG ou WebP · 5 Mo maximum'|tr:'PNG, JPEG or WebP · 5 MB maximum'}}</small>}@else{<small>{{'Créez d’abord la salle, puis ouvrez Modifier pour ajouter une photo personnelle.'|tr:'Create the room first, then open Edit to upload a custom photo.'}}</small>}</div></div>
          <label class="full">{{'Équipements fixes'|tr:'Fixed equipment'}}<select multiple formControlName="equipmentCodes">@for(item of fixedEquipment;track item.id){<option [value]="item.code" [disabled]="isMandatoryEquipment(item.code)">{{item.name}}{{isMandatoryEquipment(item.code)?language.text(' — inclus',' — included'):''}}</option>}</select><span class="field-help">{{'Climatisation et Wi-Fi sont inclus automatiquement dans toutes les salles. Maintenez Ctrl pour les autres équipements.'|tr:'Air conditioning and Wi-Fi are automatically included in every room. Hold Ctrl for other equipment.'}}</span></label>
          <label class="full toggle-row"><input type="checkbox" formControlName="active"> {{'Salle active et visible dans le catalogue'|tr:'Room active and visible in the catalogue'}}</label>
        </div>
        <div class="capacity-fields">
          <h3>{{'Capacités par disposition'|tr:'Capacities by layout'}}</h3>
          <label>{{'Conseil'|tr:'Boardroom'}}<input type="number" min="0" formControlName="capacityBoardroom"></label>
          <label>{{'Forme en U'|tr:'U-shape'}}<input type="number" min="0" formControlName="capacityUShape"></label>
          <label>{{'Classe'|tr:'Classroom'}}<input type="number" min="0" formControlName="capacityClassroom"></label>
          <label>{{'Théâtre'|tr:'Theatre'}}<input type="number" min="0" formControlName="capacityTheatre"></label>
          <label>Cocktail<input type="number" min="0" formControlName="capacityCocktail"></label>
        </div>
        <footer class="form-actions"><button class="btn secondary" type="button" (click)="closeCreate()">{{'Annuler'|tr:'Cancel'}}</button><button class="btn primary" type="submit" [disabled]="creating">{{creating?('Enregistrement…'|tr:'Saving…'):editingRoom?('Enregistrer les modifications'|tr:'Save changes'):('Créer la salle'|tr:'Create room')}}</button></footer>
      </form>
    </section>
  </div>
}
@if(roomToDelete){
  <div class="modal-backdrop" role="presentation"><section class="modal user-modal" role="dialog" aria-modal="true" aria-labelledby="delete-room-title"><header class="modal-head"><div><h2 id="delete-room-title">{{'Supprimer la salle'|tr:'Delete room'}}</h2><p>{{roomToDelete.name}} · {{roomToDelete.code}}</p></div><button class="icon-btn dark" type="button" (click)="closeDelete()" [attr.aria-label]="'Fermer'|tr:'Close'">×</button></header><div class="room-admin-form"><div class="alert error">{{'La salle sera retirée du catalogue. Son historique de réservation sera conservé.'|tr:'The room will be removed from the catalogue. Its booking history will be preserved.'}}</div><label>{{'Justification de la suppression'|tr:'Reason for deletion'}} *<textarea rows="4" maxlength="1000" [formControl]="deletionReason" [placeholder]="'Expliquez précisément la raison de cette suppression…'|tr:'Clearly explain the reason for this deletion…'"></textarea>@if(deletionReason.touched&&deletionReason.invalid){<span class="field-error">{{'La justification est obligatoire.'|tr:'A reason is required.'}}</span>}</label><footer class="form-actions"><button class="btn secondary" type="button" (click)="closeDelete()">{{'Annuler'|tr:'Cancel'}}</button><button class="btn danger-btn" type="button" [disabled]="deleting" (click)="confirmDeleteRoom()">{{deleting?('Suppression…'|tr:'Deleting…'):('Supprimer définitivement du catalogue'|tr:'Remove from catalogue')}}</button></footer></div></section></div>
}
`})
export class RoomsComponent{
  private api=inject(ApiService);auth=inject(AuthService);language=inject(LanguageService);private fb=inject(FormBuilder);private route=inject(ActivatedRoute);private router=inject(Router);private destroyRef=inject(DestroyRef);
  rooms:Room[]=[];equipment:Equipment[]=[];loading=true;error='';success='';createError='';createOpen=false;creating=false;editingRoom:Room|null=null;roomToDelete:Room|null=null;deleting=false;photoBusy=false;
  deletionReason=this.fb.nonNullable.control('',[Validators.required,Validators.maxLength(1000)]);
  filters=this.fb.nonNullable.group({q:'',building:'',layout:'',capacity:0,equipment:''});
  roomForm=this.fb.nonNullable.group({
    code:['',[Validators.required,Validators.pattern(/^[A-Za-z0-9-]{2,30}$/)]],name:['',Validators.required],buildingCode:'ACADEMIE',
    location:['',Validators.required],bufferMinutes:[20,[Validators.required,Validators.min(0)]],status:'AVAILABLE',active:true,
    photoUrl:'/assets/rooms/meeting.svg',equipmentCodes:[['AIR_CONDITIONING','WIFI'] as string[]],
    capacityBoardroom:[0,Validators.min(0)],capacityUShape:[0,Validators.min(0)],capacityClassroom:[0,Validators.min(0)],
    capacityTheatre:[0,Validators.min(0)],capacityCocktail:[0,Validators.min(0)]
  });
  constructor(){const q=this.route.snapshot.queryParamMap;this.filters.patchValue({q:q.get('q')??'',building:q.get('building')??'',layout:q.get('layout')??'',capacity:Number(q.get('capacity')??0),equipment:q.get('equipment')??''},{emitEvent:false});this.filters.valueChanges.pipe(debounceTime(150),takeUntilDestroyed()).subscribe(v=>this.router.navigate([],{relativeTo:this.route,queryParams:{q:v.q||null,building:v.building||null,layout:v.layout||null,capacity:v.capacity||null,equipment:v.equipment||null},replaceUrl:true}));}
  ngOnInit(){this.load();this.api.equipment().subscribe({next:r=>this.equipment=r});}
  load(){this.loading=true;this.error='';this.api.rooms().subscribe({next:r=>{this.rooms=r;this.loading=false},error:()=>{this.loading=false;this.error=this.language.text('Impossible de charger les salles.','Unable to load rooms.')}});}
  get filtered(){return filterRooms(this.rooms,this.filters.getRawValue());}
  get fixedEquipment(){return this.equipment.filter(e=>e.type==='FIXED'&&e.status==='AVAILABLE');}
  isMandatoryEquipment(code:string){return code==='AIR_CONDITIONING'||code==='WIFI';}
  get hasCustomPhoto(){return this.roomForm.controls.photoUrl.value.startsWith('/api/uploads/rooms/')}
  reset(){this.filters.setValue({q:'',building:'',layout:'',capacity:0,equipment:''});}
  openCreate(){this.editingRoom=null;this.success='';this.createError='';this.resetRoomForm();this.createOpen=true;}
  openEdit(room:Room){
    this.editingRoom=room;this.success='';this.createError='';
    const capacities=Object.fromEntries(room.capacities.map(item=>[item.layout,item.capacity]));
    const buildingCode=room.building==='PAC'?'PAC':room.building.toLowerCase().includes('grand')?'GRAND':'ACADEMIE';
    this.roomForm.reset({code:room.code,name:room.name,buildingCode,location:room.location,bufferMinutes:room.bufferMinutes,status:room.status,active:room.active,photoUrl:room.photoUrl||'/assets/rooms/meeting.svg',equipmentCodes:Array.from(new Set([...room.equipment.map(item=>item.code),'AIR_CONDITIONING','WIFI'])),capacityBoardroom:capacities['BOARDROOM']??0,capacityUShape:capacities['U_SHAPE']??0,capacityClassroom:capacities['CLASSROOM']??0,capacityTheatre:capacities['THEATRE']??0,capacityCocktail:capacities['COCKTAIL']??0});
    this.createOpen=true;
  }
  closeCreate(){if(!this.creating){this.createOpen=false;this.editingRoom=null;}}
  uploadPhoto(event:Event){const input=event.target as HTMLInputElement;const file=input.files?.[0];input.value='';if(!file||!this.editingRoom)return;const allowed=['image/png','image/jpeg','image/webp'];if(!allowed.includes(file.type)){this.createError=this.language.text('Format non accepté : utilisez PNG, JPEG ou WebP.','Unsupported format: use PNG, JPEG or WebP.');return}if(file.size>5*1024*1024){this.createError=this.language.text('La photo ne doit pas dépasser 5 Mo.','The photo must not exceed 5 MB.');return}this.photoBusy=true;this.createError='';this.api.uploadRoomPhoto(this.editingRoom.id,file).subscribe({next:room=>{this.photoBusy=false;this.editingRoom=room;this.rooms=this.rooms.map(item=>item.id===room.id?room:item);this.roomForm.controls.photoUrl.setValue(room.photoUrl)},error:e=>{this.photoBusy=false;this.createError=this.language.server(e.error?.message)||this.language.text('Téléversement impossible.','Unable to upload photo.')}})}
  removePhoto(){if(!this.editingRoom||!this.hasCustomPhoto)return;this.photoBusy=true;this.createError='';this.api.deleteRoomPhoto(this.editingRoom.id).subscribe({next:room=>{this.photoBusy=false;this.editingRoom=room;this.rooms=this.rooms.map(item=>item.id===room.id?room:item);this.roomForm.controls.photoUrl.setValue(room.photoUrl)},error:e=>{this.photoBusy=false;this.createError=this.language.server(e.error?.message)||this.language.text('Suppression de la photo impossible.','Unable to delete photo.')}})}
  saveRoom(){
    this.createError='';this.roomForm.markAllAsTouched();if(this.roomForm.invalid)return;
    const v=this.roomForm.getRawValue();const capacities:Record<string,number>={};
    if(v.capacityBoardroom>0)capacities['BOARDROOM']=v.capacityBoardroom;if(v.capacityUShape>0)capacities['U_SHAPE']=v.capacityUShape;
    if(v.capacityClassroom>0)capacities['CLASSROOM']=v.capacityClassroom;if(v.capacityTheatre>0)capacities['THEATRE']=v.capacityTheatre;
    if(v.capacityCocktail>0)capacities['COCKTAIL']=v.capacityCocktail;
    if(!Object.keys(capacities).length){this.createError=this.language.text('Indiquez au moins une capacité supérieure à zéro.','Enter at least one capacity greater than zero.');return;}
    const payload={code:v.code.trim().toUpperCase(),name:v.name.trim(),buildingCode:v.buildingCode,location:v.location.trim(),bufferMinutes:v.bufferMinutes,status:v.status,active:v.active,photoUrl:v.photoUrl,capacities,equipmentCodes:Array.from(new Set([...v.equipmentCodes,'AIR_CONDITIONING','WIFI']))};
    const editing=this.editingRoom;const request=editing?this.api.updateRoom(editing.id,payload):this.api.createRoom(payload);
    this.creating=true;request.subscribe({next:r=>{this.rooms=editing?this.rooms.map(item=>item.id===r.id?r:item):[...this.rooms,r];this.creating=false;this.createOpen=false;this.editingRoom=null;this.success=editing?this.language.text(`La salle ${r.name} a été modifiée.`,`Room ${r.name} was updated.`):this.language.text(`La salle ${r.name} a été créée.`,`Room ${r.name} was created.`);this.resetRoomForm();},error:e=>{this.creating=false;this.createError=this.language.server(e.error?.message)||this.language.text('Enregistrement impossible.','Unable to save the room.');}});
  }
  openDelete(room:Room){this.roomToDelete=room;this.deletionReason.reset('');this.success=''}
  closeDelete(){if(!this.deleting){this.roomToDelete=null;this.deletionReason.reset('')}}
  confirmDeleteRoom(){const room=this.roomToDelete;if(!room)return;this.deletionReason.markAsTouched();if(this.deletionReason.invalid||!this.deletionReason.value.trim())return;this.deleting=true;this.api.deleteRoom(room.id,this.deletionReason.value.trim()).subscribe({next:()=>{this.rooms=this.rooms.filter(item=>item.id!==room.id);this.deleting=false;this.roomToDelete=null;this.deletionReason.reset('');this.success=this.language.text(`La salle ${room.name} a été supprimée du catalogue.`,`Room ${room.name} was removed from the catalogue.`)},error:e=>{this.deleting=false;alert(this.language.server(e.error?.message)||this.language.text('Suppression impossible.','Unable to delete the room.'))}})}
  private resetRoomForm(){this.roomForm.reset({code:'',name:'',buildingCode:'ACADEMIE',location:'',bufferMinutes:20,status:'AVAILABLE',active:true,photoUrl:'/assets/rooms/meeting.svg',equipmentCodes:['AIR_CONDITIONING','WIFI'],capacityBoardroom:0,capacityUShape:0,capacityClassroom:0,capacityTheatre:0,capacityCocktail:0});}
  layout(v:string){const labels:Record<string,[string,string]>={BOARDROOM:['Conseil','Boardroom'],U_SHAPE:['Forme en U','U-shape'],CLASSROOM:['Classe','Classroom'],THEATRE:['Théâtre','Theatre'],COCKTAIL:['Cocktail','Cocktail']};return labels[v]?this.language.text(...labels[v]):v;}
  status(v:string){const labels:Record<string,[string,string]>={AVAILABLE:['Disponible','Available'],OCCUPIED:['Occupée','Occupied'],BLOCKED:['Bloquée','Blocked'],MAINTENANCE:['Maintenance','Maintenance']};return labels[v]?this.language.text(...labels[v]):v;}
}
