export const AUTO_LOGIN = '[auth] Auto Login';
export const LOGIN_START = '[auth] Login Start';
export const LOGIN_SUCCESS = '[auth] Login Success';
export const LOGIN_ERROR = '[auth] Login Error';
export const SET_AUTH = '[auth] set Auth';
export const SET_AUTH_TIME = '[auth] set Auth Time';
export const LOGOUT = '[auth] logout';
export const loginStart = userData => ({
  type: LOGIN_START,
  payload: userData
});
export const autoLogin = () => ({
  type: AUTO_LOGIN
});
export const logout = () => ({
  type: LOGOUT
});
export const setAuthTime = payload => ({
  type: SET_AUTH_TIME,
  payload
});
export const setAuth = payload => ({
  type: SET_AUTH,
  payload
});
