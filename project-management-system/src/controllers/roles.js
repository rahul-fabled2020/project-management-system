import HttpStatus from 'http-status-codes';

import * as roleService from '../services/roleService';

/**
 * Get all roles.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchAll(req, res, next) {
  roleService
    .getAllRoles()
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Get a role by its id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchById(req, res, next) {
  roleService
    .getRole(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Create a new role.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function create(req, res, next) {
  roleService
    .createRole(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
}

/**
 * Update a role.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function update(req, res, next) {
  roleService
    .updateRole(req.params.id, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Delete a role.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function deleteRole(req, res, next) {
  roleService
    .deleteRole(req.params.id)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
}

/**
 * Fetch privileges of a particular role
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
export function fetchPrivilegesByRole(req, res, next) {
  roleService
    .getPrivilegesByRole(req.params.id)
    .then(data => res.json({data}))
    .catch(err => next(err));
}

/**
 * Assign privileges to a particular role
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
export function syncPrivilegesByRole(req, res, next) {
  roleService
    .syncPrivilegesByRole(req.params.id, req.body.privilegeIds)
    .then((data) => res.status(HttpStatus.NO_CONTENT).json(data))
    .catch((err) => next(err));
}