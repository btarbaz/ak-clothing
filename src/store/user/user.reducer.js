// action types object
import { USER_ACTION_TYPE } from './user.type';

const INITIAL_STATE = {
  currentUser: null,
};

// userReducer return a updated object
export const userReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPE.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return state;
  }
};
