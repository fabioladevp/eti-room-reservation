import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { LanguageService } from '../core/language.service';
import { TranslatePipe } from '../core/translate.pipe';

@Component({
  standalone:true, imports:[CommonModule,ReactiveFormsModule,TranslatePipe],
  template:`
  <main class="login-page">
    <section class="login-visual">
      <div class="login-brand"><img src="/brand/ecobank-logo.svg" alt="Ecobank, la banque panafricaine"><i></i><b>ETI</b></div>
      <div class="login-copy"><small>{{'PLATEFORME INTERNE'|tr:'INTERNAL PLATFORM'}}</small><h1>{{'Vos espaces de réunion,'|tr:'Your meeting spaces,'}}<br><em>{{'simplement organisés.'|tr:'simply organized.'}}</em></h1><p>{{'Réservez, faites valider et suivez vos demandes de salles ETI depuis un espace unique et sécurisé.'|tr:'Book, approve and track your ETI room requests from one secure workspace.'}}</p></div>
      <div class="login-feature"><span class="feature-icon">✓</span><div><b>{{'Workflow maîtrisé'|tr:'Controlled workflow'}}</b><small>{{'Assignation, validations Facility et IT, confirmation.'|tr:'Assignment, Facility and IT approvals, confirmation.'}}</small></div></div>
    </section>
    <section class="login-panel">
      <div class="login-box">
        <p class="eyebrow">{{'BIENVENUE'|tr:'WELCOME'}}</p><h2>{{'Connexion'|tr:'Sign in'}}</h2><p class="muted">{{'Accédez à votre espace de gestion des salles.'|tr:'Access your room management workspace.'}}</p>
        <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <label>{{'Adresse e-mail professionnelle'|tr:'Business email address'}}<input type="email" formControlName="email" autocomplete="username" placeholder="prenom.nom@ecobank.com"></label>
          @if(form.controls.email.touched&&form.controls.email.invalid){<small class="field-error">{{'Saisissez une adresse e-mail valide.'|tr:'Enter a valid email address.'}}</small>}
          <label>{{'Mot de passe'|tr:'Password'}}<input type="password" formControlName="password" autocomplete="current-password" [placeholder]="'Votre mot de passe'|tr:'Your password'"></label>
          @if(error){<div class="alert error" role="alert">{{error}}</div>}
          <button class="btn primary wide" [disabled]="form.invalid||loading">{{loading?('Connexion en cours…'|tr:'Signing in…'):('Se connecter'|tr:'Sign in')}}</button>
        </form>
      </div>
    </section>
  </main>`
})
export class LoginComponent {
  private fb=inject(FormBuilder); private auth=inject(AuthService); private router=inject(Router); private language=inject(LanguageService);
  loading=false; error='';
  form=this.fb.nonNullable.group({email:['',[Validators.required,Validators.email]],password:['',[Validators.required]]});
  submit(){ if(this.form.invalid)return; this.loading=true;this.error=''; this.auth.login(this.form.value.email!,this.form.value.password!).subscribe({next:()=>this.router.navigateByUrl(this.auth.hasRole('ADMIN')?'/tableau-de-bord':'/accueil'),error:e=>{this.loading=false;this.error=this.language.server(e.error?.message)||this.language.text('Connexion impossible. Vérifiez le serveur.','Unable to sign in. Check the server.');}}); }
}
