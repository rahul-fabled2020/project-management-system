import Joi from '@hapi/joi';

import validate from '../utils/validate';
import * as roleService from '../services/roleService';

// Validation schema
const schema = Joi.object({
  title: Joi.string().max(50).required(),
});

/**
 * Validate create/update role request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function roleValidator(req, res, next) {
  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => next(err));
}

/**
 * Validate roles existence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function findRole(req, res, next) {
  return roleService
    .getRole(req.params.id)
    .then(() => next())
    .catch((err) => next(err));
}

/**
 * Validate roles absence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function checkDuplicateRole(req, res, next) {
  return roleService.checkRoleExistence(req.body)
    .then(() => next())
    .catch((err) => next(err));
}

export { findRole, roleValidator, checkDuplicateRole };
