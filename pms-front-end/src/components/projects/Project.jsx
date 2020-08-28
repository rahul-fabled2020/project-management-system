import React, { Component } from 'react';

import CookieManager from '../../utils/cookie';
import handleError from '../../utils/handleError';
import http from '../../utils/http';
import { Card, Table } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import Error from '../Error';
import Select from 'react-select';
import AddTaskModal from '../tasks/AddTaskModal';

class Project extends Component {
  state = { project: { tasks: [] }, assignedUsers: [], loading: false, error: '', showModal: false };

  addTask = (task) => {
    this.setState(() => ({ project: { tasks: [task, ...this.state.project.tasks] } }));
  };

  onDelete = (id) => {
    if (window.confirm('Are you sure to delete?')) {
      const token = CookieManager.getCookie('token');
      http
        .destroy(`/tasks/${id}`, token)
        .then((res) => {
          if (res && res.error) handleError(res.error);
        })
        .then(() => this.fetchTasks(token))
        .catch((err) => handleError(err));
    }
  };

  fetchTasks = (token) => {
    http
      .get(`/projects/${this.props.match.params.id}`, token)
      .then((res) => {
        if (res.data) {
          res.data.tasks.sort((a, b) => (a.id < b.id ? 1 : -1));
          this.setState(() => ({ project: res.data, error: '' }));
        }

        if (res.error) {
          this.setState(() => ({ error: handleError(res.error) }));
        }
      })
      .catch((err) => this.setState(() => ({ error: handleError(err) })));
  };

  componentDidMount() {
    const token = CookieManager.getCookie('token');

    this.fetchTasks(token);

    http.get(`/projects/${this.props.match.params.id}/users`, token).then((res) => {
      if (res.data) {
        const assignedUsers = res.data.map((user) => ({ value: user.id, label: user.firstname + ' ' + user.lastname }));
        this.setState(() => ({ assignedUsers }));
      } else {
        this.setState(() => ({ error: handleError(res.error) }));
      }
    });
  }

  render() {
    const { tasks } = this.state.project;
    const { showModal } = this.state;

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
            <div className="dasboard__add-btn-wrapper">
              <button
                className="dashboard__add-btn"
                onClick={() => this.setState(() => ({ showModal: true }))}
                title="Add"
              >
                <i className="fas fa-plus-circle"></i>
              </button>
            </div>

            <Table responsive className="dashboard__table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Deadline</th>
                  <th>Assignee</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.length === 0 && (
                  <tr>
                    <td colSpan={5}>No tasks present</td>
                  </tr>
                )}
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.title}</td>
                    <td>{new Date(task.deadline).toLocaleDateString()}</td>
                    <td>{task.assignee}</td>
                    <td>
                      <Link
                        to={`/projects/${this.state.project.id}/tasks/${task.id}`}
                        className="dashboard__table-links"
                        title="View"
                      >
                        <i className="fas fa-eye"></i>
                      </Link>
                      <Link
                        to={`/projects/${this.state.project.id}/tasks/${task.id}/edit`}
                        className="dashboard__table-links"
                        title="Edit"
                      >
                        <i className="fas fa-edit"></i>
                      </Link>
                      <span className="dashboard__table-links" onClick={(e) => this.onDelete(task.id)} title="Delete">
                        <i className="fas fa-trash-alt"></i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <AddTaskModal
              projectId={this.state.project.id}
              assignedUsers={this.state.assignedUsers}
              show={showModal}
              addTask={this.addTask}
              onHide={() => this.setState(() => ({ showModal: false }))}
            />
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Project;
