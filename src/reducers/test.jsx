import { TEST_DATA, REQUEST_POSTS, FETCHED_POSTS_SUCCESS, FETCHED_POSTS_FAILURE } from '../constants/ActionTypes';

const initialState = {
  testdata: 0,
  requestData: "",
  errorText: "",
  isFetching: false
}

export default function test(state = initialState, action){
  switch (action.type){
    case TEST_DATA:
      return Object.assign({}, state, {
        testdata: action.data,
        errorText: "",
        isFetching: false
      });
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        errorText: "",
        isFetching: true
      });
    case FETCHED_POSTS_SUCCESS:
      return Object.assign({}, state, {
        testdata: action.data,
        errorText: "",
        isFetching: false
      });
    case FETCHED_POSTS_FAILURE:
      return Object.assign({}, state, {
        errorText: action.errorText,
        isFetching: false
      });
    default:
      return state;
  }
}
