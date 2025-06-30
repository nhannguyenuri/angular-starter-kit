import { Component, signal } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-list',
  imports: [RouterModule, RouterLink],
  templateUrl: './nav-list.html',
})
export class NavList {
  readonly navItems = signal([
    {
      label: 'Home',
      path: '/home',
      selected: true,
    },
    {
      label: 'Settings',
      path: '/settings',
      selected: false,
    },
  ]);
}
