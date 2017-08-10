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
import configureStore from './src/store/configureStore';

// fetch用URLリスト
import { ajaxUrl } from './src/config';

// routerモジュール
import { match, RouterContext } from 'react-router'

// util系モジュール
import fetch from 'isomorphic-fetch';

// --------- アプリケーションロード -----------
import { REQUEST_POSTS, FETCHED_POSTS_FAILURE, FETCHED_POSTS_SUCCESS } from './src/constants/ActionTypes';
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

app.use('/', handlerRender);

// --------- Server Side Rendering ---------
function handlerRender(req, res){
  match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      // routerエラー時は500エラーとして返す
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      // リダイレクト対応
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      // Server Side Rendering
      const store = configureStore();
      let targetYearMonth = false;

      // /list/ajaxはページ遷移と共に非同期通信する
      const promises = renderProps.components.map((component, index) => {
        if (component) {
          //コンポーネントかつfetchが必要ならPromiseを返す
          if( renderProps.params && renderProps.params.yearmonth && renderProps.params.yearmonth == "ajax" ){
            return new Promise((resolve,reject) => {
              // 非同期でfetchし、storeを更新する
              targetYearMonth = renderProps.params.yearmonth;
              fetch(ajaxUrl.getList + "?sendDataYearMonth=" + targetYearMonth)
                .then((response) => {return response.json()})
                .then((resJson) => {
                  resolve(resJson);
                }
              );
            });
          }
        };
      }).filter((elem) => elem instanceof Promise);

      Promise.all(promises)
        .then((promiseFinalizeData) => {
          // monthly-fetchデータがあればdispatch実行
          if( targetYearMonth !== false ){
            //データとビューを同期
            let actionObject = {};
            actionObject.type = FETCHED_POSTS_SUCCESS;
            actionObject.data = promiseFinalizeData[0].data;
            store.dispatch( actionObject );
          }

          // HTML生成
          res.status(200).send(renderFullPage(renderProps, store));
        })
        .catch(error => console.log(error));

    } else {
      res.status(404).send('Not found')
    }
  });
}

function renderFullPage(renderProps, store) {
  // store情報を取得
  const initialState = store.getState();

  // コンポーネントのHTMLをStringとして取得
  const html = renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  );

  return `
    <!doctype html>
    <html>
      <head>
        <title>react-redux-react-router-ssr</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  `
}

// --------- Express Listening ---------
app.listen(port, `localhost`, () => {
  console.log(`started at http://localhost:${port}`);
});
