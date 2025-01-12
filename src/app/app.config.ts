import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { credentialsInterceptorInterceptor } from './core/interceptors/credentials-interceptor.interceptor';
import { authInterceptor } from './core/interceptors/auth-interceptor.interceptor';
import { AuthService } from './core/auth/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => intializeApp(inject(AuthService))),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([credentialsInterceptorInterceptor, authInterceptor])
    ),
  ],
};
function intializeApp(authService: AuthService) {
  return authService.initUser();
}
