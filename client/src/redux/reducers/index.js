import { uiReducer } from './ui';
import { combineReducers } from 'redux';

export const reducers = combineReducers({
  ui: uiReducer
});
