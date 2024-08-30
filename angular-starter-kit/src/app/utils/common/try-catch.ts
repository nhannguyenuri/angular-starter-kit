type TryCatchProps<T> = {
  tryFn: () => T;
  catchFn: (error: any) => T;
};

/**
 * 
 * @param {TryCatchProps} TryCatchProps 
 * @returns {*}
 * @see https://medium.com/coding-beauty/functional-try-catch-javascript-f21885cc2e64
 */
export function tryCatch<T>({ tryFn, catchFn }: TryCatchProps<T>): T {
  try {
    return tryFn();
  } catch (error) {
    return catchFn(error);
  }
}
