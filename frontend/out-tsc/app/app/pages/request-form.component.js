import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../core/api.service';
import { AuthService } from '../core/auth.service';
import { LanguageService } from '../core/language.service';
import { TranslatePipe } from '../core/translate.pipe';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.key;
function RequestFormComponent_small_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "tr");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, "L\u2019objet est obligatoire (200 caract\u00E8res maximum).", "The subject is required (200 characters maximum)."));
} }
function RequestFormComponent_small_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "tr");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, "Indiquez au moins 1 participant.", "Enter at least 1 participant."));
} }
function RequestFormComponent_For_97_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "label");
    i0.ɵɵelement(1, "input", 42);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const d_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("formControlName", d_r1.key);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(d_r1.label);
} }
function RequestFormComponent_Conditional_148_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "label", 34);
    i0.ɵɵelement(1, "input", 43);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "tr");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(3, 1, "Demande prioritaire de la hi\u00E9rarchie", "Priority management request"));
} }
function RequestFormComponent_Conditional_149_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.error);
} }
function RequestFormComponent_Conditional_150_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.success);
} }
export class RequestFormComponent {
    fb = inject(FormBuilder);
    api = inject(ApiService);
    router = inject(Router);
    language = inject(LanguageService);
    auth = inject(AuthService);
    sending = false;
    error = '';
    success = '';
    get dayOptions() { const en = this.language.current() === 'en'; return [{ key: 'MONDAY', label: en ? 'Mon' : 'Lun' }, { key: 'TUESDAY', label: en ? 'Tue' : 'Mar' }, { key: 'WEDNESDAY', label: en ? 'Wed' : 'Mer' }, { key: 'THURSDAY', label: en ? 'Thu' : 'Jeu' }, { key: 'FRIDAY', label: en ? 'Fri' : 'Ven' }, { key: 'SATURDAY', label: en ? 'Sat' : 'Sam' }, { key: 'SUNDAY', label: en ? 'Sun' : 'Dim' }]; }
    form = this.fb.nonNullable.group({ subject: ['', [Validators.required, Validators.maxLength(200)]], description: '', participantCount: [1, [Validators.required, Validators.min(1)]], startDate: ['', Validators.required], endDate: ['', Validators.required], startTime: ['09:00', Validators.required], endTime: ['17:00', Validators.required], layout: ['', Validators.required], physicalNeeds: '', observations: '', priority: false, days: this.fb.nonNullable.group({ MONDAY: true, TUESDAY: true, WEDNESDAY: true, THURSDAY: true, FRIDAY: true, SATURDAY: false, SUNDAY: false }), tech: this.fb.nonNullable.group({ WIFI: false, PROJECTION: false, SOUND: false, VIDEO_CONF: false, INTERPRETATION: false, WHITEBOARD: false }) });
    invalid(name) { const c = this.form.controls[name]; return c.touched && c.invalid; }
    submit() { this.form.markAllAsTouched(); if (this.form.invalid)
        return; const v = this.form.getRawValue(); if (v.endDate < v.startDate) {
        this.error = this.language.text('La date de fin doit suivre la date de début.', 'The end date must follow the start date.');
        return;
    } if (v.endTime <= v.startTime) {
        this.error = this.language.text('L’heure de fin doit suivre l’heure de début.', 'The end time must follow the start time.');
        return;
    } const selectedDays = this.dayOptions.filter(d => v.days[d.key]).map(d => d.key); if (!selectedDays.length) {
        this.error = this.language.text('Sélectionnez au moins un jour.', 'Select at least one day.');
        return;
    } const technicalNeeds = Object.entries(v.tech).filter(([, on]) => on).map(([code]) => code).join(','); this.sending = true; this.error = ''; this.api.createRequest({ ...v, layout: v.layout, priority: v.priority ? 'PRIORITY' : 'NORMAL', selectedDays, technicalNeeds, days: undefined, tech: undefined }).subscribe({ next: r => { this.sending = false; this.success = this.language.text(`La demande ${r.reference} a été soumise avec ${r.occurrences.length} occurrence(s).`, `Request ${r.reference} was submitted with ${r.occurrences.length} occurrence(s).`); setTimeout(() => this.router.navigateByUrl(this.auth.hasRole('USER') ? '/mes-demandes' : '/administration/demandes'), 1200); }, error: e => { this.sending = false; this.error = this.language.server(e.error?.message) || this.language.text('Impossible de soumettre la demande.', 'Unable to submit the request.'); } }); }
    reset() { this.form.reset({ participantCount: 1, startTime: '09:00', endTime: '17:00', days: { MONDAY: true, TUESDAY: true, WEDNESDAY: true, THURSDAY: true, FRIDAY: true, SATURDAY: false, SUNDAY: false }, tech: { WIFI: false, PROJECTION: false, SOUND: false, VIDEO_CONF: false, INTERPRETATION: false, WHITEBOARD: false } }); this.error = ''; this.success = ''; }
    static ɵfac = function RequestFormComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RequestFormComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RequestFormComponent, selectors: [["ng-component"]], decls: 210, vars: 195, consts: [[1, "page-head"], [1, "eyebrow"], [1, "btn", "secondary", 3, "routerLink"], [1, "form-layout"], ["novalidate", "", 1, "panel", "request-form", 3, "ngSubmit", "formGroup"], [1, "section-title"], [1, "form-grid"], [1, "full"], ["formControlName", "subject", 3, "placeholder"], [4, "ngIf"], ["type", "number", "min", "1", "formControlName", "participantCount"], ["formControlName", "layout"], ["value", ""], ["value", "BOARDROOM"], ["value", "U_SHAPE"], ["value", "CLASSROOM"], ["value", "THEATRE"], ["value", "COCKTAIL"], ["rows", "3", "formControlName", "description", 3, "placeholder"], ["type", "date", "formControlName", "startDate"], ["type", "date", "formControlName", "endDate"], ["type", "time", "formControlName", "startTime"], ["type", "time", "formControlName", "endTime"], ["formGroupName", "days", 1, "day-picker"], [1, "hint"], ["formGroupName", "tech", 1, "check-grid"], ["type", "checkbox", "formControlName", "WIFI"], ["type", "checkbox", "formControlName", "PROJECTION"], ["type", "checkbox", "formControlName", "SOUND"], ["type", "checkbox", "formControlName", "VIDEO_CONF"], ["type", "checkbox", "formControlName", "INTERPRETATION"], ["type", "checkbox", "formControlName", "WHITEBOARD"], ["rows", "2", "formControlName", "physicalNeeds", 3, "placeholder"], ["rows", "2", "formControlName", "observations"], [1, "priority"], ["role", "alert", 1, "alert", "error"], ["role", "status", 1, "alert", "success"], [1, "form-actions"], ["type", "button", 1, "btn", "secondary", 3, "click"], [1, "btn", "primary", 3, "disabled"], [1, "panel", "form-help"], [1, "note"], ["type", "checkbox", 3, "formControlName"], ["type", "checkbox", "formControlName", "priority"]], template: function RequestFormComponent_Template(rf, ctx) { if (rf & 1) {
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
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "a", 2);
            i0.ɵɵtext(12);
            i0.ɵɵpipe(13, "tr");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "div", 3)(15, "form", 4);
            i0.ɵɵlistener("ngSubmit", function RequestFormComponent_Template_form_ngSubmit_15_listener() { return ctx.submit(); });
            i0.ɵɵelementStart(16, "section")(17, "div", 5)(18, "span");
            i0.ɵɵtext(19, "1");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "div")(21, "h2");
            i0.ɵɵtext(22);
            i0.ɵɵpipe(23, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "p");
            i0.ɵɵtext(25);
            i0.ɵɵpipe(26, "tr");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(27, "div", 6)(28, "label", 7);
            i0.ɵɵtext(29);
            i0.ɵɵpipe(30, "tr");
            i0.ɵɵelement(31, "input", 8);
            i0.ɵɵpipe(32, "tr");
            i0.ɵɵtemplate(33, RequestFormComponent_small_33_Template, 3, 4, "small", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "label");
            i0.ɵɵtext(35);
            i0.ɵɵpipe(36, "tr");
            i0.ɵɵelement(37, "input", 10);
            i0.ɵɵtemplate(38, RequestFormComponent_small_38_Template, 3, 4, "small", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "label");
            i0.ɵɵtext(40);
            i0.ɵɵpipe(41, "tr");
            i0.ɵɵelementStart(42, "select", 11)(43, "option", 12);
            i0.ɵɵtext(44);
            i0.ɵɵpipe(45, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "option", 13);
            i0.ɵɵtext(47);
            i0.ɵɵpipe(48, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "option", 14);
            i0.ɵɵtext(50);
            i0.ɵɵpipe(51, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(52, "option", 15);
            i0.ɵɵtext(53);
            i0.ɵɵpipe(54, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(55, "option", 16);
            i0.ɵɵtext(56);
            i0.ɵɵpipe(57, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(58, "option", 17);
            i0.ɵɵtext(59, "Cocktail");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(60, "label", 7);
            i0.ɵɵtext(61, "Description");
            i0.ɵɵelement(62, "textarea", 18);
            i0.ɵɵpipe(63, "tr");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(64, "section")(65, "div", 5)(66, "span");
            i0.ɵɵtext(67, "2");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(68, "div")(69, "h2");
            i0.ɵɵtext(70);
            i0.ɵɵpipe(71, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(72, "p");
            i0.ɵɵtext(73);
            i0.ɵɵpipe(74, "tr");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(75, "div", 6)(76, "label");
            i0.ɵɵtext(77);
            i0.ɵɵpipe(78, "tr");
            i0.ɵɵelement(79, "input", 19);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(80, "label");
            i0.ɵɵtext(81);
            i0.ɵɵpipe(82, "tr");
            i0.ɵɵelement(83, "input", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(84, "label");
            i0.ɵɵtext(85);
            i0.ɵɵpipe(86, "tr");
            i0.ɵɵelement(87, "input", 21);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(88, "label");
            i0.ɵɵtext(89);
            i0.ɵɵpipe(90, "tr");
            i0.ɵɵelement(91, "input", 22);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(92, "fieldset", 23)(93, "legend");
            i0.ɵɵtext(94);
            i0.ɵɵpipe(95, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(96, RequestFormComponent_For_97_Template, 3, 2, "label", null, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(98, "p", 24);
            i0.ɵɵtext(99);
            i0.ɵɵpipe(100, "tr");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(101, "section")(102, "div", 5)(103, "span");
            i0.ɵɵtext(104, "3");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(105, "div")(106, "h2");
            i0.ɵɵtext(107);
            i0.ɵɵpipe(108, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(109, "p");
            i0.ɵɵtext(110);
            i0.ɵɵpipe(111, "tr");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(112, "fieldset", 25)(113, "legend");
            i0.ɵɵtext(114);
            i0.ɵɵpipe(115, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(116, "label");
            i0.ɵɵelement(117, "input", 26);
            i0.ɵɵtext(118, " Wi-Fi");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(119, "label");
            i0.ɵɵelement(120, "input", 27);
            i0.ɵɵtext(121, " Projection");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(122, "label");
            i0.ɵɵelement(123, "input", 28);
            i0.ɵɵtext(124);
            i0.ɵɵpipe(125, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(126, "label");
            i0.ɵɵelement(127, "input", 29);
            i0.ɵɵtext(128);
            i0.ɵɵpipe(129, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(130, "label");
            i0.ɵɵelement(131, "input", 30);
            i0.ɵɵtext(132);
            i0.ɵɵpipe(133, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(134, "label");
            i0.ɵɵelement(135, "input", 31);
            i0.ɵɵtext(136);
            i0.ɵɵpipe(137, "tr");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(138, "div", 6)(139, "label", 7);
            i0.ɵɵtext(140);
            i0.ɵɵpipe(141, "tr");
            i0.ɵɵelement(142, "textarea", 32);
            i0.ɵɵpipe(143, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(144, "label", 7);
            i0.ɵɵtext(145);
            i0.ɵɵpipe(146, "tr");
            i0.ɵɵelement(147, "textarea", 33);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(148, RequestFormComponent_Conditional_148_Template, 4, 4, "label", 34);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(149, RequestFormComponent_Conditional_149_Template, 2, 1, "div", 35);
            i0.ɵɵconditionalCreate(150, RequestFormComponent_Conditional_150_Template, 2, 1, "div", 36);
            i0.ɵɵelementStart(151, "div", 37)(152, "button", 38);
            i0.ɵɵlistener("click", function RequestFormComponent_Template_button_click_152_listener() { return ctx.reset(); });
            i0.ɵɵtext(153);
            i0.ɵɵpipe(154, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(155, "button", 39);
            i0.ɵɵtext(156);
            i0.ɵɵpipe(157, "tr");
            i0.ɵɵpipe(158, "tr");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(159, "aside", 40)(160, "h2");
            i0.ɵɵtext(161);
            i0.ɵɵpipe(162, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(163, "ol")(164, "li")(165, "span");
            i0.ɵɵtext(166, "1");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(167, "div")(168, "b");
            i0.ɵɵtext(169);
            i0.ɵɵpipe(170, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(171, "small");
            i0.ɵɵtext(172);
            i0.ɵɵpipe(173, "tr");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(174, "li")(175, "span");
            i0.ɵɵtext(176, "2");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(177, "div")(178, "b");
            i0.ɵɵtext(179);
            i0.ɵɵpipe(180, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(181, "small");
            i0.ɵɵtext(182);
            i0.ɵɵpipe(183, "tr");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(184, "li")(185, "span");
            i0.ɵɵtext(186, "3");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(187, "div")(188, "b");
            i0.ɵɵtext(189);
            i0.ɵɵpipe(190, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(191, "small");
            i0.ɵɵtext(192);
            i0.ɵɵpipe(193, "tr");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(194, "li")(195, "span");
            i0.ɵɵtext(196, "4");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(197, "div")(198, "b");
            i0.ɵɵtext(199);
            i0.ɵɵpipe(200, "tr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(201, "small");
            i0.ɵɵtext(202);
            i0.ɵɵpipe(203, "tr");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(204, "div", 41)(205, "b");
            i0.ɵɵtext(206, "Important");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(207, "p");
            i0.ɵɵtext(208);
            i0.ɵɵpipe(209, "tr");
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(4, 54, "NOUVELLE DEMANDE", "NEW REQUEST"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(7, 57, "Organiser une r\u00E9union", "Organize a meeting"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(10, 60, "D\u00E9crivez votre besoin. La salle sera v\u00E9rifi\u00E9e et assign\u00E9e par l\u2019administrateur.", "Describe your needs. The room will be checked and assigned by the administrator."));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("routerLink", ctx.auth.hasRole("ADMIN") ? "/administration/demandes" : "/mes-demandes");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(13, 63, "Annuler", "Cancel"));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(23, 66, "Informations g\u00E9n\u00E9rales", "General information"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(26, 69, "Contexte et dimension de la r\u00E9union", "Meeting context and size"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(30, 72, "Objet de la r\u00E9union", "Meeting subject"), " *");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind2(32, 75, "Ex. Formation conformit\u00E9 r\u00E9gionale", "E.g. Regional compliance training"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.invalid("subject"));
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(36, 78, "Nombre de participants", "Number of participants"), " *");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.invalid("participantCount"));
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(41, 81, "Disposition souhait\u00E9e", "Preferred layout"), " *");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(45, 84, "S\u00E9lectionner", "Select"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(48, 87, "Conseil", "Boardroom"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(51, 90, "Forme en U", "U-shape"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(54, 93, "Classe", "Classroom"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(57, 96, "Th\u00E9\u00E2tre", "Theatre"));
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind2(63, 99, "Objectif, public, contexte\u2026", "Purpose, audience, context\u2026"));
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(71, 102, "P\u00E9riode et horaires", "Dates and times"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(74, 105, "Une occurrence distincte sera cr\u00E9\u00E9e pour chaque jour choisi", "A separate occurrence will be created for each selected day"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(78, 108, "Date de d\u00E9but", "Start date"), " *");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(82, 111, "Date de fin", "End date"), " *");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(86, 114, "Heure de d\u00E9but", "Start time"), " *");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(90, 117, "Heure de fin", "End time"), " *");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(95, 120, "Jours concern\u00E9s", "Selected days"));
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.dayOptions);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(100, 123, "Exemple : du lundi au mercredi, 9 h\u201317 h, cr\u00E9e trois cr\u00E9neaux quotidiens ; les soir\u00E9es restent libres.", "Example: Monday to Wednesday, 9 a.m.\u20135 p.m., creates three daily slots; evenings remain free."));
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(108, 126, "Besoins", "Requirements"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(111, 129, "Les \u00E9quipements seront contr\u00F4l\u00E9s sur chaque occurrence", "Equipment will be checked for every occurrence"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(115, 132, "Besoins techniques", "Technical requirements"));
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(125, 135, "Sonorisation", "Sound system"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(129, 138, "Vid\u00E9oconf\u00E9rence", "Video conference"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(133, 141, "Interpr\u00E9tation", "Interpretation"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(137, 144, "Tableau blanc mobile", "Mobile whiteboard"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(141, 147, "Besoins physiques", "Physical requirements"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind2(143, 150, "Mobilier, accessibilit\u00E9, climatisation\u2026", "Furniture, accessibility, air conditioning\u2026"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(146, 153, "Observations", "Notes"));
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.auth.hasRole("ADMIN") ? 148 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.error ? 149 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.success ? 150 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(154, 156, "R\u00E9initialiser", "Reset"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.form.invalid || ctx.sending);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.sending ? i0.ɵɵpipeBind2(157, 159, "Envoi en cours\u2026", "Submitting\u2026") : i0.ɵɵpipeBind2(158, 162, "Soumettre la demande", "Submit request"));
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(162, 165, "Comment \u00E7a marche ?", "How does it work?"));
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(170, 168, "Vous exprimez le besoin", "You describe the need"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(173, 171, "Aucune salle n\u2019est choisie ici.", "No room is selected here."));
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(180, 174, "L\u2019administrateur v\u00E9rifie", "The administrator checks"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(183, 177, "Les 14 salles restent visibles, avec les motifs d\u2019incompatibilit\u00E9.", "All 14 rooms remain visible with incompatibility reasons."));
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(190, 180, "Facility et IT valident", "Facility and IT approve"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(193, 183, "Les contraintes physiques et techniques sont contr\u00F4l\u00E9es.", "Physical and technical constraints are checked."));
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(200, 186, "La r\u00E9servation est confirm\u00E9e", "The reservation is confirmed"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(203, 189, "Vous recevez une notification persistante.", "You receive a persistent notification."));
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(209, 192, "Une modification est possible jusqu\u2019\u00E0 plus d\u2019une heure avant la prochaine occurrence.", "Changes are allowed until more than one hour before the next occurrence."));
        } }, dependencies: [CommonModule, i1.NgIf, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.CheckboxControlValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.MinValidator, i2.FormGroupDirective, i2.FormControlName, i2.FormGroupName, RouterLink, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RequestFormComponent, [{
        type: Component,
        args: [{ standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslatePipe], template: `
<header class="page-head"><div><p class="eyebrow">{{'NOUVELLE DEMANDE'|tr:'NEW REQUEST'}}</p><h1>{{'Organiser une réunion'|tr:'Organize a meeting'}}</h1><p>{{'Décrivez votre besoin. La salle sera vérifiée et assignée par l’administrateur.'|tr:'Describe your needs. The room will be checked and assigned by the administrator.'}}</p></div><a class="btn secondary" [routerLink]="auth.hasRole('ADMIN')?'/administration/demandes':'/mes-demandes'">{{'Annuler'|tr:'Cancel'}}</a></header>
<div class="form-layout"><form class="panel request-form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
  <section><div class="section-title"><span>1</span><div><h2>{{'Informations générales'|tr:'General information'}}</h2><p>{{'Contexte et dimension de la réunion'|tr:'Meeting context and size'}}</p></div></div>
    <div class="form-grid"><label class="full">{{'Objet de la réunion'|tr:'Meeting subject'}} *<input formControlName="subject" [placeholder]="'Ex. Formation conformité régionale'|tr:'E.g. Regional compliance training'"><small *ngIf="invalid('subject')">{{'L’objet est obligatoire (200 caractères maximum).'|tr:'The subject is required (200 characters maximum).'}}</small></label>
    <label>{{'Nombre de participants'|tr:'Number of participants'}} *<input type="number" min="1" formControlName="participantCount"><small *ngIf="invalid('participantCount')">{{'Indiquez au moins 1 participant.'|tr:'Enter at least 1 participant.'}}</small></label>
    <label>{{'Disposition souhaitée'|tr:'Preferred layout'}} *<select formControlName="layout"><option value="">{{'Sélectionner'|tr:'Select'}}</option><option value="BOARDROOM">{{'Conseil'|tr:'Boardroom'}}</option><option value="U_SHAPE">{{'Forme en U'|tr:'U-shape'}}</option><option value="CLASSROOM">{{'Classe'|tr:'Classroom'}}</option><option value="THEATRE">{{'Théâtre'|tr:'Theatre'}}</option><option value="COCKTAIL">Cocktail</option></select></label>
    <label class="full">Description<textarea rows="3" formControlName="description" [placeholder]="'Objectif, public, contexte…'|tr:'Purpose, audience, context…'"></textarea></label></div>
  </section>
  <section><div class="section-title"><span>2</span><div><h2>{{'Période et horaires'|tr:'Dates and times'}}</h2><p>{{'Une occurrence distincte sera créée pour chaque jour choisi'|tr:'A separate occurrence will be created for each selected day'}}</p></div></div>
    <div class="form-grid"><label>{{'Date de début'|tr:'Start date'}} *<input type="date" formControlName="startDate"></label><label>{{'Date de fin'|tr:'End date'}} *<input type="date" formControlName="endDate"></label><label>{{'Heure de début'|tr:'Start time'}} *<input type="time" formControlName="startTime"></label><label>{{'Heure de fin'|tr:'End time'}} *<input type="time" formControlName="endTime"></label></div>
    <fieldset formGroupName="days" class="day-picker"><legend>{{'Jours concernés'|tr:'Selected days'}}</legend>@for(d of dayOptions;track d.key){<label><input type="checkbox" [formControlName]="d.key">{{d.label}}</label>}</fieldset>
    <p class="hint">{{'Exemple : du lundi au mercredi, 9 h–17 h, crée trois créneaux quotidiens ; les soirées restent libres.'|tr:'Example: Monday to Wednesday, 9 a.m.–5 p.m., creates three daily slots; evenings remain free.'}}</p>
  </section>
  <section><div class="section-title"><span>3</span><div><h2>{{'Besoins'|tr:'Requirements'}}</h2><p>{{'Les équipements seront contrôlés sur chaque occurrence'|tr:'Equipment will be checked for every occurrence'}}</p></div></div>
    <fieldset formGroupName="tech" class="check-grid"><legend>{{'Besoins techniques'|tr:'Technical requirements'}}</legend><label><input type="checkbox" formControlName="WIFI"> Wi-Fi</label><label><input type="checkbox" formControlName="PROJECTION"> Projection</label><label><input type="checkbox" formControlName="SOUND"> {{'Sonorisation'|tr:'Sound system'}}</label><label><input type="checkbox" formControlName="VIDEO_CONF"> {{'Vidéoconférence'|tr:'Video conference'}}</label><label><input type="checkbox" formControlName="INTERPRETATION"> {{'Interprétation'|tr:'Interpretation'}}</label><label><input type="checkbox" formControlName="WHITEBOARD"> {{'Tableau blanc mobile'|tr:'Mobile whiteboard'}}</label></fieldset>
    <div class="form-grid"><label class="full">{{'Besoins physiques'|tr:'Physical requirements'}}<textarea rows="2" formControlName="physicalNeeds" [placeholder]="'Mobilier, accessibilité, climatisation…'|tr:'Furniture, accessibility, air conditioning…'"></textarea></label><label class="full">{{'Observations'|tr:'Notes'}}<textarea rows="2" formControlName="observations"></textarea></label></div>
    @if(auth.hasRole('ADMIN')){<label class="priority"><input type="checkbox" formControlName="priority"> {{'Demande prioritaire de la hiérarchie'|tr:'Priority management request'}}</label>}
  </section>
  @if(error){<div class="alert error" role="alert">{{error}}</div>}@if(success){<div class="alert success" role="status">{{success}}</div>}
  <div class="form-actions"><button type="button" class="btn secondary" (click)="reset()">{{'Réinitialiser'|tr:'Reset'}}</button><button class="btn primary" [disabled]="form.invalid||sending">{{sending?('Envoi en cours…'|tr:'Submitting…'):('Soumettre la demande'|tr:'Submit request')}}</button></div>
</form><aside class="panel form-help"><h2>{{'Comment ça marche ?'|tr:'How does it work?'}}</h2><ol><li><span>1</span><div><b>{{'Vous exprimez le besoin'|tr:'You describe the need'}}</b><small>{{'Aucune salle n’est choisie ici.'|tr:'No room is selected here.'}}</small></div></li><li><span>2</span><div><b>{{'L’administrateur vérifie'|tr:'The administrator checks'}}</b><small>{{'Les 14 salles restent visibles, avec les motifs d’incompatibilité.'|tr:'All 14 rooms remain visible with incompatibility reasons.'}}</small></div></li><li><span>3</span><div><b>{{'Facility et IT valident'|tr:'Facility and IT approve'}}</b><small>{{'Les contraintes physiques et techniques sont contrôlées.'|tr:'Physical and technical constraints are checked.'}}</small></div></li><li><span>4</span><div><b>{{'La réservation est confirmée'|tr:'The reservation is confirmed'}}</b><small>{{'Vous recevez une notification persistante.'|tr:'You receive a persistent notification.'}}</small></div></li></ol><div class="note"><b>Important</b><p>{{'Une modification est possible jusqu’à plus d’une heure avant la prochaine occurrence.'|tr:'Changes are allowed until more than one hour before the next occurrence.'}}</p></div></aside></div>` }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(RequestFormComponent, { className: "RequestFormComponent", filePath: "frontend/src/app/pages/request-form.component.ts", lineNumber: 32 }); })();
//# sourceMappingURL=request-form.component.js.map