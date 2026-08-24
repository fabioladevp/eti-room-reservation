import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { LanguageService } from '../core/language.service';
import { TranslatePipe } from '../core/translate.pipe';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function LoginComponent_Conditional_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 13);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "tr");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, "Saisissez une adresse e-mail valide.", "Enter a valid email address."));
} }
function LoginComponent_Conditional_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
export class LoginComponent {
    fb = inject(FormBuilder);
    auth = inject(AuthService);
    router = inject(Router);
    language = inject(LanguageService);
    loading = false;
    error = '';
    form = this.fb.nonNullable.group({ email: ['', [Validators.required, Validators.email]], password: ['', [Validators.required]] });
    submit() { if (this.form.invalid)
        return; this.loading = true; this.error = ''; this.auth.login(this.form.value.email, this.form.value.password).subscribe({ next: () => this.router.navigateByUrl(this.auth.hasRole('ADMIN') ? '/tableau-de-bord' : '/accueil'), error: e => { this.loading = false; this.error = this.language.server(e.error?.message) || this.language.text('Connexion impossible. Vérifiez le serveur.', 'Unable to sign in. Check the server.'); } }); }
    static ɵfac = function LoginComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoginComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoginComponent, selectors: [["ng-component"]], decls: 65, vars: 67, consts: [[1, "login-page"], [1, "login-visual"], [1, "login-brand"], ["src", "/brand/ecobank-logo.svg", "alt", "Ecobank, la banque panafricaine"], [1, "login-copy"], [1, "login-feature"], [1, "feature-icon"], [1, "login-panel"], [1, "login-box"], [1, "eyebrow"], [1, "muted"], ["novalidate", "", 3, "ngSubmit", "formGroup"], ["type", "email", "formControlName", "email", "autocomplete", "username", "placeholder", "prenom.nom@ecobank.com"], [1, "field-error"], ["type", "password", "formControlName", "password", "autocomplete", "current-password", 3, "placeholder"], ["role", "alert", 1, "alert", "error"], [1, "btn", "primary", "wide", 3, "disabled"], [1, "login-help"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "main", 0)(1, "section", 1)(2, "div", 2);
            i0.ɵɵelement(3, "img", 3)(4, "i");
            i0.ɵɵelementStart(5, "b");
            i0.ɵɵtext(6, "ETI");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 4)(8, "small");
            i0.ɵɵtext(9);
            i0.ɵɵpipe(10, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "h1");
            i0.ɵɵtext(12);
            i0.ɵɵpipe(13, "tr");
            i0.ɵɵelement(14, "br");
            i0.ɵɵelementStart(15, "em");
            i0.ɵɵtext(16);
            i0.ɵɵpipe(17, "tr");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "p");
            i0.ɵɵtext(19);
            i0.ɵɵpipe(20, "tr");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(21, "div", 5)(22, "span", 6);
            i0.ɵɵtext(23, "\u2713");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "div")(25, "b");
            i0.ɵɵtext(26);
            i0.ɵɵpipe(27, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "small");
            i0.ɵɵtext(29);
            i0.ɵɵpipe(30, "tr");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(31, "section", 7)(32, "div", 8)(33, "p", 9);
            i0.ɵɵtext(34);
            i0.ɵɵpipe(35, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "h2");
            i0.ɵɵtext(37);
            i0.ɵɵpipe(38, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "p", 10);
            i0.ɵɵtext(40);
            i0.ɵɵpipe(41, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "form", 11);
            i0.ɵɵlistener("ngSubmit", function LoginComponent_Template_form_ngSubmit_42_listener() { return ctx.submit(); });
            i0.ɵɵelementStart(43, "label");
            i0.ɵɵtext(44);
            i0.ɵɵpipe(45, "tr");
            i0.ɵɵelement(46, "input", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(47, LoginComponent_Conditional_47_Template, 3, 4, "small", 13);
            i0.ɵɵelementStart(48, "label");
            i0.ɵɵtext(49);
            i0.ɵɵpipe(50, "tr");
            i0.ɵɵelement(51, "input", 14);
            i0.ɵɵpipe(52, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(53, LoginComponent_Conditional_53_Template, 2, 1, "div", 15);
            i0.ɵɵelementStart(54, "button", 16);
            i0.ɵɵtext(55);
            i0.ɵɵpipe(56, "tr");
            i0.ɵɵpipe(57, "tr");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(58, "div", 17)(59, "span");
            i0.ɵɵtext(60);
            i0.ɵɵpipe(61, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(62, "small");
            i0.ɵɵtext(63);
            i0.ɵɵpipe(64, "tr");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(10, 19, "PLATEFORME INTERNE", "INTERNAL PLATFORM"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(13, 22, "Vos espaces de r\u00E9union,", "Your meeting spaces,"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(17, 25, "simplement organis\u00E9s.", "simply organized."));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(20, 28, "R\u00E9servez, faites valider et suivez vos demandes de salles ETI depuis un espace unique et s\u00E9curis\u00E9.", "Book, approve and track your ETI room requests from one secure workspace."));
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(27, 31, "Workflow ma\u00EEtris\u00E9", "Controlled workflow"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(30, 34, "Assignation, validations Facility et IT, confirmation.", "Assignment, Facility and IT approvals, confirmation."));
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(35, 37, "BIENVENUE", "WELCOME"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(38, 40, "Connexion", "Sign in"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(41, 43, "Acc\u00E9dez \u00E0 votre espace de gestion des salles.", "Access your room management workspace."));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(45, 46, "Adresse e-mail professionnelle", "Business email address"));
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.form.controls.email.touched && ctx.form.controls.email.invalid ? 47 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(50, 49, "Mot de passe", "Password"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind2(52, 52, "Votre mot de passe", "Your password"));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.error ? 53 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.form.invalid || ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.loading ? i0.ɵɵpipeBind2(56, 55, "Connexion en cours\u2026", "Signing in\u2026") : i0.ɵɵpipeBind2(57, 58, "Se connecter", "Sign in"));
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(61, 61, "Environnement de d\u00E9monstration", "Demo environment"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(64, 64, "Les identifiants sont indiqu\u00E9s dans le README du projet.", "Credentials are listed in the project README."));
        } }, dependencies: [CommonModule, ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoginComponent, [{
        type: Component,
        args: [{
                standalone: true, imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
                template: `
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
        <div class="login-help"><span>{{'Environnement de démonstration'|tr:'Demo environment'}}</span><small>{{'Les identifiants sont indiqués dans le README du projet.'|tr:'Credentials are listed in the project README.'}}</small></div>
      </div>
    </section>
  </main>`
            }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "frontend/src/app/pages/login.component.ts", lineNumber: 33 }); })();
//# sourceMappingURL=login.component.js.map