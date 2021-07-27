import React                    from "react";
import cx                       from "classnames";
import NavBarItem               from "components/containers/Navigation/NavBarItem/NavBarItem";
import homeOutlineLogo          from "assets/img/lottie/home-outline.json";
import globleOutlineLogo        from "assets/img/lottie/globe-outline.json";
import locationPinOutlineLogo from "assets/img/lottie/location-pin-outline.json";
import {SatelliteRoutePath}   from "features/satellite/router/SatelliteRoutePath";
import {RoutePath}            from "components/router/routes/RoutePath";
import "./NavBar.scss";

type NavBarProps = {
  className?: string,
}

/**
 * NavBar Functional Component
 * @param {string} className - used to set a class on a higher element tag
 * @return {React.FC<NavBarProps>}
 */
const NavBar: React.FC<NavBarProps> = ({className}) => {

  const classes: string = cx(
    "nav-bar",
    className,
  );

  return (
    <div className={classes}>
      <NavBarItem logo={homeOutlineLogo} redirectTo={RoutePath.Dashboard} disableAnimation={{onMouseLeave: true}}/>
      <NavBarItem logo={globleOutlineLogo} redirectTo={SatelliteRoutePath.List}/>
      <NavBarItem logo={locationPinOutlineLogo} redirectTo={SatelliteRoutePath.Georeferences}
                  disableAnimation={{onMouseLeave: true}}/>
    </div>
  );
};

export default NavBar;
