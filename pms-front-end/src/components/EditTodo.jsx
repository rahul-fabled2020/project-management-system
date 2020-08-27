import React, { Fragment } from 'react';
import { editTodo } from '../redux/actions/todoActions';
import { connect } from 'react-redux';
import http from '../utils/http';
import Error from './Error';
import Header from './Header';

class EditTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    const title = e.target.title.value.trim();
    const description = e.target.description.value.trim();
    const iscompleted = `${this.props.location.state.isCompleted}`;

    const todo = { title, description, iscompleted };

    e.target.title.value = '';
    e.target.description.value = '';

    http
      .put(`/todos/${this.props.location.state.id}`, todo, this.props.token)
      .then((res) => {
        if (res.data) {
          this.props.editTodo(res.data);
          this.props.history.push('/');
        } else {
          console.log(res.error);
          this.setState(() => ({ error: res.error.message }));
        }
      })
      .catch((err) => this.setState(() => ({ error: err.message })));
  };

  render() {
    const { title, description } = this.props.location.state;

    return (
      <Fragment>
        <Header {...this.props} />
        {this.state.error && <Error message={this.state.error} />}
        <form onSubmit={this.onSubmit} className="form todo__form">
          <h1 className="todo__heading">Edit Todo</h1>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" className="form__input" defaultValue={title} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea name="description" className="form__textarea" defaultValue={description} required></textarea>
          </div>

          <button className="button button--primary form__button">Edit</button>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.api.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editTodo: (todo) => dispatch(editTodo(todo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTodo);
