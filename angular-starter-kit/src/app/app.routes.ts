import { Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { authChildGuard } from './guards/auth-child';
import { authGuard } from './guards/auth';
import { guestGuard } from './guards/guest';

export const routes: Routes = [
  /* -------------- *
   * No auth routes *
   * -------------- */
  {
    path: '',
    loadComponent: () => import('./layouts/guest-layout/guest-layout').then((c) => c.GuestLayout),
    canActivate: [guestGuard],
    children: [
      {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full',
      },
      {
        path: 'sign-in',
        title: 'Sign in',
        loadComponent: () => import('./views/sign-in/sign-in').then((c) => c.SignIn),
      },
    ],
  },
  /* ----------- *
   * Auth routes *
   * ----------- */
  {
    path: '',
    loadComponent: () => import('./layouts/auth-layout/auth-layout').then((c) => c.AuthLayout),
    canActivate: [authGuard],
    canActivateChild: [authChildGuard],
    children: [
      {
        path: '',
        redirectTo: environment.startupUrl,
        pathMatch: 'full',
      },
      {
        path: 'home',
        title: 'Home',
        loadComponent: () => import('./views/home/home').then((c) => c.Home),
      },
      {
        path: 'settings',
        title: 'Settings',
        loadComponent: () => import('./views/settings/settings').then((c) => c.Settings),
      },
    ],
  },
  /* ----------- *
   * Shell route *
   * ----------- */
  {
    path: 'shell',
    title: 'Shell',
    loadComponent: () => import('./views/shell/shell').then((c) => c.Shell),
  },
  /* ---------------- *
   * Note found route *
   * ---------------- */
  {
    path: '**',
    title: 'Not found',
    loadComponent: () => import('./views/not-found/not-found').then((c) => c.NotFound),
  },
];
