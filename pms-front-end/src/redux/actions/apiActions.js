export const STORE_USERS = 'STORE_USERS';
export const ADD_USER = 'ADD_USER';

export const storeUsers = users => ({
  type: STORE_USERS,
  payload: users
});

export const addUser = user => ({
  type: ADD_USER,
  payload: user
});