import {useEffect}         from "react";
import cerm                from "cermjs";
import uniqid              from "uniqid";
import {AnonymousFunction} from "constants/types/anonymousFunction";

export function useClickOutside(ref: any, callback?: AnonymousFunction) {
  const handleClick = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      // @ts-ignore
      callback(event);
    }
  };

  useEffect(() => {
    if (!callback) return;

    const uniqId = uniqid();

    cerm.addEventListener(document, "click", handleClick, undefined, uniqId);
    return () => {
      cerm.removeEventListenerById(uniqId);
    };
  }, []);
}
