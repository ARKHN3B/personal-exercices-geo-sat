import React, {useCallback, useRef}                   from "react";
import {useDispatch, useSelector}                     from "react-redux";
import {useTranslation}                               from "react-i18next";
import cx                                             from "classnames";
import MaterialTable                                  from "material-table";
import {cloneDeep}                                    from "lodash";
import Card                                           from "components/commons/Card/Card";
import {useColumns}                                   from "features/satellite/containers/Cards/SatelliteDataListCard/SatelliteDataListCardHelpers";
import {useCallbackDebouncer}                         from "hooks/global/useCallbackDebouncer";
import {setRightPaneVisibilityState}                  from "store/actions/app/AppActions";
import {setFilteredDataState, setSelectedGeoRefState} from "store/actions/satellite/SatelliteActions";
import {GlobalStoreProps}                             from "store/reducers";
import "./SatelliteDataListCard.scss";
import Loading                                        from "../../../../../components/commons/Loading/Loading";


type SatelliteDataListCardProps = {
  className?: string,
  loading?: boolean,
}

/**
 * SatelliteDataListCard Functional Component
 * TODO: For performance, manage data and pagination from a back-end (why not in indexeddb)
 * @param {string} className - used to set a class on a higher element tag
 * @param {boolean} loading
 * @return {React.FC<SatelliteDataListCardProps>}
 */
const SatelliteDataListCard: React.FC<SatelliteDataListCardProps> = ({className, loading}) => {
  const tableRef              = useRef(null);
  const {t}                   = useTranslation();
  const columns               = useColumns();
  const fetchedData           = useSelector((state: GlobalStoreProps) => state.satellite.fetched);
  const data                  = fetchedData ? cloneDeep(fetchedData) : []; // FIXME MaterialTable want editable data (cloneDeep isn't good for perf, especially when we have large amount of data)
  const dispatch              = useDispatch();
  const setFilteredDataAction = useCallback(
    filteredData => { dispatch(setFilteredDataState(filteredData)); },
    [dispatch],
  );
  const setDebouncedValue     = useCallbackDebouncer(setFilteredDataAction, 300);

  const classes: string = cx(
    "satellite-data-list-card",
    className,
  );

  function handleSearchChange() {
    // @ts-ignore
    const {sortedData} = tableRef?.current?.dataManager;
    setDebouncedValue(sortedData);
  }

  /**
   * Reveals the selection on a map
   * @param event
   * @param rowData
   */
  function handleShowSelection(event: any, rowData: any[] | any) {
    // Parse here instead of when we parse the initial data to save some memory (we parse when we need it)
    const georeference = JSON.parse(rowData["__parsed_extra"]);
    dispatch(setSelectedGeoRefState(georeference));
    dispatch(setRightPaneVisibilityState("show"));
  }

  // TODO: create a common table
  return (
    <Card className={classes}>
      <MaterialTable
        actions={[
          {
            icon   : "travel_explore",
            tooltip: t("show on map"),
            onClick: handleShowSelection
          }
        ]}
        columns={columns}
        components={{
          Container: props => <div {...props} className="satellite-data-list-card__material-table-container"/>,
          OverlayLoading: props => (
            <div {...props} className="satellite-data-list-card__material-table-overlay-loading">
              <Loading />
            </div>
          )
        }}
        data={data}
        isLoading={loading}
        localization={{
          toolbar   : {
            searchPlaceholder: t("search"),
          },
          pagination: {
            labelRowsSelect: t("line_plural")
          }
        }}
        onSearchChange={handleSearchChange}
        options={{
          actionsColumnIndex: -1,
        }}
        tableRef={tableRef}
        title={t("satellite data")}
      />
    </Card>
  );
};

export default SatelliteDataListCard;
