import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from '../App';
import LoginPage from '../components/LoginPage';
import withDashboard from '../hoc/withDashboard';
import UsersPage from '../components/users/UsersPage';
import User from '../components/users/User';
import EditUser from '../components/users/EditUser';
import ProjectsPage from '../components/projects/ProjectsPage';
import EditProject from '../components/projects/EditProject';
import Project from '../components/projects/Project';
import Task from '../components/tasks/Task';
import EditTask from '../components/tasks/EditTask';

const DefaultPage = () => <div>404 Not Found</div>;

const AppRouter = () => (
  <BrowserRouter basename="/leapfrog/pms/">
    <div>
      <Switch>
        <Route path="/" component={withDashboard(App)} exact={true} />
        <Route path="/login" component={LoginPage} />

        <Route path="/users" component={withDashboard(UsersPage)} exact={true} />
        <Route path="/users/:id" component={withDashboard(User)} exact={true} />
        <Route path="/users/:id/edit" component={withDashboard(EditUser)} />

        <Route path="/projects" component={withDashboard(ProjectsPage)} exact={true} />
        <Route path="/projects/:id" component={withDashboard(Project)} exact={true} />
        <Route path="/projects/:id/edit" component={withDashboard(EditProject)} />

        <Route path="/projects/:projectId/tasks/:id" component={withDashboard(Task)} exact={true} />
        <Route path="/projects/:projectId/tasks/:id/edit" component={withDashboard(EditTask)} exact={true} />

        <Route component={withDashboard(DefaultPage)} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
