import React, { Component } from 'react';

import withAuth from '../../hoc/withAuth';
import { NavLink, Link } from 'react-router-dom';
import http from '../../utils/http';
import CookieManager from '../../utils/cookie';

import { Table } from 'react-bootstrap';
import Error from '../Error';
import AddUserModal from './AddUserModal';
import handleError from '../../utils/handleError';
import { connect } from 'react-redux';
import * as apiActions from '../../redux/actions/apiActions';

class UsersPage extends Component {
  state = { error: '', showModal: false };

  onDelete = (id) => {
    if (window.confirm('Are you sure to delete?')) {
      const token = CookieManager.getCookie('token');
      http
        .destroy(`/users/${id}`, token)
        .then((res) => {if(res && res.error) handleError(res.error)})
        .then(()=>{
          this.fetchUsers(token);
        })
        .catch((err) => handleError(err));
    }
  };

  fetchUsers = (token) => {
    http
      .get('/users', token)
      .then((res) => {
        const users = res.data;

        if (users) {
          users.sort((a, b) => (a.id > b.id ? -1 : 1));
          this.props.storeUsers(users);
        }

        if (res.error) {
          this.setState(() => ({ error: handleError(res.error) }));
        }
      })
      .catch((err) => this.setState({ error: handleError(err) }));
  }

  componentDidMount() {
    this.props.storeUsers([]);
    const token = CookieManager.getCookie('token');

    this.fetchUsers(token);

  }

  render() {
    const { showModal } = this.state;
    const { users } = this.props;

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
              <NavLink to="/users" activeClassName="active">
                Users
              </NavLink>
            </li>
          </ol>
        </nav>

        <div className="dasboard__add-btn-wrapper">
          <button className="dashboard__add-btn" onClick={() => this.setState(() => ({ showModal: true }))} title="Add">
            <i className="fas fa-plus-circle"></i>
          </button>
        </div>

        <Table responsive className="dashboard__table">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan={6}>No users present</td>
              </tr>
            )}
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Link to={`/users/${user.id}`} className="dashboard__table-links" title="View">
                    <i className="fas fa-eye"></i>
                  </Link>
                  <Link to={`/users/${user.id}/edit`} className="dashboard__table-links" title="Edit">
                    <i className="fas fa-edit"></i>
                  </Link>
                  <span className="dashboard__table-links" onClick={(e) => this.onDelete(user.id)} title="Delete">
                    <i className="fas fa-trash-alt"></i>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Add User Modal */}
        <AddUserModal show={showModal} onHide={() => this.setState(() => ({ showModal: false }))} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.api.users };
}

function mapDispatchToProps(dispatch) {
  return { storeUsers: (users) => dispatch(apiActions.storeUsers(users)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(UsersPage));
