import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { LOCAL_STORAGE } from '../enums/local-storage';

export function authorizationInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const clonedRequest = req.clone({
    headers: req.headers.set('Authorization', localStorage.getItem(LOCAL_STORAGE.authorization) ?? ''),
  });
  return next(clonedRequest);
}
