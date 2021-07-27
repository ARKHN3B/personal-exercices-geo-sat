import React                       from "react";
import {Provider as ReduxProvider} from "react-redux";
import Router                      from "components/router/Router";
import configureStore              from "store/configureStore";
import "./App.css";

function App() {
  return (
    <div className="app">
      <ReduxProvider store={configureStore}>
        <Router/>
      </ReduxProvider>
    </div>
  );
}

export default App;
