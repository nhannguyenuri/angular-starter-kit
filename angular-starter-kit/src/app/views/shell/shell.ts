import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { SHELL_ACTIONS } from '../../enums/shell';
import { runFnInSetTimeout } from '../../utils/common/macrotask';

@Component({
  selector: 'app-shell',
  imports: [MatIconModule],
  templateUrl: './shell.html',
})
export class Shell {
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);

  constructor() {
    runFnInSetTimeout(this, this.#checkForRedirect, 500);
  }
  
  #checkForRedirect() {
    const params: any = this.#route.snapshot.queryParams;

    if (params.action === SHELL_ACTIONS.signIn) {
      this.#router.navigate([`/${environment.startupUrl}`]);
      return;
    }

    if (params.action === SHELL_ACTIONS.redirect) {
      const redirectUrl = params.url;
      this.#router.navigate([redirectUrl]);
      return;
    }

    this.#router.navigate([`/${environment.startupUrl}`]);
  }
}
