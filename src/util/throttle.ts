export default (fn: (...params: any[]) => any, wait = 300) => {
  let lastTimestamp = 0;
  return (...params: any[]) => {
    const now = Date.now();
    if (now - lastTimestamp <= wait) {
      return;
    }
    lastTimestamp = now;
    return fn(params);
  };
};
