import * as types from './mutation-types';

export default {
  [types.SET_USER] (state) {
    state.user += 1;
  },
  [types.SET_NAME] (state, param) {
    state.username += param;
  }
};
