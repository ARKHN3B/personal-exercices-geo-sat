import React, {useContext, useEffect, useRef} from "react";
import cx               from "classnames";
import SplitPaneContext from "components/containers/SplitPane/SplitPaneContext";

type SplitPaneColProps = {
  className?: string,
}

/**
 * SplitPaneCol Functional Component
 * @param children
 * @param {string} className - used to set a class on a higher element tag
 * @return {React.FC<SplitPaneColProps>}
 */
const SplitPaneCol: React.FC<SplitPaneColProps> = ({children, className}) => {
  const ref = useRef(null); // @ts-ignore
  const { clientWidth, setClientWidth } = useContext(SplitPaneContext);

  useEffect(() => {
    if (!clientWidth) return;

    // @ts-ignore
    ref.current.style.minWidth = clientWidth + "px"; // @ts-ignore
    ref.current.style.maxWidth = clientWidth + "px";
  }, [clientWidth]);

  const classes: string = cx(
    "split-pane-col",
    className,
  );

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
};

export default SplitPaneCol;
