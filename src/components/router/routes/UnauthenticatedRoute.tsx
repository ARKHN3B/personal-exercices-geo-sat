import React                           from "react";
import { RouteComponentProps }         from "react-router";
import { Redirect }                    from "react-router-dom";
import { IgnoredRoutePath, RoutePath } from "components/router/routes/RoutePath";


type UnauthenticatedRouteProps = {
  component: React.ComponentType<RouteComponentProps & any>
  routeProps: RouteComponentProps<any>,
}


/**
 * UnauthenticatedRoute Functional Component
 * @param {string} className - used to set a class on a higher element tag
 * @constructor
 * @return {React.FC<UnauthenticatedRouteProps>}
 */
const UnauthenticatedRoute: React.FC<UnauthenticatedRouteProps> = ({ component: Component, routeProps }) => {

  const isIgnoredRoutePath = !( Object.values(IgnoredRoutePath) as Array<string> ).includes(routeProps?.match?.path);

  return (
    <>
      {
        isIgnoredRoutePath
        ? <Redirect to={{ pathname: RoutePath.Root, state: { from: routeProps.location } }}/>
        : <Component {...routeProps} authed={false}/>
      }
    </>
  );
};

export default UnauthenticatedRoute;
