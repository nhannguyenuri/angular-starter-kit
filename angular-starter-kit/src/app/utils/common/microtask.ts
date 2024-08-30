export const runFnInPromise = (ctx: any, fn: Function) => {
  return Promise.resolve(fn.call(ctx));
};
