import { useEffect, useRef } from "react";

type KeyPredicate = (event: KeyboardEvent) => boolean;
type Key = string | KeyPredicate;

export function useKeyPress(
  key: Key,
  callback: (event: KeyboardEvent) => void,
  options: {
    preventDefault?: boolean;
    stopPropagation?: boolean;
  } = {}
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMatch =
        typeof key === "function" ? key(event) : event.key === key;

      if (isMatch) {
        if (options.preventDefault) event.preventDefault();
        if (options.stopPropagation) event.stopPropagation();
        callbackRef.current(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [key, options.preventDefault, options.stopPropagation]);
}
