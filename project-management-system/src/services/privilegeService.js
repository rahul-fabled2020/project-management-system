import Boom from '@hapi/boom';
import Privilege from '../models/privilege';

const privilege = new Privilege();

/**
 * Get all privileges.
 *
 * @returns {Promise}
 */
export function getAllPrivileges() {
  return privilege.all().then((res) => res.rows);
}

/**
 * Get a privilege.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getPrivilege(id) {
  return privilege.find(id).then((res) => {
    if (res.rows.length === 0) throw Boom.notFound("The privilege doesn't exist.");

    return res.rows[0];
  });
}

/**
 * Get filtered privileges
 * @param {Object} filterData
 */
export function getPrivilegeBy(filterData) {
  return privilege.filterBy(filterData).then((res) => {
    if (res.rows.length === 0) throw Boom.notFound("The privilege doesn't exist.");

    return res.rows;
  });
}

/**
 * Checks if privilege exists in the table
 * @param {Object} param0 privilege Object
 */
export function checkPrivilegeExistence({ title }) {
  return privilege.filterBy({ title }).then((res) => {
    if (res.rows.length > 0) throw Boom.badRequest('The privilege is already present.');

    return res;
  });
}

/**
 * Create new privilege.
 *
 * @param   {Object}  privilege
 * @returns {Promise}
 */
export function createPrivilege(privilegeData) {
  return privilege
    .create(privilegeData)
    .then((res) => privilege.find(res.rows[0].id))
    .then((res) => res.rows[0])
    .catch((err) => err);
}

/**
 * Update a privilege.
 *
 * @param   {Number|String}  id
 * @param   {Object}         privilege
 * @returns {Promise}
 */
export function updatePrivilege(id, privilegeData) {
  return privilege
    .update(id, privilegeData)
    .then((res) => privilege.find(id))
    .then((res) => res.rows[0])
    .catch((err) => err);
}

/**
 * Delete a privilege.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function deletePrivilege(id) {
  return privilege.destroy(id);
}

export function getRolesByPrivilege(id) {
  return privilege.getRoles(id).then((res) => res.rows);
}
