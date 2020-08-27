import HttpStatus from 'http-status-codes';

import * as taskService from '../services/taskService';

/**
 * Get all tasks.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchAll(req, res, next) {
  taskService
    .getAllTasks()
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Get a task by its id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchById(req, res, next) {
  taskService
    .getTask(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Create a new task.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function create(req, res, next) {
  taskService
    .createTask(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
}

/**
 * Update a task.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function update(req, res, next) {
  taskService
    .updateTask(req.params.id, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Delete a task.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function deleteTask(req, res, next) {
  taskService
    .deleteTask(req.params.id)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
}

/**
 * Fetch comments of a particular task
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
export function fetchCommentsByTask(req, res, next) {
  taskService
    .getCommentsByTask(req.params.id)
    .then(data => res.json({data}))
    .catch(err => next(err));
}