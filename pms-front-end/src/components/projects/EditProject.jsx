import React, { Component } from 'react';

import CookieManager from '../../utils/cookie';
import http from '../../utils/http';
import { Form, Button, Card } from 'react-bootstrap';
import handleError from '../../utils/handleError';
import Error from '../Error';
import { NavLink } from 'react-router-dom';
import { ROLES } from '../../configs/constants';
import Select from 'react-select';

class EditProject extends Component {
  state = {
    error: '',
    loading: '',
    users: [],
    assignedUsers: [],
    loggedUserRoleId: 0,
    managers: [],
    project: { id: parseInt(this.props.match.params.id) },
    managerMenuValue: ''
  };

  assignUsers = (selectedOptions) => {
    if (selectedOptions) {
      const token = CookieManager.getCookie('token');
      const userIds = selectedOptions.map((selectedUser) => parseInt(selectedUser.value));

      this.setState(()=>({assignedUsers: selectedOptions}));

      http
        .post(`/projects/${this.state.project.id}/users`, {userIds}, token)
        .then(() => this.setState(() => ({ error: '' })))
        .catch((err) => this.setState(() => ({ error: handleError(err) })));
    }
  };

  onSubmit = (e) => {
    e.preventDefault();

    const token = CookieManager.getCookie('token');
    const user = JSON.parse(CookieManager.getCookie('user'));

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    const managerDom = document.getElementById('manager');
    const manager = parseInt(managerDom && managerDom.value) || user.id;

    http
      .put(`/projects/${this.state.project.id}`, { title, description, manager_id: manager }, token)
      .then((res) => {
        if (res.error) {
          const error = handleError(res.error);
          this.setState(() => ({ error }));
        } else {
          this.props.history.goBack();
        }
      })
      .catch((err) => this.setState(() => ({ error: handleError(err) })));
  };

  onManagerMenuChange = (e) => {
    const userMenu = e.target;
    this.setState(() => ({ managerMenuValue: userMenu.value }));
  };

  componentDidMount() {
    const token = CookieManager.getCookie('token');
    const user = JSON.parse(CookieManager.getCookie('user'));
    const projectId = parseInt(this.props.match.params.id);

    this.setState(() => ({ loggedUserRoleId: user.roles[0].id }));

    //Fetch Project to be edited
    http
      .get(`/projects/${projectId}`, token)
      .then((projectRes) => {
        if (projectRes.error) return this.setState(() => ({ error: handleError(projectRes.error) }));

        const project = projectRes.data;
        const managerMenuValue = project.manager_id;

        this.setState(() => ({ project, error: '', managerMenuValue }));
      })
      .then(() => {
        user.roles[0].id !== ROLES['Project Manager'] &&
          http.get(`/users/managers`, token).then((userRes) => {
            if (userRes.error) return this.setState(() => ({ error: handleError(userRes.error) }));

            const managers = userRes.data;
            managers.sort((a, b) => (a.title <= b.title ? -1 : 1));
            this.setState(() => ({ managers }));
          });
      })
      .catch((err) => {
        console.log(err);
        this.setState(() => ({ error: handleError(err) }));
      });

    //Fetch Non-managers
    http
      .get('/users/nonmanagers', token)
      .then((res) => {
        if (res.error) this.setState(() => ({ error: handleError(res.error) }));
        else {
          const users = res.data.map((user) => ({ value: user.id, label: `${user.firstname} ${user.lastname}` }));
          users.sort((a, b) => (a.label <= b.label ? -1 : 1));
          this.setState(() => ({ users }));
        }
      })
      .then(() => {
        //Fetch users of the project (Assigned Users)
        http.get(`/projects/${projectId}/users`, token).then((res) => {
          if (res.error) this.setState(() => ({ error: handleError(res.error) }));
          else {
            const assignedUsers = res.data.map((user) => ({
              value: user.id,
              label: `${user.firstname} ${user.lastname}`
            }));
            this.setState(() => ({ assignedUsers }));
          }
        });
      })
      .catch((err) => this.setState(() => ({ error: handleError(err) })));
  }

  render() {
    return (
      <div className="container">
        <Error message={this.state.error} />
        <nav aria-label="breadcrumb" className="dashboard__nav-bar">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <NavLink to="/" activeClassName="active" exact={true}>
                Home
              </NavLink>
            </li>
            <li className="breadcrumb-item">
              <NavLink to="/projects" activeClassName="active" exact={true}>
                Projects
              </NavLink>
            </li>
            <li className="breadcrumb-item">
              <NavLink to={`/projects/${this.state.project.id}/edit`} activeClassName="active">
                Edit Project
              </NavLink>
            </li>
          </ol>
        </nav>

        <Card>
          <Card.Header>Edit Project</Card.Header>
          <Card.Body>
            <Form onSubmit={this.onSubmit} style={{ backgroundColor: 'white' }}>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control required type="text" placeholder="Enter Title" defaultValue={this.state.project.title} />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control required as="textarea" defaultValue={this.state.project.description} />
              </Form.Group>

              {this.state.loggedUserRoleId !== ROLES['Project Manager'] && (
                <Form.Group controlId="manager">
                  <Form.Label>Manager</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    value={this.state.managerMenuValue}
                    onChange={this.onManagerMenuChange}
                  >
                    <option disabled value="">
                      --Select Manager--
                    </option>
                    {this.state.managers.map((manager) => (
                      <option key={manager.id} value={manager.id}>
                        {manager.firstname + ' ' + manager.lastname}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              )}

              <Button variant="secondary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>Assign Users to the Project</Card.Header>
          <Card.Body>
            <Select
              options={this.state.users}
              isMulti
              autoFocus
              isSearchable
              onChange={this.assignUsers}
              value={this.state.assignedUsers}
            />
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default EditProject;
