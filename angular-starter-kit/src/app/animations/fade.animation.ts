import { animate, style, transition, trigger } from "@angular/animations";

export const fade = trigger('fade', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.5s', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('0.5s', style({ opacity: 0 })),
  ]),
]);

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.5s', style({ opacity: 1 })),
  ]),
]);

export const fadeOut = trigger('fadeOut', [
  transition(':leave', [
    style({ opacity: 1 }),
    animate('0.5s', style({ opacity: 0 })),
  ]),
]);
