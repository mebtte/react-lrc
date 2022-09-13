function throttle<F extends (...params: unknown[]) => unknown>(
  f: F,
  wait = 100,
) {
  let lastEmitTimestamp = 0;
  return (...params: Parameters<F>): ReturnType<F> | void => {
    const now = Date.now();
    if (now - lastEmitTimestamp >= wait) {
      lastEmitTimestamp = now;
      return f(...params) as ReturnType<F>;
    }
  };
}

export default throttle;
