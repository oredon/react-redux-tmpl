import { TEST_DATA } from '../constants/ActionTypes';

const initialState = {
  testdata: 0
}

export default function test(state = initialState, action){
  switch (action.type){
    case TEST_DATA:
      return Object.assign({}, state, {
        testdata: 1,
      });
    default:
      return state;
  }
}
