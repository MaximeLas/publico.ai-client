export default function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
) {
  let timeout: number | NodeJS.Timeout;
  return function (...args: any[]) {
    function debounced() {
      timeout = setTimeout(() => {
        func(...args ?? []);
      }, wait);
    }
    clearTimeout(timeout);
    debounced();
  } as T;
}
