import React           from "react";
import SatelliteRoutes from "features/satellite/router/SatelliteRoutes";
import DashboardView   from "features/dashboard/views/DashboardView/DashboardView";
import ProtectedRoute  from "./ProtectedRoute";
import {RoutePath}         from "./RoutePath";


type RoutesProps = {
  authed: boolean,
}


/**
 * Routes Functional Component
 * @param {string} className - used to set a class on a higher element tag
 * @constructor
 * @return {React.FC<RoutesProps>}
 */
const Routes: React.FC<RoutesProps> = ({authed}) => (
  <>
    <ProtectedRoute authed={authed} path={RoutePath.Dashboard} component={DashboardView}/>
    <SatelliteRoutes authed={authed}/>
  </>
);

export default Routes;
