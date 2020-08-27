import Joi from '@hapi/joi';

import validate from '../utils/validate';
import * as tagService from '../services/tagService';

// Validation schema
const schema = Joi.object({
  tagged_user_id: Joi.number().required(),
  tagged_by_id: Joi.number().required(),
  task_id: Joi.number().required()
});

/**
 * Validate create/update tag request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function tagValidator(req, res, next) {
  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => next(err));
}

/**
 * Validate tags existence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function findTag(req, res, next) {
  return tagService
    .getTag(req.params.id)
    .then(() => next())
    .catch((err) => next(err));
}

/**
 * Validate tags absence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function checkDuplicateTag(req, res, next) {
  return tagService
    .checkTagExistence(req.body)
    .then(() => next())
    .catch((err) => next(err));
}

export { findTag, tagValidator, checkDuplicateTag };
