import React, {useCallback, useRef}  from "react";
import {useDispatch, useSelector}    from "react-redux";
import {useTranslation}              from "react-i18next";
import cx                            from "classnames";
import lottie                        from "lottie-web";
import doubleCHevronRightLogo        from "assets/img/double_chevron_right.json";
import Button                        from "components/commons/Button/Button";
import ReactPortal                   from "components/commons/ReactPortal/ReactPortal";
import {GlobalStoreProps}            from "store/reducers";
import "./SatelliteDataHeader.scss";
import {setRightPaneVisibilityState} from "../../../../store/actions/app/AppActions";

type SatelliteDataHeaderProps = {
  className?: string,
}

/**
 * SatelliteDataHeader Functional Component
 * @param {string} className - used to set a class on a higher element tag
 * @return {React.FC<SatelliteDataHeaderProps>}
 */
const SatelliteDataHeader: React.FC<SatelliteDataHeaderProps> = ({className}) => {
  const showRightPane = useSelector((state: GlobalStoreProps) => state.app.ui?.rightPaneVisibility === "show");
  const dispatch            = useDispatch();
  const {t}                 = useTranslation();
  const animationRef        = useRef<any>(null);
  const logoRef             = useCallback(node => {
    if (!node || node?.hasChildNodes()) return;
    animationRef.current = lottie.loadAnimation({
      // @ts-ignore
      container     : node,
      animationData : doubleCHevronRightLogo,
      loop          : false,
      autoplay      : true,
      initialSegment: [0, 114],
    });
  }, []);
  const btnText             = t(`${showRightPane ? "hide" : "show"} visual rendering`);


  const classes: string = cx(
    "satellite-data-header",
    {"satellite-data-header--hidden-mode": showRightPane},
    className,
  );

  /**
   * On mouse enter, play the animation
   */
  function handleMouseEnter() {
    const {current: animation} = animationRef;
    animation.playSegments([0, 114]);
  }

  /**
   * Set right pane visibility on click
   */
  function handleClick() {
    const newVisibility = showRightPane ? "hide" : "show";
    dispatch(setRightPaneVisibilityState(newVisibility))
  }

  return (
    <ReactPortal selector=".header__portal-area">
      <div className={classes}>
        <Button className="satellite-data-header__render-btn" importance="tertiary" onMouseEnter={handleMouseEnter}
                onClick={handleClick}>
          {btnText}
          <span className="satellite-data-header__inline-logo-container" ref={logoRef}/>
        </Button>
      </div>
    </ReactPortal>
  );
};

export default SatelliteDataHeader;
