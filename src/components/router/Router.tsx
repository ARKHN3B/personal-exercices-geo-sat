import React, { Suspense }              from "react";
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import Switcher                         from "components/router/Switcher";
import Routes                           from "components/router/routes/Routes";
import {RoutePath}                      from "components/router/routes/RoutePath";
import Page404              from "components/router/routes/Page404";
import {SatelliteRoutePath} from "features/satellite/router/SatelliteRoutePath";
import LoadingScreen        from "../containers/Loaders/LoadingScreen/LoadingScreen";


const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen/>}>
      <Switcher>
        <Route exact path={RoutePath.Root}>
          <Redirect to={RoutePath.Dashboard}/>
        </Route>
        <Routes authed={true}/>
        <Route path={RoutePath.All} component={Page404}/>
      </Switcher>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
