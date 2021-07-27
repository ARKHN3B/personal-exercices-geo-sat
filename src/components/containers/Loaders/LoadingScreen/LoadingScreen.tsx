import React   from "react";
import cx      from "classnames";
import Loading from "components/commons/Loading/Loading";
import "./LoadingScreen.scss";

type LoadingScreenProps = {
  className?: string,
}

/**
 * Loaders Functional Component
 * @param {string} className - used to set a class on a higher element tag
 * @return {React.FC<LoadingScreenProps>}
 */
const LoadingScreen: React.FC<LoadingScreenProps> = ({className}) => {

  const classes: string = cx(
    "loading-screen",
    className,
  );

  return (
    <div className={classes}>
      <Loading/>
    </div>

  );
};

export default LoadingScreen;
