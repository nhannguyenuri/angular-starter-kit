import { Component, HostListener, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { LocalStorageKeys } from '../../enums/local-storage';
import { ShellActions } from '../../enums/shell';
import { AppStore } from '../../services/app-store';
import { AuthStore } from '../../services/auth-store';

const MaterialModules = [
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatProgressBarModule,
  MatCheckboxModule,
];

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule, ReactiveFormsModule, ...MaterialModules],
  templateUrl: './sign-in.html',
})
export class SignIn {
  readonly #auth = inject(AuthStore);
  readonly #appStore = inject(AppStore);
  readonly #router = inject(Router);
  readonly #formBuilder = inject(FormBuilder);

  errorMessage = signal('');

  isShowPassword = signal(false);

  signInForm = this.#formBuilder.group({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit() {
    if (this.#auth.isSignedIn()) {
      this.#router.navigate(['/'], {
        queryParams: { action: ShellActions.signIn },
      });
    }
  }

  markFormGroupAsDirty() {
    this.signInForm.markAsDirty();
  }

  markAllAsTouched() {
    this.signInForm.controls.username.markAsTouched();
    this.signInForm.controls.password.markAsTouched();
  }

  signIn() {
    this.markFormGroupAsDirty();
    this.markAllAsTouched();

    if (this.signInForm.valid) {
      const { username, password } = this.signInForm.value as {
        username: string;
        password: string;
      };

      if (typeof username !== 'string' && typeof password !== 'string') {
        return;
      }

      this.#auth.signIn({ username, password }).subscribe({
        next: (res) => {
          if (res.success) {
            const { accessToken, user } = res.data;
            localStorage.setItem(LocalStorageKeys.authorization, accessToken);
            this.#appStore.me.set(user);
            this.#router.navigate(['/shell'], {
              queryParams: { action: ShellActions.signIn },
            });
          }
        },
        error: (err) => {
          this.errorMessage.set(err.error.message);
        },
      });
    }
  }

  isUsernameValid() {
    return (
      this.signInForm.get('username')?.touched &&
      !this.signInForm.get('username')?.errors?.['required']
    );
  }

  isPasswordValid() {
    return (
      this.signInForm.get('password')?.touched &&
      !this.signInForm.get('password')?.errors?.['required']
    );
  }

  @HostListener('window:keydown.enter', ['$event'])
  onEnter(event: any /** KeyboardEvent */) {
    if (
      event.target instanceof HTMLInputElement &&
      event.target.hasAttribute('matinput')
    ) {
      event.preventDefault();
      this.signIn();
    }
  }
}
