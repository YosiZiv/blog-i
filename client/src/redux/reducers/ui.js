import { SET_MESSAGE, REDIRECT } from '../actions/ui';

const initState = {
  message: null,
  redirect: null
};

export function uiReducer(state = initState, action) {
  switch (action.type) {
    case REDIRECT:
      return { ...state, redirect: action.payload };
    case SET_MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
}
