import {createReducer}                                from "@reduxjs/toolkit";
import {
  setFetchedDataState,
  setFilteredDataState,
  setSelectedGeoRefState
} from "store/actions/satellite/SatelliteActions";

export type SatelliteInitialState = {
  fetched: Array<any> | null,
  filteredData: Array<any> | null,
  selected: {
    georeference: { x1: number, y1: number, x2: number, y2: number },
    areaName?: string,
  } | null,
}


export const INITIAL_STATE: SatelliteInitialState = {
  fetched: null,
  filteredData: null,
  selected: null,
};

const satelliteReducer = createReducer(INITIAL_STATE, {
  [setFetchedDataState.type]: (state, action) => {
    state.fetched = action?.payload;
  },
  [setFilteredDataState.type]: (state, action) => {
    state.filteredData = action?.payload;
  },
  [setSelectedGeoRefState.type]: (state, action) => {
    state.selected = {
      georeference: action.payload,
    };
  }
});

export default satelliteReducer;
