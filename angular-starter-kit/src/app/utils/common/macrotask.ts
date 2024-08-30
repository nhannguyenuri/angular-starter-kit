export const runFnInSetTimeout = (ctx: any, fn: Function, timeout = 0) => {
  const timeoutId = setTimeout(() => {
    fn.call(ctx);
    clearTimeout(timeoutId);
  }, timeout);
};
