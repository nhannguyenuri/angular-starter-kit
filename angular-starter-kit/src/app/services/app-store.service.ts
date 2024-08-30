import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppStoreService {
  me = signal<any>(null);
}
