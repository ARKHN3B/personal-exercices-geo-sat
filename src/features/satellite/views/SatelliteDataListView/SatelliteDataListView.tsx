import React, {useState}          from "react";
import {useDispatch, useSelector} from "react-redux";
import Papa, {ParseResult}        from "papaparse";
import {useMount}                 from "hooks/global/useMount";
import SatelliteDataListCard
                                  from "features/satellite/containers/Cards/SatelliteDataListCard/SatelliteDataListCard";
import SatelliteDataHeader        from "features/satellite/containers/Header/SatelliteDataHeader";
import SatelliteDataListSplitPane
                                  from "features/satellite/containers/SplitPanes/SatelliteDataListSplitPane/SatelliteDataListSplitPane";
import {setFetchedDataState}      from "store/actions/satellite/SatelliteActions";
import {GlobalStoreProps}         from "store/reducers";

/**
 * SatelliteDataListView Functional Component
 * @return {React.FC}
 */
const SatelliteDataListView: React.FC = () => {
  const {fetched}           = useSelector((state: GlobalStoreProps) => state.satellite);
  const dispatch              = useDispatch();
  const [loading, setLoading] = useState<boolean | null>(null);

  useMount(() => {
    if (fetched) return; // already fetched

    setLoading(true);
    Papa.parse("/assets/ressources/default_satellite_data.csv", {
      download: true,
      header  : true,
      complete({data}: ParseResult<any>, file?: File) {
        dispatch(setFetchedDataState(data));
        setLoading(false);
      }
    });
  });

  return (
    <>
      <SatelliteDataHeader/>
      <SatelliteDataListCard loading={!!loading}/>
      <SatelliteDataListSplitPane/>
    </>
  );
};

export default SatelliteDataListView;
