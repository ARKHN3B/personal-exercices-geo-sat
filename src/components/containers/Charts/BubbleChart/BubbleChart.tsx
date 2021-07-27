import React, {forwardRef, useImperativeHandle, useRef}     from "react";
import cx                  from "classnames";
import * as d3             from "d3";

type BubbleChartProps = {
  className?: string,
  width?: number|string,
  height?: number|string,
}

/**
 * BubbleChart Functional Component
 * TODO: set to skeleton
 * @param {string} className - used to set a class on a higher element tag
 * @param width
 * @param height
 * @param ref
 * @return {React.FC<BubbleChartProps>}
 */
const BubbleChart: React.FC<BubbleChartProps> = (({ className, width= 450, height = 450}, ref) => {
  const chartContainerRef = useRef(null);
  const svgRef = useRef(null);

  useImperativeHandle(
    ref,
    () => ({ chartContainerRef: chartContainerRef.current, svgRef: svgRef.current })
  );

  const classes: string = cx(
    "bubble-chart",
    "bubble-chart__container",
    className,
  );

  return (
    <div ref={chartContainerRef} className={classes}>
      <svg ref={svgRef} className={"bubble-chart__svg"} width={width} height={height}/>
    </div>
  );
});

// @ts-ignore
export default forwardRef(BubbleChart);
