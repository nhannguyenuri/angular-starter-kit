import { Component, inject, signal } from '@angular/core';
import { Field, form, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { LOCAL_STORAGE } from '../../enums/local-storage';
import { SHELL_ACTIONS } from '../../enums/shell';
import { SignInFormData } from '../../schemas/sign-in';
import { AppStore } from '../../services/app-store';
import { AuthStore } from '../../services/auth-store';

const MaterialModules = [MatCardModule, MatIconModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatProgressBarModule, MatCheckboxModule];

@Component({
  selector: 'app-sign-in',
  imports: [Field, ...MaterialModules],
  templateUrl: './sign-in.html',
  host: {
    '(window:keydown.enter)': 'onEnter($event)',
  },
})
export class SignIn {
  readonly #auth = inject(AuthStore);
  readonly #appStore = inject(AppStore);
  readonly #router = inject(Router);

  errorMessage = signal('');

  isShowPassword = signal(false);

  signInForm = form(
    signal<SignInFormData>({
      username: '',
      password: '',
    }),
    (schemaPath) => {
      required(schemaPath.username, {
        message: 'Username is required.',
      });
      required(schemaPath.password, {
        message: 'Password is required.',
      });
    }
  );

  ngOnInit() {
    if (this.#auth.isSignedIn()) {
      this.#router.navigate(['/'], {
        queryParams: { action: SHELL_ACTIONS.signIn },
      });
    }
  }

  markFormGroupAsDirty() {
    this.signInForm().markAsDirty();
  }

  markAllAsTouched() {
    this.signInForm.username().markAsTouched();
    this.signInForm.password().markAsTouched();
  }

  signIn() {
    this.markFormGroupAsDirty();
    this.markAllAsTouched();

    if (this.signInForm().valid()) {
      const { username, password } = this.signInForm().value();

      if (typeof username !== 'string' && typeof password !== 'string') {
        return;
      }

      this.#auth.signIn({ username, password }).subscribe({
        next: (res) => {
          if (res.success) {
            const { accessToken, user } = res.data;

            localStorage.setItem(LOCAL_STORAGE.authorization, accessToken);
            this.#appStore.me.set(user);
            this.#router.navigate(['/shell'], {
              queryParams: { action: SHELL_ACTIONS.signIn },
            });
          }
        },
        error: (err) => {
          this.errorMessage.set(err.error.message);
        },
      });
    }
  }

  showHidePassword(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.isShowPassword.set(!this.isShowPassword());
  }

  onEnter(event: Event) {
    if (event.target instanceof HTMLInputElement && event.target.hasAttribute('matinput')) {
      event.preventDefault();
      this.signIn();
    }
  }
}
