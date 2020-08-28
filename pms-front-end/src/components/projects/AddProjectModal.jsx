import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import CookieManager from '../../utils/cookie';
import http from '../../utils/http';
import Error from '../Error';
import handleError from '../../utils/handleError';
import { connect } from 'react-redux';
import * as apiActions from '../../redux/actions/apiActions';

class AddProjectModal extends Component {
  state = { error: '', managers: [] };

  registerProject = (e) => {
    e.preventDefault();

    const token = CookieManager.getCookie('token');
    const form = e.target;

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    const managerDom = document.getElementById('manager');
    const manager = parseInt(managerDom.value);
    const managerName = managerDom.options.item(managerDom.selectedIndex).text;

    http
      .post('/projects', { title, description, manager_id: manager }, token)
      .then((res) => {
        const project = res.data;

        if (res.error) {
          const error = handleError(res.error);
          this.setState(() => ({ error }));
        } else {
          this.props.addProject({ ...project, manager: managerName });

          form.reset();
          this.props.onHide();
        }
      })
      .catch((err) => this.setState(() => ({ error: handleError(err) })));
  };

  componentDidMount() {
    const token = CookieManager.getCookie('token');

    http
      .get('/users/managers', token)
      .then((res) => {
        if (res.data) {
          res.data.sort((a, b) => (a.firstname <= b.firstname ? -1 : 1));
          this.setState(() => ({ managers: res.data, error: '' }));
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
          <Modal.Title id="contained-modal-title-vcenter">Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Error message={this.state.error} />
          <Form onSubmit={this.registerProject}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control required type="text" placeholder="Enter Title" />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control required as="textarea"  />
            </Form.Group>

            <Form.Group controlId="manager">
              <Form.Label>Manager</Form.Label>
              <Form.Control required as="select" defaultValue="">
                <option disabled value="">
                  --Select Manager--
                </option>
                {this.state.managers.map((manager) => (
                  <option key={manager.id} value={manager.id}>
                    {manager.firstname + ' ' + manager.lastname}
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
  return {};
}

function mapDispatchToProps(dispatch) {
  return { addProject: (project) => dispatch(apiActions.addProject(project)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProjectModal);
