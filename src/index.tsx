import React           from "react";
import ReactDOM        from "react-dom";
import "config/intl/index"; // Init intl
import "config/papaparse/pre"; // Init papaparse
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl        from "mapbox-gl";
import App             from "./components/containers/App/App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

// Init mapboxgl token
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_GL_TOKEN as string;

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
