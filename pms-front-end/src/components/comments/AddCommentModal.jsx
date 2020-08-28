import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import CookieManager from '../../utils/cookie';
import http from '../../utils/http';
import Error from '../Error';
import handleError from '../../utils/handleError';

class AddCommentModal extends Component {
  state = { error: '', selectedDate: new Date() };

  registerComment = (e) => {
    e.preventDefault();

    const token = CookieManager.getCookie('token');

    const text = document.getElementById('text').value;
    const commenter_id = this.props.commenterId;
    const task_id = this.props.taskId;
    
    const commentData = { text, commenter_id, task_id };

    http
      .post('/comments', commentData, token)
      .then((res) => {
        const comment = res.data;

        if (res.error) {
          const error = handleError(res.error);
          this.setState(() => ({ error }));
        } else {
            this.props.addComment(comment);

          this.props.onHide();
        }
      })
      .catch((err) => this.setState(() => ({ error: handleError(err) })));
  };

  render() {
    return (
      <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Error message={this.state.error} />
          <Form onSubmit={this.registerComment}>

            <Form.Group controlId="text">
              <Form.Label>Comment Text</Form.Label>
              <Form.Control required as="textarea" />
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

export default AddCommentModal;
