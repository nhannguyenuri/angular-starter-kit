import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ShellActions } from '../../enums/shell.enum';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [],
  templateUrl: './shell.component.html',
})
export class ShellComponent {
  #router = inject(Router);
  #route = inject(ActivatedRoute);

  constructor() {
    this.#checkForRedirect();
  }

  #checkForRedirect() {
    const params: any = this.#route.snapshot.queryParams;

    if (params.action === ShellActions.signIn) {
      this.#router.navigate([environment.startupUrl]);
      return;
    }

    if (params.action === ShellActions.redirect) {
      const redirectUrl = params.url;
      this.#router.navigate([redirectUrl]);
      return;
    }

    this.#router.navigate([environment.startupUrl]);
  }
}
