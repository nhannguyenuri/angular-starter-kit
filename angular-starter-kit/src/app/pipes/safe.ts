import { Pipe, PipeTransform, inject } from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
  SafeScript,
  SafeStyle,
  SafeUrl,
} from '@angular/platform-browser';

/**
 * @example
 * <div [innerHtml]="html | safe: 'html'"></div>
 */
@Pipe({
  name: 'safe',
  pure: true,
})
export class Safe implements PipeTransform {
  readonly #sanitizer = inject(DomSanitizer);

  transform(
    value: string,
    type: string,
  ): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html':
        return this.#sanitizer.bypassSecurityTrustHtml(value);
      case 'style':
        return this.#sanitizer.bypassSecurityTrustStyle(value);
      case 'script':
        return this.#sanitizer.bypassSecurityTrustScript(value);
      case 'url':
        return this.#sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl':
        return this.#sanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        return this.#sanitizer.bypassSecurityTrustHtml(value);
    }
  }
}
