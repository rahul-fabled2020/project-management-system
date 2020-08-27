import { combineReducers } from 'redux';

import apiReducer from './apiReducer';
import todoReducer from './todoReducer';

const reducer = combineReducers({
  api: apiReducer,
  todos: todoReducer
});

export default reducer;