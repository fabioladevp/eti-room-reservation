import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './core/auth.service';
import { LoginComponent } from './pages/login.component';
import { HomeComponent, PlanningComponent, ErrorPageComponent } from './pages/general-pages.component';
import { RoomsComponent } from './pages/rooms.component';
import { RequestFormComponent } from './pages/request-form.component';
import { RequestsComponent, ValidationQueueComponent } from './pages/requests.component';
import { DashboardComponent, ManagementComponent, ReportsComponent, NotificationsComponent } from './pages/admin-pages.component';
import { UsersManagementComponent } from './pages/users-management.component';
const authGuard = () => inject(AuthService).isAuthenticated() ? true : inject(Router).createUrlTree(['/connexion']);
const rolesGuard = (...roles) => () => {
    const auth = inject(AuthService), router = inject(Router);
    return auth.isAuthenticated() ? (auth.hasRole(...roles) ? true : router.createUrlTree(['/interdit'])) : router.createUrlTree(['/connexion']);
};
export const routes = [
    { path: 'connexion', component: LoginComponent },
    { path: 'accueil', component: HomeComponent, canActivate: [authGuard] },
    { path: 'tableau-de-bord', component: DashboardComponent, canActivate: [rolesGuard('ADMIN')] },
    { path: 'planning', component: PlanningComponent, canActivate: [authGuard] },
    { path: 'salles', component: RoomsComponent, canActivate: [authGuard] },
    { path: 'nouvelle-demande', component: RequestFormComponent, canActivate: [rolesGuard('USER', 'ADMIN')] },
    { path: 'mes-demandes', component: RequestsComponent, canActivate: [rolesGuard('USER')] },
    { path: 'administration/demandes', component: RequestsComponent, canActivate: [rolesGuard('ADMIN')] },
    { path: 'validations/facility', component: ValidationQueueComponent, data: { scope: 'facility' }, canActivate: [rolesGuard('FACILITY')] },
    { path: 'validations/it', component: ValidationQueueComponent, data: { scope: 'it' }, canActivate: [rolesGuard('IT')] },
    { path: 'equipements', component: ManagementComponent, data: { kind: 'equipment' }, canActivate: [rolesGuard('ADMIN', 'IT')] },
    { path: 'administration/utilisateurs', component: UsersManagementComponent, canActivate: [rolesGuard('ADMIN')] },
    { path: 'rapports', component: ReportsComponent, canActivate: [rolesGuard('ADMIN')] },
    { path: 'audit', component: ManagementComponent, data: { kind: 'audit' }, canActivate: [rolesGuard('ADMIN')] },
    { path: 'notifications', component: NotificationsComponent, canActivate: [authGuard] },
    { path: 'interdit', component: ErrorPageComponent, data: { code: '403' } },
    { path: '', pathMatch: 'full', redirectTo: 'accueil' },
    { path: '**', component: ErrorPageComponent, data: { code: '404' } }
];
//# sourceMappingURL=app.routes.js.map