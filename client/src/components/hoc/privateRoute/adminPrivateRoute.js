import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// eslint-disable-next-line import/prefer-default-export
const adminPrivateRoute = ({ component: Component, ...rest }) => (
  // <Route
  //   {...rest}
  //   render={props =>
  //     localStorage.getItem('adminToken') ? (
  //       <Component {...props} />
  //     ) : (
  //       <Redirect to={{ pathname: '/' }} />
  //     )
  //   }
  // />
  <Route {...rest} render={props => <Component {...props} />} />
);
export default adminPrivateRoute;
