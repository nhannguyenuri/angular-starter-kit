import { UpperCasePipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { AppNavStore } from '../../services/app-nav-store';
import { AppStore } from '../../services/app-store';

const MaterialModules = [
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTooltipModule,
];

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, UpperCasePipe, ...MaterialModules],
  templateUrl: './nav-bar.html',
})
export class NavBar {
  readonly #router = inject(Router);
  readonly #appStore = inject(AppStore);
  readonly #appNavStore = inject(AppNavStore);
  readonly #destroyRef = inject(DestroyRef);

  currentUser = signal<any>(null);

  constructor() {
    toObservable(this.#appStore.me)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((user) => {
        this.currentUser.set(user);
      });
  }

  toggleMenu() {
    this.#appNavStore.toggleMenu();
  }

  signOut() {
    localStorage.clear();
    this.#appStore.me.set(null);
    this.#router.navigate(['/sign-in']);
  }
}
