import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Role, User } from './models';

const API = '/api';

@Injectable({providedIn:'root'})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private userState = signal<User|null>(this.readUser());
  user = this.userState.asReadonly();
  isAuthenticated = computed(() => !!this.userState());
  role = computed(() => this.userState()?.role ?? null);

  login(email:string, password:string) {
    return this.http.post<{token:string;user:User}>(`${API}/auth/login`, {email,password}).pipe(tap(r => {
      localStorage.setItem('eti_token', r.token); localStorage.setItem('eti_user', JSON.stringify(r.user)); this.userState.set(r.user);
    }));
  }
  logout() { localStorage.removeItem('eti_token'); localStorage.removeItem('eti_user'); this.userState.set(null); this.router.navigateByUrl('/connexion'); }
  hasRole(...roles:Role[]) { const role=this.role(); return role !== null && roles.includes(role); }
  private readUser():User|null { try { return JSON.parse(localStorage.getItem('eti_user') ?? 'null') as User|null; } catch { return null; } }
}

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('eti_token');
  const router = inject(Router);
  const authReq = token ? req.clone({setHeaders:{Authorization:`Bearer ${token}`}}) : req;
  return next(authReq).pipe(tap({error:(error:HttpErrorResponse) => {
    if (error.status === 401 && !req.url.endsWith('/auth/login')) { localStorage.removeItem('eti_token'); localStorage.removeItem('eti_user'); router.navigateByUrl('/connexion'); }
  }}));
};

export { API };
