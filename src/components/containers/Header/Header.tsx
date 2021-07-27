import React                           from "react";
import cx                              from "classnames";
import "./Header.scss";

type HeaderProps = {
  className?: string,
}

/**
 * Header Functional Component
 * @param {string} className - used to set a class on a higher element tag
 * @return {React.FC<HeaderProps>}
 */
const Header: React.FC<HeaderProps> = ({className}) => {

  const classes: string = cx(
    "header",
    className,
  );

  return (
    <div className={classes}>
      <div className="header__portal-area"/>
    </div>
  );
};

export default Header;
