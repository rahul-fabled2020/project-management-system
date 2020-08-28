import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import CookieManager from '../../utils/cookie';
import http from '../../utils/http';
import Error from '../Error';
import handleError from '../../utils/handleError';
import { connect } from 'react-redux';
import * as apiActions from '../../redux/actions/apiActions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class AddTaskModal extends Component {
  state = { error: '', selectedDate: new Date() };

  registerTask = (e) => {
    e.preventDefault();

    const token = CookieManager.getCookie('token');

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const deadline = document.getElementById('deadline').value.replace(/(\d\d)\/(\d\d)\/(\d{4})/, '$3-$1-$2');

    const assigneeDom = document.getElementById('assignee');
    const assignee = assigneeDom.value;

    const taskData = { title, description, deadline, project_id: this.props.projectId };

    if (assignee) {
      taskData.assignee_id = parseInt(assignee);
    }

    http
      .post('/tasks', taskData, token)
      .then((res) => {
        const task = res.data;

        if (res.error) {
          const error = handleError(res.error);
          this.setState(() => ({ error }));
        } else {
          if (assignee) {
            this.props.addTask({ ...task, assignee: assigneeDom.options.item(assigneeDom.selectedIndex).text });
          } else {
            this.props.addTask(task);
          }

          this.props.onHide();
        }
      })
      .catch((err) => this.setState(() => ({ error: handleError(err) })));
  };

  handleChange = (date) => {
    this.setState(() => ({ selectedDate: date }));
  };

  render() {
    return (
      <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Error message={this.state.error} />
          <Form onSubmit={this.registerTask}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control required type="text" placeholder="Enter Title" />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control required as="textarea" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Deadline: &nbsp;</Form.Label>
              <DatePicker
                selected={this.state.selectedDate}
                onChange={this.handleChange}
                id="deadline"
                className="form-control"
              />
            </Form.Group>

            <Form.Group controlId="assignee">
              <Form.Label>Assingee</Form.Label>
              <Form.Control as="select" defaultValue="">
                <option disabled value="">
                  --Select Assignee--
                </option>
                {this.props.assignedUsers.map((assignee) => (
                  <option key={assignee.value} value={assignee.value}>
                    {assignee.label}
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

export default AddTaskModal;
