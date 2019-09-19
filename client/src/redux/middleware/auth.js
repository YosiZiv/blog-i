import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  AUTO_LOGIN,
  SET_AUTH_TIME,
  LOGOUT,
  setAuthTime,
  logout,
  setAuth
} from '../actions/auth';
import { apiRequest } from '../actions/api';
import { setMessage, redirectTo } from '../actions/ui';

export const autoLogin = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === AUTO_LOGIN) {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirseIn'));
      if (expirationDate <= new Date()) {
        return dispatch(logout());
      } else {
        console.log('all check ok');

        const updateDate =
          (expirationDate.getTime() - new Date().getTime()) / 1000;
        dispatch(setAuthTime(updateDate));
        dispatch(setAuth(token));
      }
    }
  }
};
export const loginStart = ({ dispatch }) => next => action => {
  next(action);
  const URL = 'auth/login';
  if (action.type === LOGIN_START) {
    console.log(action);

    dispatch(
      apiRequest('POST', URL, action.payload, LOGIN_SUCCESS, LOGIN_ERROR)
    );
  }
};

export const loginSuccess = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === LOGIN_SUCCESS) {
    console.log(action.payload.data.adminToken, action.payload.data.expiresIn);
    const expirationDate = new Date(
      new Date().getTime() + action.payload.data.expiresIn * 1000
    );
    localStorage.setItem('token', action.payload.data.adminToken);
    localStorage.setItem('expirseIn', expirationDate);
    dispatch(setAuthTime(action.payload.data.expiresIn));
    dispatch(setMessage('login Success'));
    dispatch(setAuth(action.payload.data.adminToken));
    // dispatch(redirectTo('/'));
  }
};
export const loginFail = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === LOGIN_ERROR) {
    dispatch(setMessage(action.payload.errors));
  }
};

export const onLogout = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === LOGOUT) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirseIn');
    dispatch(setAuth(null));
  }
};

export const checkAuthTimeout = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === SET_AUTH_TIME) {
    console.log('inside');
    setTimeout(() => {
      dispatch(logout());
    }, action.payload * 1000);
  }
};

export const authMdl = [
  loginStart,
  loginSuccess,
  loginFail,
  checkAuthTimeout,
  onLogout,
  autoLogin
];
