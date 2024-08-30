import { NgIf } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { LocalStorageKeys } from '../../enums/local-storage.enum';
import { ShellActions } from '../../enums/shell.enum';
import { AppStoreService } from '../../services/app-store.service';
import { AuthService } from '../../services/auth.service';
import { ConditionalPipe } from '../../pipes/conditional.pipe';

const MaterialModules = [MatCardModule, MatIconModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatProgressBarModule, MatCheckboxModule];

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, ConditionalPipe, ...MaterialModules],
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  #authService = inject(AuthService);
  #appStoreService = inject(AppStoreService);
  #router = inject(Router);
  #formBuilder = inject(FormBuilder);

  errorMessage = signal('');

  isShowPassword = signal(false);

  signInForm = this.#formBuilder.group({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor() {
    if (this.#authService.isSignedIn()) {
      this.#router.navigate(['/'], { queryParams: { action: ShellActions.signIn } });
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
      const { username, password } = this.signInForm.value;

      this.#authService.signIn({ username, password }).subscribe({
        next: (res) => {
          if (res.success) {
            const { accessToken, user } = res.data;
            localStorage.setItem(LocalStorageKeys.authorization, accessToken);
            this.#appStoreService.me.set(user);
            this.#router.navigate(['/'], { queryParams: { action: ShellActions.signIn } });
          }
        },
        error: (err) => {
          this.errorMessage.set(err.error.message);
        },
      });
    }
  }

  isUsernameValid() {
    return this.signInForm.get('username')?.touched && this.signInForm.get('username')?.errors?.['required']
  }

  isPasswordValid() {
    return this.signInForm.get('password')?.touched && this.signInForm.get('password')?.errors?.['required']
  }

  @HostListener('document:keydown.enter', ['$event']) onEnter(event: KeyboardEvent) {
    if (event.target instanceof HTMLInputElement && event.target.hasAttribute('matinput')) {
      event.preventDefault();
      this.signIn();
    }
  }
}
