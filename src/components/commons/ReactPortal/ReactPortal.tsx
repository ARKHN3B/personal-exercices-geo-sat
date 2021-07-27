import React           from "react";
import ReactDOM        from "react-dom";
import {useHasMounted} from "hooks/global/useHasMounted";

type ReactPortalProps = {
  className?: string,
  selector: string,
}

/**
 * ReactPortal Functional Component
 * @param children
 * @param {string} className - used to set a class on a higher element tag
 * @param selector
 * @return {React.FC<ReactPortalProps>}
 */
const ReactPortal: React.FC<ReactPortalProps> = ({children, className, selector}) => {
  const hasMounted = useHasMounted();

  if (!hasMounted) return null;

  // @ts-ignore
  return ReactDOM.createPortal(children, document.querySelector(selector));
};

export default ReactPortal;
