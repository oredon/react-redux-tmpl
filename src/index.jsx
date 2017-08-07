import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store/configureStore';
import Root from './containers/Root';

const store = configureStore();

// とりあえずアクションが発行できるかどうかテスト
import { testaction } from "./actions/test";
store.dispatch(testaction())

//Needed for React Developer Tools
window.React = React;

//Needed for onTouchTap
injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("root")
);
