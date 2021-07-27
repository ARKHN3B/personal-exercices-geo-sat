import React                   from "react";
import { RouteComponentProps } from "react-router";
import { Route }               from "react-router-dom";
import AuthenticatedRoute      from "components/router/routes/AuthenticatedRoute";
import UnauthenticatedRoute    from "components/router/routes/UnauthenticatedRoute";


type ProtectedRouteProps = {
  authed: boolean,
  component: React.ComponentType<RouteComponentProps & any>,
  exact?: boolean,
  path: string,
}


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ authed, component: Component, exact, path }) => {

  /**
   * Render route
   * @private
   * @param routeProps
   */
  function _renderRoute(routeProps: RouteComponentProps<any>) {
    return authed
           ? <AuthenticatedRoute component={Component} path={path} routeProps={routeProps}/>
           : <UnauthenticatedRoute component={Component} routeProps={routeProps}/>;
  }


  return (
    <Route exact={exact} path={path} render={_renderRoute}/>
  );
};

ProtectedRoute.defaultProps = {
  exact: true,
};

export default ProtectedRoute;
