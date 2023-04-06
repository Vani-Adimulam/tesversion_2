import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Instructions, isAuthenticated, ...rest }) => {
  return (
    <Route {...rest} render={(props) => {
      if (isAuthenticated) {
        return <Instructions {...props} />;
      } else {
        return <Redirect to={{ pathname: '/candidate-login', state: { from: props.location } }} />;
      }
    }} />
  );
};

export default ProtectedRoute;
