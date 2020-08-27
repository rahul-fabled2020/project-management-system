import Joi from '@hapi/joi';

import validate from '../utils/validate';
import * as commentService from '../services/commentService';

// Validation schema
const schema = Joi.object({
  text: Joi.string().max(1000).required(),
  commenter_id: Joi.number().required(),
  task_id: Joi.number().required()
});

/**
 * Validate create/update comment request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function commentValidator(req, res, next) {
  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => next(err));
}

/**
 * Validate comments existence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function findComment(req, res, next) {
  return commentService
    .getComment(req.params.id)
    .then(() => next())
    .catch((err) => next(err));
}

/**
 * Validate comments absence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function checkDuplicateComment(req, res, next) {
  return commentService
    .checkCommentExistence(req.body)
    .then(() => next())
    .catch((err) => next(err));
}

export { findComment, commentValidator, checkDuplicateComment };
