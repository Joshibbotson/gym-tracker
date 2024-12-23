import { Routes } from '@angular/router';
import { LoginRoutes } from './features/login/login.routes';
import { DashboardRoutes } from './features/dashboard/dashboard.routes';

export const routes: Routes = [
  ...LoginRoutes,
  ...DashboardRoutes,
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
