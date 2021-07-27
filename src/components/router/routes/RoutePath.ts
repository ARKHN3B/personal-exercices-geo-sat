export * from "features/satellite/router/SatelliteRoutePath";

export const RoutePath = {
  Root     : "/",
  Dashboard: "/dahsboard",
  All      : "*",
};


/**
 * Ignored paths (user authed or not)
 * Note: use a duplicate enums is more efficient than looping to the first one (cf. algorithm complexity)
 */
export enum IgnoredRoutePath {
  Root = "/",
}


/**
 * Inactive paths
 * Used to disable some path of the application
 * TODO: with custom browser history
 */
export enum InactiveRoutePath {

}
