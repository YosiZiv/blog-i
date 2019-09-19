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
        .then(response => dispatch({ type: onSuccess, payload: response }))
        .catch(error => dispatch({ type: onError, payload: error }));
    }
    if (method === 'POST') {
      axios
        .post(url, { ...action.payload })
        .then(response => dispatch({ type: onSuccess, payload: response }))
        .catch(error => {
          console.log(error);
          dispatch({ type: onError, payload: error.response.data });
        });
    }
  }

  return next(action);
};
