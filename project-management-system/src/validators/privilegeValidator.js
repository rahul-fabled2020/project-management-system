import Joi from '@hapi/joi';

import validate from '../utils/validate';
import * as privilegeService from '../services/privilegeService';

// Validation schema
const schema = Joi.object({
  title: Joi.string().max(100).required(),
});

/**
 * Validate create/update privilege request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function privilegeValidator(req, res, next) {
  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => next(err));
}

/**
 * Validate privileges existence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function findPrivilege(req, res, next) {
  return privilegeService
    .getPrivilege(req.params.id)
    .then(() => next())
    .catch((err) => next(err));
}

/**
 * Validate privileges absence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function checkDuplicatePrivilege(req, res, next) {
  return privilegeService.checkPrivilegeExistence(req.body)
    .then(() => next())
    .catch((err) => next(err));
}

export { findPrivilege, privilegeValidator, checkDuplicatePrivilege };
