import {useCallback, useRef} from "react";
import {AnonymousFunction}                        from "constants/types/anonymousFunction";

export function useCallbackDebouncer(callback: AnonymousFunction, delay: number) {
  const handlerRef = useRef<AnonymousFunction|null>(null);

  const handleDebounce = useCallback(
    (newValue) => {
      if (handlerRef?.current) { // @ts-ignore
        clearTimeout(handlerRef?.current);
      }

      // @ts-ignore
      handlerRef.current = setTimeout(() => {
        console.debug(newValue);
        callback(newValue);
      }, delay);
    },
    [delay, callback],
  );

  return handleDebounce;
}
