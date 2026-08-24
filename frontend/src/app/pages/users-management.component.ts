import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../core/api.service';
import { AuthService } from '../core/auth.service';
import { LanguageService } from '../core/language.service';
import { Role, User } from '../core/models';
import { TranslatePipe } from '../core/translate.pipe';

const STRONG_PASSWORD = /^(?:$|(?=\S{8,100}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).*)$/;

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslatePipe],
  template: `
    <header class="page-head">
      <div><p class="eyebrow">{{'ADMINISTRATION'|tr:'ADMINISTRATION'}}</p><h1>{{'Utilisateurs et rôles'|tr:'Users and roles'}}</h1><p>{{'Créez les comptes, modifiez leurs accès ou supprimez-les en conservant l’historique sensible.'|tr:'Create accounts, update access or delete them while preserving sensitive history.'}}</p></div>
      <button class="btn primary" type="button" (click)="openCreate()">＋ {{'Créer un utilisateur'|tr:'Create user'}}</button>
    </header>

    @if(message){<div class="alert success">{{message}}</div>}
    @if(error&&!modalOpen){<div class="alert error">{{error}}</div>}
    @if(!loading&&!error){<section class="filter-panel users-filter">
      <label class="search-field"><span>{{'Rechercher'|tr:'Search'}}</span><input [(ngModel)]="q" [placeholder]="'Nom ou adresse e-mail'|tr:'Name or email address'"></label>
      <label><span>{{'Rôle'|tr:'Role'}}</span><select [(ngModel)]="roleFilter"><option value="">{{'Tous les rôles'|tr:'All roles'}}</option><option value="USER">{{'Demandeur'|tr:'Requester'}}</option><option value="ADMIN">{{'Administrateur'|tr:'Administrator'}}</option><option value="FACILITY">Facility</option><option value="IT">{{'Personnel IT'|tr:'IT staff'}}</option></select></label>
      <label><span>{{'État'|tr:'Status'}}</span><select [(ngModel)]="statusFilter"><option value="">{{'Tous les états'|tr:'All statuses'}}</option><option value="active">{{'Actif'|tr:'Active'}}</option><option value="inactive">{{'Inactif'|tr:'Inactive'}}</option></select></label>
      <label><span>{{'Langue'|tr:'Language'}}</span><select [(ngModel)]="languageFilter"><option value="">{{'Toutes les langues'|tr:'All languages'}}</option><option value="fr">{{'Français'|tr:'French'}}</option><option value="en">{{'Anglais'|tr:'English'}}</option></select></label>
      <div class="filter-summary"><b>{{filteredUsers.length}}</b><small>{{'utilisateur(s)'|tr:'user(s)'}}</small></div>
    </section>}
    @if(loading){<div class="panel loading">{{'Chargement des utilisateurs…'|tr:'Loading users…'}}</div>}
    @else{
      <section class="panel table-panel"><div class="table-scroll"><table>
        <thead><tr><th>{{'Nom'|tr:'Name'}}</th><th>{{'E-mail'|tr:'Email'}}</th><th>{{'Rôle'|tr:'Role'}}</th><th>{{'Langue'|tr:'Language'}}</th><th>{{'État'|tr:'Status'}}</th><th>{{'Actions'|tr:'Actions'}}</th></tr></thead>
        <tbody>@for(u of filteredUsers;track u.id){<tr>
          <td><b>{{u.fullName}}</b>@if(u.id===auth.user()?.id){<small>{{'Votre compte'|tr:'Your account'}}</small>}</td>
          <td>{{u.email}}</td><td>{{roleLabel(u.role)}}</td><td>{{languageLabel(u.language)}}</td>
          <td><span class="badge" [attr.data-status]="u.active?'CONFIRMED':'CANCELLED'">{{u.active?('Actif'|tr:'Active'):('Inactif'|tr:'Inactive')}}</span></td>
          <td><div class="actions"><button class="btn tiny" type="button" (click)="openEdit(u)">{{'Modifier'|tr:'Edit'}}</button><button class="btn tiny danger-btn" type="button" [disabled]="u.id===auth.user()?.id" (click)="openDelete(u)">{{'Supprimer'|tr:'Delete'}}</button></div></td>
        </tr>}@empty{<tr><td colspan="6" class="center">{{'Aucun utilisateur ne correspond aux filtres.'|tr:'No user matches the filters.'}}</td></tr>}</tbody>
      </table></div></section>
    }

    @if(modalOpen){<div class="modal-backdrop">
      <section class="modal user-modal" role="dialog" aria-modal="true" aria-labelledby="user-form-title">
        <header class="modal-head"><div><h2 id="user-form-title">{{editing?('Modifier l’utilisateur'|tr:'Edit user'):('Créer un utilisateur'|tr:'Create user')}}</h2><p>{{editing?('Mettez à jour son identité, son rôle et son accès.'|tr:'Update identity, role and access.'):('Définissez ses identifiants et ses droits initiaux.'|tr:'Set initial credentials and permissions.')}}</p></div><button class="icon-btn dark" type="button" (click)="close()" [attr.aria-label]="'Fermer'|tr:'Close'">×</button></header>
        <form class="room-admin-form" [formGroup]="form" (ngSubmit)="save()" autocomplete="off">
          @if(error){<div class="alert error">{{error}}</div>}
          <div class="form-grid">
            <label>{{'Nom complet'|tr:'Full name'}} *<input formControlName="fullName" maxlength="160" [placeholder]="'Prénom et nom'|tr:'First and last name'"></label>
            <label>{{'Adresse e-mail'|tr:'Email address'}} *<input type="email" formControlName="email" maxlength="190" placeholder="prenom.nom@ecobank.com"></label>
            <label>{{'Rôle'|tr:'Role'}} *<select formControlName="role"><option value="USER">{{'Demandeur'|tr:'Requester'}}</option><option value="ADMIN">{{'Administrateur'|tr:'Administrator'}}</option><option value="FACILITY">Facility</option><option value="IT">{{'Personnel IT'|tr:'IT staff'}}</option></select></label>
            <label>{{'Langue'|tr:'Language'}} *<select formControlName="language"><option value="fr">{{'Français'|tr:'French'}}</option><option value="en">{{'Anglais'|tr:'English'}}</option></select></label>
            <label class="full">{{editing?('Nouveau mot de passe'|tr:'New password'):('Mot de passe initial'|tr:'Initial password')}}{{editing?'':' *'}}<input type="password" formControlName="password" autocomplete="new-password" [placeholder]="'Mot de passe fort'|tr:'Strong password'"><span class="field-help">{{editing?('Laissez vide pour conserver le mot de passe actuel.'|tr:'Leave blank to keep the current password.'):('Toutes les règles ci-dessous doivent être respectées.'|tr:'All rules below must be met.')}}</span></label>
            @if(!editing||passwordValue){<div class="password-checklist full" aria-live="polite">
              <b>{{'Sécurité du mot de passe'|tr:'Password security'}}</b>
              <ul><li [class.met]="passwordMinLength"><span>{{passwordMinLength?'✓':'○'}}</span>{{'8 caractères minimum'|tr:'At least 8 characters'}}</li><li [class.met]="passwordHasUpper"><span>{{passwordHasUpper?'✓':'○'}}</span>{{'Une lettre majuscule'|tr:'One uppercase letter'}}</li><li [class.met]="passwordHasLower"><span>{{passwordHasLower?'✓':'○'}}</span>{{'Une lettre minuscule'|tr:'One lowercase letter'}}</li><li [class.met]="passwordHasNumber"><span>{{passwordHasNumber?'✓':'○'}}</span>{{'Un chiffre'|tr:'One number'}}</li><li [class.met]="passwordHasSpecial"><span>{{passwordHasSpecial?'✓':'○'}}</span>{{'Un caractère spécial'|tr:'One special character'}}</li><li [class.met]="passwordHasNoSpaces"><span>{{passwordHasNoSpaces?'✓':'○'}}</span>{{'Aucun espace'|tr:'No spaces'}}</li></ul>
            </div>}
            <label class="full admin-confirm-field">{{'Votre mot de passe administrateur'|tr:'Your administrator password'}} *<input type="password" formControlName="adminPassword" autocomplete="off" readonly (focus)="enableManualPasswordEntry($event)" [placeholder]="'Saisissez vous-même votre mot de passe'|tr:'Type your password yourself'"><span class="field-help">{{'Obligatoire pour autoriser cette opération. Il n’est jamais prérempli.'|tr:'Required to authorize this operation. It is never pre-filled.'}}</span></label>
            <label class="full toggle-row"><input type="checkbox" formControlName="active"> {{'Compte actif : l’utilisateur peut se connecter'|tr:'Active account: the user can sign in'}}</label>
          </div>
          <footer class="form-actions"><button class="btn secondary" type="button" (click)="close()">{{'Annuler'|tr:'Cancel'}}</button><button class="btn primary" type="submit" [disabled]="saving||form.invalid">{{saving?('Enregistrement…'|tr:'Saving…'):editing?('Enregistrer les modifications'|tr:'Save changes'):('Créer le compte'|tr:'Create account')}}</button></footer>
        </form>
      </section>
    </div>}

    @if(deleteTarget){<div class="modal-backdrop">
      <section class="modal user-modal" role="alertdialog" aria-modal="true" aria-labelledby="delete-user-title">
        <header class="modal-head"><div><h2 id="delete-user-title">{{'Confirmer la suppression'|tr:'Confirm deletion'}}</h2><p>{{deleteTarget.fullName}} · {{deleteTarget.email}}</p></div><button class="icon-btn dark" type="button" (click)="closeDelete()" [attr.aria-label]="'Fermer'|tr:'Close'">×</button></header>
        <form class="room-admin-form" [formGroup]="deleteForm" (ngSubmit)="confirmDelete()" autocomplete="off">
          @if(deleteError){<div class="alert error">{{deleteError}}</div>}
          <p class="delete-warning">{{'Si ce compte possède un historique, il sera archivé et ne pourra plus se connecter.'|tr:'If this account has a history, it will be archived and will no longer be able to sign in.'}}</p>
          <label>{{'Votre mot de passe administrateur'|tr:'Your administrator password'}} *<input type="password" formControlName="adminPassword" autocomplete="off" readonly (focus)="enableManualPasswordEntry($event,true)" [placeholder]="'Saisissez vous-même votre mot de passe'|tr:'Type your password yourself'"></label>
          <label class="delete-confirm-check"><input type="checkbox" formControlName="confirmed"> <span>{{'Oui, je veux vraiment supprimer ou archiver cet utilisateur.'|tr:'Yes, I really want to delete or archive this user.'}}</span></label>
          <footer class="form-actions"><button class="btn secondary" type="button" (click)="closeDelete()">{{'Annuler'|tr:'Cancel'}}</button><button class="btn danger-btn" type="submit" [disabled]="deleting||deleteForm.invalid">{{deleting?('Suppression…'|tr:'Deleting…'):('Confirmer la suppression'|tr:'Confirm deletion')}}</button></footer>
        </form>
      </section>
    </div>}
  `
})
export class UsersManagementComponent {
  private api=inject(ApiService); private fb=inject(FormBuilder); auth=inject(AuthService); private language=inject(LanguageService);
  users:User[]=[]; loading=true; modalOpen=false; saving=false; editing:User|null=null; message=''; error='';deleteTarget:User|null=null;deleting=false;deleteError='';
  q='';roleFilter='';statusFilter='';languageFilter='';
  form=this.fb.nonNullable.group({
    fullName:['',[Validators.required,Validators.maxLength(160)]],
    email:['',[Validators.required,Validators.email,Validators.maxLength(190)]],
    password:['',[Validators.pattern(STRONG_PASSWORD)]],
    role:['USER' as Role,Validators.required], language:['fr',[Validators.required,Validators.pattern(/^(fr|en)$/)]], active:true,
    adminPassword:['',[Validators.required,Validators.maxLength(100)]]
  });
  deleteForm=this.fb.nonNullable.group({adminPassword:['',[Validators.required,Validators.maxLength(100)]],confirmed:[false,Validators.requiredTrue]});

  get passwordValue(){return this.form.controls.password.value}
  get passwordMinLength(){return this.passwordValue.length>=8}
  get passwordHasUpper(){return /[A-Z]/.test(this.passwordValue)}
  get passwordHasLower(){return /[a-z]/.test(this.passwordValue)}
  get passwordHasNumber(){return /\d/.test(this.passwordValue)}
  get passwordHasSpecial(){return /[^A-Za-z0-9\s]/.test(this.passwordValue)}
  get passwordHasNoSpaces(){return this.passwordValue.length>0&&!/\s/.test(this.passwordValue)}
  get filteredUsers(){
    const query=this.normalize(this.q);
    return this.users.filter(user=>(!query||this.normalize(`${user.fullName} ${user.email}`).includes(query))
      &&(!this.roleFilter||user.role===this.roleFilter)
      &&(!this.statusFilter||(this.statusFilter==='active'?user.active:!user.active))
      &&(!this.languageFilter||user.language===this.languageFilter));
  }

  enableManualPasswordEntry(event:FocusEvent,deletion=false){
    const input=event.target as HTMLInputElement;
    const control=deletion?this.deleteForm.controls.adminPassword:this.form.controls.adminPassword;
    input.removeAttribute('readonly');
    if(control.pristine){control.setValue('');input.value='';}
  }

  ngOnInit(){this.load();}
  load(){this.loading=true;this.api.users().subscribe({next:r=>{this.users=r;this.loading=false},error:e=>{this.loading=false;this.error=this.language.server(e.error?.message)||this.language.text('Chargement impossible.','Unable to load users.')}});}
  openCreate(){this.editing=null;this.error='';this.message='';this.form.reset({fullName:'',email:'',password:'',role:'USER',language:this.language.current(),active:true,adminPassword:''});this.form.controls.password.addValidators(Validators.required);this.form.controls.password.updateValueAndValidity();this.modalOpen=true;}
  openEdit(user:User){this.editing=user;this.error='';this.message='';this.form.controls.password.removeValidators(Validators.required);this.form.controls.password.updateValueAndValidity();this.form.reset({fullName:user.fullName,email:user.email,password:'',role:user.role,language:user.language,active:user.active,adminPassword:''});this.modalOpen=true;}
  close(){if(!this.saving){this.modalOpen=false;this.error='';}}
  save(){
    this.form.markAllAsTouched();if(this.form.invalid)return;this.saving=true;this.error='';const data=this.form.getRawValue();
    const request=this.editing?this.api.updateUser(this.editing.id,data):this.api.createUser(data);
    request.subscribe({next:user=>{this.saving=false;this.modalOpen=false;if(this.editing)this.users=this.users.map(u=>u.id===user.id?user:u);else this.users=[...this.users,user].sort((a,b)=>a.fullName.localeCompare(b.fullName));this.message=this.editing?this.language.text('Utilisateur modifié.','User updated.'):this.language.text('Utilisateur créé.','User created.');this.editing=null;},error:e=>{this.saving=false;this.error=this.language.server(e.error?.message)||this.language.text('Enregistrement impossible.','Unable to save.');}});
  }
  openDelete(user:User){if(user.id===this.auth.user()?.id)return;this.deleteTarget=user;this.deleteError='';this.deleteForm.reset({adminPassword:'',confirmed:false})}
  closeDelete(){if(!this.deleting){this.deleteTarget=null;this.deleteError=''}}
  confirmDelete(){this.deleteForm.markAllAsTouched();if(!this.deleteTarget||this.deleteForm.invalid)return;this.deleting=true;this.deleteError='';const id=this.deleteTarget.id;this.api.deleteUser(id,this.deleteForm.controls.adminPassword.value).subscribe({next:()=>{this.deleting=false;this.deleteTarget=null;this.users=this.users.filter(u=>u.id!==id);this.message=this.language.text('Utilisateur supprimé ou archivé.','User deleted or archived.');},error:e=>{this.deleting=false;this.deleteError=this.language.server(e.error?.message)||this.language.text('Suppression impossible.','Unable to delete user.')}})}
  roleLabel(role:Role){const labels:Record<Role,[string,string]>={USER:['Demandeur','Requester'],ADMIN:['Administrateur','Administrator'],FACILITY:['Facility','Facility'],IT:['Personnel IT','IT staff']};return this.language.text(...labels[role]);}
  languageLabel(language:string){return language==='fr'?this.language.text('Français','French'):this.language.text('Anglais','English')}
  private normalize(value:string){return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim()}
}
