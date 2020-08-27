import Joi from '@hapi/joi';
import Boom from '@hapi/boom';

import validate from '../utils/validate';
import { getManager } from '../services/userService';
import * as projectService from '../services/projectService';

// Validation schema
const schema = Joi.object({
  title: Joi.string().max(100).required(),
  description: Joi.string().max(1000).required(),
  manager_id: Joi.number().required()
});

/**
 * Validate create/update project request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function projectValidator(req, res, next) {
  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => next(err));
}

/**
 * Validate projects existence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function findProject(req, res, next) {
  return projectService
    .getProject(req.params.id)
    .then(() => next())
    .catch((err) => next(err));
}

/**
 * Validate users existence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function findManager(req, res, next) {
  return getManager(req.body.manager_id)
    .then((res) => {
      if (res) next();
      else next(Boom.notFound("The manager doesn't exist."));
    })
    .catch((err) => next(err));
}

/**
 * Validate projects absence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function checkDuplicateProject(req, res, next) {
  return projectService
    .checkProjectExistence(req.body)
    .then(() => next())
    .catch((err) => next(err));
}

export { findProject, projectValidator, checkDuplicateProject, findManager };
