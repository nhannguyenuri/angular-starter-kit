import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { APIs } from '../enums/api.enum';
import { LocalStorageKeys } from '../enums/local-storage.enum';
import * as AuthTypes from '../types/auth.type';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #http = inject(HttpClient);

  isSignedIn() {
    const accessToken = localStorage.getItem(LocalStorageKeys.authorization);

    return !!accessToken;

  }

  signIn(signInPayload: AuthTypes.SignInPayload) {
    // return this.#http.post<AuthTypes.SignInResponse>(APIs.auth.signIn, signInPayload);
    return of({
      success: true,
      data: {
        accessToken: 'access_token',
        user: {
          _id: '1',
          name: 'Nhan Nguyen',
          email: 'hoainhaannguyen@gmail.com',
          phone: '+84 346 528 526',
          address: 'Ho Chi Minh city, Vietnam',
          role: 'admin',
          avatar: 'https://avatars.githubusercontent.com/u/4723119?v=4',
        },
      },
    });
  }

  me() {
    // return this.#http.get<AuthTypes.MeResponse>(APIs.auth.me);
    return of({
      success: true,
      data: {
        _id: '1',
        name: 'Nhan Nguyen',
        email: 'hoainhaannguyen@gmail.com',
        phone: '+84 346 528 526',
        address: 'Ho Chi Minh city, Vietnam',
        role: 'admin',
        avatar: 'https://avatars.githubusercontent.com/u/4723119?v=4',
      },
    });
  }
}
