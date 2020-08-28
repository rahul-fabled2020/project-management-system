import React, { Component } from 'react';

import CookieManager from '../../utils/cookie';
import handleError from '../../utils/handleError';
import http from '../../utils/http';
import { Card } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import Error from '../Error';
import Select from 'react-select';

class Project extends Component {
  state = { project: {}, assignedUsers: [], loading: false, error: '' };

  componentDidMount() {
    const token = CookieManager.getCookie('token');

    http
      .get(`/projects/${this.props.match.params.id}`, token)
      .then((res) => {
        if (res.data) {
          this.setState(() => ({ project: res.data, error: '' }));
        }

        if (res.error) {
          this.setState(() => ({ error: handleError(res.error) }));
        }
      })
      .catch((err) => this.setState(() => ({ error: handleError(err) })));

    http.get(`/projects/${this.props.match.params.id}/users`, token).then((res) => {
      if (res.data) {
        const assignedUsers = res.data.map(user=>({value: user.id, label: user.firstname+' '+user.lastname}))
        this.setState(() => ({ assignedUsers }));
      } else {
        this.setState(() => ({ error: handleError(res.error) }));
      }
    });
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
              <NavLink to={`/projects/${this.state.project.id}`} activeClassName="active">
                View Project
              </NavLink>
            </li>
          </ol>
        </nav>

        <Card>
          <Card.Header>{this.state.project.title}</Card.Header>
          <Card.Body>
            <Card.Title>Description</Card.Title>
            <Card.Text>{this.state.project.description}</Card.Text>

            <Card.Title>Manager</Card.Title>
            <Card.Text>
              {this.state.project.manager &&
                this.state.project.manager.firstname + ' ' + this.state.project.manager.lastname}
            </Card.Text>

            <Card.Title>Assigned Users</Card.Title>
            <Card.Text>
              <Select
                options={this.state.assignedUsers}
                isMulti
                autoFocus
                isSearchable
                value={this.state.assignedUsers}
              />
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>Tasks</Card.Header>
          <Card.Body>
            project.tasks vanne xa
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Project;
