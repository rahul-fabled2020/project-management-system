import HttpStatus from 'http-status-codes';

import * as tagService from '../services/tagService';

/**
 * Get all tags.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchAll(req, res, next) {
  tagService
    .getAllTags()
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Get a tag by its id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchById(req, res, next) {
  tagService
    .getTag(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Create a new tag.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function create(req, res, next) {
  tagService
    .createTag(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
}

/**
 * Update a tag.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function update(req, res, next) {
  tagService
    .updateTag(req.params.id, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Delete a tag.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function deleteTag(req, res, next) {
  tagService
    .deleteTag(req.params.id)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
}