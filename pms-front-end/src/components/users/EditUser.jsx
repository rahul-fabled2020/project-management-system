import React, { Component } from 'react';

import CookieManager from '../../utils/cookie';
import http from '../../utils/http';
import { Form, Col, Button, Card } from 'react-bootstrap';
import handleError from '../../utils/handleError';

class EditUser extends Component {
  state = { error: '', loading: '', roles: [] };

  onSubmit = (e) => {
    e.preventDefault();
    alert('form submitted');
  };

  componentDidMount() {
    const token = CookieManager.getCookie('token');

    http
      .get('/roles', token)
      .then((res) => {
        if (res.data) {
          res.data.sort((a, b) => (a.title <= b.title ? -1 : 1));
          this.setState(() => ({ roles: res.data, error: '' }));
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
        <Card>
          <Card.Header>Edit User</Card.Header>
          <Card.Body>
            <Form onSubmit={this.onSubmit} style={{ backgroundColor: 'white' }}>
              <Form.Row>
                <Form.Group as={Col} controlId="firstname">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control required type="text" placeholder="Enter your First Name" />
                </Form.Group>
                <Form.Group as={Col} controlId="lastname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control required type="text" placeholder="Enter your Last Name" />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control required type="email" placeholder="name@example.com" />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control required type="password" placeholder="Enter your password" />
                </Form.Group>

                <Form.Group as={Col} controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control required type="password" placeholder="Enter your confirmPassword" />
                </Form.Group>
              </Form.Row>

              <Form.Group as={Col} controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Control required as="select" defaultValue="">
                  <option disabled value="">
                    --Select Role--
                  </option>
                  {this.state.roles
                    .filter((role) => role.id !== 1)
                    .map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.title}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>

              <Button variant="secondary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default EditUser;
