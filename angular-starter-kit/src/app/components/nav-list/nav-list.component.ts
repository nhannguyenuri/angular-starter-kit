import { NgForOf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-list',
  standalone: true,
  imports: [RouterModule, RouterLink, NgForOf],
  templateUrl: './nav-list.component.html',
})
export class NavListComponent {
  readonly navItems = signal([
    {
      label: 'Home',
      path: '/home',
      selected: true,
    },
    {
      label: 'Dashboard',
      path: '/dashboard',
      selected: true,
    },
    {
      label: 'Users',
      path: '/users',
      selected: false,
    },
    {
      label: 'Kanban board',
      path: '/kanban-board',
      selected: false,
    },
    {
      label: 'Settings',
      path: '/settings',
      selected: false,
    },
  ]);
}
