import {createAction}          from "@reduxjs/toolkit";


export const setFetchedDataState = createAction<any[]>("SATELLITE/SET/FETCHED_DATA");
export const setFilteredDataState = createAction<any[]>("SATELLITE/SET/FILTERED_DATA");
export const setSelectedGeoRefState = createAction<{ x1: number, y1: number, x2: number, y2: number }>("SATELLITE/SET/SELECTED/GEOREFERENCE");
