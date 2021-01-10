import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AppBar from './../components/AppBar';
import { getAllLikesByUser } from './..//redux/likes/likeActions';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authState = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authState) {
      dispatch(getAllLikesByUser());
    }
  }, [authState, dispatch]);

  return (
    <Route
      {...rest}
      render={(props) =>
        authState ? (
          <>
            <AppBar />
            <Component {...props} />
          </>
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
