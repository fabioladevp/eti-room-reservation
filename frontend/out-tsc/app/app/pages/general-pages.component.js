import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { ApiService } from '../core/api.service';
import { LanguageService } from '../core/language.service';
import { TranslatePipe } from '../core/translate.pipe';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _forTrack0 = ($index, $item) => $item.id;
function HomeComponent_a_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 20);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "tr");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\uFF0B ", i0.ɵɵpipeBind2(2, 1, "Nouvelle demande", "New request"));
} }
function HomeComponent_Conditional_76_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "tr");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, "Chargement\u2026", "Loading\u2026"));
} }
function HomeComponent_Conditional_77_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14)(1, "b");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "tr");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(3, 2, "Aucune activit\u00E9 \u00E0 afficher", "No activity to display"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 5, "Les prochaines demandes appara\u00EEtront ici.", "Upcoming requests will appear here."));
} }
function HomeComponent_Conditional_78_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21)(1, "time");
    i0.ɵɵtext(2);
    i0.ɵɵelementStart(3, "small");
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(6, "i");
    i0.ɵɵelementStart(7, "div")(8, "b");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "small");
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "tr");
    i0.ɵɵpipe(13, "tr");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "span", 22);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const r_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(r_r1.startTime.slice(0, 5));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 8, r_r1.startDate, "dd/MM"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(r_r1.subject);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3("", (r_r1.assignedRoom == null ? null : r_r1.assignedRoom.name) || i0.ɵɵpipeBind2(12, 11, "Salle \u00E0 assigner", "Room to assign"), " \u00B7 ", r_r1.participantCount, " ", i0.ɵɵpipeBind2(13, 14, "participants", "participants"));
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("data-status", r_r1.status);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.label(r_r1.status));
} }
function HomeComponent_Conditional_78_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵrepeaterCreate(1, HomeComponent_Conditional_78_For_2_Template, 16, 17, "div", 21, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.items.slice(0, 4));
} }
const _forTrack1 = ($index, $item) => $item.key;
function PlanningComponent_For_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7)(1, "b");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "small");
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "tr");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const d_r1 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(d_r1.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 2, "Journ\u00E9e", "Day"));
} }
function PlanningComponent_For_27_For_3_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "tr");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, "R\u00E9union confirm\u00E9e", "Confirmed meeting"));
} }
function PlanningComponent_For_27_For_3_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "tr");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, "Cr\u00E9neau occup\u00E9", "Occupied slot"));
} }
function PlanningComponent_For_27_For_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵtemplate(1, PlanningComponent_For_27_For_3_span_1_Template, 3, 4, "span", 10)(2, PlanningComponent_For_27_For_3_span_2_Template, 3, 4, "span", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const d_r2 = ctx.$implicit;
    const t_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵclassProp("busy", t_r3 === "09:00" && d_r2.key === "MON" || t_r3 === "14:00" && d_r2.key === "WED");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", t_r3 === "09:00" && d_r2.key === "MON");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", t_r3 === "14:00" && d_r2.key === "WED");
} }
function PlanningComponent_For_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(2, PlanningComponent_For_27_For_3_Template, 3, 4, "div", 8, _forTrack1);
} if (rf & 2) {
    const t_r3 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(t_r3);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r3.days);
} }
export class HomeComponent {
    auth = inject(AuthService);
    api = inject(ApiService);
    language = inject(LanguageService);
    today = new Date();
    items = [];
    loading = true;
    get locale() { return this.language.current() === 'fr' ? 'fr' : 'en-US'; }
    get firstName() { return this.auth.user()?.fullName.split(' ')[0] ?? ''; }
    get pending() { return this.items.filter(x => !['CONFIRMED', 'CANCELLED', 'COMPLETED'].includes(x.status)).length; }
    get confirmed() { return this.items.filter(x => x.status === 'CONFIRMED').length; }
    ngOnInit() { const source = this.auth.hasRole('USER') ? this.api.mine() : this.auth.hasRole('FACILITY') ? this.api.facilityQueue() : this.auth.hasRole('IT') ? this.api.itQueue() : this.api.allRequests(); source.subscribe({ next: r => { this.items = r; this.loading = false; }, error: () => this.loading = false }); }
    label(s) { const labels = { SUBMITTED: ['Soumise', 'Submitted'], PENDING_FACILITY: ['En attente Facility', 'Pending Facility'], PENDING_IT: ['En attente IT', 'Pending IT'], CONFIRMED: ['Confirmée', 'Confirmed'], CANCELLED: ['Annulée', 'Cancelled'], COMPLETED: ['Terminée', 'Completed'], REJECTED_FACILITY: ['Rejetée par Facility', 'Rejected by Facility'], REJECTED_IT: ['Rejetée par IT', 'Rejected by IT'], TO_REASSIGN: ['À réassigner', 'To reassign'] }; const value = labels[s]; return value ? this.language.text(...value) : s.replaceAll('_', ' '); }
    static ɵfac = function HomeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HomeComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HomeComponent, selectors: [["ng-component"]], decls: 103, vars: 92, consts: [[1, "page-head"], [1, "eyebrow"], ["class", "btn primary", "routerLink", "/nouvelle-demande", 4, "ngIf"], [1, "metric-grid"], [1, "metric"], [1, "metric-icon", "teal"], [1, "metric-icon", "blue"], [1, "metric-icon", "amber"], [1, "metric-icon", "purple"], [1, "panel-grid"], [1, "panel", "span2"], [1, "panel-head"], [3, "routerLink"], [1, "loading"], [1, "empty"], [1, "meeting-list"], [1, "panel", "quick"], ["routerLink", "/salles"], ["routerLink", "/planning"], ["routerLink", "/notifications"], ["routerLink", "/nouvelle-demande", 1, "btn", "primary"], [1, "meeting"], [1, "badge"]], template: function HomeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "header", 0)(1, "div")(2, "p", 1);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "tr");
            i0.ɵɵpipe(5, "date");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "h1");
            i0.ɵɵtext(7);
            i0.ɵɵpipe(8, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "p");
            i0.ɵɵtext(10);
            i0.ɵɵpipe(11, "tr");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(12, HomeComponent_a_12_Template, 3, 4, "a", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "section", 3)(14, "article", 4)(15, "span", 5);
            i0.ɵɵtext(16, "\u25A6");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "div")(18, "small");
            i0.ɵɵtext(19);
            i0.ɵɵpipe(20, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "strong");
            i0.ɵɵtext(22, "14");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "p");
            i0.ɵɵtext(24);
            i0.ɵɵpipe(25, "tr");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(26, "article", 4)(27, "span", 6);
            i0.ɵɵtext(28, "\u25F7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "div")(30, "small");
            i0.ɵɵtext(31);
            i0.ɵɵpipe(32, "tr");
            i0.ɵɵpipe(33, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "strong");
            i0.ɵɵtext(35);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "p");
            i0.ɵɵtext(37);
            i0.ɵɵpipe(38, "tr");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(39, "article", 4)(40, "span", 7);
            i0.ɵɵtext(41, "\u2261");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "div")(43, "small");
            i0.ɵɵtext(44);
            i0.ɵɵpipe(45, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "strong");
            i0.ɵɵtext(47);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "p");
            i0.ɵɵtext(49);
            i0.ɵɵpipe(50, "tr");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(51, "article", 4)(52, "span", 8);
            i0.ɵɵtext(53, "\u2713");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "div")(55, "small");
            i0.ɵɵtext(56);
            i0.ɵɵpipe(57, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(58, "strong");
            i0.ɵɵtext(59);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(60, "p");
            i0.ɵɵtext(61);
            i0.ɵɵpipe(62, "tr");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(63, "section", 9)(64, "article", 10)(65, "div", 11)(66, "div")(67, "h2");
            i0.ɵɵtext(68);
            i0.ɵɵpipe(69, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(70, "p");
            i0.ɵɵtext(71);
            i0.ɵɵpipe(72, "tr");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(73, "a", 12);
            i0.ɵɵtext(74);
            i0.ɵɵpipe(75, "tr");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(76, HomeComponent_Conditional_76_Template, 3, 4, "div", 13)(77, HomeComponent_Conditional_77_Template, 7, 8, "div", 14)(78, HomeComponent_Conditional_78_Template, 3, 0, "div", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(79, "article", 16)(80, "div", 11)(81, "div")(82, "h2");
            i0.ɵɵtext(83);
            i0.ɵɵpipe(84, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(85, "p");
            i0.ɵɵtext(86);
            i0.ɵɵpipe(87, "tr");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(88, "a", 17);
            i0.ɵɵtext(89);
            i0.ɵɵpipe(90, "tr");
            i0.ɵɵelementStart(91, "span");
            i0.ɵɵtext(92, "\u2192");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(93, "a", 18);
            i0.ɵɵtext(94);
            i0.ɵɵpipe(95, "tr");
            i0.ɵɵelementStart(96, "span");
            i0.ɵɵtext(97, "\u2192");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(98, "a", 19);
            i0.ɵɵtext(99);
            i0.ɵɵpipe(100, "tr");
            i0.ɵɵelementStart(101, "span");
            i0.ɵɵtext(102, "\u2192");
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind2(4, 27, "AUJOURD\u2019HUI", "TODAY"), " \u00B7 ", i0.ɵɵpipeBind4(5, 30, ctx.today, "dd MMMM yyyy", "", ctx.locale));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind2(8, 35, "Bonjour", "Hello"), ", ", ctx.firstName);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(11, 38, "Voici les informations utiles de votre espace de travail.", "Here is the useful information from your workspace."));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.auth.hasRole("USER", "ADMIN"));
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(20, 41, "Salles r\u00E9f\u00E9renc\u00E9es", "Listed rooms"));
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(25, 44, "3 b\u00E2timents ETI", "3 ETI buildings"));
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.auth.hasRole("USER") ? i0.ɵɵpipeBind2(32, 47, "Mes demandes", "My requests") : i0.ɵɵpipeBind2(33, 50, "File de validation", "Approval queue"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.items.length);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(38, 53, "Donn\u00E9es actualis\u00E9es", "Updated data"));
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(45, 56, "En attente", "Pending"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.pending);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(50, 59, "Action ou suivi requis", "Action or follow-up required"));
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(57, 62, "Confirm\u00E9es", "Confirmed"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.confirmed);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(62, 65, "R\u00E9servations actives", "Active reservations"));
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(69, 68, "Activit\u00E9 r\u00E9cente", "Recent activity"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(72, 71, "Derni\u00E8res demandes accessibles", "Latest available requests"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("routerLink", ctx.auth.hasRole("USER") ? "/mes-demandes" : "/notifications");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(75, 74, "Voir tout", "View all"), " \u2192");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.loading ? 76 : !ctx.items.length ? 77 : 78);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(84, 77, "Acc\u00E8s rapides", "Quick access"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(87, 80, "Actions fr\u00E9quentes", "Frequent actions"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(90, 83, "Consulter les 14 salles", "Browse the 14 rooms"), " ");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(95, 86, "Ouvrir le planning", "Open schedule"), " ");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(100, 89, "Voir mes notifications", "View my notifications"), " ");
        } }, dependencies: [CommonModule, i1.NgIf, RouterLink, i1.DatePipe, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HomeComponent, [{
        type: Component,
        args: [{ standalone: true, imports: [CommonModule, RouterLink, TranslatePipe], template: `
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
</article><article class="panel quick"><div class="panel-head"><div><h2>{{'Accès rapides'|tr:'Quick access'}}</h2><p>{{'Actions fréquentes'|tr:'Frequent actions'}}</p></div></div><a routerLink="/salles">{{'Consulter les 14 salles'|tr:'Browse the 14 rooms'}} <span>→</span></a><a routerLink="/planning">{{'Ouvrir le planning'|tr:'Open schedule'}} <span>→</span></a><a routerLink="/notifications">{{'Voir mes notifications'|tr:'View my notifications'}} <span>→</span></a></article></section>` }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "frontend/src/app/pages/general-pages.component.ts", lineNumber: 22 }); })();
export class PlanningComponent {
    language = inject(LanguageService);
    get days() { const english = this.language.current() === 'en'; return [{ key: 'MON', label: english ? 'Mon' : 'Lun' }, { key: 'TUE', label: english ? 'Tue' : 'Mar' }, { key: 'WED', label: english ? 'Wed' : 'Mer' }, { key: 'THU', label: english ? 'Thu' : 'Jeu' }, { key: 'FRI', label: english ? 'Fri' : 'Ven' }]; }
    times = ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];
    static ɵfac = function PlanningComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PlanningComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PlanningComponent, selectors: [["ng-component"]], decls: 28, vars: 24, consts: [[1, "page-head"], [1, "eyebrow"], [1, "panel"], [1, "calendar-head"], [1, "btn", "secondary"], [1, "calendar-grid"], [1, "calendar-time"], [1, "calendar-day"], [1, "calendar-slot", 3, "busy"], [1, "calendar-slot"], [4, "ngIf"]], template: function PlanningComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "header", 0)(1, "div")(2, "p", 1);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1");
            i0.ɵɵtext(6);
            i0.ɵɵpipe(7, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "p");
            i0.ɵɵtext(9);
            i0.ɵɵpipe(10, "tr");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(11, "section", 2)(12, "div", 3)(13, "button", 4);
            i0.ɵɵtext(14);
            i0.ɵɵpipe(15, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "h2");
            i0.ɵɵtext(17);
            i0.ɵɵpipe(18, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "button", 4);
            i0.ɵɵtext(20);
            i0.ɵɵpipe(21, "tr");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(22, "div", 5);
            i0.ɵɵelement(23, "div", 6);
            i0.ɵɵrepeaterCreate(24, PlanningComponent_For_25_Template, 6, 5, "div", 7, _forTrack1);
            i0.ɵɵrepeaterCreate(26, PlanningComponent_For_27_Template, 4, 1, null, null, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(4, 6, "CALENDRIER PARTAG\u00C9", "SHARED CALENDAR"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(7, 9, "Planning des salles", "Room schedule"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(10, 12, "Vue non confidentielle des cr\u00E9neaux confirm\u00E9s.", "Non-confidential view of confirmed time slots."));
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1("\u2190 ", i0.ɵɵpipeBind2(15, 15, "Semaine pr\u00E9c\u00E9dente", "Previous week"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(18, 18, "Semaine en cours", "Current week"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(21, 21, "Semaine suivante", "Next week"), " \u2192");
            i0.ɵɵadvance(4);
            i0.ɵɵrepeater(ctx.days);
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.times);
        } }, dependencies: [CommonModule, i1.NgIf, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PlanningComponent, [{
        type: Component,
        args: [{ standalone: true, imports: [CommonModule, TranslatePipe], template: `<header class="page-head"><div><p class="eyebrow">{{'CALENDRIER PARTAGÉ'|tr:'SHARED CALENDAR'}}</p><h1>{{'Planning des salles'|tr:'Room schedule'}}</h1><p>{{'Vue non confidentielle des créneaux confirmés.'|tr:'Non-confidential view of confirmed time slots.'}}</p></div></header><section class="panel"><div class="calendar-head"><button class="btn secondary">← {{'Semaine précédente'|tr:'Previous week'}}</button><h2>{{'Semaine en cours'|tr:'Current week'}}</h2><button class="btn secondary">{{'Semaine suivante'|tr:'Next week'}} →</button></div><div class="calendar-grid"><div class="calendar-time"></div>@for(d of days;track d.key){<div class="calendar-day"><b>{{d.label}}</b><small>{{'Journée'|tr:'Day'}}</small></div>}@for(t of times;track t){<div class="calendar-time">{{t}}</div>@for(d of days;track d.key){<div class="calendar-slot" [class.busy]="(t==='09:00'&&d.key==='MON')||(t==='14:00'&&d.key==='WED')"><span *ngIf="(t==='09:00'&&d.key==='MON')">{{'Réunion confirmée'|tr:'Confirmed meeting'}}</span><span *ngIf="(t==='14:00'&&d.key==='WED')">{{'Créneau occupé'|tr:'Occupied slot'}}</span></div>}}</div></section>` }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PlanningComponent, { className: "PlanningComponent", filePath: "frontend/src/app/pages/general-pages.component.ts", lineNumber: 31 }); })();
export class ErrorPageComponent {
    route = inject(ActivatedRoute);
    language = inject(LanguageService);
    auth = inject(AuthService);
    code = this.route.snapshot.data['code'];
    get title() { return this.code === '403' ? this.language.text('Accès refusé', 'Access denied') : this.language.text('Page introuvable', 'Page not found'); }
    get message() { return this.code === '403' ? this.language.text('Vous ne disposez pas des droits nécessaires pour consulter cette page.', 'You do not have permission to view this page.') : this.language.text('La page demandée n’existe pas ou a été déplacée.', 'The requested page does not exist or has been moved.'); }
    get homePath() { return this.auth.hasRole('ADMIN') ? '/tableau-de-bord' : '/accueil'; }
    static ɵfac = function ErrorPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ErrorPageComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ErrorPageComponent, selectors: [["ng-component"]], decls: 10, vars: 8, consts: [[1, "error-page"], [1, "btn", "primary", 3, "routerLink"]], template: function ErrorPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "strong");
            i0.ɵɵtext(2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "h1");
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p");
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "a", 1);
            i0.ɵɵtext(8);
            i0.ɵɵpipe(9, "tr");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.code);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.title);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.message);
            i0.ɵɵadvance();
            i0.ɵɵproperty("routerLink", ctx.homePath);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(9, 5, "Retour \u00E0 l\u2019accueil", "Back to home"));
        } }, dependencies: [RouterLink, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ErrorPageComponent, [{
        type: Component,
        args: [{ standalone: true, imports: [RouterLink, TranslatePipe], template: `<section class="error-page"><strong>{{code}}</strong><h1>{{title}}</h1><p>{{message}}</p><a class="btn primary" [routerLink]="homePath">{{'Retour à l’accueil'|tr:'Back to home'}}</a></section>` }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ErrorPageComponent, { className: "ErrorPageComponent", filePath: "frontend/src/app/pages/general-pages.component.ts", lineNumber: 34 }); })();
//# sourceMappingURL=general-pages.component.js.map