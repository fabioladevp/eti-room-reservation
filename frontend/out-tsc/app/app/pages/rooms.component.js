import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiService } from '../core/api.service';
import { filterRooms } from '../core/catalog-filter';
import { AuthService } from '../core/auth.service';
import { LanguageService } from '../core/language.service';
import { TranslatePipe } from '../core/translate.pipe';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.layout;
function RoomsComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 30);
    i0.ɵɵlistener("click", function RoomsComponent_Conditional_11_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openCreate()); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "tr");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\uFF0B ", i0.ɵɵpipeBind2(2, 1, "Ajouter une salle", "Add a room"));
} }
function RoomsComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.success);
} }
function RoomsComponent_Conditional_93_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "tr");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, "Chargement du catalogue\u2026", "Loading catalogue\u2026"));
} }
function RoomsComponent_Conditional_94_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "button", 31);
    i0.ɵɵlistener("click", function RoomsComponent_Conditional_94_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "tr");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", ctx_r1.error, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(4, 2, "R\u00E9essayer", "Retry"));
} }
function RoomsComponent_Conditional_95_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 27)(1, "b");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 31);
    i0.ɵɵlistener("click", function RoomsComponent_Conditional_95_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.reset()); });
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "tr");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(3, 3, "Aucune salle ne correspond", "No matching room"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 6, "Modifiez les crit\u00E8res ou r\u00E9initialisez les filtres.", "Change the criteria or reset the filters."));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(9, 9, "R\u00E9initialiser", "Reset"));
} }
function RoomsComponent_Conditional_96_For_2_For_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span")(1, "b");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const c_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(c_r5.capacity);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.layout(c_r5.layout));
} }
function RoomsComponent_Conditional_96_For_2_For_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r6 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(e_r6.name);
} }
function RoomsComponent_Conditional_96_For_2_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 41)(1, "button", 30);
    i0.ɵɵlistener("click", function RoomsComponent_Conditional_96_For_2_Conditional_22_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r7); const room_r8 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openEdit(room_r8)); });
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 42);
    i0.ɵɵlistener("click", function RoomsComponent_Conditional_96_For_2_Conditional_22_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r7); const room_r8 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openDelete(room_r8)); });
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "tr");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(3, 2, "Modifier", "Edit"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 5, "Supprimer", "Delete"));
} }
function RoomsComponent_Conditional_96_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 32)(1, "div", 33);
    i0.ɵɵelement(2, "img", 34);
    i0.ɵɵelementStart(3, "span", 35);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 36)(6, "p", 37);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "h2");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 38);
    i0.ɵɵrepeaterCreate(11, RoomsComponent_Conditional_96_For_2_For_12_Template, 4, 2, "span", null, _forTrack1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 39);
    i0.ɵɵrepeaterCreate(14, RoomsComponent_Conditional_96_For_2_For_15_Template, 2, 1, "span", null, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 40)(17, "small");
    i0.ɵɵtext(18);
    i0.ɵɵpipe(19, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "b");
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(22, RoomsComponent_Conditional_96_For_2_Conditional_22_Template, 7, 8, "div", 41);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const room_r8 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", room_r8.photoUrl, i0.ɵɵsanitizeUrl)("alt", "Vue neutre de " + room_r8.name);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("off", room_r8.status !== "AVAILABLE");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.status(room_r8.status));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", room_r8.building, " \u00B7 ", room_r8.location);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(room_r8.name);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(room_r8.capacities);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(room_r8.equipment);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(19, 11, "Temps de battement", "Buffer time"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", room_r8.bufferMinutes, " min");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.auth.hasRole("ADMIN") ? 22 : -1);
} }
function RoomsComponent_Conditional_96_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 28);
    i0.ɵɵrepeaterCreate(1, RoomsComponent_Conditional_96_For_2_Template, 23, 14, "article", 32, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.filtered);
} }
function RoomsComponent_Conditional_97_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.createError);
} }
function RoomsComponent_Conditional_97_Conditional_84_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 83);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "tr");
    i0.ɵɵpipe(3, "tr");
    i0.ɵɵelementStart(4, "input", 84);
    i0.ɵɵlistener("change", function RoomsComponent_Conditional_97_Conditional_84_Template_input_change_4_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.uploadPhoto($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "button", 85);
    i0.ɵɵlistener("click", function RoomsComponent_Conditional_97_Conditional_84_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.removePhoto()); });
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "small");
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "tr");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.photoBusy ? i0.ɵɵpipeBind2(2, 5, "T\u00E9l\u00E9versement\u2026", "Uploading\u2026") : i0.ɵɵpipeBind2(3, 8, "Choisir une photo", "Choose photo"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r1.photoBusy);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.photoBusy || !ctx_r1.hasCustomPhoto);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(7, 11, "Supprimer la photo", "Delete photo"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(10, 14, "PNG, JPEG ou WebP \u00B7 5 Mo maximum", "PNG, JPEG or WebP \u00B7 5 MB maximum"));
} }
function RoomsComponent_Conditional_97_Conditional_85_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "tr");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, "Cr\u00E9ez d\u2019abord la salle, puis ouvrez Modifier pour ajouter une photo personnelle.", "Create the room first, then open Edit to upload a custom photo."));
} }
function RoomsComponent_Conditional_97_For_91_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 72);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r11 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("value", item_r11.code)("disabled", ctx_r1.isMandatoryEquipment(item_r11.code));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", item_r11.name, "", ctx_r1.isMandatoryEquipment(item_r11.code) ? ctx_r1.language.text(" \u2014 inclus", " \u2014 included") : "");
} }
function RoomsComponent_Conditional_97_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 29)(1, "section", 43)(2, "header", 44)(3, "div")(4, "h2", 45);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "tr");
    i0.ɵɵpipe(7, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p");
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "tr");
    i0.ɵɵpipe(11, "tr");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "button", 46);
    i0.ɵɵpipe(13, "tr");
    i0.ɵɵlistener("click", function RoomsComponent_Conditional_97_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeCreate()); });
    i0.ɵɵtext(14, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "form", 47);
    i0.ɵɵlistener("ngSubmit", function RoomsComponent_Conditional_97_Template_form_ngSubmit_15_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.saveRoom()); });
    i0.ɵɵconditionalCreate(16, RoomsComponent_Conditional_97_Conditional_16_Template, 2, 1, "div", 26);
    i0.ɵɵelementStart(17, "div", 48)(18, "label");
    i0.ɵɵtext(19);
    i0.ɵɵpipe(20, "tr");
    i0.ɵɵelement(21, "input", 49);
    i0.ɵɵelementStart(22, "span", 50);
    i0.ɵɵtext(23);
    i0.ɵɵpipe(24, "tr");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "label");
    i0.ɵɵtext(26);
    i0.ɵɵpipe(27, "tr");
    i0.ɵɵelement(28, "input", 51);
    i0.ɵɵpipe(29, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "label");
    i0.ɵɵtext(31);
    i0.ɵɵpipe(32, "tr");
    i0.ɵɵelementStart(33, "select", 52)(34, "option", 53);
    i0.ɵɵtext(35, "Acad\u00E9mie");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "option", 54);
    i0.ɵɵtext(37, "PAC");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "option", 55);
    i0.ɵɵtext(39, "Grand b\u00E2timent");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(40, "label");
    i0.ɵɵtext(41);
    i0.ɵɵpipe(42, "tr");
    i0.ɵɵelement(43, "input", 56);
    i0.ɵɵpipe(44, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "label");
    i0.ɵɵtext(46);
    i0.ɵɵpipe(47, "tr");
    i0.ɵɵelement(48, "input", 57);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "label");
    i0.ɵɵtext(50);
    i0.ɵɵpipe(51, "tr");
    i0.ɵɵelementStart(52, "select", 58)(53, "option", 59);
    i0.ɵɵtext(54);
    i0.ɵɵpipe(55, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(56, "option", 60);
    i0.ɵɵtext(57);
    i0.ɵɵpipe(58, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(59, "option", 61);
    i0.ɵɵtext(60, "Maintenance");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(61, "label", 62);
    i0.ɵɵtext(62);
    i0.ɵɵpipe(63, "tr");
    i0.ɵɵelementStart(64, "select", 63)(65, "option", 64);
    i0.ɵɵtext(66);
    i0.ɵɵpipe(67, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(68, "option", 65);
    i0.ɵɵtext(69, "Auditorium");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(70, "option", 66);
    i0.ɵɵtext(71);
    i0.ɵɵpipe(72, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(73, "option", 67);
    i0.ɵɵtext(74, "Banquet");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(75, "option", 68);
    i0.ɵɵtext(76, "Hall");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(77, "option", 69);
    i0.ɵɵtext(78);
    i0.ɵɵpipe(79, "tr");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(80, "div", 70);
    i0.ɵɵelement(81, "img", 34);
    i0.ɵɵpipe(82, "tr");
    i0.ɵɵelementStart(83, "div");
    i0.ɵɵconditionalCreate(84, RoomsComponent_Conditional_97_Conditional_84_Template, 11, 17)(85, RoomsComponent_Conditional_97_Conditional_85_Template, 3, 4, "small");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(86, "label", 62);
    i0.ɵɵtext(87);
    i0.ɵɵpipe(88, "tr");
    i0.ɵɵelementStart(89, "select", 71);
    i0.ɵɵrepeaterCreate(90, RoomsComponent_Conditional_97_For_91_Template, 2, 4, "option", 72, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(92, "span", 50);
    i0.ɵɵtext(93);
    i0.ɵɵpipe(94, "tr");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(95, "label", 73);
    i0.ɵɵelement(96, "input", 74);
    i0.ɵɵtext(97);
    i0.ɵɵpipe(98, "tr");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(99, "div", 75)(100, "h3");
    i0.ɵɵtext(101);
    i0.ɵɵpipe(102, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(103, "label");
    i0.ɵɵtext(104);
    i0.ɵɵpipe(105, "tr");
    i0.ɵɵelement(106, "input", 76);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(107, "label");
    i0.ɵɵtext(108);
    i0.ɵɵpipe(109, "tr");
    i0.ɵɵelement(110, "input", 77);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(111, "label");
    i0.ɵɵtext(112);
    i0.ɵɵpipe(113, "tr");
    i0.ɵɵelement(114, "input", 78);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(115, "label");
    i0.ɵɵtext(116);
    i0.ɵɵpipe(117, "tr");
    i0.ɵɵelement(118, "input", 79);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(119, "label");
    i0.ɵɵtext(120, "Cocktail");
    i0.ɵɵelement(121, "input", 80);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(122, "footer", 81)(123, "button", 30);
    i0.ɵɵlistener("click", function RoomsComponent_Conditional_97_Template_button_click_123_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeCreate()); });
    i0.ɵɵtext(124);
    i0.ɵɵpipe(125, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(126, "button", 82);
    i0.ɵɵtext(127);
    i0.ɵɵpipe(128, "tr");
    i0.ɵɵpipe(129, "tr");
    i0.ɵɵpipe(130, "tr");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.editingRoom ? i0.ɵɵpipeBind2(6, 34, "Modifier la salle", "Edit room") : i0.ɵɵpipeBind2(7, 37, "Ajouter une salle", "Add a room"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.editingRoom ? i0.ɵɵpipeBind2(10, 40, "Modifiez son identit\u00E9, son b\u00E2timent, ses capacit\u00E9s et ses \u00E9quipements.", "Update its identity, building, capacities and equipment.") : i0.ɵɵpipeBind2(11, 43, "Renseignez l\u2019identit\u00E9, les capacit\u00E9s et les \u00E9quipements fixes.", "Enter the room identity, capacities and fixed equipment."));
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind2(13, 46, "Fermer", "Close"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("formGroup", ctx_r1.roomForm);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.createError ? 16 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(20, 49, "Code unique", "Unique code"), " *");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(24, 52, "Lettres, chiffres et tirets uniquement.", "Letters, numbers and hyphens only."));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(27, 55, "Nom de la salle", "Room name"), " *");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind2(29, 58, "Ex. Salle Projet", "E.g. Project Room"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(32, 61, "B\u00E2timent", "Building"), " *");
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(42, 64, "Localisation", "Location"), " *");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind2(44, 67, "Ex. 3e \u00E9tage", "E.g. 3rd floor"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(47, 70, "Temps de battement (minutes)", "Buffer time (minutes)"), " *");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(51, 73, "\u00C9tat", "Status"), " *");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(55, 76, "Disponible", "Available"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(58, 79, "Bloqu\u00E9e", "Blocked"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(63, 82, "Illustration", "Illustration"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(67, 85, "Salle de r\u00E9union", "Meeting room"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(72, 88, "Salle de conseil", "Boardroom"));
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(79, 91, "Salon VIP", "VIP lounge"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("src", ctx_r1.roomForm.controls.photoUrl.value, i0.ɵɵsanitizeUrl)("alt", i0.ɵɵpipeBind2(82, 94, "Aper\u00E7u de la photo", "Photo preview"));
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.editingRoom ? 84 : 85);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(88, 97, "\u00C9quipements fixes", "Fixed equipment"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.fixedEquipment);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(94, 100, "Climatisation et Wi-Fi sont inclus automatiquement dans toutes les salles. Maintenez Ctrl pour les autres \u00E9quipements.", "Air conditioning and Wi-Fi are automatically included in every room. Hold Ctrl for other equipment."));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(98, 103, "Salle active et visible dans le catalogue", "Room active and visible in the catalogue"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(102, 106, "Capacit\u00E9s par disposition", "Capacities by layout"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(105, 109, "Conseil", "Boardroom"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(109, 112, "Forme en U", "U-shape"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(113, 115, "Classe", "Classroom"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(117, 118, "Th\u00E9\u00E2tre", "Theatre"));
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(125, 121, "Annuler", "Cancel"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.creating);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.creating ? i0.ɵɵpipeBind2(128, 124, "Enregistrement\u2026", "Saving\u2026") : ctx_r1.editingRoom ? i0.ɵɵpipeBind2(129, 127, "Enregistrer les modifications", "Save changes") : i0.ɵɵpipeBind2(130, 130, "Cr\u00E9er la salle", "Create room"));
} }
function RoomsComponent_Conditional_98_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 90);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "tr");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, "La justification est obligatoire.", "A reason is required."));
} }
function RoomsComponent_Conditional_98_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 29)(1, "section", 86)(2, "header", 44)(3, "div")(4, "h2", 87);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "button", 46);
    i0.ɵɵpipe(10, "tr");
    i0.ɵɵlistener("click", function RoomsComponent_Conditional_98_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeDelete()); });
    i0.ɵɵtext(11, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 88)(13, "div", 26);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "label");
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "tr");
    i0.ɵɵelement(19, "textarea", 89);
    i0.ɵɵpipe(20, "tr");
    i0.ɵɵconditionalCreate(21, RoomsComponent_Conditional_98_Conditional_21_Template, 3, 4, "span", 90);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "footer", 81)(23, "button", 30);
    i0.ɵɵlistener("click", function RoomsComponent_Conditional_98_Template_button_click_23_listener() { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeDelete()); });
    i0.ɵɵtext(24);
    i0.ɵɵpipe(25, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "button", 85);
    i0.ɵɵlistener("click", function RoomsComponent_Conditional_98_Template_button_click_26_listener() { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.confirmDeleteRoom()); });
    i0.ɵɵtext(27);
    i0.ɵɵpipe(28, "tr");
    i0.ɵɵpipe(29, "tr");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 12, "Supprimer la salle", "Delete room"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", ctx_r1.roomToDelete.name, " \u00B7 ", ctx_r1.roomToDelete.code);
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind2(10, 15, "Fermer", "Close"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(15, 18, "La salle sera retir\u00E9e du catalogue. Son historique de r\u00E9servation sera conserv\u00E9.", "The room will be removed from the catalogue. Its booking history will be preserved."));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(18, 21, "Justification de la suppression", "Reason for deletion"), " *");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("formControl", ctx_r1.deletionReason)("placeholder", i0.ɵɵpipeBind2(20, 24, "Expliquez pr\u00E9cis\u00E9ment la raison de cette suppression\u2026", "Clearly explain the reason for this deletion\u2026"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.deletionReason.touched && ctx_r1.deletionReason.invalid ? 21 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(25, 27, "Annuler", "Cancel"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.deleting);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.deleting ? i0.ɵɵpipeBind2(28, 30, "Suppression\u2026", "Deleting\u2026") : i0.ɵɵpipeBind2(29, 33, "Supprimer d\u00E9finitivement du catalogue", "Remove from catalogue"));
} }
export class RoomsComponent {
    api = inject(ApiService);
    auth = inject(AuthService);
    language = inject(LanguageService);
    fb = inject(FormBuilder);
    route = inject(ActivatedRoute);
    router = inject(Router);
    destroyRef = inject(DestroyRef);
    rooms = [];
    equipment = [];
    loading = true;
    error = '';
    success = '';
    createError = '';
    createOpen = false;
    creating = false;
    editingRoom = null;
    roomToDelete = null;
    deleting = false;
    photoBusy = false;
    deletionReason = this.fb.nonNullable.control('', [Validators.required, Validators.maxLength(1000)]);
    filters = this.fb.nonNullable.group({ q: '', building: '', layout: '', capacity: 0, equipment: '' });
    roomForm = this.fb.nonNullable.group({
        code: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9-]{2,30}$/)]], name: ['', Validators.required], buildingCode: 'ACADEMIE',
        location: ['', Validators.required], bufferMinutes: [20, [Validators.required, Validators.min(0)]], status: 'AVAILABLE', active: true,
        photoUrl: '/assets/rooms/meeting.svg', equipmentCodes: [['AIR_CONDITIONING', 'WIFI']],
        capacityBoardroom: [0, Validators.min(0)], capacityUShape: [0, Validators.min(0)], capacityClassroom: [0, Validators.min(0)],
        capacityTheatre: [0, Validators.min(0)], capacityCocktail: [0, Validators.min(0)]
    });
    constructor() { const q = this.route.snapshot.queryParamMap; this.filters.patchValue({ q: q.get('q') ?? '', building: q.get('building') ?? '', layout: q.get('layout') ?? '', capacity: Number(q.get('capacity') ?? 0), equipment: q.get('equipment') ?? '' }, { emitEvent: false }); this.filters.valueChanges.pipe(debounceTime(150), takeUntilDestroyed()).subscribe(v => this.router.navigate([], { relativeTo: this.route, queryParams: { q: v.q || null, building: v.building || null, layout: v.layout || null, capacity: v.capacity || null, equipment: v.equipment || null }, replaceUrl: true })); }
    ngOnInit() { this.load(); this.api.equipment().subscribe({ next: r => this.equipment = r }); }
    load() { this.loading = true; this.error = ''; this.api.rooms().subscribe({ next: r => { this.rooms = r; this.loading = false; }, error: () => { this.loading = false; this.error = this.language.text('Impossible de charger les salles.', 'Unable to load rooms.'); } }); }
    get filtered() { return filterRooms(this.rooms, this.filters.getRawValue()); }
    get fixedEquipment() { return this.equipment.filter(e => e.type === 'FIXED' && e.status === 'AVAILABLE'); }
    isMandatoryEquipment(code) { return code === 'AIR_CONDITIONING' || code === 'WIFI'; }
    get hasCustomPhoto() { return this.roomForm.controls.photoUrl.value.startsWith('/api/uploads/rooms/'); }
    reset() { this.filters.setValue({ q: '', building: '', layout: '', capacity: 0, equipment: '' }); }
    openCreate() { this.editingRoom = null; this.success = ''; this.createError = ''; this.resetRoomForm(); this.createOpen = true; }
    openEdit(room) {
        this.editingRoom = room;
        this.success = '';
        this.createError = '';
        const capacities = Object.fromEntries(room.capacities.map(item => [item.layout, item.capacity]));
        const buildingCode = room.building === 'PAC' ? 'PAC' : room.building.toLowerCase().includes('grand') ? 'GRAND' : 'ACADEMIE';
        this.roomForm.reset({ code: room.code, name: room.name, buildingCode, location: room.location, bufferMinutes: room.bufferMinutes, status: room.status, active: room.active, photoUrl: room.photoUrl || '/assets/rooms/meeting.svg', equipmentCodes: Array.from(new Set([...room.equipment.map(item => item.code), 'AIR_CONDITIONING', 'WIFI'])), capacityBoardroom: capacities['BOARDROOM'] ?? 0, capacityUShape: capacities['U_SHAPE'] ?? 0, capacityClassroom: capacities['CLASSROOM'] ?? 0, capacityTheatre: capacities['THEATRE'] ?? 0, capacityCocktail: capacities['COCKTAIL'] ?? 0 });
        this.createOpen = true;
    }
    closeCreate() { if (!this.creating) {
        this.createOpen = false;
        this.editingRoom = null;
    } }
    uploadPhoto(event) { const input = event.target; const file = input.files?.[0]; input.value = ''; if (!file || !this.editingRoom)
        return; const allowed = ['image/png', 'image/jpeg', 'image/webp']; if (!allowed.includes(file.type)) {
        this.createError = this.language.text('Format non accepté : utilisez PNG, JPEG ou WebP.', 'Unsupported format: use PNG, JPEG or WebP.');
        return;
    } if (file.size > 5 * 1024 * 1024) {
        this.createError = this.language.text('La photo ne doit pas dépasser 5 Mo.', 'The photo must not exceed 5 MB.');
        return;
    } this.photoBusy = true; this.createError = ''; this.api.uploadRoomPhoto(this.editingRoom.id, file).subscribe({ next: room => { this.photoBusy = false; this.editingRoom = room; this.rooms = this.rooms.map(item => item.id === room.id ? room : item); this.roomForm.controls.photoUrl.setValue(room.photoUrl); }, error: e => { this.photoBusy = false; this.createError = this.language.server(e.error?.message) || this.language.text('Téléversement impossible.', 'Unable to upload photo.'); } }); }
    removePhoto() { if (!this.editingRoom || !this.hasCustomPhoto)
        return; this.photoBusy = true; this.createError = ''; this.api.deleteRoomPhoto(this.editingRoom.id).subscribe({ next: room => { this.photoBusy = false; this.editingRoom = room; this.rooms = this.rooms.map(item => item.id === room.id ? room : item); this.roomForm.controls.photoUrl.setValue(room.photoUrl); }, error: e => { this.photoBusy = false; this.createError = this.language.server(e.error?.message) || this.language.text('Suppression de la photo impossible.', 'Unable to delete photo.'); } }); }
    saveRoom() {
        this.createError = '';
        this.roomForm.markAllAsTouched();
        if (this.roomForm.invalid)
            return;
        const v = this.roomForm.getRawValue();
        const capacities = {};
        if (v.capacityBoardroom > 0)
            capacities['BOARDROOM'] = v.capacityBoardroom;
        if (v.capacityUShape > 0)
            capacities['U_SHAPE'] = v.capacityUShape;
        if (v.capacityClassroom > 0)
            capacities['CLASSROOM'] = v.capacityClassroom;
        if (v.capacityTheatre > 0)
            capacities['THEATRE'] = v.capacityTheatre;
        if (v.capacityCocktail > 0)
            capacities['COCKTAIL'] = v.capacityCocktail;
        if (!Object.keys(capacities).length) {
            this.createError = this.language.text('Indiquez au moins une capacité supérieure à zéro.', 'Enter at least one capacity greater than zero.');
            return;
        }
        const payload = { code: v.code.trim().toUpperCase(), name: v.name.trim(), buildingCode: v.buildingCode, location: v.location.trim(), bufferMinutes: v.bufferMinutes, status: v.status, active: v.active, photoUrl: v.photoUrl, capacities, equipmentCodes: Array.from(new Set([...v.equipmentCodes, 'AIR_CONDITIONING', 'WIFI'])) };
        const editing = this.editingRoom;
        const request = editing ? this.api.updateRoom(editing.id, payload) : this.api.createRoom(payload);
        this.creating = true;
        request.subscribe({ next: r => { this.rooms = editing ? this.rooms.map(item => item.id === r.id ? r : item) : [...this.rooms, r]; this.creating = false; this.createOpen = false; this.editingRoom = null; this.success = editing ? this.language.text(`La salle ${r.name} a été modifiée.`, `Room ${r.name} was updated.`) : this.language.text(`La salle ${r.name} a été créée.`, `Room ${r.name} was created.`); this.resetRoomForm(); }, error: e => { this.creating = false; this.createError = this.language.server(e.error?.message) || this.language.text('Enregistrement impossible.', 'Unable to save the room.'); } });
    }
    openDelete(room) { this.roomToDelete = room; this.deletionReason.reset(''); this.success = ''; }
    closeDelete() { if (!this.deleting) {
        this.roomToDelete = null;
        this.deletionReason.reset('');
    } }
    confirmDeleteRoom() { const room = this.roomToDelete; if (!room)
        return; this.deletionReason.markAsTouched(); if (this.deletionReason.invalid || !this.deletionReason.value.trim())
        return; this.deleting = true; this.api.deleteRoom(room.id, this.deletionReason.value.trim()).subscribe({ next: () => { this.rooms = this.rooms.filter(item => item.id !== room.id); this.deleting = false; this.roomToDelete = null; this.deletionReason.reset(''); this.success = this.language.text(`La salle ${room.name} a été supprimée du catalogue.`, `Room ${room.name} was removed from the catalogue.`); }, error: e => { this.deleting = false; alert(this.language.server(e.error?.message) || this.language.text('Suppression impossible.', 'Unable to delete the room.')); } }); }
    resetRoomForm() { this.roomForm.reset({ code: '', name: '', buildingCode: 'ACADEMIE', location: '', bufferMinutes: 20, status: 'AVAILABLE', active: true, photoUrl: '/assets/rooms/meeting.svg', equipmentCodes: ['AIR_CONDITIONING', 'WIFI'], capacityBoardroom: 0, capacityUShape: 0, capacityClassroom: 0, capacityTheatre: 0, capacityCocktail: 0 }); }
    layout(v) { const labels = { BOARDROOM: ['Conseil', 'Boardroom'], U_SHAPE: ['Forme en U', 'U-shape'], CLASSROOM: ['Classe', 'Classroom'], THEATRE: ['Théâtre', 'Theatre'], COCKTAIL: ['Cocktail', 'Cocktail'] }; return labels[v] ? this.language.text(...labels[v]) : v; }
    status(v) { const labels = { AVAILABLE: ['Disponible', 'Available'], OCCUPIED: ['Occupée', 'Occupied'], BLOCKED: ['Bloquée', 'Blocked'], MAINTENANCE: ['Maintenance', 'Maintenance'] }; return labels[v] ? this.language.text(...labels[v]) : v; }
    static ɵfac = function RoomsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RoomsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RoomsComponent, selectors: [["ng-component"]], decls: 99, vars: 94, consts: [[1, "page-head"], [1, "eyebrow"], [1, "page-actions"], ["type", "button", 1, "btn", "secondary"], ["routerLink", "/nouvelle-demande", 1, "btn", "primary"], [1, "alert", "success"], [1, "filter-panel", 3, "formGroup"], [1, "search-field"], ["formControlName", "q", 3, "placeholder"], ["formControlName", "building"], ["value", ""], ["formControlName", "layout"], ["value", "BOARDROOM"], ["value", "U_SHAPE"], ["value", "CLASSROOM"], ["value", "THEATRE"], ["value", "COCKTAIL"], ["type", "number", "min", "1", "formControlName", "capacity", "placeholder", "Ex. 20"], ["formControlName", "equipment"], ["value", "WIFI"], ["value", "PROJECTION"], ["value", "SOUND"], ["value", "VIDEO_CONF"], ["type", "button", 1, "btn", "secondary", "reset", 3, "click"], [1, "result-line"], [1, "loading", "panel"], [1, "alert", "error"], [1, "empty", "panel"], [1, "room-grid"], ["role", "presentation", 1, "modal-backdrop"], ["type", "button", 1, "btn", "secondary", 3, "click"], [1, "btn", "secondary", 3, "click"], [1, "room-card"], [1, "room-photo"], [3, "src", "alt"], [1, "status-dot"], [1, "room-body"], [1, "room-building"], [1, "capacity-list"], [1, "equipment-line"], [1, "room-foot"], [1, "room-admin-actions"], ["type", "button", 1, "btn", "danger-btn", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "create-room-title", 1, "modal"], [1, "modal-head"], ["id", "create-room-title"], ["type", "button", 1, "icon-btn", "dark", 3, "click"], [1, "room-admin-form", 3, "ngSubmit", "formGroup"], [1, "form-grid"], ["formControlName", "code", "placeholder", "Ex. PAC-03", "maxlength", "30"], [1, "field-help"], ["formControlName", "name", 3, "placeholder"], ["formControlName", "buildingCode"], ["value", "ACADEMIE"], ["value", "PAC"], ["value", "GRAND"], ["formControlName", "location", 3, "placeholder"], ["type", "number", "min", "0", "formControlName", "bufferMinutes"], ["formControlName", "status"], ["value", "AVAILABLE"], ["value", "BLOCKED"], ["value", "MAINTENANCE"], [1, "full"], ["formControlName", "photoUrl"], ["value", "/assets/rooms/meeting.svg"], ["value", "/assets/rooms/auditorium.svg"], ["value", "/assets/rooms/boardroom.svg"], ["value", "/assets/rooms/banquet.svg"], ["value", "/assets/rooms/hall.svg"], ["value", "/assets/rooms/vip.svg"], [1, "photo-editor", "full"], ["multiple", "", "formControlName", "equipmentCodes"], [3, "value", "disabled"], [1, "full", "toggle-row"], ["type", "checkbox", "formControlName", "active"], [1, "capacity-fields"], ["type", "number", "min", "0", "formControlName", "capacityBoardroom"], ["type", "number", "min", "0", "formControlName", "capacityUShape"], ["type", "number", "min", "0", "formControlName", "capacityClassroom"], ["type", "number", "min", "0", "formControlName", "capacityTheatre"], ["type", "number", "min", "0", "formControlName", "capacityCocktail"], [1, "form-actions"], ["type", "submit", 1, "btn", "primary", 3, "disabled"], [1, "btn", "secondary", "photo-upload"], ["type", "file", "accept", "image/png,image/jpeg,image/webp", 3, "change", "disabled"], ["type", "button", 1, "btn", "danger-btn", 3, "click", "disabled"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "delete-room-title", 1, "modal", "user-modal"], ["id", "delete-room-title"], [1, "room-admin-form"], ["rows", "4", "maxlength", "1000", 3, "formControl", "placeholder"], [1, "field-error"]], template: function RoomsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "header", 0)(1, "div")(2, "p", 1);
            i0.ɵɵtext(3, "CATALOGUE ETI");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5);
            i0.ɵɵpipe(6, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p");
            i0.ɵɵtext(8);
            i0.ɵɵpipe(9, "tr");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "div", 2);
            i0.ɵɵconditionalCreate(11, RoomsComponent_Conditional_11_Template, 3, 4, "button", 3);
            i0.ɵɵelementStart(12, "a", 4);
            i0.ɵɵtext(13);
            i0.ɵɵpipe(14, "tr");
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(15, RoomsComponent_Conditional_15_Template, 2, 1, "div", 5);
            i0.ɵɵelementStart(16, "section", 6)(17, "label", 7)(18, "span");
            i0.ɵɵtext(19);
            i0.ɵɵpipe(20, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(21, "input", 8);
            i0.ɵɵpipe(22, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "label")(24, "span");
            i0.ɵɵtext(25);
            i0.ɵɵpipe(26, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "select", 9)(28, "option", 10);
            i0.ɵɵtext(29);
            i0.ɵɵpipe(30, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "option");
            i0.ɵɵtext(32, "Acad\u00E9mie");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "option");
            i0.ɵɵtext(34, "PAC");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "option");
            i0.ɵɵtext(36, "Grand b\u00E2timent");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(37, "label")(38, "span");
            i0.ɵɵtext(39);
            i0.ɵɵpipe(40, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "select", 11)(42, "option", 10);
            i0.ɵɵtext(43);
            i0.ɵɵpipe(44, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "option", 12);
            i0.ɵɵtext(46);
            i0.ɵɵpipe(47, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "option", 13);
            i0.ɵɵtext(49);
            i0.ɵɵpipe(50, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(51, "option", 14);
            i0.ɵɵtext(52);
            i0.ɵɵpipe(53, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "option", 15);
            i0.ɵɵtext(55);
            i0.ɵɵpipe(56, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(57, "option", 16);
            i0.ɵɵtext(58, "Cocktail");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(59, "label")(60, "span");
            i0.ɵɵtext(61);
            i0.ɵɵpipe(62, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(63, "input", 17);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(64, "label")(65, "span");
            i0.ɵɵtext(66);
            i0.ɵɵpipe(67, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(68, "select", 18)(69, "option", 10);
            i0.ɵɵtext(70);
            i0.ɵɵpipe(71, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(72, "option", 19);
            i0.ɵɵtext(73, "Wi-Fi");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(74, "option", 20);
            i0.ɵɵtext(75, "Projection");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(76, "option", 21);
            i0.ɵɵtext(77);
            i0.ɵɵpipe(78, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(79, "option", 22);
            i0.ɵɵtext(80);
            i0.ɵɵpipe(81, "tr");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(82, "button", 23);
            i0.ɵɵlistener("click", function RoomsComponent_Template_button_click_82_listener() { return ctx.reset(); });
            i0.ɵɵtext(83);
            i0.ɵɵpipe(84, "tr");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(85, "div", 24)(86, "b");
            i0.ɵɵtext(87);
            i0.ɵɵpipe(88, "tr");
            i0.ɵɵpipe(89, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(90, "span");
            i0.ɵɵtext(91);
            i0.ɵɵpipe(92, "tr");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(93, RoomsComponent_Conditional_93_Template, 3, 4, "div", 25)(94, RoomsComponent_Conditional_94_Template, 5, 5, "div", 26)(95, RoomsComponent_Conditional_95_Template, 10, 12, "div", 27)(96, RoomsComponent_Conditional_96_Template, 3, 0, "section", 28);
            i0.ɵɵconditionalCreate(97, RoomsComponent_Conditional_97_Template, 131, 133, "div", 29);
            i0.ɵɵconditionalCreate(98, RoomsComponent_Conditional_98_Template, 30, 36, "div", 29);
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 28, "Nos salles", "Our rooms"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(9, 31, "Explorez les espaces ETI et leurs capacit\u00E9s par disposition.", "Explore ETI spaces and their capacities by layout."));
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.auth.hasRole("ADMIN") ? 11 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("\uFF0B ", i0.ɵɵpipeBind2(14, 34, "Nouvelle demande", "New request"));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.success ? 15 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.filters);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(20, 37, "Rechercher", "Search"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind2(22, 40, "Nom d\u2019une salle", "Room name"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(26, 43, "B\u00E2timent", "Building"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(30, 46, "Tous", "All"));
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(40, 49, "Disposition", "Layout"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(44, 52, "Toutes", "All"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(47, 55, "Conseil", "Boardroom"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(50, 58, "Forme en U", "U-shape"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(53, 61, "Classe", "Classroom"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(56, 64, "Th\u00E9\u00E2tre", "Theatre"));
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(62, 67, "Capacit\u00E9 minimale", "Minimum capacity"));
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(67, 70, "\u00C9quipement", "Equipment"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(71, 73, "Tous", "All"));
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(78, 76, "Sonorisation", "Sound system"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(81, 79, "Vid\u00E9oconf\u00E9rence", "Video conference"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(84, 82, "R\u00E9initialiser", "Reset"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate2("", ctx.filtered.length, " ", ctx.filtered.length > 1 ? i0.ɵɵpipeBind2(88, 85, "salles", "rooms") : i0.ɵɵpipeBind2(89, 88, "salle", "room"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(92, 91, "Filtres combinables \u00B7 \u00E9tat synchronis\u00E9 dans l\u2019URL", "Combinable filters \u00B7 state synchronized in the URL"));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.loading ? 93 : ctx.error ? 94 : !ctx.filtered.length ? 95 : 96);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.createOpen ? 97 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.roomToDelete ? 98 : -1);
        } }, dependencies: [CommonModule, ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.CheckboxControlValueAccessor, i1.SelectControlValueAccessor, i1.SelectMultipleControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MaxLengthValidator, i1.MinValidator, i1.FormControlDirective, i1.FormGroupDirective, i1.FormControlName, RouterLink, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RoomsComponent, [{
        type: Component,
        args: [{ standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslatePipe], template: `
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
` }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(RoomsComponent, { className: "RoomsComponent", filePath: "frontend/src/app/pages/rooms.component.ts", lineNumber: 79 }); })();
//# sourceMappingURL=rooms.component.js.map