import * as apiActions from './../actions/apiActions';

const INITIAL_STATE = {
  users: [],
  projects: [],
  tasks: [],
  comments: []
};

function apiReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case apiActions.STORE_USERS:
      return {
        ...state,
        users: action.payload
      };

    case apiActions.ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users]
      };

    case apiActions.STORE_PROJECTS:
      return {
        ...state,
        projects: action.payload
      };

    case apiActions.ADD_PROJECT:
      return {
        ...state,
        projects: [action.payload, ...state.projects]
      };
    case apiActions.STORE_TASKS:
      return {
        ...state,
        tasks: action.payload
      };

    case apiActions.ADD_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks]
      };
    case apiActions.STORE_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };

    case apiActions.ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments]
      };

    default:
      return state;
  }
}

export default apiReducer;
