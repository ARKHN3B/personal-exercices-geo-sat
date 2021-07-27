import React, {useRef} from "react";
import cx              from "classnames";
import mapboxgl        from "mapbox-gl";
import {useMount}      from "hooks/global/useMount";
import "./SatelliteGeoRefDemoMap.scss";

type SatelliteGeoRefDemoMapProps = {
  className?: string,
}

/**
 * SatelliteGeoRefDemoMap Functional Component
 * @param {string} className - used to set a class on a higher element tag
 * @return {React.FC<SatelliteGeoRefDemoMapProps>}
 */
const SatelliteGeoRefDemoMap: React.FC<SatelliteGeoRefDemoMapProps> = ({className}) => {
  const containerRef   = useRef(null);
  const mapInstanceRef = useRef<any | null>(null);

  useMount(() => {
    mapInstanceRef.current = new mapboxgl.Map({
      // @ts-ignore
      container: containerRef.current,
      style    : "mapbox://styles/mapbox/streets-v11", // style URL
      center   : [1.4762, 51.89], // starting position at Sealand
      zoom     : 15 // starting zoom
    });
  });

  const classes: string = cx(
    "satellite-data-geo-ref-demo-map",
    className,
  );

  return (
    <div ref={containerRef} className={classes}/>
  );
};

export default SatelliteGeoRefDemoMap;
