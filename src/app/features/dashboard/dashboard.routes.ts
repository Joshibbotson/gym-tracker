import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { authGuard } from '../../core/guards/auth.guard';

export const DashboardRoutes: Routes = [
  {
    title: 'Dashboard',
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
];
