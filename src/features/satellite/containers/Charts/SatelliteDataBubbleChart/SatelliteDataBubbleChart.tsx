import React, {useMemo, useState}          from "react";
import cx                                  from "classnames";
import {groupBy, capitalize, cloneDeep}    from "lodash";
import {ResponsiveCirclePackingCanvas}     from "@nivo/circle-packing";
import {ComputedDatum}                     from "@nivo/circle-packing/dist/types/types";
// import * as d3                    from "d3";
// import BubbleChart                from "components/containers/Charts/BubbleChart/BubbleChart";
import {useSatelliteDataState}             from "features/satellite/contexts/SatelliteDataContext/SatelliteDataContext";
// import {onDragged, setColorPaletteFactory, setSimulationFactory, setSizeScaleFactory} from "./SatelliteDataChartHelpers";
import "./SatelliteDataBubbleChart.scss";
import {useSelector}                       from "react-redux";
import {GlobalStoreProps}                  from "store/reducers";
import {parseCountryData, parseRegionData} from "./SatelliteDataChartHelpers";


const Tooltip: React.FC<ComputedDatum<any>> = ({data, color, value}) => {
  return (
    <strong className="satellite-data-bubble-chart__tooltip">
      {data.label}: {value}
    </strong>
  );
};

type SatelliteDataBubbleChartProps = {
  className?: string,
}

/**
 * SatelliteDataBubbleChart Functional Component
 * @param {string} className - used to set a class on a higher element tag
 * @param {"country"|"region"} scale - used to set the graph visualization scale
 * @return {React.FC<SatelliteDataBubbleChartProps>}
 */
const SatelliteDataBubbleChart: React.FC<SatelliteDataBubbleChartProps> = ({className,}) => {
  // const ref  = useRef(null);
  // const [width, height] = [450, 450];
  const genericData             = useSelector((state: GlobalStoreProps) => state.satellite.fetched);
  const filteredData            = useSelector((state: GlobalStoreProps) => state.satellite.filteredData);
  const data                    = filteredData || genericData;
  const [selected, setSelected] = useState<string | null>(null);

  const classes: string = cx(
    "satellite-data-bubble-chart",
    className,
  );

  // TODO: find a solution to generate a canvas w/ D3 (performance) and replace temporary @nivo lib
  // useEffect(() => {
  //   if (!data?.length) return;
  //
  //   const groupedData = groupBy(data, scale === "country" ? "Country code" : "Region name");
  //   const values = Object.values(groupedData);
  //   const colorFactory = setColorPaletteFactory(Object.keys(groupedData)),
  //         sizeScaleFactory = setSizeScaleFactory(1, [7, 10]);
  //
  //   // @ts-ignore
  //   ref.current.svgRef.innerHTML = ""; // Clean before append (useful for the React 17 Fast refreshing)
  //
  //   // @ts-ignore
  //   const svgElement = d3.select(ref?.current?.svgRef);
  //
  //   // Initialize the circle: all located at the center of the svg area
  //   // @ts-ignore
  //   const node = svgElement.append("g")
  //     .selectAll("circle")
  //     .data(values)
  //     .enter()
  //     .append("g")
  //     .append("circle") // @ts-ignore
  //     .attr("class", "node") // @ts-ignore
  //     .attr("r", d => sizeScaleFactory(d.length))
  //     .attr("cx", width / 2)
  //     .attr("cy", height / 2) // @ts-ignore
  //     .style("fill", d => colorFactory(d[0]["Country code"]))
  //     .style("fill-opacity", 0.8) // @ts-ignore
  //     .attr("stroke", d => colorFactory(d[0]["Country code"]))
  //     .style("stroke-width", 1)
  //     .call( // @ts-ignore
  //       d3.drag() // call specific function when circle is dragged
  //       .on("start", dragstarted)
  //       .on("drag", onDragged)
  //       .on("end", dragended)
  //     );
  //
  //   const simulation = setSimulationFactory(width, height, sizeScaleFactory)
  //
  //   // Apply these forces to the nodes and update their positions.
  //   // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
  //   simulation
  //     // @ts-ignore
  //     .nodes(values) // @ts-ignore
  //     .on("tick", function(d: any){
  //       node// @ts-ignore
  //         .attr("cx", function(d){ return d.x; })// @ts-ignore
  //         .attr("cy", function(d){ return d.y; })
  //     });
  //
  //   function dragstarted(event: any, d: any) {
  //     if (!event.active) simulation.alphaTarget(.03).restart();
  //     d.fx = d.x;
  //     d.fy = d.y;
  //   }
  //
  //   function dragended(event: any, d: any) {
  //     if (!event.active) simulation.alphaTarget(.03);
  //     d.fx = null;
  //     d.fy = null;
  //   }
  // }, [data]);

  // TODO: loading
  const memoizedData = useMemo(() => {
    const t0 = performance.now();

    const groupedDataCountry = groupBy(data, "Country code"); // Group the data by country code

    let parsedData;
    if (selected) {
      const groupedDataRegion = groupBy(groupedDataCountry[selected], "Region name");
      parsedData              = Object.entries(groupedDataRegion).map(parseRegionData);
    }
    else {
      parsedData = Object.entries(groupedDataCountry).map(parseCountryData);
    }

    const t1 = performance.now();
    console.debug("Generate parsed data took " + (t1 - t0) + " milliseconds.");

    return {name: "root", children: parsedData};
  }, [data, selected]);

  /**
   * Set Circle label
   * @param datum
   */
  function setLabel(datum: any) {
    return datum.data.label;
  }

  function handleClick(datum: any) {
    if (datum.data.countryCode === selected) {
      setSelected(null);
      return;
    }
    setSelected(datum.data.countryCode);
  }

  return (
    // <BubbleChart ref={ref} className={classes}/>
    <div className={classes}>
      <ResponsiveCirclePackingCanvas
        data={memoizedData}
        margin={{top: 20, right: 20, bottom: 20, left: 20}}
        id="key"
        colors={{scheme: "set2"}}
        colorBy="id"
        childColor={{from: "color", modifiers: [["brighter", 0.4]]}}
        padding={1}
        leavesOnly={true}
        enableLabels={true}
        label={setLabel}
        labelsSkipRadius={16}
        labelTextColor={{from: "color", modifiers: [["darker", 2.4]]}}
        borderColor={{from: "color", modifiers: [["darker", 0.3]]}}
        animate={false}
        // @ts-ignore
        tooltip={Tooltip}
        onClick={handleClick}
      />
    </div>
  );
};

export default SatelliteDataBubbleChart;
