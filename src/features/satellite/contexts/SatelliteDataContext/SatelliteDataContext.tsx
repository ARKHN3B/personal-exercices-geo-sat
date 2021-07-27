/** Description: Satellite Data Context is a simple state context based on hooks */
import React, {useEffect, useState} from "react";

/**
 * Types
 */
type State = Array<string[]> | null | undefined;
type Dispatch = ((satelliteData: Array<any>) => void) | undefined;


/**
 * Contexts
 */
const SatelliteDataStateContext    = React.createContext<State>(undefined);
const SatelliteDataDispatchContext = React.createContext<Dispatch>(undefined);

/**
 * Type for global provider
 */
type SatelliteDataProviderProps = {
  children?: React.ReactNode,
  value?: State,
}

/**
 * Global Provider
 * @param children
 * @param initial
 * @constructor
 */
function SatelliteDataProvider({children, value}: SatelliteDataProviderProps): JSX.Element {
  const [satelliteData, setSatelliteData] = useState<State>(value);

  useEffect(() => {
    setSatelliteData(value);
  }, [value]);

  return (
    <SatelliteDataStateContext.Provider value={satelliteData}>
      <SatelliteDataDispatchContext.Provider value={setSatelliteData}>
        {children}
      </SatelliteDataDispatchContext.Provider>
    </SatelliteDataStateContext.Provider>
  );
}

/**
 * State hook
 */
function useSatelliteDataState(): State {
  const context: State = React.useContext(SatelliteDataStateContext);
  if (context === undefined) {
    throw new Error("useSatelliteDataState must be used within a SatelliteDataProvider");
  }
  return context;
}


/**
 * Dispatch hook
 */
function useSatelliteDataDispatch(): Dispatch {
  const context: Dispatch = React.useContext(SatelliteDataDispatchContext);
  if (context === undefined) {
    throw new Error("useSatelliteDataDispatch must be used within a SatelliteDataProvider");
  }
  return context;
}


/**
 * Merge state and dispatch hooks
 */
function useSatelliteData(): Array<any> {
  return [useSatelliteDataState(), useSatelliteDataDispatch()];
}


export {SatelliteDataProvider, useSatelliteData, useSatelliteDataState};
