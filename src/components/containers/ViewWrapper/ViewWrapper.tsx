import React                           from "react";
import {useSelector}                   from "react-redux";
import cx                              from "classnames";
import {ReactComponent as CompanyLogo} from "assets/img/svg/logo.svg";
import SplitPane                       from "components/containers/SplitPane/SplitPane";
import SplitPaneCol                    from "components/containers/SplitPane/SplitPaneCol";
import SplitPaneDivider                from "components/containers/SplitPane/SplitPaneDivider";
import Header                          from "components/containers/Header/Header";
import NavBar                          from "components/containers/Navigation/NavBar/NavBar";
import {GlobalStoreProps}              from "store/reducers";
import "./ViewWrapper.scss";
import {useHistory}                    from "react-router";
import {RoutePath}                     from "../../router/routes/RoutePath";

type ViewWrapperProps = {
  className?: string,
}

/**
 * ViewWrapper Functional Component
 * @param children
 * @param {string} className - used to set a class on a higher element tag
 * @return {React.FC<ViewWrapperProps>}
 */
const ViewWrapper: React.FC<ViewWrapperProps> = ({children, className}) => {
  const rightPaneVisibility = useSelector((state: GlobalStoreProps) => state.app.ui?.rightPaneVisibility);
  const history             = useHistory();
  const classes: string     = cx(
    "view-wrapper",
    className,
  );

  function handleRedirectHome() {
    history.push(RoutePath.Root);
  }

  return (
    <div className={classes}>
      <CompanyLogo className="view-wrapper__company-logo" onClick={handleRedirectHome}/>
      <Header className="view-wrapper__header"/>
      <NavBar className="view-wrapper__navbar"/>
      <div className="view-wrapper__content">
        {children}
      </div>
      {/* TODO: globalize when have time (auto pos for divider, etc) */}
      <SplitPane className="view-wrapper__split-pane" hide={rightPaneVisibility !== "show"}>
        <SplitPaneDivider/>
        <SplitPaneCol className="view-wrapper__left-split-pane-content"/>
      </SplitPane>
    </div>
  );
};

export default ViewWrapper;
