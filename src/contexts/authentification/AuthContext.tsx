/** Description: Auth Context Context is a simple state context based on hooks */
import React, {useState} from "react";

/**
 * Types
 */
type State = boolean | undefined;
type Dispatch = ((authContext: boolean) => void) | undefined;


/**
 * Contexts
 */
const AuthContextStateContext    = React.createContext<State>(undefined);
const AuthContextDispatchContext = React.createContext<Dispatch>(undefined);

/**
 * Type for global provider
 */
type AuthContextProviderProps = {
  children?: React.ReactNode,
  initial?: State,
}

/**
 * Global Provider
 * @param children
 * @param initial
 * @constructor
 */
function AuthContextProvider({children, initial}: AuthContextProviderProps): JSX.Element {
  const [authContext, setAuthContext] = useState<State>(initial);

  return (
    <AuthContextStateContext.Provider value={authContext}>
      <AuthContextDispatchContext.Provider value={setAuthContext}>
        {children}
      </AuthContextDispatchContext.Provider>
    </AuthContextStateContext.Provider>
  );
}

/**
 * State hook
 */
function useAuthContextState(): State {
  const context: State = React.useContext(AuthContextStateContext);
  if (context === undefined) {
    throw new Error("useAuthContextState must be used within a AuthContextProvider");
  }
  return context;
}


/**
 * Dispatch hook
 */
function useAuthContextDispatch(): Dispatch {
  const context: Dispatch = React.useContext(AuthContextDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthContextDispatch must be used within a AuthContextProvider");
  }
  return context;
}


/**
 * Merge state and dispatch hooks
 */
function useAuthContext(): Array<any> {
  return [useAuthContextState(), useAuthContextDispatch()];
}


export {AuthContextProvider, useAuthContext, useAuthContextState};
