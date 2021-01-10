import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from './utils/PrivateRoute';
import Login from './pages/Login';
import Feed from './pages/Feed';
import Profile from './components/Profile';

//import InspireNavigator from './routes/InspireStack';

const EntryPoint = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute path="/:user_name" component={Profile} />
        <PrivateRoute path="/" component={Feed} />
      </Switch>
    </Router>
  );
};

export default EntryPoint;
