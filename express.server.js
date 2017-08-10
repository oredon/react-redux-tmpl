// --------- モジュールロード -----------
// nodeモジュール
import fs from "fs";
import Express from "express";

// reactモジュール
import React from "react";
import { renderToString } from "react-dom/server";

// reduxモジュール
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// routerモジュール
import { match, RouterContext } from 'react-router'

// util系モジュール
import fetch from 'isomorphic-fetch';

// --------- アプリケーションロード -----------
import { REQUSET_POSTS, FETCHED_POSTS_FAILURE, FETCHED_POSTS_SUCCESS } from './src/constants/ActionTypes';
const routes = require(`./src/routes`).default;
const reducers = require(`./src/reducers`).default;

// --------- サーバ設定 -------------
const app = new Express();
const port = 3000;

// --------- リクエスト・レスポンス ----------
app.use('/static/bundle.js', function (req, res) {
  res.header('Content-Type', 'text/javascript;charset=utf-8');
  return fs.createReadStream(`./static/bundle.js`).pipe(res);
});

app.use('/api/list', function (req, res) {
  setTimeout(function(){//遅延を意図的に発生させる
    res.header('Content-Type', 'application/json;charset=utf-8');
    return fs.createReadStream(`./stub/list.json`).pipe(res);
  },2000)
});

app.use('/', function (req, res) {
  res.header('Content-Type', 'text/html;charset=utf-8');
  return fs.createReadStream(`./index.html`).pipe(res);
});

// --------- Express Listening ---------
app.listen(port, `localhost`, () => {
  console.log(`started at http://localhost:${port}`);
});
