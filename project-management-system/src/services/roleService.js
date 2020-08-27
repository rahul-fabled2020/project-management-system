import Boom from '@hapi/boom';
import Role from '../models/role';

const role = new Role();

/**
 * Get all roles.
 *
 * @returns {Promise}
 */
export function getAllRoles() {
  return role.all().then((res) => res.rows);
}

/**
 * Get a role.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getRole(id) {
  return role.find(id).then((res) => {
    if (res.rows.length === 0) throw Boom.notFound("The role doesn't exist.");

    return getPrivilegesByRole(id)
    .then(privileges => ({...res.rows[0], privileges}));
  });
}

/**
 * Get filtered roles
 * @param {Object} filterData
 */
export function getRoleBy(filterData) {
  return role.filterBy(filterData).then((res) => {
    if (res.rows.length === 0) throw Boom.notFound("The role doesn't exist.");

    return res.rows;
  });
}

/**
 * Checks if role exists in the table
 * @param {Object} param0 role Object
 */
export function checkRoleExistence({ title }) {
  return role.filterBy({ title }).then((res) => {
    if (res.rows.length > 0) throw Boom.badRequest('The role is already present.');

    return res;
  });
}

/**
 * Create new role.
 *
 * @param   {Object}  role
 * @returns {Promise}
 */
export function createRole(roleData) {
  return role
    .create(roleData)
    .then((res) => role.find(res.rows[0].id))
    .then((res) => res.rows[0])
    .catch((err) => err);
}

/**
 * Update a role.
 *
 * @param   {Number|String}  id
 * @param   {Object}         role
 * @returns {Promise}
 */
export function updateRole(id, roleData) {
  return role
    .update(id, roleData)
    .then((res) => role.find(id))
    .then((res) => res.rows[0])
    .catch((err) => err);
}

/**
 * Delete a role.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function deleteRole(id) {
  return role.destroy(id);
}

/**
 * Get privileges of a particular role
 * @param {number} id Role id
 * @returns {Promise}
 */
export function getPrivilegesByRole(id) {
  return role.getPrivileges(id).then((res) => res.rows);
}

/**
 * Assign privileges to particular role
 * @param {number} id Role id
 * @param {Array} privilegeIds Array of privilege_id
 */
export function syncPrivilegesByRole(id, privilegeIds) {
  return role.syncPrivileges(id, JSON.parse(privilegeIds));
}
