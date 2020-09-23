export default (fn: (...params: any[]) => any, wait = 300) => {
  let timer: number;
  return (...params: any[]) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => fn(...params), wait);
  };
};
