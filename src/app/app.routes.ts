import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './shared/auth/auth.guard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'login', component: LoginComponent, title: 'Giriş' },
    { path: 'home', canActivate: [authGuard], component: HomeComponent, title: 'Anasayfa' }
];
