import { TEST_DATA } from '../constants/ActionTypes';

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
