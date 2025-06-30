import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../services/auth-store';

export const authGuard: CanActivateFn = (_route, _state) => {
  const router = inject(Router);
  const auth = inject(AuthStore);

  if (!auth.isSignedIn()) {
    router.navigate(['/sign-in']);
    return false;
  }

  return true;
};
