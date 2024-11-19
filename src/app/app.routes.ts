import { Routes } from '@angular/router';
import { routes as LoginRoutes } from './features/login/login.routes';

export const routes: Routes = [
  ...LoginRoutes,
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
