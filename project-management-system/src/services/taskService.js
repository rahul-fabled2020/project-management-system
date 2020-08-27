import Boom from '@hapi/boom';
import Task from '../models/task';

const task = new Task();

/**
 * Get all tasks.
 *
 * @returns {Promise}
 */
export function getAllTasks() {
  return task.all().then((res) => res.rows);
}

/**
 * Get a task.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getTask(id) {
  return task.find(id).then((res) => {
    if (res.rows.length === 0) throw Boom.notFound("The task doesn't exist.");

    return res.rows[0];
  });
}

/**
 * Get filtered tasks
 * @param {Object} filterData
 */
export function getTaskBy(filterData) {
  return task.filterBy(filterData).then((res) => {
    if (res.rows.length === 0) throw Boom.notFound("The task doesn't exist.");

    return res.rows;
  });
}

/**
 * Checks if task exists in the table
 * @param {Object} param0 task Object
 */
export function checkTaskExistence({ title }) {
  return task.filterBy({ title }).then((res) => {
    if (res.rows.length > 0) throw Boom.badRequest('The task is already present.');

    return res;
  });
}

/**
 * Create new task.
 *
 * @param   {Object}  task
 * @returns {Promise}
 */
export function createTask(taskData) {
  return task
    .create(taskData)
    .then((res) => task.find(res.rows[0].id))
    .then((res) => res.rows[0])
    .catch((err) => err);
}

/**
 * Update a task.
 *
 * @param   {Number|String}  id
 * @param   {Object}         task
 * @returns {Promise}
 */
export function updateTask(id, taskData) {
  return task
    .update(id, taskData)
    .then((res) => task.find(id))
    .then((res) => res.rows[0])
    .catch((err) => err);
}

/**
 * Delete a task.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function deleteTask(id) {
  return task.destroy(id);
}

/**
 * Get comments of a particular task
 * @param {number} id Role id
 * @returns {Promise}
 */
export function getCommentsByTask(id) {
  return task.getComments(id).then((res) => res.rows);
}

/**
 * Get assginee of a particular task
 * @param {number} id Role id
 * @returns {Promise}
 */
export function getAssigneeByTask(id) {
  return task.getAssignee(id).then((res) => res.rows[0]);
}