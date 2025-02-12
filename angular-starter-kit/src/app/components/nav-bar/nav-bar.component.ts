import { UpperCasePipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { AppNavService } from '../../services/app-nav.service';
import { AppStoreService } from '../../services/app-store.service';

const MaterialModules = [MatIconModule, MatButtonModule, MatMenuModule, MatToolbarModule, MatTooltipModule, MatTooltipModule];

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, UpperCasePipe, ...MaterialModules],
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
  readonly #router = inject(Router);
  readonly #appStore = inject(AppStoreService);
  readonly #appNav = inject(AppNavService);
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
    this.#appNav.toggleMenu();
  }

  signOut() {
    localStorage.clear();
    this.#appStore.me.set(null);
    this.#router.navigate(['/sign-in']);
  }
}
