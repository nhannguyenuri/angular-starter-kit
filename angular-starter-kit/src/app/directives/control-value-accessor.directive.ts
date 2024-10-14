import { Directive, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';

/**
 * @description
 *  This directive is used to create a standalone component that implements the ControlValueAccessor interface.
 *
 * @example
 * ...
 * hostDirectives: [ValueAccessorDirective],
 * ...
 * valueAccessor = inject(ValueAccessorDirective<number>)
 */
@Directive({
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ControlValueAccessorDirective),
      multi: true,
    },
  ],
})
export class ControlValueAccessorDirective<T> implements ControlValueAccessor, OnDestroy {
  readonly #onChange: any;
  readonly #onTouched: any;

  readonly #valueSubject$ = new Subject<T>();
  readonly #disabledSubject$ = new Subject<boolean>();

  readonly value = this.#valueSubject$.asObservable();
  readonly disabled = this.#disabledSubject$.asObservable();

  valueChange(v: T) {
    this.#onChange(v);
  }

  touchedChange(v: boolean) {
    this.#onTouched(v);
  }

  writeValue(obj: any) {
    this.#valueSubject$.next(obj);
  }

  registerOnChange(fn: any) {
    this.#onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.#onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.#disabledSubject$.next(isDisabled);
  }

  ngOnDestroy() {
    this.#valueSubject$.complete();
    this.#disabledSubject$.complete();
  }
}
