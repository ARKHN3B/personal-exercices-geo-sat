import {createReducer}               from "@reduxjs/toolkit";
import {setRightPaneVisibilityState} from "store/actions/app/AppActions";

export type AppInitialState = {
  ui: {
    rightPaneVisibility?: "show" | "hide" | null, // true to show, false to hide
  } | null,
}


export const INITIAL_STATE: AppInitialState = {
  ui: null,
};

const appReducer = createReducer(INITIAL_STATE, {
  [setRightPaneVisibilityState.type]: (state, action) => {
    state.ui = {
      ...(state.ui || {}),
      rightPaneVisibility: action.payload,
    };
  }
});

export default appReducer;
