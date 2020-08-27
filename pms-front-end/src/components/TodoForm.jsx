import React, { Fragment } from 'react';
import { addTodo } from '../redux/actions/todoActions';
import { connect } from 'react-redux';
import http from '../utils/http';
import Error from './Error';
import Header from './Header';

class TodoForm extends React.Component {
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
    const iscompleted = 'false';

    const todo = { title, description, iscompleted };

    e.target.title.value = '';
    e.target.description.value = '';

    http
      .post('/todos', todo, this.props.token)
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          this.props.addTodo(res.data);
          this.props.history.push('/');
        } else {
          console.log(res.error);
          this.setState(() => ({ error: res.error.message }));
        }
      })
      .catch((err) => this.setState(() => ({ error: err.message })));
  };

  render() {
    return (
      <Fragment>
        <Header {...this.props} />
        {this.state.error && <Error message={this.state.error} />}
        <form onSubmit={this.onSubmit} className="form todo__form">
          <h1 className="todo__heading">Add Todo</h1>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" className="form__input" required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea name="description" className="form__textarea" required></textarea>
          </div>

          <button className="button button--primary form__button">Add</button>
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
    addTodo: (todo) => dispatch(addTodo(todo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);
