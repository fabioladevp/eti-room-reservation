import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import * as i0 from "@angular/core";
const API = '/api';
export class AuthService {
    http = inject(HttpClient);
    router = inject(Router);
    userState = signal(this.readUser(), ...(ngDevMode ? [{ debugName: "userState" }] : /* istanbul ignore next */ []));
    user = this.userState.asReadonly();
    isAuthenticated = computed(() => !!this.userState(), ...(ngDevMode ? [{ debugName: "isAuthenticated" }] : /* istanbul ignore next */ []));
    role = computed(() => this.userState()?.role ?? null, ...(ngDevMode ? [{ debugName: "role" }] : /* istanbul ignore next */ []));
    login(email, password) {
        return this.http.post(`${API}/auth/login`, { email, password }).pipe(tap(r => {
            localStorage.setItem('eti_token', r.token);
            localStorage.setItem('eti_user', JSON.stringify(r.user));
            this.userState.set(r.user);
        }));
    }
    logout() { localStorage.removeItem('eti_token'); localStorage.removeItem('eti_user'); this.userState.set(null); this.router.navigateByUrl('/connexion'); }
    hasRole(...roles) { const role = this.role(); return role !== null && roles.includes(role); }
    readUser() { try {
        return JSON.parse(localStorage.getItem('eti_user') ?? 'null');
    }
    catch {
        return null;
    } }
    static ɵfac = function AuthService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
export const jwtInterceptor = (req, next) => {
    const token = localStorage.getItem('eti_token');
    const router = inject(Router);
    const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
    return next(authReq).pipe(tap({ error: (error) => {
            if (error.status === 401 && !req.url.endsWith('/auth/login')) {
                localStorage.removeItem('eti_token');
                localStorage.removeItem('eti_user');
                router.navigateByUrl('/connexion');
            }
        } }));
};
export { API };
//# sourceMappingURL=auth.service.js.map