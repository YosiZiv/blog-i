import { API_REQUEST } from '../actions/api';
import axiosFunction from '../../axiosApi';
// this middleware care only for API calls
export const api = ({ dispatch }) => next => action => {
  const axios = axiosFunction();
  if (action.type === API_REQUEST) {
    const { method, url, onSuccess, onError } = action.meta;
    if (method === 'GET') {
      axios
        .get(url)
        .then(response => response.json())
        .then(data => dispatch({ type: onSuccess, payload: data }))
        .catch(error => dispatch({ type: onError, payload: error }));
    }
    if (method === 'POST') {
      axios
        .post(url, { ...action.payload })
        .then(response => response.json())
        .then(data => dispatch({ type: onSuccess, payload: data }))
        .catch(error => dispatch({ type: onError, payload: error }));
    }
  }

  return next(action);
};
