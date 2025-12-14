// import { HttpClient } from '@angular/common/http';
import { Injectable /** inject **/ } from '@angular/core';
// import { APIS } from '../enums/apis.enum';
import { of } from 'rxjs';
import { LOCAL_STORAGE } from '../enums/local-storage';
import { SignInPayload } from '../schemas/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  // readonly #http = inject(HttpClient);

  isSignedIn() {
    const accessToken = localStorage.getItem(LOCAL_STORAGE.authorization);
    return !!accessToken;
  }

  signIn(signInPayload: SignInPayload) {
    // return this.#http.post<SignInResponse>(APIS.auth.signIn, signInPayload);
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
    // return this.#http.get<MeResponse>(APIS.auth.me);
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
