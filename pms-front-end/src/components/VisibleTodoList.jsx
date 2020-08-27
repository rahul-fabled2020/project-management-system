import { connect } from 'react-redux';

import TodoList from './TodoList';
import { visibilityFilters, toggleTodo } from '../redux/actions/todoActions';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case visibilityFilters.SHOW_ALL:
      return todos;
    case visibilityFilters.SHOW_COMPLETED:
      return todos.filter((todo) => todo.isCompleted);
    case visibilityFilters.SHOW_ACTIVE:
      return todos.filter((todo) => !todo.isCompleted);
    default:
      throw new Error('Unknown filter: ' + filter);
  }
};

const mapStateToProps = (state) => ({
  todos: getVisibleTodos(state.todos.list, state.todos.visibility)
});

const mapDispatchToProps = (dispatch) => ({
  toggleTodo: (id) => dispatch(toggleTodo(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
