import { WritableSignal } from '@angular/core';

export const updateSignalProperty = <T, K extends keyof T>(sg: WritableSignal<T>, prop: K, value: T[K]) => {
  sg.update((obj) => ({ ...obj, [prop]: value }));
};
