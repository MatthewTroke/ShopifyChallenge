import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";

//Middlewares
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

//Creates a store based on your rootReducer (a collection of all of your reducers)
const middlewareEnhancer = applyMiddleware(thunk, createLogger());
const enhancers = [middlewareEnhancer];

//Redux Dev Tools
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

//Store with reducers and enhancers
const composedEnhancers = compose(...enhancers);
const store = createStore(rootReducer, composedEnhancers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
