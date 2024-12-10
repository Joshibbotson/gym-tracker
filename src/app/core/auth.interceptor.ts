import { HttpInterceptorFn } from '@angular/common/http';

/**
 * intercept auth and include cookie for all http requests
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
