import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { AppStoreService } from '../../services/app-store.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly #appStore = inject(AppStoreService);
  readonly #destroyRef = inject(DestroyRef);

  currentUser = signal<any>(null);

  constructor() {
    toObservable(this.#appStore.me)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((user) => {
        this.currentUser.set(user);
      });
  }
}
