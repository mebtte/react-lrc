function debounce<F extends (...params: unknown[]) => unknown>(
  f: F,
  wait = 300,
) {
  let timer: ReturnType<typeof globalThis.setTimeout>;
  return (...params: Parameters<F>) => {
    globalThis.clearTimeout(timer);
    timer = globalThis.setTimeout(() => f(params), wait);
  };
}

export default debounce;
