import React, { Component } from 'react';

import CookieManager from '../../utils/cookie';
import http from '../../utils/http';
import { Form, Button, Card } from 'react-bootstrap';
import handleError from '../../utils/handleError';
import Error from '../Error';
import { NavLink } from 'react-router-dom';
import { ROLES } from '../../configs/constants';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class EditTask extends Component {
  state = {
    error: '',
    loading: '',
    selectedDate: new Date(),
    assignedUsers: [],
    task: { id: parseInt(this.props.match.params.id) },
    assigneeMenuValue: ''
  };

  assignUsers = (selectedOptions) => {
    if (selectedOptions) {
      const token = CookieManager.getCookie('token');
      const userIds = selectedOptions.map((selectedUser) => parseInt(selectedUser.value));

      this.setState(() => ({ assignedUsers: selectedOptions }));

      http
        .post(`/tasks/${this.state.task.id}/users`, { userIds }, token)
        .then(() => this.setState(() => ({ error: '' })))
        .catch((err) => this.setState(() => ({ error: handleError(err) })));
    }
  };

  handleChange = (date) => {
    this.setState(() => ({ selectedDate: date }));
  };

  onSubmit = (e) => {
    e.preventDefault();

    const token = CookieManager.getCookie('token');
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const deadline = document.getElementById('deadline').value.replace(/(\d\d)\/(\d\d)\/(\d{4})/, '$3-$1-$2');

    const assigneeDom = document.getElementById('assignee');
    const assignee = assigneeDom.value;

    const taskData = { title, description, deadline, project_id: this.props.match.params.projectId };

    if (assignee) {
      taskData.assignee_id = parseInt(assignee);
    }

    if (this.state.task.assignee_id) {
      taskData.previous_assignee_id = this.state.task.assignee_id;
    }

    http
      .put(`/tasks/${this.state.task.id}`, taskData, token)
      .then((res) => {
        if (res.error) {
          const error = handleError(res.error);
          this.setState(() => ({ error }));
        } else {
          this.props.history.goBack();
        }
      })
      .catch((err) => this.setState(() => ({ error: handleError(err) })));
  };

  onAssigneeMenuChange = (e) => {
    const userMenu = e.target;
    this.setState(() => ({ assigneeMenuValue: userMenu.value }));
  };

  componentDidMount() {
    const token = CookieManager.getCookie('token');
    const user = JSON.parse(CookieManager.getCookie('user'));
    const taskId = parseInt(this.props.match.params.id);
    const projectId = parseInt(this.props.match.params.projectId);

    //Fetch Task to be edited
    http
      .get(`/tasks/${taskId}`, token)
      .then((taskRes) => {
        if (taskRes.error) return this.setState(() => ({ error: handleError(taskRes.error) }));

        const task = taskRes.data;
        if (task.assignee_id) {
          this.setState(() => ({ assigneeMenuValue: task.assignee_id }));
        }

        this.setState(() => ({ task, error: '', selectedDate: new Date(task.deadline) }));
      })
      .catch((err) => {
        this.setState(() => ({ error: handleError(err) }));
      });

    //Fetch Assigned Users of the Project
    http
      .get(`/projects/${projectId}/users`, token)
      .then((res) => {
        if (res.error) this.setState(() => ({ error: handleError(res.error) }));
        else {
          const assignedUsers = res.data;
          assignedUsers.sort((a, b) => (a.label <= b.label ? -1 : 1));
          this.setState(() => ({ assignedUsers }));
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
              <NavLink to="/projects" activeClassName="active" exact={true}>
                Projects
              </NavLink>
            </li>
            <li className="breadcrumb-item">
              <NavLink to={`/projects/${this.props.match.params.projectId}`} activeClassName="active" exact={true}>
                View Project
              </NavLink>
            </li>
            <li className="breadcrumb-item">
              <NavLink
                to={`/projects/${this.props.match.params.projectId}/tasks/${this.state.task.id}/edit`}
                activeClassName="active"
              >
                Edit Task
              </NavLink>
            </li>
          </ol>
        </nav>

        <Card>
          <Card.Header>Edit Task</Card.Header>
          <Card.Body>
            <Form onSubmit={this.onSubmit} style={{ backgroundColor: 'white' }}>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control required type="text" placeholder="Enter Title" defaultValue={this.state.task.title} />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control required as="textarea" defaultValue={this.state.task.description} />
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
                <Form.Control as="select" value={this.state.assigneeMenuValue} onChange={this.onAssigneeMenuChange}>
                  <option disabled value="">
                    --Select Assignee--
                  </option>
                  {this.state.assignedUsers &&
                    this.state.assignedUsers.map((assignee) => (
                      <option key={assignee.id} value={assignee.id}>
                        {assignee.firstname + ' ' + assignee.lastname}
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

export default EditTask;
