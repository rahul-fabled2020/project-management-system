import HttpStatus from 'http-status-codes';

import * as userService from '../services/userService';

/**
 * Get all users.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchAll(req, res, next) {
  userService
    .getAllUsers()
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Get a user by its id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchById(req, res, next) {
  userService
    .getUser(req.params.id)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Create a new user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function create(req, res, next) {
  userService
    .createUser(req.body)
    .then((data) => res.status(HttpStatus.CREATED).json({ data }))
    .catch((err) => next(err));
}

/**
 * Update a user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function update(req, res, next) {
  userService
    .updateUser(req.params.id, req.body)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Delete a user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function deleteUser(req, res, next) {
  userService
    .deleteUser(req.params.id)
    .then((data) => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch((err) => next(err));
}

/**
 * Fetch roles of a user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchRolesByUser(req, res, next) {
  userService
    .getRolesByUser(req.params.id)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Fetch projects of a user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchProjectsByUser(req, res, next) {
  userService
    .getProjectsByUser(req.params.id)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Assign roles to a user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function syncRolesByUser(req, res, next) {
  userService
    .syncRolesByUser(req.params.id, req.body.roleIds)
    .then((data) => res.status(HttpStatus.NO_CONTENT).json(data))
    .catch((err) => next(err));
}

/**
 * Fetch users who are managers.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchAllManagers(req, res, next) {
  userService
    .getAllManagers()
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Fetch users who are managers.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchAllNonManagers(req, res, next) {
  userService
    .getAllNonManagers()
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}
