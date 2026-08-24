import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../core/api.service';
import { AuthService } from '../core/auth.service';
import { LanguageService } from '../core/language.service';
import { TranslatePipe } from '../core/translate.pipe';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
function UsersManagementComponent_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.message);
} }
function UsersManagementComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
function UsersManagementComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "tr");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, "Chargement des utilisateurs\u2026", "Loading users\u2026"));
} }
function UsersManagementComponent_Conditional_17_For_25_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "tr");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, "Votre compte", "Your account"));
} }
function UsersManagementComponent_Conditional_17_For_25_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "b");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(4, UsersManagementComponent_Conditional_17_For_25_Conditional_4_Template, 3, 4, "small");
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
    i0.ɵɵelementStart(11, "td")(12, "span", 9);
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "tr");
    i0.ɵɵpipe(15, "tr");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "td")(17, "div", 10)(18, "button", 11);
    i0.ɵɵlistener("click", function UsersManagementComponent_Conditional_17_For_25_Template_button_click_18_listener() { const u_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.openEdit(u_r3)); });
    i0.ɵɵtext(19);
    i0.ɵɵpipe(20, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "button", 12);
    i0.ɵɵlistener("click", function UsersManagementComponent_Conditional_17_For_25_Template_button_click_21_listener() { const u_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.remove(u_r3)); });
    i0.ɵɵtext(22);
    i0.ɵɵpipe(23, "tr");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    let tmp_12_0;
    let tmp_19_0;
    const u_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(u_r3.fullName);
    i0.ɵɵadvance();
    i0.ɵɵconditional(u_r3.id === ((tmp_12_0 = ctx_r0.auth.user()) == null ? null : tmp_12_0.id) ? 4 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(u_r3.email);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.roleLabel(u_r3.role));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.languageLabel(u_r3.language));
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-status", u_r3.active ? "CONFIRMED" : "CANCELLED");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(u_r3.active ? i0.ɵɵpipeBind2(14, 10, "Actif", "Active") : i0.ɵɵpipeBind2(15, 13, "Inactif", "Inactive"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(20, 16, "Modifier", "Edit"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", u_r3.id === ((tmp_19_0 = ctx_r0.auth.user()) == null ? null : tmp_19_0.id));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(23, 19, "Supprimer", "Delete"));
} }
function UsersManagementComponent_Conditional_17_ForEmpty_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 13);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "tr");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(3, 1, "Aucun utilisateur.", "No users."));
} }
function UsersManagementComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 6)(1, "div", 8)(2, "table")(3, "thead")(4, "tr")(5, "th");
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
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(23, "tbody");
    i0.ɵɵrepeaterCreate(24, UsersManagementComponent_Conditional_17_For_25_Template, 24, 22, "tr", null, _forTrack0, false, UsersManagementComponent_Conditional_17_ForEmpty_26_Template, 4, 4, "tr");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(7, 7, "Nom", "Name"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(10, 10, "E-mail", "Email"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(13, 13, "R\u00F4le", "Role"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(16, 16, "Langue", "Language"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(19, 19, "\u00C9tat", "Status"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(22, 22, "Actions", "Actions"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.users);
} }
function UsersManagementComponent_Conditional_18_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
function UsersManagementComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7)(1, "section", 14)(2, "header", 15)(3, "div")(4, "h2", 16);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "tr");
    i0.ɵɵpipe(7, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p");
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "tr");
    i0.ɵɵpipe(11, "tr");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "button", 17);
    i0.ɵɵpipe(13, "tr");
    i0.ɵɵlistener("click", function UsersManagementComponent_Conditional_18_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.close()); });
    i0.ɵɵtext(14, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "form", 18);
    i0.ɵɵlistener("ngSubmit", function UsersManagementComponent_Conditional_18_Template_form_ngSubmit_15_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.save()); });
    i0.ɵɵconditionalCreate(16, UsersManagementComponent_Conditional_18_Conditional_16_Template, 2, 1, "div", 4);
    i0.ɵɵelementStart(17, "div", 19)(18, "label");
    i0.ɵɵtext(19);
    i0.ɵɵpipe(20, "tr");
    i0.ɵɵelement(21, "input", 20);
    i0.ɵɵpipe(22, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "label");
    i0.ɵɵtext(24);
    i0.ɵɵpipe(25, "tr");
    i0.ɵɵelement(26, "input", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "label");
    i0.ɵɵtext(28);
    i0.ɵɵpipe(29, "tr");
    i0.ɵɵelementStart(30, "select", 22)(31, "option", 23);
    i0.ɵɵtext(32);
    i0.ɵɵpipe(33, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "option", 24);
    i0.ɵɵtext(35);
    i0.ɵɵpipe(36, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "option", 25);
    i0.ɵɵtext(38, "Facility");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "option", 26);
    i0.ɵɵtext(40);
    i0.ɵɵpipe(41, "tr");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(42, "label");
    i0.ɵɵtext(43);
    i0.ɵɵpipe(44, "tr");
    i0.ɵɵelementStart(45, "select", 27)(46, "option", 28);
    i0.ɵɵtext(47);
    i0.ɵɵpipe(48, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "option", 29);
    i0.ɵɵtext(50);
    i0.ɵɵpipe(51, "tr");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(52, "label", 30);
    i0.ɵɵtext(53);
    i0.ɵɵpipe(54, "tr");
    i0.ɵɵpipe(55, "tr");
    i0.ɵɵelement(56, "input", 31);
    i0.ɵɵpipe(57, "tr");
    i0.ɵɵelementStart(58, "span", 32);
    i0.ɵɵtext(59);
    i0.ɵɵpipe(60, "tr");
    i0.ɵɵpipe(61, "tr");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(62, "label", 33);
    i0.ɵɵelement(63, "input", 34);
    i0.ɵɵtext(64);
    i0.ɵɵpipe(65, "tr");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(66, "footer", 35)(67, "button", 36);
    i0.ɵɵlistener("click", function UsersManagementComponent_Conditional_18_Template_button_click_67_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.close()); });
    i0.ɵɵtext(68);
    i0.ɵɵpipe(69, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(70, "button", 37);
    i0.ɵɵtext(71);
    i0.ɵɵpipe(72, "tr");
    i0.ɵɵpipe(73, "tr");
    i0.ɵɵpipe(74, "tr");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.editing ? i0.ɵɵpipeBind2(6, 23, "Modifier l\u2019utilisateur", "Edit user") : i0.ɵɵpipeBind2(7, 26, "Cr\u00E9er un utilisateur", "Create user"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.editing ? i0.ɵɵpipeBind2(10, 29, "Mettez \u00E0 jour son identit\u00E9, son r\u00F4le et son acc\u00E8s.", "Update identity, role and access.") : i0.ɵɵpipeBind2(11, 32, "D\u00E9finissez ses identifiants et ses droits initiaux.", "Set initial credentials and permissions."));
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind2(13, 35, "Fermer", "Close"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("formGroup", ctx_r0.form);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.error ? 16 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(20, 38, "Nom complet", "Full name"), " *");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind2(22, 41, "Pr\u00E9nom et nom", "First and last name"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(25, 44, "Adresse e-mail", "Email address"), " *");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(29, 47, "R\u00F4le", "Role"), " *");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(33, 50, "Demandeur", "Requester"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(36, 53, "Administrateur", "Administrator"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(41, 56, "Personnel IT", "IT staff"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(44, 59, "Langue", "Language"), " *");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(48, 62, "Fran\u00E7ais", "French"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(51, 65, "Anglais", "English"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", ctx_r0.editing ? i0.ɵɵpipeBind2(54, 68, "Nouveau mot de passe", "New password") : i0.ɵɵpipeBind2(55, 71, "Mot de passe initial", "Initial password"), "", ctx_r0.editing ? "" : " *");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind2(57, 74, "10 caract\u00E8res minimum", "At least 10 characters"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.editing ? i0.ɵɵpipeBind2(60, 77, "Laissez vide pour conserver le mot de passe actuel.", "Leave blank to keep the current password.") : i0.ɵɵpipeBind2(61, 80, "Communiquez-le \u00E0 l\u2019utilisateur par un canal s\u00E9curis\u00E9.", "Share it with the user through a secure channel."));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(65, 83, "Compte actif : l\u2019utilisateur peut se connecter", "Active account: the user can sign in"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(69, 86, "Annuler", "Cancel"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.saving);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.saving ? i0.ɵɵpipeBind2(72, 89, "Enregistrement\u2026", "Saving\u2026") : ctx_r0.editing ? i0.ɵɵpipeBind2(73, 92, "Enregistrer les modifications", "Save changes") : i0.ɵɵpipeBind2(74, 95, "Cr\u00E9er le compte", "Create account"));
} }
export class UsersManagementComponent {
    api = inject(ApiService);
    fb = inject(FormBuilder);
    auth = inject(AuthService);
    language = inject(LanguageService);
    users = [];
    loading = true;
    modalOpen = false;
    saving = false;
    editing = null;
    message = '';
    error = '';
    form = this.fb.nonNullable.group({
        fullName: ['', [Validators.required, Validators.maxLength(160)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(190)]],
        password: ['', [Validators.minLength(10), Validators.maxLength(100)]],
        role: ['USER', Validators.required], language: ['fr', [Validators.required, Validators.pattern(/^(fr|en)$/)]], active: true
    });
    ngOnInit() { this.load(); }
    load() { this.loading = true; this.api.users().subscribe({ next: r => { this.users = r; this.loading = false; }, error: e => { this.loading = false; this.error = this.language.server(e.error?.message) || this.language.text('Chargement impossible.', 'Unable to load users.'); } }); }
    openCreate() { this.editing = null; this.error = ''; this.message = ''; this.form.reset({ fullName: '', email: '', password: '', role: 'USER', language: this.language.current(), active: true }); this.form.controls.password.addValidators(Validators.required); this.form.controls.password.updateValueAndValidity(); this.modalOpen = true; }
    openEdit(user) { this.editing = user; this.error = ''; this.message = ''; this.form.controls.password.removeValidators(Validators.required); this.form.controls.password.updateValueAndValidity(); this.form.reset({ fullName: user.fullName, email: user.email, password: '', role: user.role, language: user.language, active: user.active }); this.modalOpen = true; }
    close() { if (!this.saving) {
        this.modalOpen = false;
        this.error = '';
    } }
    save() {
        this.form.markAllAsTouched();
        if (this.form.invalid)
            return;
        this.saving = true;
        this.error = '';
        const data = this.form.getRawValue();
        const request = this.editing ? this.api.updateUser(this.editing.id, data) : this.api.createUser(data);
        request.subscribe({ next: user => { this.saving = false; this.modalOpen = false; if (this.editing)
                this.users = this.users.map(u => u.id === user.id ? user : u);
            else
                this.users = [...this.users, user].sort((a, b) => a.fullName.localeCompare(b.fullName)); this.message = this.editing ? this.language.text('Utilisateur modifié.', 'User updated.') : this.language.text('Utilisateur créé.', 'User created.'); this.editing = null; }, error: e => { this.saving = false; this.error = this.language.server(e.error?.message) || this.language.text('Enregistrement impossible.', 'Unable to save.'); } });
    }
    remove(user) {
        if (user.id === this.auth.user()?.id)
            return;
        const promptText = this.language.text(`Supprimer le compte de ${user.fullName} ?\n\nS’il possède un historique, il sera archivé et ne pourra plus se connecter.`, `Delete ${user.fullName}'s account?\n\nIf it has a history, it will be archived and will no longer be able to sign in.`);
        if (!confirm(promptText))
            return;
        this.error = '';
        this.api.deleteUser(user.id).subscribe({ next: () => { this.users = this.users.filter(u => u.id !== user.id); this.message = this.language.text('Utilisateur supprimé ou archivé.', 'User deleted or archived.'); }, error: e => this.error = this.language.server(e.error?.message) || this.language.text('Suppression impossible.', 'Unable to delete user.') });
    }
    roleLabel(role) { const labels = { USER: ['Demandeur', 'Requester'], ADMIN: ['Administrateur', 'Administrator'], FACILITY: ['Facility', 'Facility'], IT: ['Personnel IT', 'IT staff'] }; return this.language.text(...labels[role]); }
    languageLabel(language) { return language === 'fr' ? this.language.text('Français', 'French') : this.language.text('Anglais', 'English'); }
    static ɵfac = function UsersManagementComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UsersManagementComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UsersManagementComponent, selectors: [["ng-component"]], decls: 19, vars: 20, consts: [[1, "page-head"], [1, "eyebrow"], ["type", "button", 1, "btn", "primary", 3, "click"], [1, "alert", "success"], [1, "alert", "error"], [1, "panel", "loading"], [1, "panel", "table-panel"], [1, "modal-backdrop"], [1, "table-scroll"], [1, "badge"], [1, "actions"], ["type", "button", 1, "btn", "tiny", 3, "click"], ["type", "button", 1, "btn", "tiny", "danger-btn", 3, "click", "disabled"], ["colspan", "6", 1, "center"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "user-form-title", 1, "modal", "user-modal"], [1, "modal-head"], ["id", "user-form-title"], ["type", "button", 1, "icon-btn", "dark", 3, "click"], [1, "room-admin-form", 3, "ngSubmit", "formGroup"], [1, "form-grid"], ["formControlName", "fullName", "maxlength", "160", 3, "placeholder"], ["type", "email", "formControlName", "email", "maxlength", "190", "placeholder", "prenom.nom@ecobank.com"], ["formControlName", "role"], ["value", "USER"], ["value", "ADMIN"], ["value", "FACILITY"], ["value", "IT"], ["formControlName", "language"], ["value", "fr"], ["value", "en"], [1, "full"], ["type", "password", "formControlName", "password", "autocomplete", "new-password", 3, "placeholder"], [1, "field-help"], [1, "full", "toggle-row"], ["type", "checkbox", "formControlName", "active"], [1, "form-actions"], ["type", "button", 1, "btn", "secondary", 3, "click"], ["type", "submit", 1, "btn", "primary", 3, "disabled"]], template: function UsersManagementComponent_Template(rf, ctx) { if (rf & 1) {
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
            i0.ɵɵelementStart(11, "button", 2);
            i0.ɵɵlistener("click", function UsersManagementComponent_Template_button_click_11_listener() { return ctx.openCreate(); });
            i0.ɵɵtext(12);
            i0.ɵɵpipe(13, "tr");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(14, UsersManagementComponent_Conditional_14_Template, 2, 1, "div", 3);
            i0.ɵɵconditionalCreate(15, UsersManagementComponent_Conditional_15_Template, 2, 1, "div", 4);
            i0.ɵɵconditionalCreate(16, UsersManagementComponent_Conditional_16_Template, 3, 4, "div", 5)(17, UsersManagementComponent_Conditional_17_Template, 27, 25, "section", 6);
            i0.ɵɵconditionalCreate(18, UsersManagementComponent_Conditional_18_Template, 75, 98, "div", 7);
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(4, 8, "ADMINISTRATION", "ADMINISTRATION"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(7, 11, "Utilisateurs et r\u00F4les", "Users and roles"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(10, 14, "Cr\u00E9ez les comptes, modifiez leurs acc\u00E8s ou supprimez-les en conservant l\u2019historique sensible.", "Create accounts, update access or delete them while preserving sensitive history."));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("\uFF0B ", i0.ɵɵpipeBind2(13, 17, "Cr\u00E9er un utilisateur", "Create user"));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.message ? 14 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.error && !ctx.modalOpen ? 15 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading ? 16 : 17);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.modalOpen ? 18 : -1);
        } }, dependencies: [CommonModule, ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.CheckboxControlValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MaxLengthValidator, i1.FormGroupDirective, i1.FormControlName, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UsersManagementComponent, [{
        type: Component,
        args: [{
                standalone: true,
                imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
                template: `
    <header class="page-head">
      <div><p class="eyebrow">{{'ADMINISTRATION'|tr:'ADMINISTRATION'}}</p><h1>{{'Utilisateurs et rôles'|tr:'Users and roles'}}</h1><p>{{'Créez les comptes, modifiez leurs accès ou supprimez-les en conservant l’historique sensible.'|tr:'Create accounts, update access or delete them while preserving sensitive history.'}}</p></div>
      <button class="btn primary" type="button" (click)="openCreate()">＋ {{'Créer un utilisateur'|tr:'Create user'}}</button>
    </header>

    @if(message){<div class="alert success">{{message}}</div>}
    @if(error&&!modalOpen){<div class="alert error">{{error}}</div>}
    @if(loading){<div class="panel loading">{{'Chargement des utilisateurs…'|tr:'Loading users…'}}</div>}
    @else{
      <section class="panel table-panel"><div class="table-scroll"><table>
        <thead><tr><th>{{'Nom'|tr:'Name'}}</th><th>{{'E-mail'|tr:'Email'}}</th><th>{{'Rôle'|tr:'Role'}}</th><th>{{'Langue'|tr:'Language'}}</th><th>{{'État'|tr:'Status'}}</th><th>{{'Actions'|tr:'Actions'}}</th></tr></thead>
        <tbody>@for(u of users;track u.id){<tr>
          <td><b>{{u.fullName}}</b>@if(u.id===auth.user()?.id){<small>{{'Votre compte'|tr:'Your account'}}</small>}</td>
          <td>{{u.email}}</td><td>{{roleLabel(u.role)}}</td><td>{{languageLabel(u.language)}}</td>
          <td><span class="badge" [attr.data-status]="u.active?'CONFIRMED':'CANCELLED'">{{u.active?('Actif'|tr:'Active'):('Inactif'|tr:'Inactive')}}</span></td>
          <td><div class="actions"><button class="btn tiny" type="button" (click)="openEdit(u)">{{'Modifier'|tr:'Edit'}}</button><button class="btn tiny danger-btn" type="button" [disabled]="u.id===auth.user()?.id" (click)="remove(u)">{{'Supprimer'|tr:'Delete'}}</button></div></td>
        </tr>}@empty{<tr><td colspan="6" class="center">{{'Aucun utilisateur.'|tr:'No users.'}}</td></tr>}</tbody>
      </table></div></section>
    }

    @if(modalOpen){<div class="modal-backdrop">
      <section class="modal user-modal" role="dialog" aria-modal="true" aria-labelledby="user-form-title">
        <header class="modal-head"><div><h2 id="user-form-title">{{editing?('Modifier l’utilisateur'|tr:'Edit user'):('Créer un utilisateur'|tr:'Create user')}}</h2><p>{{editing?('Mettez à jour son identité, son rôle et son accès.'|tr:'Update identity, role and access.'):('Définissez ses identifiants et ses droits initiaux.'|tr:'Set initial credentials and permissions.')}}</p></div><button class="icon-btn dark" type="button" (click)="close()" [attr.aria-label]="'Fermer'|tr:'Close'">×</button></header>
        <form class="room-admin-form" [formGroup]="form" (ngSubmit)="save()">
          @if(error){<div class="alert error">{{error}}</div>}
          <div class="form-grid">
            <label>{{'Nom complet'|tr:'Full name'}} *<input formControlName="fullName" maxlength="160" [placeholder]="'Prénom et nom'|tr:'First and last name'"></label>
            <label>{{'Adresse e-mail'|tr:'Email address'}} *<input type="email" formControlName="email" maxlength="190" placeholder="prenom.nom@ecobank.com"></label>
            <label>{{'Rôle'|tr:'Role'}} *<select formControlName="role"><option value="USER">{{'Demandeur'|tr:'Requester'}}</option><option value="ADMIN">{{'Administrateur'|tr:'Administrator'}}</option><option value="FACILITY">Facility</option><option value="IT">{{'Personnel IT'|tr:'IT staff'}}</option></select></label>
            <label>{{'Langue'|tr:'Language'}} *<select formControlName="language"><option value="fr">{{'Français'|tr:'French'}}</option><option value="en">{{'Anglais'|tr:'English'}}</option></select></label>
            <label class="full">{{editing?('Nouveau mot de passe'|tr:'New password'):('Mot de passe initial'|tr:'Initial password')}}{{editing?'':' *'}}<input type="password" formControlName="password" autocomplete="new-password" [placeholder]="'10 caractères minimum'|tr:'At least 10 characters'"><span class="field-help">{{editing?('Laissez vide pour conserver le mot de passe actuel.'|tr:'Leave blank to keep the current password.'):('Communiquez-le à l’utilisateur par un canal sécurisé.'|tr:'Share it with the user through a secure channel.')}}</span></label>
            <label class="full toggle-row"><input type="checkbox" formControlName="active"> {{'Compte actif : l’utilisateur peut se connecter'|tr:'Active account: the user can sign in'}}</label>
          </div>
          <footer class="form-actions"><button class="btn secondary" type="button" (click)="close()">{{'Annuler'|tr:'Cancel'}}</button><button class="btn primary" type="submit" [disabled]="saving">{{saving?('Enregistrement…'|tr:'Saving…'):editing?('Enregistrer les modifications'|tr:'Save changes'):('Créer le compte'|tr:'Create account')}}</button></footer>
        </form>
      </section>
    </div>}
  `
            }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(UsersManagementComponent, { className: "UsersManagementComponent", filePath: "frontend/src/app/pages/users-management.component.ts", lineNumber: 53 }); })();
//# sourceMappingURL=users-management.component.js.map