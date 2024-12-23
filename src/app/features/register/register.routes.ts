import { Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { authGuard } from '../../core/guards/auth.guard';

export const RegisterRoutes: Routes = [
  {
    title: 'Register',
    path: 'register',
    component: RegisterComponent,
    canActivate: [authGuard],
  },
];
