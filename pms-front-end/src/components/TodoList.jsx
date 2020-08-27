import React from 'react';
import PropTypes from 'prop-types';

import Todo from './Todo';
import { Link } from 'react-router-dom';

const TodoList = (props) => {
  return (
    <div className="container">
      <Link to="/add" className="button button--primary">Add Todo</Link>
      {props.todos.length === 0 && <div className="todo__empty-message">You don't have any tasks yet. Create a new one.</div>}
      <ul className="todo">
        {props.todos.map((todo) => (
          <Todo key={todo.id} {...todo} onClick={() => props.toggleTodo(todo.id)} />
        ))}
      </ul>
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      isCompleted: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  toggleTodo: PropTypes.func.isRequired
};

export default TodoList;
