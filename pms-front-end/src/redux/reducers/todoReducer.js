import * as todoActions from '../actions/todoActions';

const INITIAL_STATE = { list: [], visibility: todoActions.visibilityFilters.SHOW_ALL };

function todoReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case todoActions.ADD_TODO:
      return {
        ...state,
        list: [
          ...state.list,
          {
            id: action.payload.id,
            title: action.payload.title,
            description: action.payload.description,
            isCompleted: false
          }
        ]
      };

    case todoActions.EDIT_TODO:
      return {
        ...state,
        list: state.list.map((todo) => {
          return todo.id === action.payload.id ? action.payload : todo;
        })
      };

    case todoActions.DELETE_TODO:
      return {
        ...state,
        list: state.list.filter((todo) => todo.id !== action.payload)
      };

    case todoActions.STORE_TODOS:
      return {
        ...state,
        list: [...action.payload]
      };

    case todoActions.TOGGLE_TODO:
      return {
        ...state,
        list: state.list.map((todo) =>
          todo.id === action.payload ? { ...todo, isCompleted: !todo.isCompleted } : todo
        )
      };

    case todoActions.SET_VISIBILITY_FILTER:
      return { ...state, visibility: action.payload };
    default:
      return state;
  }
}

export default todoReducer;
