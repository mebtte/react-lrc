function debounce<F extends (...params: unknown[]) => unknown>(
  f: F,
  { wait = 300 }: { wait?: number } = {},
) {
  let timer: number;
  return (...params: Parameters<F>) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => f(params), wait);
  };
}

export default debounce;
