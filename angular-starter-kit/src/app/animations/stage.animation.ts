import { animate, state, style, transition, trigger } from '@angular/animations';

/**
 * @example
    #HTML file
    <div [@popOverState]="stateName">
      <p>Hello! I'm a helpful message.</p>
      </div>
    <button (click)="toggle()">Toggle PopOver</button>

    #TS file
    export class PopOverComponent {
      show = false;

      get stateName() {
        return this.show ? 'show' : 'hide'
      }

      toggle() {
        this.show = !this.show;
      }
    }
 */
export const stage = trigger('stage', [
  state(
    'show',
    style({
      opacity: 1,
    })
  ),
  state(
    'hide',
    style({
      opacity: 0,
    })
  ),
  transition('show => hide', animate('600ms ease-out')),
  transition('hide => show', animate('1000ms ease-in')),
]);
