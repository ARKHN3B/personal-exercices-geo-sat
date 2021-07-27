import React, {useRef}        from "react";
import lottie                 from "lottie-web";
import cx                     from "classnames";
import locationPinOutlineLogo from "assets/img/lottie/loading.json";
import {useMount}             from "hooks/global/useMount";
import "./Loading.scss";

type LoadingProps = {
  className?: string,
}

/**
 * Loading Functional Component
 * Use lottie (FIXME: use CSS for perf if needed)
 * TODO: multiple sizes
 * @param {string} className - used to set a class on a higher element tag
 * @return {React.FC<LoadingProps>}
 */
const Loading: React.FC<LoadingProps> = ({className}) => {
  const containerRef = useRef<any>(null);
  const animationRef = useRef<any>(null);

  useMount(() => {
    const container = containerRef?.current;
    if (container?.hasChildNodes()) return;

    animationRef.current = lottie.loadAnimation({
      // @ts-ignore
      container,
      animationData: locationPinOutlineLogo,
      loop         : true,
      autoplay     : true,
    });
  });

  const classes: string = cx(
    "loading",
    className,
  );

  return (
    <div
      ref={containerRef}
      className={classes}
    />
  );
};

export default Loading;
