import React                    from "react";
import cx                       from "classnames";
import ReactPortal              from "components/commons/ReactPortal/ReactPortal";
import SplitPane                from "components/containers/SplitPane/SplitPane";
import SplitPaneRow             from "components/containers/SplitPane/SplitPaneRow";
import SplitPaneDivider         from "components/containers/SplitPane/SplitPaneDivider";
import SatelliteDataBubbleChart from "../../Charts/SatelliteDataBubbleChart/SatelliteDataBubbleChart";
import SatelliteDataAreaMap     from "../../Maps/SatelliteDataAreaMap/SatelliteDataAreaMap";

type SatelliteDataListSplitPaneProps = {
  className?: string,
}

/**
 * StaelliteDataListSplitPane Functional Component
 * @param {string} className - used to set a class on a higher element tag
 * @return {React.FC<SatelliteDataListSplitPaneProps>}
 */
const SatelliteDataListSplitPane: React.FC<SatelliteDataListSplitPaneProps> = ({className}) => {

  const classes: string = cx(
    "satellite-data-list-split-pane",
    className,
  );

  return (
    <ReactPortal selector=".view-wrapper__left-split-pane-content">
      <SplitPane split="row" className={classes}>
        <SplitPaneRow>
          <SatelliteDataAreaMap/>
        </SplitPaneRow>
        <SplitPaneDivider split="row"/>
        <SplitPaneRow>
          <SatelliteDataBubbleChart/>
        </SplitPaneRow>
      </SplitPane>
    </ReactPortal>

  );
};

export default SatelliteDataListSplitPane;
