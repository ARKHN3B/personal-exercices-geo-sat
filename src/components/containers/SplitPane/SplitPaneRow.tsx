import React, {useContext, useEffect, useRef} from "react";
import cx               from "classnames";
import SplitPaneContext from "./SplitPaneContext";
import "./SplitPaneRow.scss";

type SplitPaneRowProps = {
  className?: string,
}

/**
 * SplitPaneRow Functional Component
 * @param children
 * @param {string} className - used to set a class on a higher element tag
 * @return {React.FC<SplitPaneRowProps>}
 */
const SplitPaneRow: React.FC<SplitPaneRowProps> = ({children, className}) => {
  const ref                             = useRef(null); // @ts-ignore
  const {clientHeight, setClientHeight} = useContext(SplitPaneContext);

  useEffect(() => {
    if (!clientHeight) { // @ts-ignore
      ref.current.style.minHeight = window.innerHeight / 2 + "px"; // @ts-ignore
      ref.current.style.maxHeight = window.innerHeight / 2 + "px"; // @ts-ignore
      ref.current.style.height = window.innerHeight / 2 + "px";
      return;
    }

    // @ts-ignore
    ref.current.style.minHeight = clientHeight + "px"; // @ts-ignore
    ref.current.style.maxHeight = clientHeight + "px"; // @ts-ignore
    ref.current.style.height    = clientHeight + "px";
  }, [clientHeight]);

  const classes: string = cx(
    "split-pane-row",
    className,
  );

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
};

export default SplitPaneRow;
