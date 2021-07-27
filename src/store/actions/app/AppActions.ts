import {createAction} from "@reduxjs/toolkit";


export const setRightPaneVisibilityState = createAction<"show"|"hide">("SATELLITE/SET/UI/RIGHT_PANE_VISIBILITY");
