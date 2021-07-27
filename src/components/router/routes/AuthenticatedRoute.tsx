import React                   from "react";
import { RouteComponentProps } from "react-router";
import Header                  from "../../containers/Header/Header";
import ViewWrapper             from "../../containers/ViewWrapper/ViewWrapper";


type AuthenticatedRouteProps = {
  component: React.ComponentType<RouteComponentProps & any>
  path: string,
  routeProps: RouteComponentProps<any>,
}


/**
 * AuthenticatedRoute Functional Component
 * @constructor
 * @return {React.FC<AuthenticatedRouteProps>}
 */
const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({ component: Component, path, routeProps }) => {
  return (
    <>
      <ViewWrapper>
        <Component {...routeProps} authed={true}/>
      </ViewWrapper>
    </>
  );
};

export default AuthenticatedRoute;
