import React, {Children, useEffect, useRef, useState} from "react";
import cx                                             from "classnames";
import SplitPaneContext                               from "components/containers/SplitPane/SplitPaneContext";
import "./SplitPane.scss";

type SplitPaneProps = {
  className?: string,
  defaultSize?: number,
  hide?: boolean,
  minSize?: number,
  pos?: "start" | "end",
  split?: "col" | "row",
}

/**
 * SplitPane Functional Component
 * // TODO: Multi Pane (1) + Check if Row pane work outside (like a root component) (2) + Dot notation (3) [https://stackoverflow.com/questions/60882627/using-dot-notation-with-functional-component](cf.)
 * @param children
 * @param {string} className - used to set a class on a higher element tag
 * @param hide
 * @param pos
 * @param split
 * @return {React.FC<SplitPaneProps>}
 */
const SplitPane: React.FC<SplitPaneProps> = ({children, className, hide, pos = "end", split = "col",}) => {
  const [clientHeight, setClientHeight] = useState<number | null>(null);
  const [clientWidth, setClientWidth]   = useState<number | null>(450);
  const yDividerPos                     = useRef<number | null>(null);
  const xDividerPos                     = useRef<number | null>(null);
  const nbPanes                         = Children.toArray(children).reduce<number>((acc, child) => { // @ts-ignore
    // Only necessary child
    if (["SplitPaneCol", "SplitPaneRow"].includes(child?.type?.name)) ++acc;
    return acc;
  }, 0);


  useEffect(() => {
    document.addEventListener("mouseup", onMouseHoldUp);
    document.addEventListener("mousemove", onMouseHoldMove);
    return () => {
      document.removeEventListener("mouseup", onMouseHoldUp);
      document.removeEventListener("mousemove", onMouseHoldMove);
    };
  }, []);

  const classes: string = cx(
    "split-pane-wrapper",
    className,
    `split-pane-wrapper--${split}`,
    {"split-pane-wrapper--hide": hide}
  );

  /**
   * On mouse hold down, set the next divider position
   * @param e
   */
  function onMouseHoldDown(e: any) {
    yDividerPos.current = e.clientY;
    xDividerPos.current = e.clientX;
  }

  function onMouseHoldUp() {
    yDividerPos.current = null;
    xDividerPos.current = null;
  }

  /**
   *
   * @param e
   */
  function onMouseHoldMove(e: any) {
    if (!yDividerPos.current && !xDividerPos.current) {
      return;
    }

    if (split === "col") setClientWidth((window.innerWidth - e.clientX) / nbPanes);
    // else if (split === "row") setClientHeight(e.clientY); // TODO: calculates for children

    yDividerPos.current = e.clientY;
    xDividerPos.current = e.clientX;
  }

  return (
    // @ts-ignore, 5px for the divider (style attr is not the best for perf)
    <div className={classes} style={{minWidth: `${clientWidth + 5}px`}}>
      <SplitPaneContext.Provider
        // @ts-ignore
        value={{
          clientHeight,
          setClientHeight,
          clientWidth,
          setClientWidth,
          onMouseHoldDown
        }}
      >
        {children}
      </SplitPaneContext.Provider>
    </div>
  );
};

export default SplitPane;
