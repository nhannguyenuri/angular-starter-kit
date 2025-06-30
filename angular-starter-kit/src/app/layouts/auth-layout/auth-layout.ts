import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from '../../components/nav-bar/nav-bar';
import { NavList } from '../../components/nav-list/nav-list';
import { AppNavStore } from '../../services/app-nav-store';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, NavBar, NavList, NgClass],
  templateUrl: './auth-layout.html',
})
export class AuthLayout {
  appNavStore = inject(AppNavStore);
}
