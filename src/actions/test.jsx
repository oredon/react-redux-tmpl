import { TEST_DATA, REQUEST_POSTS, FETCHED_POSTS_SUCCESS, FETCHED_POSTS_FAILURE } from '../constants/ActionTypes';
import { ajaxUrl } from '../config';

export function changeData() {
  return {
    type: TEST_DATA,
    data: 123
  };
}

export function clearData() {
  return {
    type: TEST_DATA,
    data: 0
  };
}

/**
 * AJAXでデータを取得するアクション
 * @param  {Object} data サーバサイドへ送信したデータ
 * @return {Object}      アクションオブジェクト
 */
export function fetchData(data) {
  return dispatch => {
    // 通信中アクションを発行
    dispatch(fetchDataRequest(data));

    // QueryString生成
    let qs = _generateQueryStringFromObject(data);

    // fetch実行
    fetch(ajaxUrl.getList + qs)
      .then((response) => {
        if(response.ok){
          return response.json();
        }else{
          // 404, 500 etc...
          throw new Error("Error: Failed to fetch list data due to status ng.");
          dispatch(fetchDataFailed("Error: Failed to fetch list data due to status ng."));
        }
      })
      .then((json) => {
        if(json.status == 1){
          dispatch(fetchDataSuccess(json));
        }else{
          dispatch(fetchDataFailed("Error: Failed to fetch list data due to application error."));
        }
      })
      .catch((err) => {
        dispatch(fetchDataFailed("Error: Failed to fetch list data due to connection error."));
      });

  }
}

/**
 * AJAX中アクション
 * @param  {Object} requestData サーバサイドへ送信したデータ
 * @return {Object}             アクションオブジェクト
 */
export function fetchDataRequest(requestData) {
  return {
    type: REQUEST_POSTS,
    requestData: requestData
  }
}

/**
 * AJAX完了（成功）アクション
 * @param  {Object} json fetchしたデータ
 * @return {Object}      アクションオブジェクト
 */
export function fetchDataSuccess(json){
  return {
    type: FETCHED_POSTS_SUCCESS,
    data: json.data
  }
}

export function fetchDataFailed(errorText){
  console.log(errorText)
  return {
    type: FETCHED_POSTS_FAILURE,
    errorText: errorText
  }
}

/**
 * 1階層のオブジェクトからQueryString文字列を生成して返す
 * @param       {Object} obj key-value形式の1階層オブジェクト
 * @return      {String}     QueryString文字列
 */
function _generateQueryStringFromObject(obj) {
  let ret = "";
  for(let i in obj){
    if(ret === ""){
      ret += "?";
    }else{
      ret += "&";
    }
    ret += i + "=" + obj[i];
  }
  return ret;
}
