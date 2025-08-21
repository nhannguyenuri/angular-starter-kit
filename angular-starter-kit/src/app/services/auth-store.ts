// import { HttpClient } from '@angular/common/http';
import { Injectable /** inject **/ } from '@angular/core';
// import { APIs } from '../enums/api.enum';
import { of } from 'rxjs';
import { LocalStorageKeys } from '../enums/local-storage';
import * as AuthSchema from '../schemas/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  // readonly #http = inject(HttpClient);

  isSignedIn() {
    const accessToken = localStorage.getItem(LocalStorageKeys.authorization);
    return !!accessToken;
  }

  signIn(signInPayload: AuthSchema.SignInPayload) {
    // return this.#http.post<AuthSchema.SignInResponse>(APIs.auth.signIn, signInPayload);
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
    // return this.#http.get<AuthSchema.MeResponse>(APIs.auth.me);
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
