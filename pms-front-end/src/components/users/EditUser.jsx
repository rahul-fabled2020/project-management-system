import React, { Component } from 'react';

import CookieManager from '../../utils/cookie';
import http from '../../utils/http';
import { Form, Col, Button, Card } from 'react-bootstrap';
import handleError from '../../utils/handleError';
import Error from '../Error';
import { NavLink } from 'react-router-dom';

class EditUser extends Component {
  state = { error: '', loading: '', roles: [], user: { id: parseInt(this.props.match.params.id) }, roleMenuValue: '' };

  onSubmit = (e) => {
    e.preventDefault();
    
    const token = CookieManager.getCookie('token');
    const form = e.target;

    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    
    const roleDom = document.getElementById('role');
    const role = parseInt(roleDom.value);

    http
    .put(`/users/${this.state.user.id}`, { firstname, lastname, email }, token)
    .then((res) => {
      const user = res.data;

      if (res.error) {
        const error = handleError(res.error);
        this.setState(() => ({ error }));
      } else {

        http
          .post(`/users/${user.id}/roles`, { roleIds: [role] }, token)
          .then((res) => {
            if(!res.error){
              form.reset();
              this.props.history.goBack();
            }
            
            res.error && this.setState(() => ({ error: handleError(res.error) }));
          })
          .catch((err) => {
            this.setState(() => ({ error: handleError(err) }))});
      }
    })
    .catch((err) => this.setState(() => ({ error: handleError(err) })));    

  };

  onRoleMenuChange = (e) => {
    const roleMenu = e.target;
    this.setState(()=>({roleMenuValue: roleMenu.value}));
  }

  setErrorState = (roleRes, userRes) => {
    let error = '';

    if (roleRes.error) {
      error = handleError(roleRes.error);
    }

    if (userRes.error) {
      error += ' ' + handleError(userRes.error);
    }

    this.setState(() => ({ error }));
  };

  componentDidMount() {
    const token = CookieManager.getCookie('token');
    const userId = parseInt(this.props.match.params.id);

    Promise.all([http.get('/roles', token), http.get(`/users/${userId}`, token)])
      .then(([roleRes, userRes]) => {
        if (roleRes.error || userRes.error) return this.setErrorState(roleRes, userRes);

        const roles = roleRes.data;
        const user = userRes.data;
        const roleMenuValue = user.roles[0].id;

        roles.sort((a, b) => (a.title <= b.title ? -1 : 1));
        this.setState(() => ({ roles, user, error: '', roleMenuValue }));
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
              <NavLink to={`/users/${this.state.user.id}/edit`} activeClassName="active">
                Edit User
              </NavLink>
            </li>
          </ol>
        </nav>

        <Card>
          <Card.Header>Edit User</Card.Header>
          <Card.Body>
            <Form onSubmit={this.onSubmit} style={{ backgroundColor: 'white' }}>
              <Form.Row>
                <Form.Group as={Col} controlId="firstname">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your First Name"
                    defaultValue={this.state.user.firstname}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="lastname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your Last Name"
                    defaultValue={this.state.user.lastname}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="name@example.com"
                  defaultValue={this.state.user.email}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  required
                  as="select"
                  value={this.state.roleMenuValue}
                  onChange={this.onRoleMenuChange}
                >
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
