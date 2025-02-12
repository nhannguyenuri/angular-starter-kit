import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (_route, _state) => {
  const router = inject(Router);
  const auth = inject(AuthService);

  if (!auth.isSignedIn()) {
    router.navigate(['/sign-in']);
    return false;
  }

  return true;
};
