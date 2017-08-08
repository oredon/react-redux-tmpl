import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store/configureStore';
import routes from './routes.jsx';

//store生成
const store = configureStore();

//react-routerに直接historyを渡さず、react-router-reduxのsyncHistoryWithStoreでラッピングしたhistoryオブジェクトを使う
const pageHistory = syncHistoryWithStore(browserHistory, store);

//Needed for React Developer Tools
window.React = React;

//Needed for onTouchTap
injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <Router children={routes} history={pageHistory} />
  </Provider>,
  document.getElementById("root")
);
