import React, { Component } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';

import CookieManager from '../../utils/cookie';
import http from '../../utils/http';
import Error from '../Error';
import handleError from '../../utils/handleError';
import { connect } from 'react-redux';
import * as apiActions from '../../redux/actions/apiActions';

class AddUserModal extends Component {
  state = { roles: [], error: '' };

  validatePassword = (password, confirmPassword) => {
    let error = '';

    if (password !== confirmPassword) {
      error = 'The passwords do not match.';
      document.getElementById('password').focus();
    }

    if (password.length < 8) {
      error = 'The passwords should of at least 8 characters.';
      document.getElementById('password').focus();
    }

    return error;
  };

  addUser = (e) => {
    e.preventDefault();

    const token = CookieManager.getCookie('token');
    const form = e.target;
    let error = '';

    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const role = parseInt(document.getElementById('role').value);

    error = this.validatePassword(password, confirmPassword);

    if (error) {
      this.setState(() => ({ error }));
    } else {
      http
        .post('/users', { firstname, lastname, email, password }, token)
        .then((res) => {
          const user = res.data;

          if (res.error) {
            const error = handleError(res.error);
            this.setState(() => ({ error }));
          } else {
            this.props.addUser(user);
            form.reset();
            http
              .post(`/users/${user.id}/roles`, { roleIds: [role] }, token)
              .then((res) => res.error && this.setState(() => ({ error: handleError(res.error) })));
          }
        })
        .catch((err) => this.setState(() => ({ error: handleError(err) })));
    }
  };

  componentDidMount() {
    const token = CookieManager.getCookie('token');

    http
      .get('/roles', token)
      .then((res) => {
        if (res.data) {
          res.data.sort((a, b) => (a.title <= b.title ? -1 : 1));
          this.setState(() => ({ roles: res.data }));
        }

        if (res.error) {
          this.setState(() => ({ error: handleError(res.error) }));
        }
      })
      .catch((err) => this.setState(() => ({ error: handleError(err) })));
  }

  render() {
    return (
      <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Error message={this.state.error} />
          <Form onSubmit={this.addUser}>
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
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide} variant="danger">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return { };
}

function mapDispatchToProps(dispatch) {
  return { addUser: (user) => dispatch(apiActions.addUser(user)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUserModal);
