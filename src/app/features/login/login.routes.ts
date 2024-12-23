import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { authGuard } from '../../core/guards/auth.guard';

export const LoginRoutes: Routes = [
  {
    title: 'Login',
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard],
  },
];
