import React, { Component } from 'react';

import CookieManager from '../../utils/cookie';
import handleError from '../../utils/handleError';
import http from '../../utils/http';
import { Card } from 'react-bootstrap';
import userImage from '../../images/user.svg';
import { Link, NavLink } from 'react-router-dom';
import Error from '../Error';

class User extends Component {
  state = { user: {}, loading: false, error: '' };

  componentDidMount() {
    const token = CookieManager.getCookie('token');

    http
      .get(`/users/${this.props.match.params.id}`, token)
      .then((res) => {
        if (res.data) {
          this.setState(() => ({ user: res.data, error: '' }));
        }

        if (res.error) {
          this.setState(() => ({ error: handleError(res.error) }));
        }
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
              <NavLink to="/users" activeClassName="active" exact={true}>
                Users
              </NavLink>
            </li>
            <li className="breadcrumb-item">
              <NavLink to={`/users/${this.state.user.id}`} activeClassName="active">
                View User
              </NavLink>
            </li>
          </ol>
        </nav>

        <Card style={{ width: '18rem', margin: '15px auto' }}>
          <Card.Img variant="top" src={userImage} style={{ padding: '15px' }} />
          <Card.Body>
            <Card.Title>{this.state.user.firstname + ' ' + this.state.user.lastname}</Card.Title>
            <Card.Text>
              Email: {this.state.user.email} <br />
              Role: {this.state.user.roles && this.state.user.roles[0].title}
            </Card.Text>
            <Link to={`/users/${this.state.user.id}/edit`} className="btn btn-success">
              Edit
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default User;
