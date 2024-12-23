import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.User) {
    return true;
  }
  const user = authService.getUserFromLocalStorage();

  if (user !== null) {
    authService.User = user;
    return true;
  }

  router.navigate(['/login']);
  return false;
};
