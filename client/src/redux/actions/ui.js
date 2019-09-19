export const SET_MESSAGE = '[UI] Message';
export const REDIRECT = '[UI] Redirect';
export const setMessage = message => ({
  type: SET_MESSAGE,
  payload: message
});
export const redirectTo = url => ({
  type: REDIRECT,
  payload: url
});
