import HttpStatus from 'http-status-codes';

import * as commentService from '../services/commentService';

/**
 * Get all comments.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchAll(req, res, next) {
  commentService
    .getAllComments()
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Get a comment by its id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchById(req, res, next) {
  commentService
    .getComment(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Create a new comment.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function create(req, res, next) {
  commentService
    .createComment(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
}

/**
 * Update a comment.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function update(req, res, next) {
  commentService
    .updateComment(req.params.id, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Delete a comment.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function deleteComment(req, res, next) {
  commentService
    .deleteComment(req.params.id)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
}