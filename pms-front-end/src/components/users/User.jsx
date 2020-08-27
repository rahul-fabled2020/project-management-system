import React, { Component } from 'react';

import CookieManager from '../../utils/cookie';
import handleError from '../../utils/handleError';
import http from '../../utils/http';
import { Card } from 'react-bootstrap';
import userImage from '../../images/user.svg';
import { Link } from 'react-router-dom';

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
        <Card style={{ width: '18rem', margin: '15px auto' }}>
          <Card.Img variant="top" src={userImage} style={{ padding: '15px' }} />
          <Card.Body>
            <Card.Title>{this.state.user.firstname + ' ' + this.state.user.lastname}</Card.Title>
            <Card.Text>
              Email: {this.state.user.email && this.state.user.email} <br />
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
