import React                  from "react";
import SatelliteGeoRefDemoMap from "../../containers/Maps/SatelliteGeoRefDemoMap/SatelliteGeoRefDemoMap";

type SatelliteGeoRefViewProps = {
  className?: string,
}

/**
 * SatelliteGeoRefDemoView Functional Component
 * @param {string} className - used to set a class on a higher element tag
 * @return {React.FC<SatelliteGeoRefViewProps>}
 */
const SatelliteGeoRefDemoView: React.FC<SatelliteGeoRefViewProps> = ({className}) => {
  return (
    <>
      <SatelliteGeoRefDemoMap/>
    </>
  );
};

export default SatelliteGeoRefDemoView;
