import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppNavStore {
  isShowNavList = signal(window.innerWidth >= 1024);

  toggleMenu() {
    this.isShowNavList.set(!this.isShowNavList());
  }
}
