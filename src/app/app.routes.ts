import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './shared/guards/auth.guard';
import { RoleGuard } from './shared/guards/role.guard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'login', component: LoginComponent, title: 'Giriş' },
    { path: 'home', canActivate: [authGuard, RoleGuard], component: HomeComponent, title: 'Anasayfa', data: { expectedRoles: ['admin', 'user', 'moderator'] } }
];
