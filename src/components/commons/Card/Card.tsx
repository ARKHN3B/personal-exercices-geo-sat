import React from "react";
import cx    from "classnames";
import "./Card.scss";

type CardProps = {
  className?: string,
}

/**
 * Card Functional Component
 * @param {string} className - used to set a class on a higher element tag
 * @return {React.FC<CardProps>}
 */
const Card: React.FC<CardProps> = ({children, className}) => {

  const classes: string = cx(
    "card",
    className,
  );

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Card;
