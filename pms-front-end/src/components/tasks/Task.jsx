import React, { Component } from 'react';

import CookieManager from '../../utils/cookie';
import handleError from '../../utils/handleError';
import http from '../../utils/http';
import { Card } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import Error from '../Error';
import Select from 'react-select';

class Task extends Component {
  state = { task: {}, comments: [], loading: false, error: '' };

  componentDidMount() {
    const token = CookieManager.getCookie('token');
    
    http
      .get(`/tasks/${this.props.match.params.id}`, token)
      .then((res) => {
        if (res.data) {
          this.setState(() => ({ task: res.data, error: '' }));
        }

        if (res.error) {
          this.setState(() => ({ error: handleError(res.error) }));
        }
      })
      .catch((err) => this.setState(() => ({ error: handleError(err) })));

    http.get(`/tasks/${this.props.match.params.id}/comments`, token).then((res) => {
      if (res.data) {
        const comments = res.data;
        this.setState(() => ({ comments }));
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
              <NavLink to={`/projects/${this.props.match.params.projectId}`} activeClassName="active" exact={true}>
                View Project
              </NavLink>
            </li>            
            <li className="breadcrumb-item">
              <NavLink to={`/projects/${this.props.match.params.projectId}/tasks/${this.state.task.id}`} activeClassName="active">
                View Task
              </NavLink>
            </li>
          </ol>
        </nav>

        <Card>
          <Card.Header>{this.state.task.title}</Card.Header>
          <Card.Body>
            <Card.Title>Description</Card.Title>
            <Card.Text>{this.state.task.description}</Card.Text>

            <Card.Title>Deadline</Card.Title>
            <Card.Text>
              {this.state.task.deadline && new Date(this.state.task.deadline).toLocaleDateString()}
            </Card.Text>

            <Card.Title>Assignee</Card.Title>
            <Card.Text>
              {this.state.task.assignee ? this.state.task.assignee.firstname+' '+this.state.task.assignee.lastname: 'Not Available'}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>Comments</Card.Header>
          <Card.Body>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Task;
