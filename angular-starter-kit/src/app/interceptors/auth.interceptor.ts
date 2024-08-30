import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const router = inject(Router);

  return next(req).pipe(
    catchError((event) => {
      if (event instanceof HttpErrorResponse && event.status === 401 && !router.url.includes('/sign-in')) {
        router.navigate(['/sign-in']);
      }

      return throwError(() => event.error);
    })
  ) as any;
}
