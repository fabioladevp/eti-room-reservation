import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../core/api.service';
import { AuthService } from '../core/auth.service';
import { LanguageService } from '../core/language.service';
import { TranslatePipe } from '../core/translate.pipe';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _c0 = () => ["CANCELLED", "COMPLETED"];
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.roomId;
function RequestsComponent_For_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 8);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("value", s_r1);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.label(s_r1));
} }
function RequestsComponent_Conditional_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "tr");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, "Chargement des demandes\u2026", "Loading requests\u2026"));
} }
function RequestsComponent_Conditional_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.error);
} }
function RequestsComponent_Conditional_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12)(1, "b");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "tr");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(3, 2, "Aucune demande trouv\u00E9e", "No request found"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 5, "Les demandes soumises appara\u00EEtront ici.", "Submitted requests will appear here."));
} }
function RequestsComponent_Conditional_43_th_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "tr");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, "Demandeur", "Requester"));
} }
function RequestsComponent_Conditional_43_For_29_td_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const r_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(r_r3.requesterName);
} }
function RequestsComponent_Conditional_43_For_29_button_25_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 24);
    i0.ɵɵlistener("click", function RequestsComponent_Conditional_43_For_29_button_25_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const r_r3 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.check(r_r3)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "tr");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, "V\u00E9rifier", "Check"));
} }
function RequestsComponent_Conditional_43_For_29_button_26_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 25);
    i0.ɵɵlistener("click", function RequestsComponent_Conditional_43_For_29_button_26_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const r_r3 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.confirm(r_r3)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "tr");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, "Confirmer", "Confirm"));
} }
function RequestsComponent_Conditional_43_For_29_button_27_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 26);
    i0.ɵɵlistener("click", function RequestsComponent_Conditional_43_For_29_button_27_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r6); const r_r3 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.cancel(r_r3)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "tr");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, "Annuler", "Cancel"));
} }
function RequestsComponent_Conditional_43_For_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "b", 17);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td")(5, "b");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "small");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(9, RequestsComponent_Conditional_43_For_29_td_9_Template, 2, 1, "td", 16);
    i0.ɵɵelementStart(10, "td");
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "date");
    i0.ɵɵelementStart(13, "small");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "td", 18);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "td");
    i0.ɵɵtext(18);
    i0.ɵɵpipe(19, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "td")(21, "span", 19);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "td")(24, "div", 20);
    i0.ɵɵtemplate(25, RequestsComponent_Conditional_43_For_29_button_25_Template, 3, 4, "button", 21)(26, RequestsComponent_Conditional_43_For_29_button_26_Template, 3, 4, "button", 22)(27, RequestsComponent_Conditional_43_For_29_button_27_Template, 3, 4, "button", 23);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const r_r3 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(r_r3.reference);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(r_r3.subject);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.layout(r_r3.layout));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.admin);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(12, 15, r_r3.startDate, "dd/MM/yyyy"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate3("", r_r3.startTime.slice(0, 5), "\u2013", r_r3.endTime.slice(0, 5), " \u00B7 ", r_r3.occurrences.length, " occ.");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(r_r3.participantCount);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((r_r3.assignedRoom == null ? null : r_r3.assignedRoom.name) || i0.ɵɵpipeBind2(19, 18, "\u00C0 assigner", "To assign"));
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("data-status", r_r3.status);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.label(r_r3.status));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r1.admin && ctx_r1.assignable(r_r3));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.admin && ctx_r1.canConfirm(r_r3));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !i0.ɵɵpureFunction0(21, _c0).includes(r_r3.status));
} }
function RequestsComponent_Conditional_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 13)(1, "div", 15)(2, "table")(3, "thead")(4, "tr")(5, "th");
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th");
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(11, RequestsComponent_Conditional_43_th_11_Template, 3, 4, "th", 16);
    i0.ɵɵelementStart(12, "th");
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th");
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "th");
    i0.ɵɵtext(19);
    i0.ɵɵpipe(20, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "th");
    i0.ɵɵtext(22);
    i0.ɵɵpipe(23, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "th");
    i0.ɵɵtext(25);
    i0.ɵɵpipe(26, "tr");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(27, "tbody");
    i0.ɵɵrepeaterCreate(28, RequestsComponent_Conditional_43_For_29_Template, 28, 22, "tr", null, _forTrack0);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(7, 8, "R\u00E9f\u00E9rence", "Reference"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(10, 11, "Objet", "Subject"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.admin);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(14, 14, "P\u00E9riode", "Period"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(17, 17, "Participants", "Participants"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(20, 20, "Salle", "Room"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(23, 23, "Statut", "Status"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(26, 26, "Actions", "Actions"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.filtered);
} }
function RequestsComponent_Conditional_44_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 32);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "tr");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, "Calcul de compatibilit\u00E9 c\u00F4t\u00E9 serveur\u2026", "Checking compatibility on the server\u2026"));
} }
function RequestsComponent_Conditional_44_Conditional_16_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article")(1, "div")(2, "span", 37);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "b");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "small");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "button", 38);
    i0.ɵɵlistener("click", function RequestsComponent_Conditional_44_Conditional_16_For_2_Template_button_click_9_listener() { const c_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.assign(c_r9)); });
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "tr");
    i0.ɵɵpipe(12, "tr");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const c_r9 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("compatible", c_r9.compatible);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(c_r9.compatible ? "\u2713" : "!");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(c_r9.roomName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(c_r9.compatible ? ctx_r1.language.text("Compatible avec toutes les occurrences", "Compatible with all occurrences") : ctx_r1.compatibilityReasons(c_r9));
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !c_r9.compatible || ctx_r1.assigning);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.assigning ? i0.ɵɵpipeBind2(11, 7, "Assignation\u2026", "Assigning\u2026") : i0.ɵɵpipeBind2(12, 10, "Assigner", "Assign"));
} }
function RequestsComponent_Conditional_44_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33);
    i0.ɵɵrepeaterCreate(1, RequestsComponent_Conditional_44_Conditional_16_For_2_Template, 13, 13, "article", 36, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.compat);
} }
function RequestsComponent_Conditional_44_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.modalError);
} }
function RequestsComponent_Conditional_44_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 27);
    i0.ɵɵlistener("click", function RequestsComponent_Conditional_44_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵelementStart(1, "section", 28);
    i0.ɵɵlistener("click", function RequestsComponent_Conditional_44_Template_section_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "div", 29)(3, "div")(4, "p", 1);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "h2", 30);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p");
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "tr");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "button", 31);
    i0.ɵɵpipe(13, "tr");
    i0.ɵɵlistener("click", function RequestsComponent_Conditional_44_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵtext(14, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(15, RequestsComponent_Conditional_44_Conditional_15_Template, 3, 4, "div", 32)(16, RequestsComponent_Conditional_44_Conditional_16_Template, 3, 0, "div", 33);
    i0.ɵɵconditionalCreate(17, RequestsComponent_Conditional_44_Conditional_17_Template, 2, 1, "div", 11);
    i0.ɵɵelementStart(18, "div", 34)(19, "span");
    i0.ɵɵtext(20);
    i0.ɵɵpipe(21, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "button", 35);
    i0.ɵɵlistener("click", function RequestsComponent_Conditional_44_Template_button_click_22_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.check(ctx_r1.selected)); });
    i0.ɵɵtext(23);
    i0.ɵɵpipe(24, "tr");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 13, "V\u00C9RIFICATION TEMPS R\u00C9EL", "REAL-TIME CHECK"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", ctx_r1.selected.reference, " \u00B7 ", ctx_r1.selected.subject);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate4("", ctx_r1.selected.participantCount, " participants \u00B7 ", ctx_r1.layout(ctx_r1.selected.layout), " \u00B7 ", ctx_r1.selected.occurrences.length, " ", i0.ɵɵpipeBind2(11, 16, "occurrence(s)", "occurrence(s)"));
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind2(13, 19, "Fermer", "Close"));
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.checking ? 15 : 16);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.modalError ? 17 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", ctx_r1.compat.length, " ", i0.ɵɵpipeBind2(21, 22, "salles analys\u00E9es", "rooms analyzed"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(24, 25, "Recalculer", "Recalculate"));
} }
function ValidationQueueComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "tr");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, "Chargement\u2026", "Loading\u2026"));
} }
function ValidationQueueComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3)(1, "b");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "tr");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(3, 2, "Aucune validation en attente", "No pending approval"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 5, "La file est \u00E0 jour.", "The queue is up to date."));
} }
function ValidationQueueComponent_Conditional_12_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 6)(1, "div", 7)(2, "span", 8);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "b");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "h2");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "dl")(11, "div")(12, "dt");
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "dd");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "div")(18, "dt");
    i0.ɵɵtext(19, "Participants");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "dd");
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "div")(23, "dt");
    i0.ɵɵtext(24);
    i0.ɵɵpipe(25, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "dd");
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "div")(29, "dt");
    i0.ɵɵtext(30);
    i0.ɵɵpipe(31, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "dd");
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(34, "div", 9)(35, "b");
    i0.ɵɵtext(36);
    i0.ɵɵpipe(37, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "p");
    i0.ɵɵtext(39);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(40, "label");
    i0.ɵɵtext(41);
    i0.ɵɵpipe(42, "tr");
    i0.ɵɵelementStart(43, "textarea", 10);
    i0.ɵɵpipe(44, "tr");
    i0.ɵɵtwoWayListener("ngModelChange", function ValidationQueueComponent_Conditional_12_For_2_Template_textarea_ngModelChange_43_listener($event) { const r_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r2.notes[r_r2.id], $event) || (ctx_r2.notes[r_r2.id] = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(45, "div", 11)(46, "button", 12);
    i0.ɵɵlistener("click", function ValidationQueueComponent_Conditional_12_For_2_Template_button_click_46_listener() { const r_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.decide(r_r2, false)); });
    i0.ɵɵtext(47);
    i0.ɵɵpipe(48, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "button", 13);
    i0.ɵɵlistener("click", function ValidationQueueComponent_Conditional_12_For_2_Template_button_click_49_listener() { const r_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.decide(r_r2, true)); });
    i0.ɵɵtext(50);
    i0.ɵɵpipe(51, "tr");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const r_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-status", r_r2.priority);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(r_r2.priority);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(r_r2.reference);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(r_r2.subject);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(r_r2.description || ctx_r2.language.text("Aucune description compl\u00E9mentaire.", "No additional description."));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(14, 19, "Salle", "Room"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(r_r2.assignedRoom == null ? null : r_r2.assignedRoom.name);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(r_r2.participantCount);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(25, 22, "Disposition", "Layout"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(r_r2.layout);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(31, 25, "Occurrences", "Occurrences"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(r_r2.occurrences.length);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(37, 28, "Besoins \u00E0 v\u00E9rifier", "Requirements to check"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.scope === "facility" ? r_r2.physicalNeeds || ctx_r2.language.text("Disposition standard", "Standard layout") : r_r2.technicalNeeds || ctx_r2.language.text("Aucun besoin technique sp\u00E9cifique", "No specific technical requirement"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(42, 31, "Justification / commentaire", "Reason / comment"));
    i0.ɵɵadvance(2);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.notes[r_r2.id]);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind2(44, 34, "Obligatoire en cas de rejet", "Required when rejecting"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(48, 37, "Rejeter", "Reject"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(51, 40, "Valider", "Approve"));
} }
function ValidationQueueComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 4);
    i0.ɵɵrepeaterCreate(1, ValidationQueueComponent_Conditional_12_For_2_Template, 52, 43, "article", 6, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r2.items);
} }
function ValidationQueueComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.message);
} }
export class RequestsComponent {
    api = inject(ApiService);
    auth = inject(AuthService);
    language = inject(LanguageService);
    admin = this.auth.hasRole('ADMIN');
    items = [];
    loading = true;
    error = '';
    q = '';
    status = '';
    selected = null;
    compat = [];
    checking = false;
    assigning = false;
    modalError = '';
    statuses = ['SUBMITTED', 'PENDING_FACILITY', 'PENDING_IT', 'CONFIRMED', 'REJECTED_FACILITY', 'REJECTED_IT', 'CANCELLED', 'COMPLETED'];
    ngOnInit() { this.load(); }
    load() { this.loading = true; (this.admin ? this.api.allRequests() : this.api.mine()).subscribe({ next: r => { this.items = r; this.loading = false; }, error: e => { this.loading = false; this.error = this.language.server(e.error?.message) || this.language.text('Impossible de charger les demandes.', 'Unable to load requests.'); } }); }
    get filtered() { const q = this.q.toLowerCase(); return this.items.filter(r => (!q || `${r.reference} ${r.subject} ${r.requesterName}`.toLowerCase().includes(q)) && (!this.status || r.status === this.status)); }
    check(r) { this.selected = r; this.checking = true; this.modalError = ''; this.api.compatibility(r.id).subscribe({ next: c => { this.compat = c; this.checking = false; }, error: e => { this.checking = false; this.modalError = this.language.server(e.error?.message) || this.language.text('Vérification impossible.', 'Unable to check compatibility.'); } }); }
    assign(c) { if (!this.selected)
        return; this.assigning = true; this.api.assign(this.selected.id, c.roomId).subscribe({ next: r => { this.assigning = false; this.items = this.items.map(x => x.id === r.id ? r : x); this.close(); }, error: e => { this.assigning = false; this.modalError = this.language.server(e.error?.message) || this.language.text('Assignation impossible.', 'Unable to assign room.'); } }); }
    confirm(r) { this.api.confirm(r.id).subscribe({ next: x => this.items = this.items.map(i => i.id === x.id ? x : i), error: e => alert(this.language.server(e.error?.message) || this.language.text('Confirmation impossible', 'Unable to confirm')) }); }
    cancel(r) { const reason = prompt(this.language.text('Motif d’annulation obligatoire :', 'Cancellation reason (required):')); if (!reason?.trim())
        return; this.api.cancel(r.id, reason).subscribe({ next: x => this.items = this.items.map(i => i.id === x.id ? x : i), error: e => alert(this.language.server(e.error?.message) || this.language.text('Annulation impossible', 'Unable to cancel')) }); }
    compatibilityReasons(c) { return c.reasons.map(reason => this.language.server(reason)).join(' · '); }
    close() { this.selected = null; this.compat = []; this.modalError = ''; }
    assignable(r) { return ['SUBMITTED', 'TO_REASSIGN', 'REJECTED_FACILITY', 'REJECTED_IT'].includes(r.status); }
    canConfirm(r) { return r.facilityValidated === true && r.itValidated === true && r.status !== 'CONFIRMED'; }
    label(s) { const labels = { SUBMITTED: ['Soumise', 'Submitted'], PENDING_FACILITY: ['En attente Facility', 'Pending Facility'], PENDING_IT: ['En attente IT', 'Pending IT'], CONFIRMED: ['Confirmée', 'Confirmed'], REJECTED_FACILITY: ['Rejetée par Facility', 'Rejected by Facility'], REJECTED_IT: ['Rejetée par IT', 'Rejected by IT'], CANCELLED: ['Annulée', 'Cancelled'], COMPLETED: ['Terminée', 'Completed'], TO_REASSIGN: ['À réassigner', 'To reassign'] }; return labels[s] ? this.language.text(...labels[s]) : s.replaceAll('_', ' '); }
    layout(s) { const labels = { BOARDROOM: ['Conseil', 'Boardroom'], U_SHAPE: ['Forme en U', 'U-shape'], CLASSROOM: ['Classe', 'Classroom'], THEATRE: ['Théâtre', 'Theatre'], COCKTAIL: ['Cocktail', 'Cocktail'] }; return labels[s] ? this.language.text(...labels[s]) : s; }
    static ɵfac = function RequestsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RequestsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RequestsComponent, selectors: [["ng-component"]], decls: 45, vars: 50, consts: [[1, "page-head"], [1, "eyebrow"], ["routerLink", "/nouvelle-demande", 1, "btn", "primary"], [1, "filter-panel", "compact"], [1, "search-field"], [3, "ngModelChange", "ngModel", "placeholder"], [3, "ngModelChange", "ngModel"], ["value", ""], [3, "value"], [1, "filter-summary"], [1, "panel", "loading"], [1, "alert", "error"], [1, "panel", "empty"], [1, "panel", "table-panel"], [1, "modal-backdrop"], [1, "table-scroll"], [4, "ngIf"], [1, "ref"], [1, "center"], [1, "badge"], [1, "actions"], ["class", "btn tiny", 3, "click", 4, "ngIf"], ["class", "btn tiny success-btn", 3, "click", 4, "ngIf"], ["class", "btn tiny danger-btn", 3, "click", 4, "ngIf"], [1, "btn", "tiny", 3, "click"], [1, "btn", "tiny", "success-btn", 3, "click"], [1, "btn", "tiny", "danger-btn", 3, "click"], [1, "modal-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "compat-title", 1, "modal", "large", 3, "click"], [1, "modal-head"], ["id", "compat-title"], [1, "icon-btn", "dark", 3, "click"], [1, "loading"], [1, "compat-list"], [1, "modal-foot"], [1, "btn", "secondary", 3, "click"], [3, "compatible"], [1, "compat-icon"], [1, "btn", "tiny", "primary", 3, "click", "disabled"]], template: function RequestsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "header", 0)(1, "div")(2, "p", 1);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "tr");
            i0.ɵɵpipe(5, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "h1");
            i0.ɵɵtext(7);
            i0.ɵɵpipe(8, "tr");
            i0.ɵɵpipe(9, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "p");
            i0.ɵɵtext(11);
            i0.ɵɵpipe(12, "tr");
            i0.ɵɵpipe(13, "tr");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "a", 2);
            i0.ɵɵtext(15);
            i0.ɵɵpipe(16, "tr");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "section", 3)(18, "label", 4)(19, "span");
            i0.ɵɵtext(20);
            i0.ɵɵpipe(21, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "input", 5);
            i0.ɵɵpipe(23, "tr");
            i0.ɵɵtwoWayListener("ngModelChange", function RequestsComponent_Template_input_ngModelChange_22_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.q, $event) || (ctx.q = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(24, "label")(25, "span");
            i0.ɵɵtext(26);
            i0.ɵɵpipe(27, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "select", 6);
            i0.ɵɵtwoWayListener("ngModelChange", function RequestsComponent_Template_select_ngModelChange_28_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.status, $event) || (ctx.status = $event); return $event; });
            i0.ɵɵelementStart(29, "option", 7);
            i0.ɵɵtext(30);
            i0.ɵɵpipe(31, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(32, RequestsComponent_For_33_Template, 2, 2, "option", 8, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(34, "div", 9)(35, "b");
            i0.ɵɵtext(36);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "small");
            i0.ɵɵtext(38);
            i0.ɵɵpipe(39, "tr");
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(40, RequestsComponent_Conditional_40_Template, 3, 4, "div", 10)(41, RequestsComponent_Conditional_41_Template, 2, 1, "div", 11)(42, RequestsComponent_Conditional_42_Template, 7, 8, "div", 12)(43, RequestsComponent_Conditional_43_Template, 30, 29, "section", 13);
            i0.ɵɵconditionalCreate(44, RequestsComponent_Conditional_44_Template, 25, 28, "div", 14);
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.admin ? i0.ɵɵpipeBind2(4, 14, "ADMINISTRATION", "ADMINISTRATION") : i0.ɵɵpipeBind2(5, 17, "SUIVI PERSONNEL", "PERSONAL TRACKING"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.admin ? i0.ɵɵpipeBind2(8, 20, "Demandes et assignations", "Requests and assignments") : i0.ɵɵpipeBind2(9, 23, "Mes demandes", "My requests"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.admin ? i0.ɵɵpipeBind2(12, 26, "V\u00E9rifiez la compatibilit\u00E9 des 14 salles avant toute assignation.", "Check all 14 rooms for compatibility before assigning.") : i0.ɵɵpipeBind2(13, 29, "Consultez l\u2019\u00E9tat, les occurrences et la salle assign\u00E9e.", "View the status, occurrences and assigned room."));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("\uFF0B ", i0.ɵɵpipeBind2(16, 32, "Nouvelle demande", "New request"));
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(21, 35, "Rechercher", "Search"));
            i0.ɵɵadvance(2);
            i0.ɵɵtwoWayProperty("ngModel", ctx.q);
            i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind2(23, 38, "R\u00E9f\u00E9rence, objet, demandeur", "Reference, subject, requester"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(27, 41, "Statut", "Status"));
            i0.ɵɵadvance(2);
            i0.ɵɵtwoWayProperty("ngModel", ctx.status);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(31, 44, "Tous les statuts", "All statuses"));
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.statuses);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.filtered.length);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(39, 47, "demande(s)", "request(s)"));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.loading ? 40 : ctx.error ? 41 : !ctx.filtered.length ? 42 : 43);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.selected ? 44 : -1);
        } }, dependencies: [CommonModule, i1.NgIf, FormsModule, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgModel, RouterLink, i1.DatePipe, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RequestsComponent, [{
        type: Component,
        args: [{ standalone: true, imports: [CommonModule, FormsModule, RouterLink, TranslatePipe], template: `
<header class="page-head"><div><p class="eyebrow">{{admin?('ADMINISTRATION'|tr:'ADMINISTRATION'):('SUIVI PERSONNEL'|tr:'PERSONAL TRACKING')}}</p><h1>{{admin?('Demandes et assignations'|tr:'Requests and assignments'):('Mes demandes'|tr:'My requests')}}</h1><p>{{admin?('Vérifiez la compatibilité des 14 salles avant toute assignation.'|tr:'Check all 14 rooms for compatibility before assigning.'):('Consultez l’état, les occurrences et la salle assignée.'|tr:'View the status, occurrences and assigned room.')}}</p></div><a class="btn primary" routerLink="/nouvelle-demande">＋ {{'Nouvelle demande'|tr:'New request'}}</a></header>
<section class="filter-panel compact"><label class="search-field"><span>{{'Rechercher'|tr:'Search'}}</span><input [(ngModel)]="q" [placeholder]="'Référence, objet, demandeur'|tr:'Reference, subject, requester'"></label><label><span>{{'Statut'|tr:'Status'}}</span><select [(ngModel)]="status"><option value="">{{'Tous les statuts'|tr:'All statuses'}}</option>@for(s of statuses;track s){<option [value]="s">{{label(s)}}</option>}</select></label><div class="filter-summary"><b>{{filtered.length}}</b><small>{{'demande(s)'|tr:'request(s)'}}</small></div></section>
@if(loading){<div class="panel loading">{{'Chargement des demandes…'|tr:'Loading requests…'}}</div>}@else if(error){<div class="alert error">{{error}}</div>}@else if(!filtered.length){<div class="panel empty"><b>{{'Aucune demande trouvée'|tr:'No request found'}}</b><p>{{'Les demandes soumises apparaîtront ici.'|tr:'Submitted requests will appear here.'}}</p></div>}@else{
<section class="panel table-panel"><div class="table-scroll"><table><thead><tr><th>{{'Référence'|tr:'Reference'}}</th><th>{{'Objet'|tr:'Subject'}}</th><th *ngIf="admin">{{'Demandeur'|tr:'Requester'}}</th><th>{{'Période'|tr:'Period'}}</th><th>{{'Participants'|tr:'Participants'}}</th><th>{{'Salle'|tr:'Room'}}</th><th>{{'Statut'|tr:'Status'}}</th><th>{{'Actions'|tr:'Actions'}}</th></tr></thead><tbody>@for(r of filtered;track r.id){<tr><td><b class="ref">{{r.reference}}</b></td><td><b>{{r.subject}}</b><small>{{layout(r.layout)}}</small></td><td *ngIf="admin">{{r.requesterName}}</td><td>{{r.startDate|date:'dd/MM/yyyy'}}<small>{{r.startTime.slice(0,5)}}–{{r.endTime.slice(0,5)}} · {{r.occurrences.length}} occ.</small></td><td class="center">{{r.participantCount}}</td><td>{{r.assignedRoom?.name||('À assigner'|tr:'To assign')}}</td><td><span class="badge" [attr.data-status]="r.status">{{label(r.status)}}</span></td><td><div class="actions"><button *ngIf="admin&&assignable(r)" class="btn tiny" (click)="check(r)">{{'Vérifier'|tr:'Check'}}</button><button *ngIf="admin&&canConfirm(r)" class="btn tiny success-btn" (click)="confirm(r)">{{'Confirmer'|tr:'Confirm'}}</button><button *ngIf="!['CANCELLED','COMPLETED'].includes(r.status)" class="btn tiny danger-btn" (click)="cancel(r)">{{'Annuler'|tr:'Cancel'}}</button></div></td></tr>}</tbody></table></div></section>}
@if(selected){<div class="modal-backdrop" (click)="close()"><section class="modal large" (click)="$event.stopPropagation()" role="dialog" aria-modal="true" aria-labelledby="compat-title"><div class="modal-head"><div><p class="eyebrow">{{'VÉRIFICATION TEMPS RÉEL'|tr:'REAL-TIME CHECK'}}</p><h2 id="compat-title">{{selected.reference}} · {{selected.subject}}</h2><p>{{selected.participantCount}} participants · {{layout(selected.layout)}} · {{selected.occurrences.length}} {{'occurrence(s)'|tr:'occurrence(s)'}}</p></div><button class="icon-btn dark" (click)="close()" [attr.aria-label]="'Fermer'|tr:'Close'">×</button></div>
  @if(checking){<div class="loading">{{'Calcul de compatibilité côté serveur…'|tr:'Checking compatibility on the server…'}}</div>}@else{<div class="compat-list">@for(c of compat;track c.roomId){<article [class.compatible]="c.compatible"><div><span class="compat-icon">{{c.compatible?'✓':'!'}}</span><div><b>{{c.roomName}}</b><small>{{c.compatible?language.text('Compatible avec toutes les occurrences','Compatible with all occurrences'):compatibilityReasons(c)}}</small></div></div><button class="btn tiny primary" [disabled]="!c.compatible||assigning" (click)="assign(c)">{{assigning?('Assignation…'|tr:'Assigning…'):('Assigner'|tr:'Assign')}}</button></article>}</div>}
  @if(modalError){<div class="alert error">{{modalError}}</div>}<div class="modal-foot"><span>{{compat.length}} {{'salles analysées'|tr:'rooms analyzed'}}</span><button class="btn secondary" (click)="check(selected)">{{'Recalculer'|tr:'Recalculate'}}</button></div></section></div>}
` }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(RequestsComponent, { className: "RequestsComponent", filePath: "frontend/src/app/pages/requests.component.ts", lineNumber: 20 }); })();
export class ValidationQueueComponent {
    api = inject(ApiService);
    route = inject(ActivatedRoute);
    language = inject(LanguageService);
    scope = this.route.snapshot.data['scope'];
    items = [];
    loading = true;
    notes = {};
    message = '';
    ngOnInit() { this.load(); }
    load() { const source = this.scope === 'facility' ? this.api.facilityQueue() : this.api.itQueue(); source.subscribe({ next: r => { this.items = r; this.loading = false; }, error: () => this.loading = false }); }
    decide(r, approved) { const note = this.notes[r.id] ?? ''; if (!approved && !note.trim()) {
        this.message = this.language.text('Une justification est obligatoire en cas de rejet.', 'A reason is required when rejecting.');
        setTimeout(() => this.message = '', 3000);
        return;
    } this.api.decision(this.scope, r.id, approved, note).subscribe({ next: () => { this.items = this.items.filter(x => x.id !== r.id); this.message = approved ? this.language.text('Validation enregistrée.', 'Approval recorded.') : this.language.text('Rejet enregistré et notifié.', 'Rejection recorded and notified.'); setTimeout(() => this.message = '', 3000); }, error: e => { this.message = this.language.server(e.error?.message) || this.language.text('Action impossible.', 'Unable to complete action.'); } }); }
    static ɵfac = function ValidationQueueComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ValidationQueueComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ValidationQueueComponent, selectors: [["ng-component"]], decls: 14, vars: 12, consts: [[1, "page-head"], [1, "eyebrow"], [1, "panel", "loading"], [1, "panel", "empty"], [1, "validation-grid"], [1, "toast"], [1, "panel", "validation-card"], [1, "validation-top"], [1, "badge"], [1, "needs"], ["rows", "3", 3, "ngModelChange", "ngModel", "placeholder"], [1, "form-actions"], [1, "btn", "danger-btn", 3, "click"], [1, "btn", "primary", 3, "click"]], template: function ValidationQueueComponent_Template(rf, ctx) { if (rf & 1) {
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
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(10, ValidationQueueComponent_Conditional_10_Template, 3, 4, "div", 2)(11, ValidationQueueComponent_Conditional_11_Template, 7, 8, "div", 3)(12, ValidationQueueComponent_Conditional_12_Template, 3, 0, "section", 4);
            i0.ɵɵconditionalCreate(13, ValidationQueueComponent_Conditional_13_Template, 2, 1, "div", 5);
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind2(4, 6, "VALIDATION", "APPROVAL"), " ", ctx.scope.toUpperCase());
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(7, 9, "Demandes \u00E0 contr\u00F4ler", "Requests to review"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.scope === "facility" ? ctx.language.text("V\u00E9rifiez la disposition, le mobilier, la climatisation et les besoins physiques.", "Check layout, furniture, air conditioning and physical requirements.") : ctx.language.text("V\u00E9rifiez la projection, le Wi-Fi, la sonorisation, la visioconf\u00E9rence et l\u2019interpr\u00E9tation.", "Check projection, Wi-Fi, sound, video conferencing and interpretation."));
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading ? 10 : !ctx.items.length ? 11 : 12);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.message ? 13 : -1);
        } }, dependencies: [CommonModule, FormsModule, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgModel, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ValidationQueueComponent, [{
        type: Component,
        args: [{ standalone: true, imports: [CommonModule, FormsModule, TranslatePipe], template: `
<header class="page-head"><div><p class="eyebrow">{{'VALIDATION'|tr:'APPROVAL'}} {{scope.toUpperCase()}}</p><h1>{{'Demandes à contrôler'|tr:'Requests to review'}}</h1><p>{{scope==='facility'?language.text('Vérifiez la disposition, le mobilier, la climatisation et les besoins physiques.','Check layout, furniture, air conditioning and physical requirements.'):language.text('Vérifiez la projection, le Wi-Fi, la sonorisation, la visioconférence et l’interprétation.','Check projection, Wi-Fi, sound, video conferencing and interpretation.')}}</p></div></header>
@if(loading){<div class="panel loading">{{'Chargement…'|tr:'Loading…'}}</div>}@else if(!items.length){<div class="panel empty"><b>{{'Aucune validation en attente'|tr:'No pending approval'}}</b><p>{{'La file est à jour.'|tr:'The queue is up to date.'}}</p></div>}@else{<section class="validation-grid">@for(r of items;track r.id){<article class="panel validation-card"><div class="validation-top"><span class="badge" [attr.data-status]="r.priority">{{r.priority}}</span><b>{{r.reference}}</b></div><h2>{{r.subject}}</h2><p>{{r.description||language.text('Aucune description complémentaire.','No additional description.')}}</p><dl><div><dt>{{'Salle'|tr:'Room'}}</dt><dd>{{r.assignedRoom?.name}}</dd></div><div><dt>Participants</dt><dd>{{r.participantCount}}</dd></div><div><dt>{{'Disposition'|tr:'Layout'}}</dt><dd>{{r.layout}}</dd></div><div><dt>{{'Occurrences'|tr:'Occurrences'}}</dt><dd>{{r.occurrences.length}}</dd></div></dl><div class="needs"><b>{{'Besoins à vérifier'|tr:'Requirements to check'}}</b><p>{{scope==='facility'?(r.physicalNeeds||language.text('Disposition standard','Standard layout')):(r.technicalNeeds||language.text('Aucun besoin technique spécifique','No specific technical requirement'))}}</p></div><label>{{'Justification / commentaire'|tr:'Reason / comment'}}<textarea [(ngModel)]="notes[r.id]" rows="3" [placeholder]="'Obligatoire en cas de rejet'|tr:'Required when rejecting'"></textarea></label><div class="form-actions"><button class="btn danger-btn" (click)="decide(r,false)">{{'Rejeter'|tr:'Reject'}}</button><button class="btn primary" (click)="decide(r,true)">{{'Valider'|tr:'Approve'}}</button></div></article>}</section>}
@if(message){<div class="toast">{{message}}</div>}` }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ValidationQueueComponent, { className: "ValidationQueueComponent", filePath: "frontend/src/app/pages/requests.component.ts", lineNumber: 37 }); })();
//# sourceMappingURL=requests.component.js.map