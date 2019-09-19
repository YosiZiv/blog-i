import { uiReducer } from './ui';
import { authReducer } from './auth';
import { combineReducers } from 'redux';

export const reducers = combineReducers({
  ui: uiReducer,
  auth: authReducer
});
