import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../core/api.service';
import { AuthService } from '../core/auth.service';
import { LanguageService } from '../core/language.service';
import { TranslatePipe } from '../core/translate.pipe';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item[0];
function DashboardComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "tr");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, "Calcul des indicateurs\u2026", "Calculating metrics\u2026"));
} }
function DashboardComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4)(1, "b");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 5);
    i0.ɵɵlistener("click", function DashboardComponent_Conditional_16_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "tr");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(3, 3, "Impossible de charger le tableau de bord.", "Unable to load the dashboard."));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.error);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(8, 6, "R\u00E9essayer", "Try again"));
} }
function DashboardComponent_Conditional_17_For_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "i");
    i0.ɵɵelement(4, "b");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "strong");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.statusLabel(item_r3[0]));
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", ctx_r1.percent(item_r3[1], ctx_r1.data.totalMeetings), "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r3[1]);
} }
function DashboardComponent_Conditional_17_For_107_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article")(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div")(4, "b");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "small");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "tr");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r4[0].slice(0, 2).toUpperCase());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r4[0]);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", item_r4[1], " ", i0.ɵɵpipeBind2(8, 4, "r\u00E9servation(s)", "booking(s)"));
} }
function DashboardComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 6)(1, "article", 7)(2, "span", 8);
    i0.ɵɵtext(3, "\u25C7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "small");
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "strong");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p");
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "tr");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "article", 7)(14, "span", 9);
    i0.ɵɵtext(15, "\u25F7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div")(17, "small");
    i0.ɵɵtext(18);
    i0.ɵɵpipe(19, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "strong");
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "p");
    i0.ɵɵtext(23);
    i0.ɵɵpipe(24, "tr");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "article", 7)(26, "span", 10);
    i0.ɵɵtext(27, "\u2261");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "div")(29, "small");
    i0.ɵɵtext(30);
    i0.ɵɵpipe(31, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "strong");
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "p");
    i0.ɵɵtext(35);
    i0.ɵɵpipe(36, "tr");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(37, "article", 7)(38, "span", 11);
    i0.ɵɵtext(39, "\u2713");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "div")(41, "small");
    i0.ɵɵtext(42);
    i0.ɵɵpipe(43, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "strong");
    i0.ɵɵtext(45);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "p");
    i0.ɵɵtext(47);
    i0.ɵɵpipe(48, "tr");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(49, "section", 12)(50, "article", 13)(51, "div", 14)(52, "div")(53, "h2");
    i0.ɵɵtext(54);
    i0.ɵɵpipe(55, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(56, "p");
    i0.ɵɵtext(57);
    i0.ɵɵpipe(58, "tr");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(59, "div", 15);
    i0.ɵɵrepeaterCreate(60, DashboardComponent_Conditional_17_For_61_Template, 7, 4, "div", null, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(62, "article", 16)(63, "div", 14)(64, "div")(65, "h2");
    i0.ɵɵtext(66);
    i0.ɵɵpipe(67, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(68, "p");
    i0.ɵɵtext(69);
    i0.ɵɵpipe(70, "tr");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(71, "div", 17)(72, "strong");
    i0.ɵɵtext(73);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(74, "small");
    i0.ɵɵtext(75);
    i0.ɵɵpipe(76, "tr");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(77, "dl", 18)(78, "div")(79, "dt");
    i0.ɵɵtext(80);
    i0.ɵɵpipe(81, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(82, "dd");
    i0.ɵɵtext(83);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(84, "div")(85, "dt");
    i0.ɵɵtext(86);
    i0.ɵɵpipe(87, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(88, "dd");
    i0.ɵɵtext(89);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(90, "div")(91, "dt");
    i0.ɵɵtext(92);
    i0.ɵɵpipe(93, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(94, "dd");
    i0.ɵɵtext(95);
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(96, "section", 16)(97, "div", 14)(98, "div")(99, "h2");
    i0.ɵɵtext(100);
    i0.ɵɵpipe(101, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(102, "p");
    i0.ɵɵtext(103);
    i0.ɵɵpipe(104, "tr");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(105, "div", 19);
    i0.ɵɵrepeaterCreate(106, DashboardComponent_Conditional_17_For_107_Template, 9, 7, "article", null, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(7, 26, "Total r\u00E9unions", "Total meetings"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.data.totalMeetings);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(12, 29, "Donn\u00E9es en base", "Database records"));
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(19, 32, "Heures r\u00E9serv\u00E9es", "Booked hours"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.data.reservedHours);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(24, 35, "Hors annulations", "Excluding cancellations"));
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(31, 38, "Demandes en attente", "Pending requests"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.data.pendingRequests);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(36, 41, "\u00C0 traiter", "To process"));
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(43, 44, "Satisfaction moyenne", "Average satisfaction"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.data.satisfactionAverage || "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(48, 47, "Sur 5", "Out of 5"));
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(55, 50, "R\u00E9partition par statut", "Breakdown by status"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(58, 53, "Volume r\u00E9el des demandes", "Actual request volume"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.entries(ctx_r1.data.byStatus));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(67, 56, "Indicateurs cl\u00E9s", "Key metrics"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(70, 59, "Utilisation globale", "Overall usage"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", ctx_r1.data.occupancyRate, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(76, 62, "Taux d\u2019occupation estim\u00E9", "Estimated occupancy rate"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(81, 65, "Participants", "Participants"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.data.totalParticipants);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(87, 68, "Annulations", "Cancellations"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.data.cancellations);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(93, 71, "Prioritaires", "Priority requests"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.data.priorityRequests);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(101, 74, "Utilisation par b\u00E2timent", "Usage by building"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(104, 77, "R\u00E9servations avec salle assign\u00E9e", "Bookings with an assigned room"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.entries(ctx_r1.data.byBuilding));
} }
const _forTrack1 = ($index, $item) => $item.id;
function ManagementComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 8);
    i0.ɵɵlistener("click", function ManagementComponent_Conditional_9_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openEquipmentCreate()); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "tr");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\uFF0B ", i0.ɵɵpipeBind2(2, 1, "Ajouter un \u00E9quipement", "Add equipment"));
} }
function ManagementComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "tr");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, "Chargement\u2026", "Loading\u2026"));
} }
function ManagementComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.error);
} }
function ManagementComponent_Conditional_12_For_28_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "tr");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, "\u00C9quipement obligatoire", "Required equipment"));
} }
function ManagementComponent_Conditional_12_For_28_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 14);
    i0.ɵɵlistener("click", function ManagementComponent_Conditional_12_For_28_Conditional_21_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const e_r4 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.removeEquipment(e_r4)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "tr");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r4 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", ctx_r1.isProtectedEquipment(e_r4));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 2, "Supprimer", "Delete"));
} }
function ManagementComponent_Conditional_12_For_28_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "b");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(4, ManagementComponent_Conditional_12_For_28_Conditional_4_Template, 3, 4, "small");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td")(14, "span", 10);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "td")(17, "div", 11)(18, "button", 12);
    i0.ɵɵlistener("click", function ManagementComponent_Conditional_12_For_28_Template_button_click_18_listener() { const e_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.editEquipment(e_r4)); });
    i0.ɵɵtext(19);
    i0.ɵɵpipe(20, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(21, ManagementComponent_Conditional_12_For_28_Conditional_21_Template, 3, 5, "button", 13);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const e_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(e_r4.name);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.isProtectedEquipment(e_r4) ? 4 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(e_r4.code);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.equipmentType(e_r4.type));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(e_r4.totalQuantity);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(e_r4.availableQuantity);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.equipmentStatus(e_r4.status));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(20, 9, "Modifier", "Edit"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.auth.hasRole("ADMIN") ? 21 : -1);
} }
function ManagementComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 5)(1, "div", 9)(2, "table")(3, "thead")(4, "tr")(5, "th");
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th");
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "th");
    i0.ɵɵtext(15);
    i0.ɵɵpipe(16, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "th");
    i0.ɵɵtext(18);
    i0.ɵɵpipe(19, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "th");
    i0.ɵɵtext(21);
    i0.ɵɵpipe(22, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "th");
    i0.ɵɵtext(24);
    i0.ɵɵpipe(25, "tr");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(26, "tbody");
    i0.ɵɵrepeaterCreate(27, ManagementComponent_Conditional_12_For_28_Template, 22, 12, "tr", null, _forTrack1);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(7, 7, "\u00C9quipement", "Equipment"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(10, 10, "Code", "Code"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(13, 13, "Type", "Type"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(16, 16, "Stock total", "Total stock"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(19, 19, "Disponible", "Available"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(22, 22, "\u00C9tat", "Status"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(25, 25, "Actions", "Actions"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.equipments);
} }
function ManagementComponent_Conditional_13_For_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "td");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td")(7, "b");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const a_r6 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(3, 6, a_r6.createdAt, "dd/MM/yyyy HH:mm"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(a_r6.actorEmail);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(a_r6.actionType);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", a_r6.entityType, " #", a_r6.entityId);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(a_r6.details);
} }
function ManagementComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 5)(1, "div", 9)(2, "table")(3, "thead")(4, "tr")(5, "th");
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th");
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "th");
    i0.ɵɵtext(15);
    i0.ɵɵpipe(16, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "th");
    i0.ɵɵtext(18);
    i0.ɵɵpipe(19, "tr");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(20, "tbody");
    i0.ɵɵrepeaterCreate(21, ManagementComponent_Conditional_13_For_22_Template, 13, 9, "tr", null, _forTrack1);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(7, 5, "Date", "Date"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(10, 8, "Acteur", "Actor"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(13, 11, "Action", "Action"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(16, 14, "Entit\u00E9", "Entity"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(19, 17, "D\u00E9tails", "Details"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.audit);
} }
function ManagementComponent_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.message);
} }
function ManagementComponent_Conditional_15_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.equipmentError);
} }
function ManagementComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7)(1, "section", 15)(2, "header", 16)(3, "div")(4, "h2", 17);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p");
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "tr");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "button", 18);
    i0.ɵɵpipe(11, "tr");
    i0.ɵɵlistener("click", function ManagementComponent_Conditional_15_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeEquipmentCreate()); });
    i0.ɵɵtext(12, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "form", 19);
    i0.ɵɵlistener("ngSubmit", function ManagementComponent_Conditional_15_Template_form_ngSubmit_13_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.createEquipment()); });
    i0.ɵɵconditionalCreate(14, ManagementComponent_Conditional_15_Conditional_14_Template, 2, 1, "div", 4);
    i0.ɵɵelementStart(15, "div", 20)(16, "label");
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "tr");
    i0.ɵɵelement(19, "input", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "label");
    i0.ɵɵtext(21);
    i0.ɵɵpipe(22, "tr");
    i0.ɵɵelement(23, "input", 22);
    i0.ɵɵpipe(24, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "label");
    i0.ɵɵtext(26);
    i0.ɵɵpipe(27, "tr");
    i0.ɵɵelementStart(28, "select", 23)(29, "option", 24);
    i0.ɵɵtext(30);
    i0.ɵɵpipe(31, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "option", 25);
    i0.ɵɵtext(33);
    i0.ɵɵpipe(34, "tr");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(35, "label");
    i0.ɵɵtext(36);
    i0.ɵɵpipe(37, "tr");
    i0.ɵɵelementStart(38, "select", 26)(39, "option", 27);
    i0.ɵɵtext(40);
    i0.ɵɵpipe(41, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "option", 28);
    i0.ɵɵtext(43, "Maintenance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "option", 29);
    i0.ɵɵtext(45);
    i0.ɵɵpipe(46, "tr");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(47, "label");
    i0.ɵɵtext(48);
    i0.ɵɵpipe(49, "tr");
    i0.ɵɵelement(50, "input", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "label");
    i0.ɵɵtext(52);
    i0.ɵɵpipe(53, "tr");
    i0.ɵɵelement(54, "input", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "label", 32);
    i0.ɵɵelement(56, "input", 33);
    i0.ɵɵtext(57);
    i0.ɵɵpipe(58, "tr");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(59, "footer", 34)(60, "button", 35);
    i0.ɵɵlistener("click", function ManagementComponent_Conditional_15_Template_button_click_60_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeEquipmentCreate()); });
    i0.ɵɵtext(61);
    i0.ɵɵpipe(62, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "button", 36);
    i0.ɵɵtext(64);
    i0.ɵɵpipe(65, "tr");
    i0.ɵɵpipe(66, "tr");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 20, "Ajouter un \u00E9quipement", "Add equipment"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(9, 23, "Cr\u00E9ez un \u00E9quipement fixe ou mobile disponible pour les salles.", "Create fixed or mobile equipment available to rooms."));
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind2(11, 26, "Fermer", "Close"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("formGroup", ctx_r1.equipmentForm);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.equipmentError ? 14 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(18, 29, "Code unique", "Unique code"), " *");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(22, 32, "Nom", "Name"), " *");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind2(24, 35, "Ex. Cam\u00E9ra mobile", "E.g. Mobile camera"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(27, 38, "Type", "Type"), " *");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(31, 41, "Fixe", "Fixed"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(34, 44, "Mobile", "Mobile"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(37, 47, "\u00C9tat", "Status"), " *");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(41, 50, "Disponible", "Available"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(46, 53, "Bloqu\u00E9", "Blocked"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(49, 56, "Stock total", "Total stock"), " *");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(53, 59, "Quantit\u00E9 disponible", "Available quantity"), " *");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(58, 62, "\u00C9quipement actif", "Active equipment"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(62, 65, "Annuler", "Cancel"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.equipmentSaving);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.equipmentSaving ? i0.ɵɵpipeBind2(65, 68, "Cr\u00E9ation\u2026", "Creating\u2026") : i0.ɵɵpipeBind2(66, 71, "Cr\u00E9er l\u2019\u00E9quipement", "Create equipment"));
} }
function ReportsComponent_Conditional_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 6);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.message);
} }
function NotificationsComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 2);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "tr");
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, "Chargement\u2026", "Loading\u2026"));
} }
function NotificationsComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 3);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
function NotificationsComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 4)(1, "b");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "tr");
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(3, 1, "Aucune notification", "No notifications"));
} }
function NotificationsComponent_Conditional_14_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "article", 7);
    i0.ɵɵdomListener("click", function NotificationsComponent_Conditional_14_For_2_Template_article_click_0_listener() { const n_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.read(n_r3)); });
    i0.ɵɵdomElement(1, "span");
    i0.ɵɵdomElementStart(2, "div")(3, "div")(4, "b");
    i0.ɵɵtext(5);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(6, "time");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "date");
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(9, "p");
    i0.ɵɵtext(10);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(11, "small");
    i0.ɵɵtext(12);
    i0.ɵɵdomElementEnd()()();
} if (rf & 2) {
    const n_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("unread", !n_r3.read);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(n_r3.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(8, 6, n_r3.createdAt, "dd/MM/yyyy HH:mm"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(n_r3.message);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.eventLabel(n_r3.eventType));
} }
function NotificationsComponent_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "section", 5);
    i0.ɵɵrepeaterCreate(1, NotificationsComponent_Conditional_14_For_2_Template, 13, 9, "article", 6, _forTrack1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.items);
} }
export class DashboardComponent {
    api = inject(ApiService);
    language = inject(LanguageService);
    today = new Date();
    data = null;
    loading = true;
    error = '';
    get locale() { return this.language.current() === 'fr' ? 'fr' : 'en-US'; }
    ngOnInit() { this.load(); }
    load() { this.loading = true; this.error = ''; this.api.dashboard().subscribe({ next: d => { this.data = d; this.loading = false; }, error: e => { this.loading = false; this.error = this.language.server(e.error?.message) || this.language.text('Erreur du serveur.', 'Server error.'); } }); }
    entries(o) { return Object.entries(o); }
    percent(v, total) { return total ? Math.max(3, v / total * 100) : 0; }
    statusLabel(status) { const labels = { SUBMITTED: ['Soumise', 'Submitted'], PENDING_FACILITY: ['En attente Facility', 'Pending Facility'], PENDING_IT: ['En attente IT', 'Pending IT'], CONFIRMED: ['Confirmée', 'Confirmed'], CANCELLED: ['Annulée', 'Cancelled'], COMPLETED: ['Terminée', 'Completed'], REJECTED_FACILITY: ['Rejetée par Facility', 'Rejected by Facility'], REJECTED_IT: ['Rejetée par IT', 'Rejected by IT'], TO_REASSIGN: ['À réassigner', 'To reassign'] }; const value = labels[status]; return value ? this.language.text(...value) : status.replaceAll('_', ' '); }
    static ɵfac = function DashboardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DashboardComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DashboardComponent, selectors: [["ng-component"]], decls: 18, vars: 23, consts: [[1, "page-head"], [1, "eyebrow"], ["routerLink", "/nouvelle-demande", 1, "btn", "primary"], [1, "panel", "loading"], [1, "alert", "error"], ["type", "button", 1, "btn", "secondary", 3, "click"], [1, "metric-grid"], [1, "metric"], [1, "metric-icon", "teal"], [1, "metric-icon", "blue"], [1, "metric-icon", "amber"], [1, "metric-icon", "purple"], [1, "panel-grid"], [1, "panel", "span2"], [1, "panel-head"], [1, "bar-chart"], [1, "panel"], [1, "big-rate"], [1, "summary-list"], [1, "building-stats"]], template: function DashboardComponent_Template(rf, ctx) { if (rf & 1) {
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
            i0.ɵɵelementStart(12, "a", 2);
            i0.ɵɵtext(13);
            i0.ɵɵpipe(14, "tr");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(15, DashboardComponent_Conditional_15_Template, 3, 4, "div", 3)(16, DashboardComponent_Conditional_16_Template, 9, 9, "div", 4)(17, DashboardComponent_Conditional_17_Template, 108, 80);
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind2(4, 6, "AUJOURD\u2019HUI", "TODAY"), " \u00B7 ", i0.ɵɵpipeBind4(5, 9, ctx.today, "dd MMMM yyyy", "", ctx.locale));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(8, 14, "Tableau de bord", "Dashboard"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(11, 17, "Vue analytique r\u00E9serv\u00E9e aux administrateurs.", "Analytics view for administrators."));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("\uFF0B ", i0.ɵɵpipeBind2(14, 20, "Nouvelle demande", "New request"));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.loading ? 15 : ctx.error ? 16 : ctx.data ? 17 : -1);
        } }, dependencies: [CommonModule, RouterLink, i1.DatePipe, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashboardComponent, [{
        type: Component,
        args: [{ standalone: true, imports: [CommonModule, RouterLink, TranslatePipe], template: `
<header class="page-head"><div><p class="eyebrow">{{'AUJOURD’HUI'|tr:'TODAY'}} · {{today|date:'dd MMMM yyyy':'':locale}}</p><h1>{{'Tableau de bord'|tr:'Dashboard'}}</h1><p>{{'Vue analytique réservée aux administrateurs.'|tr:'Analytics view for administrators.'}}</p></div><a class="btn primary" routerLink="/nouvelle-demande">＋ {{'Nouvelle demande'|tr:'New request'}}</a></header>
@if(loading){<div class="panel loading">{{'Calcul des indicateurs…'|tr:'Calculating metrics…'}}</div>}
@else if(error){<div class="alert error"><b>{{'Impossible de charger le tableau de bord.'|tr:'Unable to load the dashboard.'}}</b><p>{{error}}</p><button class="btn secondary" type="button" (click)="load()">{{'Réessayer'|tr:'Try again'}}</button></div>}
@else if(data){
<section class="metric-grid">
  <article class="metric"><span class="metric-icon teal">◇</span><div><small>{{'Total réunions'|tr:'Total meetings'}}</small><strong>{{data.totalMeetings}}</strong><p>{{'Données en base'|tr:'Database records'}}</p></div></article>
  <article class="metric"><span class="metric-icon blue">◷</span><div><small>{{'Heures réservées'|tr:'Booked hours'}}</small><strong>{{data.reservedHours}}</strong><p>{{'Hors annulations'|tr:'Excluding cancellations'}}</p></div></article>
  <article class="metric"><span class="metric-icon amber">≡</span><div><small>{{'Demandes en attente'|tr:'Pending requests'}}</small><strong>{{data.pendingRequests}}</strong><p>{{'À traiter'|tr:'To process'}}</p></div></article>
  <article class="metric"><span class="metric-icon purple">✓</span><div><small>{{'Satisfaction moyenne'|tr:'Average satisfaction'}}</small><strong>{{data.satisfactionAverage||'—'}}</strong><p>{{'Sur 5'|tr:'Out of 5'}}</p></div></article>
</section>
<section class="panel-grid"><article class="panel span2"><div class="panel-head"><div><h2>{{'Répartition par statut'|tr:'Breakdown by status'}}</h2><p>{{'Volume réel des demandes'|tr:'Actual request volume'}}</p></div></div><div class="bar-chart">@for(item of entries(data.byStatus);track item[0]){<div><span>{{statusLabel(item[0])}}</span><i><b [style.width.%]="percent(item[1],data.totalMeetings)"></b></i><strong>{{item[1]}}</strong></div>}</div></article><article class="panel"><div class="panel-head"><div><h2>{{'Indicateurs clés'|tr:'Key metrics'}}</h2><p>{{'Utilisation globale'|tr:'Overall usage'}}</p></div></div><div class="big-rate"><strong>{{data.occupancyRate}}%</strong><small>{{'Taux d’occupation estimé'|tr:'Estimated occupancy rate'}}</small></div><dl class="summary-list"><div><dt>{{'Participants'|tr:'Participants'}}</dt><dd>{{data.totalParticipants}}</dd></div><div><dt>{{'Annulations'|tr:'Cancellations'}}</dt><dd>{{data.cancellations}}</dd></div><div><dt>{{'Prioritaires'|tr:'Priority requests'}}</dt><dd>{{data.priorityRequests}}</dd></div></dl></article></section>
<section class="panel"><div class="panel-head"><div><h2>{{'Utilisation par bâtiment'|tr:'Usage by building'}}</h2><p>{{'Réservations avec salle assignée'|tr:'Bookings with an assigned room'}}</p></div></div><div class="building-stats">@for(item of entries(data.byBuilding);track item[0]){<article><span>{{item[0].slice(0,2).toUpperCase()}}</span><div><b>{{item[0]}}</b><small>{{item[1]}} {{'réservation(s)'|tr:'booking(s)'}}</small></div></article>}</div></section>}` }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "frontend/src/app/pages/admin-pages.component.ts", lineNumber: 24 }); })();
export class ManagementComponent {
    api = inject(ApiService);
    route = inject(ActivatedRoute);
    fb = inject(FormBuilder);
    auth = inject(AuthService);
    language = inject(LanguageService);
    kind = this.route.snapshot.data['kind'];
    loading = true;
    equipments = [];
    audit = [];
    message = '';
    error = '';
    equipmentModalOpen = false;
    equipmentSaving = false;
    equipmentError = '';
    equipmentForm = this.fb.nonNullable.group({ code: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9_-]{2,40}$/)]], name: ['', [Validators.required, Validators.maxLength(100)]], type: 'MOBILE', totalQuantity: [1, [Validators.required, Validators.min(0)]], availableQuantity: [1, [Validators.required, Validators.min(0)]], status: 'AVAILABLE', active: true });
    get title() { return this.kind === 'equipment' ? this.language.text('Gestion des équipements', 'Equipment management') : this.language.text('Journal d’audit', 'Audit log'); }
    get subtitle() { return this.kind === 'equipment' ? this.language.text('Référentiel technique, quantités et disponibilités.', 'Technical catalogue, quantities and availability.') : this.language.text('Traçabilité des opérations sensibles.', 'Traceability of sensitive operations.'); }
    ngOnInit() {
        const failure = (e) => { this.loading = false; this.error = this.language.server(e.error?.message) || this.language.text('Chargement impossible.', 'Unable to load data.'); };
        if (this.kind === 'equipment')
            this.api.equipment().subscribe({ next: items => { this.equipments = items; this.loading = false; }, error: failure });
        else
            this.api.audit().subscribe({ next: items => { this.audit = items; this.loading = false; }, error: failure });
    }
    editEquipment(e) { const qty = prompt(this.language.text(`Quantité disponible pour ${e.name} :`, `Available quantity for ${e.name}:`), String(e.availableQuantity)); if (qty === null || !Number.isInteger(Number(qty)) || Number(qty) < 0)
        return; const status = prompt(this.language.text('État (AVAILABLE ou MAINTENANCE) :', 'Status (AVAILABLE or MAINTENANCE):'), e.status)?.toUpperCase(); if (!status)
        return; this.api.updateEquipment(e.id, { availableQuantity: Number(qty), status, active: true }).subscribe({ next: x => { this.equipments = this.equipments.map(i => i.id === x.id ? x : i); this.flash(this.language.text('Équipement mis à jour.', 'Equipment updated.')); }, error: x => this.flash(this.language.server(x.error?.message) || this.language.text('Modification impossible.', 'Unable to update.')) }); }
    openEquipmentCreate() { this.equipmentError = ''; this.equipmentForm.reset({ code: '', name: '', type: 'MOBILE', totalQuantity: 1, availableQuantity: 1, status: 'AVAILABLE', active: true }); this.equipmentModalOpen = true; }
    closeEquipmentCreate() { if (!this.equipmentSaving) {
        this.equipmentModalOpen = false;
        this.equipmentError = '';
    } }
    createEquipment() { this.equipmentForm.markAllAsTouched(); if (this.equipmentForm.invalid)
        return; const value = this.equipmentForm.getRawValue(); if (value.availableQuantity > value.totalQuantity) {
        this.equipmentError = this.language.text('La quantité disponible ne peut pas dépasser le stock total.', 'Available quantity cannot exceed total stock.');
        return;
    } this.equipmentSaving = true; this.equipmentError = ''; this.api.createEquipment({ ...value, code: value.code.trim().toUpperCase(), name: value.name.trim() }).subscribe({ next: item => { this.equipments = [...this.equipments, item].sort((a, b) => a.name.localeCompare(b.name)); this.equipmentSaving = false; this.equipmentModalOpen = false; this.flash(this.language.text('Équipement créé.', 'Equipment created.')); }, error: e => { this.equipmentSaving = false; this.equipmentError = this.language.server(e.error?.message) || this.language.text('Création impossible.', 'Unable to create equipment.'); } }); }
    removeEquipment(item) { if (this.isProtectedEquipment(item))
        return; if (!confirm(this.language.text(`Supprimer l’équipement « ${item.name} » ?`, `Delete “${item.name}” equipment?`)))
        return; this.api.deleteEquipment(item.id).subscribe({ next: () => { this.equipments = this.equipments.filter(current => current.id !== item.id); this.flash(this.language.text('Équipement supprimé.', 'Equipment deleted.')); }, error: e => this.flash(this.language.server(e.error?.message) || this.language.text('Suppression impossible.', 'Unable to delete equipment.')) }); }
    isProtectedEquipment(item) { return item.code === 'WIFI' || item.code === 'AIR_CONDITIONING'; }
    equipmentType(type) { return type === 'FIXED' ? this.language.text('Fixe', 'Fixed') : type === 'MOBILE' ? this.language.text('Mobile', 'Mobile') : type; }
    equipmentStatus(status) { return status === 'AVAILABLE' ? this.language.text('Disponible', 'Available') : status === 'MAINTENANCE' ? this.language.text('Maintenance', 'Maintenance') : status; }
    flash(m) { this.message = m; setTimeout(() => this.message = '', 3000); }
    static ɵfac = function ManagementComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ManagementComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ManagementComponent, selectors: [["ng-component"]], decls: 16, vars: 10, consts: [[1, "page-head"], [1, "eyebrow"], ["type", "button", 1, "btn", "primary"], [1, "panel", "loading"], [1, "alert", "error"], [1, "panel", "table-panel"], [1, "toast"], [1, "modal-backdrop"], ["type", "button", 1, "btn", "primary", 3, "click"], [1, "table-scroll"], [1, "badge"], [1, "actions"], ["type", "button", 1, "btn", "tiny", 3, "click"], ["type", "button", 1, "btn", "tiny", "danger-btn", 3, "disabled"], ["type", "button", 1, "btn", "tiny", "danger-btn", 3, "click", "disabled"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "equipment-form-title", 1, "modal", "user-modal"], [1, "modal-head"], ["id", "equipment-form-title"], ["type", "button", 1, "icon-btn", "dark", 3, "click"], [1, "room-admin-form", 3, "ngSubmit", "formGroup"], [1, "form-grid"], ["formControlName", "code", "maxlength", "40", "placeholder", "Ex. CAMERA_MOBILE"], ["formControlName", "name", "maxlength", "100", 3, "placeholder"], ["formControlName", "type"], ["value", "FIXED"], ["value", "MOBILE"], ["formControlName", "status"], ["value", "AVAILABLE"], ["value", "MAINTENANCE"], ["value", "BLOCKED"], ["type", "number", "min", "0", "formControlName", "totalQuantity"], ["type", "number", "min", "0", "formControlName", "availableQuantity"], [1, "full", "toggle-row"], ["type", "checkbox", "formControlName", "active"], [1, "form-actions"], ["type", "button", 1, "btn", "secondary", 3, "click"], ["type", "submit", 1, "btn", "primary", 3, "disabled"]], template: function ManagementComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "header", 0)(1, "div")(2, "p", 1);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1");
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p");
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(9, ManagementComponent_Conditional_9_Template, 3, 4, "button", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(10, ManagementComponent_Conditional_10_Template, 3, 4, "div", 3)(11, ManagementComponent_Conditional_11_Template, 2, 1, "div", 4)(12, ManagementComponent_Conditional_12_Template, 29, 28, "section", 5)(13, ManagementComponent_Conditional_13_Template, 23, 20, "section", 5);
            i0.ɵɵconditionalCreate(14, ManagementComponent_Conditional_14_Template, 2, 1, "div", 6);
            i0.ɵɵconditionalCreate(15, ManagementComponent_Conditional_15_Template, 67, 74, "div", 7);
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(4, 7, "ADMINISTRATION", "ADMINISTRATION"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.title);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.subtitle);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.kind === "equipment" && ctx.auth.hasRole("ADMIN") ? 9 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading ? 10 : ctx.error ? 11 : ctx.kind === "equipment" ? 12 : 13);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.message ? 14 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.equipmentModalOpen ? 15 : -1);
        } }, dependencies: [CommonModule, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.CheckboxControlValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.MaxLengthValidator, i2.MinValidator, i2.FormGroupDirective, i2.FormControlName, i1.DatePipe, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ManagementComponent, [{
        type: Component,
        args: [{ standalone: true, imports: [CommonModule, ReactiveFormsModule, TranslatePipe], template: `
<header class="page-head"><div><p class="eyebrow">{{'ADMINISTRATION'|tr:'ADMINISTRATION'}}</p><h1>{{title}}</h1><p>{{subtitle}}</p></div>@if(kind==='equipment'&&auth.hasRole('ADMIN')){<button class="btn primary" type="button" (click)="openEquipmentCreate()">＋ {{'Ajouter un équipement'|tr:'Add equipment'}}</button>}</header>
@if(loading){<div class="panel loading">{{'Chargement…'|tr:'Loading…'}}</div>}
@else if(error){<div class="alert error">{{error}}</div>}
@else if(kind==='equipment'){<section class="panel table-panel"><div class="table-scroll"><table><thead><tr><th>{{'Équipement'|tr:'Equipment'}}</th><th>{{'Code'|tr:'Code'}}</th><th>{{'Type'|tr:'Type'}}</th><th>{{'Stock total'|tr:'Total stock'}}</th><th>{{'Disponible'|tr:'Available'}}</th><th>{{'État'|tr:'Status'}}</th><th>{{'Actions'|tr:'Actions'}}</th></tr></thead><tbody>@for(e of equipments;track e.id){<tr><td><b>{{e.name}}</b>@if(isProtectedEquipment(e)){<small>{{'Équipement obligatoire'|tr:'Required equipment'}}</small>}</td><td>{{e.code}}</td><td>{{equipmentType(e.type)}}</td><td>{{e.totalQuantity}}</td><td>{{e.availableQuantity}}</td><td><span class="badge">{{equipmentStatus(e.status)}}</span></td><td><div class="actions"><button class="btn tiny" type="button" (click)="editEquipment(e)">{{'Modifier'|tr:'Edit'}}</button>@if(auth.hasRole('ADMIN')){<button class="btn tiny danger-btn" type="button" [disabled]="isProtectedEquipment(e)" (click)="removeEquipment(e)">{{'Supprimer'|tr:'Delete'}}</button>}</div></td></tr>}</tbody></table></div></section>}
@else{<section class="panel table-panel"><div class="table-scroll"><table><thead><tr><th>{{'Date'|tr:'Date'}}</th><th>{{'Acteur'|tr:'Actor'}}</th><th>{{'Action'|tr:'Action'}}</th><th>{{'Entité'|tr:'Entity'}}</th><th>{{'Détails'|tr:'Details'}}</th></tr></thead><tbody>@for(a of audit;track a.id){<tr><td>{{a.createdAt|date:'dd/MM/yyyy HH:mm'}}</td><td>{{a.actorEmail}}</td><td><b>{{a.actionType}}</b></td><td>{{a.entityType}} #{{a.entityId}}</td><td>{{a.details}}</td></tr>}</tbody></table></div></section>}
@if(message){<div class="toast">{{message}}</div>}
@if(equipmentModalOpen){<div class="modal-backdrop"><section class="modal user-modal" role="dialog" aria-modal="true" aria-labelledby="equipment-form-title"><header class="modal-head"><div><h2 id="equipment-form-title">{{'Ajouter un équipement'|tr:'Add equipment'}}</h2><p>{{'Créez un équipement fixe ou mobile disponible pour les salles.'|tr:'Create fixed or mobile equipment available to rooms.'}}</p></div><button class="icon-btn dark" type="button" (click)="closeEquipmentCreate()" [attr.aria-label]="'Fermer'|tr:'Close'">×</button></header><form class="room-admin-form" [formGroup]="equipmentForm" (ngSubmit)="createEquipment()">@if(equipmentError){<div class="alert error">{{equipmentError}}</div>}<div class="form-grid"><label>{{'Code unique'|tr:'Unique code'}} *<input formControlName="code" maxlength="40" placeholder="Ex. CAMERA_MOBILE"></label><label>{{'Nom'|tr:'Name'}} *<input formControlName="name" maxlength="100" [placeholder]="'Ex. Caméra mobile'|tr:'E.g. Mobile camera'"></label><label>{{'Type'|tr:'Type'}} *<select formControlName="type"><option value="FIXED">{{'Fixe'|tr:'Fixed'}}</option><option value="MOBILE">{{'Mobile'|tr:'Mobile'}}</option></select></label><label>{{'État'|tr:'Status'}} *<select formControlName="status"><option value="AVAILABLE">{{'Disponible'|tr:'Available'}}</option><option value="MAINTENANCE">Maintenance</option><option value="BLOCKED">{{'Bloqué'|tr:'Blocked'}}</option></select></label><label>{{'Stock total'|tr:'Total stock'}} *<input type="number" min="0" formControlName="totalQuantity"></label><label>{{'Quantité disponible'|tr:'Available quantity'}} *<input type="number" min="0" formControlName="availableQuantity"></label><label class="full toggle-row"><input type="checkbox" formControlName="active"> {{'Équipement actif'|tr:'Active equipment'}}</label></div><footer class="form-actions"><button class="btn secondary" type="button" (click)="closeEquipmentCreate()">{{'Annuler'|tr:'Cancel'}}</button><button class="btn primary" type="submit" [disabled]="equipmentSaving">{{equipmentSaving?('Création…'|tr:'Creating…'):('Créer l’équipement'|tr:'Create equipment')}}</button></footer></form></section></div>}` }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ManagementComponent, { className: "ManagementComponent", filePath: "frontend/src/app/pages/admin-pages.component.ts", lineNumber: 42 }); })();
export class ReportsComponent {
    api = inject(ApiService);
    language = inject(LanguageService);
    message = '';
    download(type) { const source = type === 'pdf' ? this.api.exportPdf() : this.api.exportExcel(); source.subscribe({ next: blob => { const url = URL.createObjectURL(blob), a = document.createElement('a'); a.href = url; a.download = `rapport-reservations.${type}`; a.click(); URL.revokeObjectURL(url); this.flash(this.language.text('Export généré.', 'Export generated.')); }, error: e => this.flash(this.language.server(e.error?.message) || this.language.text('Export impossible.', 'Unable to export.')) }); }
    flash(message) { this.message = message; setTimeout(() => this.message = '', 2500); }
    static ɵfac = function ReportsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ReportsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReportsComponent, selectors: [["ng-component"]], decls: 47, vars: 49, consts: [[1, "page-head"], [1, "eyebrow"], [1, "report-grid"], [1, "panel", "report-card"], ["type", "button", 1, "btn", "primary", 3, "click"], [1, "panel", "report-card", "wide"], [1, "toast"]], template: function ReportsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "header", 0)(1, "div")(2, "p", 1);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "tr");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(5, "h1");
            i0.ɵɵtext(6);
            i0.ɵɵpipe(7, "tr");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(8, "p");
            i0.ɵɵtext(9);
            i0.ɵɵpipe(10, "tr");
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵdomElementStart(11, "section", 2)(12, "article", 3)(13, "span");
            i0.ɵɵtext(14, "PDF");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(15, "h2");
            i0.ɵɵtext(16);
            i0.ɵɵpipe(17, "tr");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(18, "p");
            i0.ɵɵtext(19);
            i0.ɵɵpipe(20, "tr");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(21, "button", 4);
            i0.ɵɵdomListener("click", function ReportsComponent_Template_button_click_21_listener() { return ctx.download("pdf"); });
            i0.ɵɵtext(22);
            i0.ɵɵpipe(23, "tr");
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(24, "article", 3)(25, "span");
            i0.ɵɵtext(26, "XLSX");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(27, "h2");
            i0.ɵɵtext(28);
            i0.ɵɵpipe(29, "tr");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(30, "p");
            i0.ɵɵtext(31);
            i0.ɵɵpipe(32, "tr");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(33, "button", 4);
            i0.ɵɵdomListener("click", function ReportsComponent_Template_button_click_33_listener() { return ctx.download("xlsx"); });
            i0.ɵɵtext(34);
            i0.ɵɵpipe(35, "tr");
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(36, "article", 5)(37, "span");
            i0.ɵɵtext(38);
            i0.ɵɵpipe(39, "tr");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(40, "h2");
            i0.ɵɵtext(41);
            i0.ɵɵpipe(42, "tr");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(43, "p");
            i0.ɵɵtext(44);
            i0.ɵɵpipe(45, "tr");
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵconditionalCreate(46, ReportsComponent_Conditional_46_Template, 2, 1, "div", 6);
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(4, 13, "ANALYSE ET EXPORTS", "ANALYTICS AND EXPORTS"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(7, 16, "Rapports", "Reports"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(10, 19, "Exports g\u00E9n\u00E9r\u00E9s \u00E0 partir des donn\u00E9es actuelles de la base.", "Exports generated from current database records."));
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(17, 22, "Rapport des r\u00E9servations", "Booking report"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(20, 25, "Document pagin\u00E9 adapt\u00E9 au partage et \u00E0 l\u2019archivage.", "Paginated document suitable for sharing and archiving."));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(23, 28, "T\u00E9l\u00E9charger le PDF", "Download PDF"));
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(29, 31, "Donn\u00E9es exploitables", "Reusable data"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(32, 34, "Tableau Excel avec r\u00E9f\u00E9rences, p\u00E9riodes, salles et statuts.", "Excel workbook with references, periods, rooms and statuses."));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(35, 37, "T\u00E9l\u00E9charger Excel", "Download Excel"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(39, 40, "VENDREDI \u00B7 10 H", "FRIDAY \u00B7 10 AM"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(42, 43, "R\u00E9capitulatif hebdomadaire automatique", "Automatic weekly summary"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(45, 46, "Une notification bilingue est g\u00E9n\u00E9r\u00E9e chaque vendredi \u00E0 10 h, heure de Lom\u00E9, pour les administrateurs, Facility et IT.", "A bilingual notification is generated every Friday at 10 a.m. Lom\u00E9 time for administrators, Facility and IT."));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.message ? 46 : -1);
        } }, dependencies: [CommonModule, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReportsComponent, [{
        type: Component,
        args: [{ standalone: true, imports: [CommonModule, TranslatePipe], template: `<header class="page-head"><div><p class="eyebrow">{{'ANALYSE ET EXPORTS'|tr:'ANALYTICS AND EXPORTS'}}</p><h1>{{'Rapports'|tr:'Reports'}}</h1><p>{{'Exports générés à partir des données actuelles de la base.'|tr:'Exports generated from current database records.'}}</p></div></header><section class="report-grid"><article class="panel report-card"><span>PDF</span><h2>{{'Rapport des réservations'|tr:'Booking report'}}</h2><p>{{'Document paginé adapté au partage et à l’archivage.'|tr:'Paginated document suitable for sharing and archiving.'}}</p><button class="btn primary" type="button" (click)="download('pdf')">{{'Télécharger le PDF'|tr:'Download PDF'}}</button></article><article class="panel report-card"><span>XLSX</span><h2>{{'Données exploitables'|tr:'Reusable data'}}</h2><p>{{'Tableau Excel avec références, périodes, salles et statuts.'|tr:'Excel workbook with references, periods, rooms and statuses.'}}</p><button class="btn primary" type="button" (click)="download('xlsx')">{{'Télécharger Excel'|tr:'Download Excel'}}</button></article><article class="panel report-card wide"><span>{{'VENDREDI · 10 H'|tr:'FRIDAY · 10 AM'}}</span><h2>{{'Récapitulatif hebdomadaire automatique'|tr:'Automatic weekly summary'}}</h2><p>{{'Une notification bilingue est générée chaque vendredi à 10 h, heure de Lomé, pour les administrateurs, Facility et IT.'|tr:'A bilingual notification is generated every Friday at 10 a.m. Lomé time for administrators, Facility and IT.'}}</p></article></section>@if(message){<div class="toast">{{message}}</div>}` }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ReportsComponent, { className: "ReportsComponent", filePath: "frontend/src/app/pages/admin-pages.component.ts", lineNumber: 64 }); })();
export class NotificationsComponent {
    api = inject(ApiService);
    language = inject(LanguageService);
    items = [];
    loading = true;
    error = '';
    ngOnInit() { this.api.notifications().subscribe({ next: r => { this.items = r; this.loading = false; }, error: e => { this.loading = false; this.error = this.language.server(e.error?.message) || this.language.text('Chargement impossible.', 'Unable to load notifications.'); } }); }
    read(n) { if (n.read)
        return; this.api.readNotification(n.id).subscribe(() => n.read = true); }
    eventLabel(event) { const labels = { REQUEST_CREATED: ['Demande créée', 'Request created'], ROOM_ASSIGNED: ['Salle assignée', 'Room assigned'], FACILITY_APPROVED: ['Validée par Facility', 'Facility approved'], IT_APPROVED: ['Validée par IT', 'IT approved'], REQUEST_CONFIRMED: ['Demande confirmée', 'Request confirmed'], REQUEST_CANCELLED: ['Demande annulée', 'Request cancelled'], REQUEST_REJECTED: ['Demande rejetée', 'Request rejected'] }; const value = labels[event]; return value ? this.language.text(...value) : event.replaceAll('_', ' '); }
    static ɵfac = function NotificationsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NotificationsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NotificationsComponent, selectors: [["ng-component"]], decls: 15, vars: 13, consts: [[1, "page-head"], [1, "eyebrow"], [1, "panel", "loading"], [1, "alert", "error"], [1, "panel", "empty"], [1, "notification-list"], [1, "panel", "notification", 3, "unread"], [1, "panel", "notification", 3, "click"]], template: function NotificationsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "header", 0)(1, "div")(2, "p", 1);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "tr");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(5, "h1");
            i0.ɵɵtext(6);
            i0.ɵɵpipe(7, "tr");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(8, "p");
            i0.ɵɵtext(9);
            i0.ɵɵpipe(10, "tr");
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵconditionalCreate(11, NotificationsComponent_Conditional_11_Template, 3, 4, "div", 2)(12, NotificationsComponent_Conditional_12_Template, 2, 1, "div", 3)(13, NotificationsComponent_Conditional_13_Template, 4, 4, "div", 4)(14, NotificationsComponent_Conditional_14_Template, 3, 0, "section", 5);
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(4, 4, "CENTRE DE NOTIFICATIONS", "NOTIFICATION CENTRE"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(7, 7, "Notifications", "Notifications"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(10, 10, "Les alertes internes restent disponibles m\u00EAme en cas d\u2019\u00E9chec e-mail.", "Internal alerts remain available even if email delivery fails."));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.loading ? 11 : ctx.error ? 12 : !ctx.items.length ? 13 : 14);
        } }, dependencies: [CommonModule, i1.DatePipe, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NotificationsComponent, [{
        type: Component,
        args: [{ standalone: true, imports: [CommonModule, TranslatePipe], template: `<header class="page-head"><div><p class="eyebrow">{{'CENTRE DE NOTIFICATIONS'|tr:'NOTIFICATION CENTRE'}}</p><h1>{{'Notifications'|tr:'Notifications'}}</h1><p>{{'Les alertes internes restent disponibles même en cas d’échec e-mail.'|tr:'Internal alerts remain available even if email delivery fails.'}}</p></div></header>@if(loading){<div class="panel loading">{{'Chargement…'|tr:'Loading…'}}</div>}@else if(error){<div class="alert error">{{error}}</div>}@else if(!items.length){<div class="panel empty"><b>{{'Aucune notification'|tr:'No notifications'}}</b></div>}@else{<section class="notification-list">@for(n of items;track n.id){<article class="panel notification" [class.unread]="!n.read" (click)="read(n)"><span></span><div><div><b>{{n.title}}</b><time>{{n.createdAt|date:'dd/MM/yyyy HH:mm'}}</time></div><p>{{n.message}}</p><small>{{eventLabel(n.eventType)}}</small></div></article>}</section>}` }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NotificationsComponent, { className: "NotificationsComponent", filePath: "frontend/src/app/pages/admin-pages.component.ts", lineNumber: 67 }); })();
//# sourceMappingURL=admin-pages.component.js.map