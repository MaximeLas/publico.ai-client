import { useEffect, useMemo, useRef } from "react";
import debounce from "../../utilities/debounce";

export default function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  wait = 1000
) {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = (...args: any[]) => {
      ref.current?.(...args);
    };
    return debounce(func, wait);
  }, [wait]);

  return debouncedCallback as T;
}
