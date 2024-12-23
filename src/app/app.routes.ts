import { Routes } from '@angular/router';
import { LoginRoutes } from './features/login/login.routes';
import { DashboardRoutes } from './features/dashboard/dashboard.routes';
import { RegisterRoutes } from './features/register/register.routes';

export const routes: Routes = [
  ...RegisterRoutes,
  ...LoginRoutes,
  ...DashboardRoutes,
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
