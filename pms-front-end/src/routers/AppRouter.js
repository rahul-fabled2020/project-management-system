import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import App from '../App';
import LoginPage from '../components/LoginPage';
import withDashboard from '../hoc/withDashboard';
import UsersPage from '../components/users/UsersPage';


const DefaultPage = () => (
  <div>404 Not Found</div>
);

const AppRouter = () => (
  <BrowserRouter basename="/leapfrog/pms/">
    <div>
      <Switch>
        <Route path="/" component={withDashboard(App)} exact={true} />
        <Route path="/login" component={LoginPage} />
        <Route path="/users" component={ withDashboard(UsersPage)} />
        <Route path="/projects" component={withDashboard(DefaultPage)} />
        <Route path="/tasks" component={withDashboard(DefaultPage)} />
        <Route component={withDashboard(DefaultPage)} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;