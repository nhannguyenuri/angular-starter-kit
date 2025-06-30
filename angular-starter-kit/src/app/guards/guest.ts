import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthStore } from '../services/auth-store';

export const guestGuard: CanActivateFn = (_route, _state) => {
  const router = inject(Router);
  const auth = inject(AuthStore);

  if (auth.isSignedIn()) {
    router.navigate([`/${environment.startupUrl}`]);
    return false;
  }

  return true;
};
