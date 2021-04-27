function debounce<F extends (...params: any[]) => any>(
  f: F,
  { wait = 300 }: { wait?: number } = {},
) {
  let timer: ReturnType<typeof window.setTimeout>;
  return (...params: Parameters<F>) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => f(params), wait);
  };
}

export default debounce;
