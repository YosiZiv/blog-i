import { applyMiddleware, createStore, compose } from 'redux';
import { reducers } from './reducers';
import { api } from './middleware/api';
import { auth } from './middleware/auth';

// dev tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(api))
);
