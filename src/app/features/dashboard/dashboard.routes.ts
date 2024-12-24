import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { authGuard } from '../../core/guards/auth.guard';
import { MainLayoutComponent } from '../../core/layouts/main-layout/main-layout.component';

export const DashboardRoutes: Routes = [
  {
    title: 'Dashboard',
    path: 'dashboard',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [authGuard],
      },
    ],
  },
];
