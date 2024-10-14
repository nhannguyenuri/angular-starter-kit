export const runFnInTryCatch = (fn: any, ...args: any) => {
  try {
    const data = fn(...args);
    return {
      success: true,
      data,
    };
  } catch (err) {
    return {
      error: true,
      message: err?.message,
    };
  }
};

export const runFnInTryCatchAsync = async (fn: any, ...args: any) => {
  try {
    const data = await fn(...args);
    return {
      success: true,
      data,
    };
  } catch (err) {
    return {
      error: true,
      message: err?.message,
    };
  }
};
