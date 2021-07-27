import React                        from "react";
import {Switch, useLocation}        from "react-router-dom";
import * as H                       from "history";
import {AnimatePresence}            from "framer-motion";

/**
 * Switcher Functional Component
 * @param children
 * @constructor
 * @return {React.FC}
 */
const Switcher: React.FC = ({ children }) => {

  const location: H.Location<any> = useLocation(); // can be called inside the same file as BrowserRouter

  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.key}>
        { children }
      </Switch>
    </AnimatePresence>
  );
};

export default Switcher;
