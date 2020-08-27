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

    default:
      return state;
  }
}

export default apiReducer;
