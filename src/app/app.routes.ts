import { Routes } from '@angular/router';
import { LoginRoutes } from './features/login/login.routes';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DashboardRoutes } from './features/dashboard/dashboard.routes';

export const routes: Routes = [
  ...LoginRoutes,
  ...DashboardRoutes,
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
