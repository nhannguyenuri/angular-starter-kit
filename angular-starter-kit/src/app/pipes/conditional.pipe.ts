import { Pipe } from '@angular/core';

@Pipe({
  name: 'conditional',
  standalone: true,
  pure: false,
})
export class ConditionalPipe {
  transform(item: any, conditionalFn: Function) {
    if (!item) {
      return conditionalFn();
    }
    if (item && conditionalFn(item)) {
      return true;
    }
  }
}
