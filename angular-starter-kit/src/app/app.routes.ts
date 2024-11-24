import { Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { authChildGuard } from './guards/auth-child.guard';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
  // ----------------------------------------------------------------
  // No auth routes
  // ----------------------------------------------------------------
  {
    path: '',
    loadComponent: () => import('./layouts/guest-layout/guest-layout.component').then((c) => c.GuestLayoutComponent),
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
        loadComponent: () => import('./views/sign-in/sign-in.component').then((c) => c.SignInComponent),
      },
    ],
  },
  // ----------------------------------------------------------------
  // Auth routes
  // ----------------------------------------------------------------
  {
    path: '',
    loadComponent: () => import('./layouts/auth-layout/auth-layout.component').then((c) => c.AuthLayoutComponent),
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
        loadComponent: () => import('./views/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'settings',
        title: 'Settings',
        loadComponent: () => import('./views/settings/settings.component').then((c) => c.SettingsComponent),
      },
    ],
  },
  // ----------------------------------------------------------------
  // Shell route
  // ----------------------------------------------------------------
  {
    path: 'shell',
    title: 'Shell',
    loadComponent: () => import('./views/shell/shell.component').then((c) => c.ShellComponent),
  },
  // ----------------------------------------------------------------
  // Not found route
  // ----------------------------------------------------------------
  {
    path: '**',
    title: 'Not found',
    loadComponent: () => import('./views/not-found/not-found.component').then((c) => c.NotFoundComponent),
  },
];
