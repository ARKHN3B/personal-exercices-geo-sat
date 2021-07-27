import React, {useEffect, useRef}     from "react";
import cx                             from "classnames";
import {useSelector}                  from "react-redux";
import mapboxgl                       from "mapbox-gl";
import {parseLngLat}                  from "features/satellite/utils/map";
import {useMount}                     from "hooks/global/useMount";
import {GlobalStoreProps}             from "store/reducers";
import {calculateQuadrilateralCenter} from "utils/math/geometry/polygon";
import {useTranslation}               from "react-i18next";
import "./SatelliteDataAreaMap.scss";

type SatelliteDataAreaMapProps = {
  className?: string,
}

/**
 * SatelliteDataAreaMap Functional Component
 * @param {string} className - used to set a class on a higher element tag
 * @return {React.FC<SatelliteDataAreaMapProps>}
 */
const SatelliteDataAreaMap: React.FC<SatelliteDataAreaMapProps> = ({className}) => {
  const georeferences  = useSelector((state: GlobalStoreProps) => state.satellite.selected?.georeference);
  const containerRef   = useRef(null);
  const mapInstanceRef = useRef<any | null>(null);
  const {t}            = useTranslation();

  useMount(() => {
    mapInstanceRef.current = new mapboxgl.Map({
      // @ts-ignore
      container: containerRef.current,
      style    : "mapbox://styles/mapbox/streets-v11", // style URL
      center   : [1.4762, 51.89], // starting position at Sealand
      zoom     : 5 // starting zoom
    });
  });

  // FIXME: I don't know the coordinates system as ref for determines the coordinates provided by the default CSV (e.g. compare Martinique bounding box w/ https://gist.github.com/graydon/11198540#gistcomment-2702247)
  useEffect(() => {
    if (!georeferences || !mapInstanceRef.current) return;
    const {x0, y0}       = calculateQuadrilateralCenter(georeferences);
    const coordinates    = parseLngLat(x0, y0);
    const {current: map} = mapInstanceRef;
    map?.setCenter(coordinates);
    map?.resize();
  }, [georeferences]);

  const classes: string = cx(
    "satellite-data-area-map",
    {"satellite-data-area-map--no-georeferences": !georeferences},
    className,
  );

  return (
    <div ref={containerRef} className={classes} data-intl-no-georeference={t("no georeferences")}/>
  );
};

export default SatelliteDataAreaMap;
