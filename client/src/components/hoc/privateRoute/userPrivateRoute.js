import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// eslint-disable-next-line import/prefer-default-export
const userPrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('userToken') ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/' }} />
      )
    }
  />
);
export default userPrivateRoute;