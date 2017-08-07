import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

//import configureStore from '../store/configureStore';

//Needed for React Developer Tools
window.React = React;

//Needed for onTouchTap
injectTapEventPlugin();

ReactDOM.render(
  <div>a</div>,
  document.getElementById("root")
);