import HttpStatus from 'http-status-codes';

import * as privilegeService from '../services/privilegeService';

/**
 * Get all privileges.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchAll(req, res, next) {
  privilegeService
    .getAllPrivileges()
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Get a privilege by its id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchById(req, res, next) {
  privilegeService
    .getPrivilege(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Create a new privilege.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function create(req, res, next) {
  privilegeService
    .createPrivilege(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
}

/**
 * Update a privilege.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function update(req, res, next) {
  privilegeService
    .updatePrivilege(req.params.id, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Delete a privilege.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function deletePrivilege(req, res, next) {
  privilegeService
    .deletePrivilege(req.params.id)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
}

export function fetchRolesByPrivilege(req, res, next) {
  privilegeService
    .getRolesByPrivilege(req.params.id)
    .then(data => res.json({data}))
    .catch(err => next(err));
}
