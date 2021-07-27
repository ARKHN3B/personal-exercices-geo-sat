import React, {useRef} from "react";
import cx              from "classnames";
import lottie          from "lottie-web";
import {useMount}      from "hooks/global/useMount";
import "./NavBarItem.scss";
import {useHistory}    from "react-router";
import {useLocation}   from "react-router-dom";

type NavBarItemProps = {
  className?: string,
  disableAnimation?: {
    onMouseLeave?: boolean,
  },
  logo: string | Record<any, any>,
  redirectTo: string,
  selected?: boolean,
}

/**
 * NavBarItem Functional Component
 * @param {string} className - used to set a class on a higher element tag
 * @param disableAnimation
 * @param logo
 * @param redirectTo
 * @param selected
 * @return {React.FC<NavBarItemProps>}
 */
const NavBarItem: React.FC<NavBarItemProps> = ({className, disableAnimation, logo, redirectTo, selected}) => {
  const history      = useHistory();
  const {pathname}   = useLocation();
  const logoRef      = useRef<any>(null);
  const animationRef = useRef<any>(null);

  useMount(() => {
    const container = logoRef?.current;
    if (container?.hasChildNodes()) return;

    animationRef.current = lottie.loadAnimation({
      // @ts-ignore
      container,
      animationData: logo,
      loop         : false,
      autoplay     : false,
    });
  });

  const classes: string = cx(
    "nav-bar-item",
    {"nav-bar-item--selected": pathname.includes(redirectTo)},
    className,
  );

  /**
   * On mouse enter, play the animation
   */
  function handleMouseEnter() {
    const {current: animation} = animationRef;
    animation?.resetSegments(true);
    animation?.setDirection(1);
    animation?.play();
  }

  /**
   * On mouse leave, reverses the animation
   */
  function handleMouseLeave() {
    if (disableAnimation?.onMouseLeave) return;
    const {current: animation} = animationRef;
    animation?.setDirection(-1);
    animation?.play();
  }

  /**
   * Redirects when the user clicks on the container
   */
  function handleClick() {
    history.push(redirectTo);
  }

  return (
    <div
      ref={logoRef}
      style={{width: 50, height: 50}}
      className={classes}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export default NavBarItem;
