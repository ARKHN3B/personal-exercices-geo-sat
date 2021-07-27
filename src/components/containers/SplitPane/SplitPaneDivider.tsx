import React, {useContext} from "react";
import cx               from "classnames";
import SplitPaneContext from "components/containers/SplitPane/SplitPaneContext";
import "./SplitPaneDivider.scss";

type SplitPaneDividerProps = {
  className?: string,
  split?: "col" | "row"
}

/**
 * SplitPaneDivider Functional Component
 * @param {string} className - used to set a class on a higher element tag
 * @param split
 * @return {React.FC<SplitPaneDividerProps>}
 */
const SplitPaneDivider: React.FC<SplitPaneDividerProps> = ({className, split = "col"}) => {
  // @ts-ignore
  const { onMouseHoldDown } = useContext(SplitPaneContext);

  const classes: string = cx(
    "split-pane-divider",
    className,
    `split-pane-divider--${split}`,
  );

  return <div className={classes} onMouseDown={onMouseHoldDown}/>;
};

export default SplitPaneDivider;
