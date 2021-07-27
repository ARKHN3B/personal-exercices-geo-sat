import {applyMiddleware, compose, createStore} from "redux";
import reduxMulti                              from "redux-multi";
import thunk                                   from "redux-thunk";
import reducers                                from "store/reducers";

/**
 * Configure our store
 * Enable redux devtools
 * @return {*}
 */
const configureStore = () => {
  const middlewares               = [thunk, reduxMulti];
  // @ts-ignore
  const composeEnhancers          = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const createStoreWithMiddleware = composeEnhancers(applyMiddleware(...middlewares))(createStore);
  const store                     = createStoreWithMiddleware(reducers); // store
  return store;
};

export default configureStore();
