import Joi from '@hapi/joi';

import validate from '../utils/validate';
import * as taskService from '../services/taskService';

// Validation schema
const schema = Joi.object({
  title: Joi.string().max(100).required(),
  description: Joi.string().max(1000),
  deadline: Joi.date().required(),
  assignee_id: Joi.number(),
  previous_assignee_id: Joi.number(),
  project_id: Joi.number().required()
});

/**
 * Validate create/update task request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function taskValidator(req, res, next) {
  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => next(err));
}

/**
 * Validate tasks existence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function findTask(req, res, next) {
  return taskService
    .getTask(req.params.id)
    .then(() => next())
    .catch((err) => next(err));
}

/**
 * Validate tasks absence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function checkDuplicateTask(req, res, next) {
  return taskService
    .checkTaskExistence(req.body)
    .then(() => next())
    .catch((err) => next(err));
}

export { findTask, taskValidator, checkDuplicateTask };
