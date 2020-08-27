import bcrypt from 'bcrypt';
import Boom from '@hapi/boom';
import User from '../models/user';

const user = new User();

/**
 * Get all users.
 *
 * @returns {Promise}
 */
export function getAllUsers() {
  return user.all().then((res) => res.rows);
}

/**
 * Get a user.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getUser(id) {
  return user.find(id).then((user) => {
    if (user.rows.length === 0) throw Boom.notFound("The user doesn't exist.");

    return getRolesByUser(id)
    .then(roles=>({...user.rows[0], roles}))
  });
}

/**
 * Get filtered users
 * @param {Object} filterData
 */
export function getUserBy(filterData) {
  return user.filterBy(filterData).then((res) => {
    if (res.rows.length === 0) throw Boom.notFound("The user doesn't exist.");

    return res.rows;
  });
}

/**
 * Checks if email exists in the table
 * @param {Object} param0 User Object
 */
export function checkEmailExistence({ email }) {
  return user.filterBy({ email }).then((res) => {
    if (res.rows.length > 0) throw Boom.badRequest('The email is already resgisterd.');

    return res;
  });
}

/**
 * Create new user.
 *
 * @param   {Object}  user
 * @returns {Promise}
 */
export function createUser(userData) {
  const { email, password } = userData;

  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10).then((hash) => {
      user
        .create({ ...userData, password: hash })
        .then((res) => user.find(res.rows[0].id))
        .then((res) => resolve(res.rows[0]))
        .catch((err) => reject(err));
    });
  });

  return;
}

/**
 * Update a user.
 *
 * @param   {Number|String}  id
 * @param   {Object}         user
 * @returns {Promise}
 */
export function updateUser(id, userData) {
  if (!userData.password) {
    return user
      .update(id, userData)
      .then((res) => user.find(id))
      .then((res) => res.rows[0])
      .catch((err) => err);
  }

  const { password } = userData;

  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10).then((hash) => {
      user
        .update(id, { ...userData, password: hash })
        .then((res) => user.find(id))
        .then((res) => resolve(res.rows[0]))
        .catch((err) => reject(err));
    });
  });
}

/**
 * Delete a user.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function deleteUser(id) {
  return user.destroy(id);
}

/**
 * Fetch roles of a particular user
 * @param {number} id User id
 * @returns {Promise}
 */
export function getRolesByUser(id) {
  return user.getRoles(id).then((res) => res.rows);
}

/**
 * Fetch privileges of a particular user
 * @param {number} id User id
 * @returns {Promise}
 */
export function getPrivilegesByUser(id) {
  return user.getPrivileges(id).then((res) => res.rows);
}

/**
 * Assign roles to particular user
 * @param {number} id User id
 * @param {Array} roleIds Array of role_id
 */
export function syncRolesByUser(id, roleIds) {
  const Ids = typeof roleIds==='string'? JSON.parse(roleIds): roleIds;
  return user.syncRoles(id, Ids);
}

/**
 * Fetch all the users who are managers
 * @returns {Promise}
 */
export function getAllManagers() {
  return user.getAllManagers().then((res) => res.rows);
}

/**
 * Return particular user if the user is manager
 * @param {number} id User id
 * @returns {Promise}
 */
export function getManager(id) {
  return user.getManager(id).then(res=>res.rows[0]);  
}