import {combineReducers}                         from "redux";
import appReducer, {AppInitialState}             from "store/reducers/app/AppReducer";
import satelliteReducer, {SatelliteInitialState} from "store/reducers/satellite/SatelliteReducer";

export type GlobalStoreProps = {
  app: AppInitialState,
  satellite: SatelliteInitialState
}

export default combineReducers({
  app      : appReducer,
  satellite: satelliteReducer,
});
