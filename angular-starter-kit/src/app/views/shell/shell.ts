import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ShellActions } from '../../enums/shell';

@Component({
  selector: 'app-shell',
  imports: [],
  templateUrl: './shell.html',
})
export class Shell {
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);

  constructor() {
    this.#checkForRedirect();
  }

  #checkForRedirect() {
    const params: any = this.#route.snapshot.queryParams;

    if (params.action === ShellActions.signIn) {
      this.#router.navigate([`/${environment.startupUrl}`]);
      return;
    }

    if (params.action === ShellActions.redirect) {
      const redirectUrl = params.url;
      this.#router.navigate([redirectUrl]);
      return;
    }

    this.#router.navigate([`/${environment.startupUrl}`]);
  }
}
