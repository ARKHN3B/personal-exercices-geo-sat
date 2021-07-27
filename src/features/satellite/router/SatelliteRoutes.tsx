import React                    from "react";
import ProtectedRoute        from "components/router/routes/ProtectedRoute";
import {SatelliteRoutePath}  from "features/satellite/router/SatelliteRoutePath";
import SatelliteDataListView from "features/satellite/views/SatelliteDataListView/SatelliteDataListView";
import SatelliteGeoRefDemoView from "features/satellite/views/SatelliteGeoRefDemoView/SatelliteGeoRefDemoView";

type SatelliteRoutesProps = {
  authed: boolean,
}

/**
 * SatelliteRoutes Functional Component
 * @return {React.FC}
 */
const SatelliteRoutes: React.FC<SatelliteRoutesProps> = ({ authed }) => {
  return (
    <>
      <ProtectedRoute authed={authed} path={SatelliteRoutePath.List} component={SatelliteDataListView}/>
      <ProtectedRoute authed={authed} path={SatelliteRoutePath.Georeferences} component={SatelliteGeoRefDemoView}/>
    </>
  );
};

export default SatelliteRoutes;
