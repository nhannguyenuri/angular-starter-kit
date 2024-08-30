import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { LocalStorageKeys } from '../enums/local-storage.enum';

export function authorizationInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const clonedRequest = req.clone({
    headers: req.headers.set('Authorization', localStorage.getItem(LocalStorageKeys.authorization) ?? ''),
  });
  return next(clonedRequest);
}
