import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { TranslocoService } from '@jsverse/transloco';
import { timer } from 'rxjs';
import { environment } from '../environments/environment';
import { LocalStorageKeys } from './enums/local-storage';
import { AppStore } from './services/app-store';
import { AuthStore } from './services/auth-store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  readonly #swUpdate = inject(SwUpdate);
  readonly #translocoService = inject(TranslocoService);
  readonly #router = inject(Router);
  readonly #destroyRef = inject(DestroyRef);
  readonly #auth = inject(AuthStore);
  readonly #appStore = inject(AppStore);

  isSignedIn = signal(this.#auth.isSignedIn());

  constructor() {
    this.#registerServiceWorkerUpgrade();
    this.#registerRouterEvents();
    this.#detectLocalLanguage();
    this.#registerStoreUser();
    this.#loadCurrentUser();
  }

  #registerStoreUser() {
    toObservable(this.#appStore.me)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((user) => {
        this.isSignedIn.set(!!user);
      });
  }

  #loadCurrentUser() {
    if (this.#auth.isSignedIn()) {
      this.#auth.me().subscribe((res) => {
        if (res.success) {
          const user = res.data;
          this.#appStore.me.set(user);
        }
      });
    }
  }

  #registerRouterEvents() {
    this.#router.events
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((navigationEvent) => {
        if (navigationEvent instanceof NavigationEnd) {
          const { urlAfterRedirects } = navigationEvent;

          if (!urlAfterRedirects.includes('/sign-in')) {
            localStorage.setItem(LocalStorageKeys.lastUrl, urlAfterRedirects);
          }
        }
      });
  }

  #registerServiceWorkerUpgrade() {
    if (this.#swUpdate.isEnabled) {
      timer(0, 60000)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe(() => {
          this.#swUpdate.checkForUpdate().then((res) => {
            if (res) {
              if (
                confirm('A new version is available, do you want to load it?')
              ) {
                window.location.reload();
              }
            }
          });
        });
    }
  }

  #detectLocalLanguage() {
    const language = localStorage.getItem('language') ?? environment.language;
    this.#translocoService.setActiveLang(language);
    this.#translocoService.setFallbackLangForMissingTranslation({
      fallbackLang: 'en',
    });
  }
}
