import HttpStatus from 'http-status-codes';

import * as projectService from '../services/projectService';

/**
 * Get all projects.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchAll(req, res, next) {
  projectService
    .getAllProjects()
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Get a project by its id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchById(req, res, next) {
  projectService
    .getProject(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Create a new project.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function create(req, res, next) {
  projectService
    .createProject(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
}

/**
 * Update a project.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function update(req, res, next) {
  projectService
    .updateProject(req.params.id, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Delete a project.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function deleteProject(req, res, next) {
  projectService
    .deleteProject(req.params.id)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
}

export function fetchManagerByProject(req, res, next) {
  projectService
    .getManagerByProject(req.params.id)
    .then(data => res.json({data}))
    .catch(err => next(err));
}

/**
 * Fetch tasks of a particular project
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
export function fetchTasksByProject(req, res, next) {
  projectService
    .getTasksByProject(req.params.id)
    .then(data => res.json({data}))
    .catch(err => next(err));
}

/**
 * Fetch users of a particular project
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
export function fetchUsersByProject(req, res, next) {
  projectService
    .getUsersByProject(req.params.id)
    .then(data => res.json({data}))
    .catch(err => next(err));
}

/**
 * Assign users to a project.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function syncUsersByProject(req, res, next) {
  projectService
    .syncUsersByProject(req.params.id, req.body.userIds)
    .then((data) => res.status(HttpStatus.NO_CONTENT).json(data))
    .catch((err) => next(err));
}