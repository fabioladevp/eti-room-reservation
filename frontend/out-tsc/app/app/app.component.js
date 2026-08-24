import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth.service';
import { NavIconComponent } from './core/nav-icon.component';
import { LanguageService } from './core/language.service';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.path;
function AppComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "router-outlet");
} }
function AppComponent_Conditional_1_For_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 20);
    i0.ɵɵelement(1, "app-nav-icon", 25);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("routerLink", item_r3.path);
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", ctx_r1.iconName(item_r3.path));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.navLabel(item_r3));
} }
function AppComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "a", 2);
    i0.ɵɵelement(3, "img", 3)(4, "i");
    i0.ɵɵelementStart(5, "strong");
    i0.ɵɵtext(6, "ETI");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "small");
    i0.ɵɵtext(8, "Gestion des salles");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 4);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(10, "svg", 5);
    i0.ɵɵelement(11, "path", 6);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelement(12, "input", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 8)(14, "div", 9)(15, "button", 10);
    i0.ɵɵlistener("click", function AppComponent_Conditional_1_Template_button_click_15_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.language.set("fr")); });
    i0.ɵɵtext(16, "FR");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span", 11);
    i0.ɵɵtext(18, "/");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "button", 10);
    i0.ɵɵlistener("click", function AppComponent_Conditional_1_Template_button_click_19_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.language.set("en")); });
    i0.ɵɵtext(20, "EN");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "span", 12);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "span", 13)(24, "b");
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "small");
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "button", 14);
    i0.ɵɵlistener("click", function AppComponent_Conditional_1_Template_button_click_28_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.auth.logout()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(29, "svg", 15);
    i0.ɵɵelement(30, "path", 16);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(31, "aside", 17)(32, "p", 18);
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "nav", 19);
    i0.ɵɵrepeaterCreate(35, AppComponent_Conditional_1_For_36_Template, 3, 3, "a", 20, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "div", 21);
    i0.ɵɵelement(38, "span");
    i0.ɵɵelementStart(39, "div")(40, "b");
    i0.ɵɵtext(41);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "small");
    i0.ɵɵtext(43);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(44, "a", 22);
    i0.ɵɵtext(45);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "small", 23);
    i0.ɵɵtext(47);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(48, "main", 24);
    i0.ɵɵelement(49, "router-outlet");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_9_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(12);
    i0.ɵɵproperty("placeholder", ctx_r1.tr("Rechercher une salle, une demande\u2026", "Search for a room or request\u2026"));
    i0.ɵɵattribute("aria-label", ctx_r1.tr("Rechercher", "Search"));
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("aria-label", ctx_r1.tr("Choisir la langue", "Choose language"));
    i0.ɵɵadvance();
    i0.ɵɵclassProp("active", ctx_r1.language.current() === "fr");
    i0.ɵɵattribute("aria-pressed", ctx_r1.language.current() === "fr");
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("active", ctx_r1.language.current() === "en");
    i0.ɵɵattribute("aria-pressed", ctx_r1.language.current() === "en");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.initials);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate((tmp_9_0 = ctx_r1.auth.user()) == null ? null : tmp_9_0.fullName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.roleLabel);
    i0.ɵɵadvance();
    i0.ɵɵproperty("title", ctx_r1.tr("Se d\u00E9connecter", "Sign out"));
    i0.ɵɵattribute("aria-label", ctx_r1.tr("Se d\u00E9connecter", "Sign out"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.tr("ESPACE DE TRAVAIL", "WORKSPACE"));
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.visibleNav);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r1.tr("Disponibilit\u00E9 en temps r\u00E9el", "Real-time availability"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.tr("Catalogue administrable", "Managed catalogue"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("?\u00A0\u00A0 ", ctx_r1.tr("Besoin d\u2019aide ?", "Need help?"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.tr("Plateforme interne Ecobank ETI", "Ecobank ETI internal platform"));
} }
export class AppComponent {
    auth = inject(AuthService);
    language = inject(LanguageService);
    nav = [
        { label: { fr: 'Tableau de bord', en: 'Dashboard' }, path: '/tableau-de-bord', roles: ['ADMIN'] },
        { label: { fr: 'Accueil', en: 'Home' }, path: '/accueil', roles: ['USER', 'FACILITY', 'IT'] },
        { label: { fr: 'Planning', en: 'Schedule' }, path: '/planning', roles: ['USER', 'ADMIN', 'FACILITY', 'IT'] },
        { label: { fr: 'Mes demandes', en: 'My requests' }, path: '/mes-demandes', roles: ['USER'] },
        { label: { fr: 'Nouvelle demande', en: 'New request' }, path: '/nouvelle-demande', roles: ['USER', 'ADMIN'] },
        { label: { fr: 'Salles', en: 'Rooms' }, path: '/salles', roles: ['USER', 'ADMIN', 'FACILITY', 'IT'] },
        { label: { fr: 'Demandes & assignations', en: 'Requests & assignments' }, path: '/administration/demandes', roles: ['ADMIN'] },
        { label: { fr: 'Validations Facility', en: 'Facility approvals' }, path: '/validations/facility', roles: ['FACILITY'] },
        { label: { fr: 'Validations IT', en: 'IT approvals' }, path: '/validations/it', roles: ['IT'] },
        { label: { fr: 'Équipements', en: 'Equipment' }, path: '/equipements', roles: ['ADMIN', 'IT'] },
        { label: { fr: 'Utilisateurs', en: 'Users' }, path: '/administration/utilisateurs', roles: ['ADMIN'] },
        { label: { fr: 'Rapports', en: 'Reports' }, path: '/rapports', roles: ['ADMIN'] },
        { label: { fr: 'Journal d’audit', en: 'Audit log' }, path: '/audit', roles: ['ADMIN'] },
        { label: { fr: 'Notifications', en: 'Notifications' }, path: '/notifications', roles: ['USER', 'ADMIN', 'FACILITY', 'IT'] }
    ];
    get visibleNav() { const role = this.auth.role(); return role ? this.nav.filter(n => n.roles.includes(role)) : []; }
    iconName(path) {
        return {
            '/tableau-de-bord': 'dashboard', '/accueil': 'home', '/planning': 'calendar', '/mes-demandes': 'document',
            '/nouvelle-demande': 'plus', '/salles': 'rooms', '/administration/demandes': 'tasks',
            '/validations/facility': 'check', '/validations/it': 'it', '/equipements': 'equipment',
            '/administration/utilisateurs': 'users', '/rapports': 'reports', '/audit': 'audit', '/notifications': 'bell'
        }[path] ?? 'document';
    }
    navLabel(item) { return item.label[this.language.current()]; }
    tr(french, english) { return this.language.text(french, english); }
    get initials() { return (this.auth.user()?.fullName ?? 'ET').split(' ').map(x => x[0]).slice(0, 2).join('').toUpperCase(); }
    get roleLabel() {
        const labels = { USER: { fr: 'Demandeur', en: 'Requester' }, ADMIN: { fr: 'Administrateur', en: 'Administrator' }, FACILITY: { fr: 'Facility', en: 'Facility' }, IT: { fr: 'Personnel IT', en: 'IT staff' } };
        return labels[this.auth.role() ?? '']?.[this.language.current()] ?? '';
    }
    static ɵfac = function AppComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AppComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AppComponent, selectors: [["app-root"]], decls: 2, vars: 1, consts: [[1, "app-shell"], [1, "topbar"], ["routerLink", "/accueil", "aria-label", "Accueil ETI", 1, "brand"], ["src", "/brand/ecobank-logo.svg", "alt", "Ecobank, la banque panafricaine"], [1, "top-search"], ["viewBox", "0 0 24 24", "aria-hidden", "true"], ["d", "m21 21-4.3-4.3m2.3-5.2A7.5 7.5 0 1 1 4 11.5a7.5 7.5 0 0 1 15 0Z"], [3, "placeholder"], [1, "profile"], ["role", "group", 1, "locale"], ["type", "button", 3, "click"], ["aria-hidden", "true"], [1, "avatar"], [1, "who"], [1, "icon-btn", 3, "click", "title"], ["viewBox", "0 0 24 24"], ["d", "M10 17l5-5-5-5m5 5H3m10-9h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"], [1, "sidebar"], [1, "nav-title"], ["aria-label", "Navigation principale"], ["routerLinkActive", "active", 3, "routerLink"], [1, "availability"], ["href", "mailto:support.rooms@ecobank.com", 1, "help"], [1, "platform"], [1, "content"], [3, "name"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, AppComponent_Conditional_0_Template, 1, 0, "router-outlet")(1, AppComponent_Conditional_1_Template, 50, 19, "div", 0);
        } if (rf & 2) {
            i0.ɵɵconditional(!ctx.auth.isAuthenticated() ? 0 : 1);
        } }, dependencies: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, NavIconComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppComponent, [{
        type: Component,
        args: [{
                selector: 'app-root', standalone: true, imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, NavIconComponent],
                template: `
    @if (!auth.isAuthenticated()) { <router-outlet /> }
    @else {
      <div class="app-shell">
        <header class="topbar">
          <a class="brand" routerLink="/accueil" aria-label="Accueil ETI"><img src="/brand/ecobank-logo.svg" alt="Ecobank, la banque panafricaine"><i></i><strong>ETI</strong><small>Gestion des salles</small></a>
          <div class="top-search"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-4.3-4.3m2.3-5.2A7.5 7.5 0 1 1 4 11.5a7.5 7.5 0 0 1 15 0Z"/></svg><input [attr.aria-label]="tr('Rechercher','Search')" [placeholder]="tr('Rechercher une salle, une demande…','Search for a room or request…')"></div>
          <div class="profile"><div class="locale" role="group" [attr.aria-label]="tr('Choisir la langue','Choose language')"><button type="button" [class.active]="language.current()==='fr'" [attr.aria-pressed]="language.current()==='fr'" (click)="language.set('fr')">FR</button><span aria-hidden="true">/</span><button type="button" [class.active]="language.current()==='en'" [attr.aria-pressed]="language.current()==='en'" (click)="language.set('en')">EN</button></div><span class="avatar">{{initials}}</span><span class="who"><b>{{auth.user()?.fullName}}</b><small>{{roleLabel}}</small></span><button class="icon-btn" (click)="auth.logout()" [title]="tr('Se déconnecter','Sign out')" [attr.aria-label]="tr('Se déconnecter','Sign out')"><svg viewBox="0 0 24 24"><path d="M10 17l5-5-5-5m5 5H3m10-9h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"/></svg></button></div>
        </header>
        <aside class="sidebar">
          <p class="nav-title">{{tr('ESPACE DE TRAVAIL','WORKSPACE')}}</p>
          <nav aria-label="Navigation principale">
            @for(item of visibleNav; track item.path){
              <a [routerLink]="item.path" routerLinkActive="active"><app-nav-icon [name]="iconName(item.path)" />{{navLabel(item)}}</a>
            }
          </nav>
          <div class="availability"><span></span><div><b>{{tr('Disponibilité en temps réel','Real-time availability')}}</b><small>{{tr('Catalogue administrable','Managed catalogue')}}</small></div></div>
          <a class="help" href="mailto:support.rooms@ecobank.com">?&nbsp;&nbsp; {{tr('Besoin d’aide ?','Need help?')}}</a>
          <small class="platform">{{tr('Plateforme interne Ecobank ETI','Ecobank ETI internal platform')}}</small>
        </aside>
        <main class="content"><router-outlet /></main>
      </div>
    }`
            }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "frontend/src/app/app.component.ts", lineNumber: 37 }); })();
//# sourceMappingURL=app.component.js.map