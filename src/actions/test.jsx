import { TEST_DATA } from '../constants/ActionTypes';

export function testaction() {
  return {
    type: TEST_DATA,
    data: 123
  };
}