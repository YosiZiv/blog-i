import { LOGIN_ERROR, SET_AUTH } from '../actions/auth';

const initState = {
  token: null
};

export function authReducer(state = initState, action) {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, token: action.payload };
    case LOGIN_ERROR:
      return { ...state, message: action.payload.errors };
    default:
      return state;
  }
}
