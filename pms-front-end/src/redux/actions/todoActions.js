export const ADD_TODO = 'ADD_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const STORE_TODOS = 'STORE_TODOS';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo
});

export const editTodo = (todo) => ({
  type: EDIT_TODO,
  payload: todo
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id
});

export const storeTodos = (todos) => ({
  type: STORE_TODOS,
  payload: todos
});

export const setVisibilityFilter = (filter) => ({
  type: SET_VISIBILITY_FILTER,
  payload: filter
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id
});

export const visibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};
