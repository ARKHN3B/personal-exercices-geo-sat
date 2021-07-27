import {useEffect, useRef}     from "react";
import cerm                    from "cermjs";
import {capitalize} from "lodash";

/**
 * Default handler used in a useRef()
 * @param event
 */
function defaultHandler(event) {
  console.debug("[Tiny] - useEventListener() default handler", {event});
}

/**
 * UseEventListener hook
 * @param eventName
 * @param handler
 * @param element
 */
const useEventListener = function (eventName, handler, element = window) {
  const registeredHandler = useRef(defaultHandler); // Create a ref that stores handler

  /**
   * Update ref.current value if handler changes
   *
   * This allows our effect below to always get latest handler
   * without us needing to pass it in effect deps array
   * and potentially cause effect to re-run every render.
   */
  useEffect(() => {
    registeredHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Make sure element supports addEventListener on it
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      // Create event listener that calls handler function stored in ref
      const eventListener = (event) => registeredHandler.current(event);

      const customId = `on${capitalize(eventName)}`;

      if (cerm.getListenerDetailsById(customId)) return;

      // Add event listener
      cerm.addEventListener(element, eventName, eventListener, undefined, customId);

      // Remove event listener on cleanup
      return () => {
        cerm.removeEventListenerById(customId);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
};

export default useEventListener;
