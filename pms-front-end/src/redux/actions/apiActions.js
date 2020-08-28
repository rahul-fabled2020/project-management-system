export const STORE_USERS = 'STORE_USERS';
export const STORE_PROJECTS = 'STORE_PROJECTS';
export const STORE_TASKS = 'STORE_TASKS';
export const STORE_COMMENTS = 'STORE_COMMENTS';

export const ADD_USER = 'ADD_USER';
export const ADD_PROJECT = 'ADD_PROJECT';
export const ADD_TASK = 'ADD_TASK';
export const ADD_COMMENT = 'ADD_COMMENT';

export const storeUsers = users => ({
  type: STORE_USERS,
  payload: users
});

export const addUser = user => ({
  type: ADD_USER,
  payload: user
});

export const storeProjects = projects => ({
  type: STORE_PROJECTS,
  payload: projects
});

export const addProject = project => ({
  type: ADD_PROJECT,
  payload: project
});

export const storeTasks = tasks => ({
  type: STORE_TASKS,
  payload: tasks
});

export const addTask = task => ({
  type: ADD_TASK,
  payload: task
});

export const storeComments = comments => ({
  type: STORE_COMMENTS,
  payload: comments
});

export const addComment = comment => ({
  type: ADD_COMMENT,
  payload: comment
});