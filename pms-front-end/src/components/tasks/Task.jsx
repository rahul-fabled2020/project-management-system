import React, { Component } from 'react';

import CookieManager from '../../utils/cookie';
import handleError from '../../utils/handleError';
import http from '../../utils/http';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Error from '../Error';
import AddCommentModal from '../comments/AddCommentModal';

class Task extends Component {
  state = { task: {}, comments: [], loading: false, error: '', showModal: false };

  addComment = (comment) => {
    const user = JSON.parse(CookieManager.getCookie('user'));

    comment.commenter = user.firstname+' '+user.lastname;
    this.setState(()=>({comments: [comment, ...this.state.comments]}));
  };

  onDelete = (id) => {
    if (window.confirm('Are you sure to delete?')) {
      const token = CookieManager.getCookie('token');
      http
        .destroy(`/comments/${id}`, token)
        .then((res) => {if(res && res.error) handleError(res.error)})
        .catch((err) => handleError(err));
    }
  };
  componentDidMount() {
    const token = CookieManager.getCookie('token');

    http
      .get(`/tasks/${this.props.match.params.id}`, token)
      .then((res) => {
        if (res.data) {
          this.setState(() => ({ task: res.data, error: '' }));
        }

        if (res.error) {
          this.setState(() => ({ error: handleError(res.error) }));
        }
      })
      .catch((err) => this.setState(() => ({ error: handleError(err) })));

    http.get(`/tasks/${this.props.match.params.id}/comments`, token).then((res) => {
      if (res.data) {
        const comments = res.data;
        this.setState(() => ({ comments }));
      } else {
        this.setState(() => ({ error: handleError(res.error) }));
      }
    });
  }

  render() {
    const user = JSON.parse(CookieManager.getCookie('user'));

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
                to={`/projects/${this.props.match.params.projectId}/tasks/${this.state.task.id}`}
                activeClassName="active"
              >
                View Task
              </NavLink>
            </li>
          </ol>
        </nav>

        <Card>
          <Card.Header>{this.state.task.title}</Card.Header>
          <Card.Body>
            <Card.Title>Description</Card.Title>
            <Card.Text>{this.state.task.description}</Card.Text>

            <Card.Title>Deadline</Card.Title>
            <Card.Text>{this.state.task.deadline && new Date(this.state.task.deadline).toLocaleDateString()}</Card.Text>

            <Card.Title>Assignee</Card.Title>
            <Card.Text>
              {this.state.task.assignee
                ? this.state.task.assignee.firstname + ' ' + this.state.task.assignee.lastname
                : 'Not Available'}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>Comments</Card.Header>
          <Card.Body>
            <div className="dasboard__add-btn-wrapper">
              <button
                className="dashboard__add-btn"
                onClick={() => this.setState(() => ({ showModal: true }))}
                title="Add"
              >
                <i className="fas fa-plus-circle"></i>
              </button>
            </div>

            {this.state.comments.map((comment) => (
              <Card key={comment.id}>
                <Card.Header>
                  {comment.commenter} &nbsp; {new Date(comment.created_at).toLocaleString()}{' '}
                  <span className="dashboard__table-links" onClick={(e) => this.onDelete(comment.id)} title="Delete">
                    <i className="fas fa-trash-alt"></i>
                  </span>
                </Card.Header>
                <Card.Body>{comment.text}</Card.Body>
              </Card>
            ))}

            <AddCommentModal
              show={this.state.showModal}
              commenterId={user.id}
              taskId={this.state.task.id}
              addComment={this.addComment}
              onHide={() => this.setState(() => ({ showModal: false }))}
            />
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Task;
