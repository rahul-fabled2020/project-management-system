import React, { Component } from 'react';

import withAuth from '../../hoc/withAuth';
import { NavLink, Link } from 'react-router-dom';
import http from '../../utils/http';
import CookieManager from '../../utils/cookie';

import { Table } from 'react-bootstrap';
import Error from '../Error';

import handleError from '../../utils/handleError';
import { connect } from 'react-redux';
import * as apiActions from '../../redux/actions/apiActions';
import { ROLES } from '../../configs/constants';

class TasksPage extends Component {
  state = { error: '', showModal: false };

  onDelete = (id) => {
    if (window.confirm('Are you sure to delete?')) {
      const token = CookieManager.getCookie('token');
      http
        .destroy(`/tasks/${id}`, token)
        .then((res) => res)
        .catch((err) => handleError(err));
    }
  };

  componentDidMount() {
    this.props.storeTasks([]);
    const token = CookieManager.getCookie('token');
    const user = JSON.parse(CookieManager.getCookie('user'));
    const url =
      user.roles[0].id === ROLES['Task Manager'] || user.roles[0].id === ROLES['Admin']
        ? '/tasks'
        : `/users/${user.id}/tasks`;
    http
      .get(url, token)
      .then((res) => {
        const tasks = res.data;

        if (tasks) {
          tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
          this.props.storeTasks(tasks);
        }

        if (res.error) {
          this.setState(() => ({ error: handleError(res.error) }));
        }
      })
      .catch((err) => this.setState({ error: handleError(err) }));
  }

  render() {
    const { tasks } = this.props;

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
              <NavLink to="/tasks" activeClassName="active">
                Tasks
              </NavLink>
            </li>
          </ol>
        </nav>

        <Table responsive className="dashboard__table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Manager</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 && (
              <tr>
                <td colSpan={4}>No tasks present</td>
              </tr>
            )}
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.manager}</td>
                <td>
                  <Link to={`/tasks/${task.id}`} className="dashboard__table-links" title="View">
                    <i className="fas fa-eye"></i>
                  </Link>
                  <Link to={`/tasks/${task.id}/edit`} className="dashboard__table-links" title="Edit">
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { tasks: state.api.tasks };
}

function mapDispatchToProps(dispatch) {
  return { storeTasks: (tasks) => dispatch(apiActions.storeTasks(tasks)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(TasksPage));
