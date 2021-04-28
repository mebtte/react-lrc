function throttle<F extends (...params: any[]) => any>(
  f: F,
  { wait = 100 }: { wait?: number } = {},
) {
  let lastEmitTimestamp = 0;
  return (...params: Parameters<F>): ReturnType<F> | undefined => {
    const now = Date.now();
    if (now - lastEmitTimestamp > wait) {
      lastEmitTimestamp = now;
      return f(...params);
    }
  };
}

export default throttle;
