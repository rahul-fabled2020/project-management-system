import Boom from '@hapi/boom';
import Project from '../models/project';

const project = new Project();

/**
 * Get all projects.
 *
 * @returns {Promise}
 */
export function getAllProjects() {
  return project.all().then((res) => res.rows);
}

/**
 * Get a project.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getProject(id) {
  return project.find(id).then((res) => {
    if (res.rows.length === 0) throw Boom.notFound("The project doesn't exist.");

    return Promise.all([
      getTasksByProject(id),
      getManagerByProject(id),
      getUsersByProject(id)
    ]).then(([tasks, manager, users]) => ({ ...res.rows[0], tasks, manager, users }));
  });
}

/**
 * Get filtered projects
 * @param {Object} filterData
 */
export function getProjectBy(filterData) {
  return project.filterBy(filterData).then((res) => {
    if (res.rows.length === 0) throw Boom.notFound("The project doesn't exist.");

    return res.rows;
  });
}

/**
 * Checks if project exists in the table
 * @param {Object} param0 project Object
 */
export function checkProjectExistence({ title }) {
  return project.filterBy({ title }).then((res) => {
    if (res.rows.length > 0) throw Boom.badRequest('The project is already present.');

    return res;
  });
}

/**
 * Create new project.
 *
 * @param   {Object}  project
 * @returns {Promise}
 */
export function createProject(projectData) {
  return project
    .create(projectData)
    .then((res) => project.find(res.rows[0].id))
    .then((res) => res.rows[0])
    .catch((err) => err);
}

/**
 * Update a project.
 *
 * @param   {Number|String}  id
 * @param   {Object}         project
 * @returns {Promise}
 */
export function updateProject(id, projectData) {
  return project
    .update(id, projectData)
    .then((res) => project.find(id))
    .then((res) => res.rows[0])
    .catch((err) => err);
}

/**
 * Delete a project.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function deleteProject(id) {
  return project.destroy(id);
}

/**
 * Get Manager of the project
 * @param {number} id Project Id
 * @returns {Promise}
 */
export function getManagerByProject(id) {
  return project.getManager(id).then((res) => res.rows[0]);
}

/**
 * Get tasks of a particular project
 * @param {number} id Project id
 * @returns {Promise}
 */
export function getTasksByProject(id) {
  return project.getTasks(id).then((res) => res.rows);
}

/**
 * Get users of a particular project
 * @param {number} id Project id
 * @returns {Promise}
 */
export function getUsersByProject(id) {
  return project.getUsers(id).then((res) => res.rows);
}

/**
 * Assign users to particular project
 * @param {number} id Project id
 * @param {Array} userIds Array of user_id
 */
export function syncUsersByProject(id, userIds) {
  return project.syncUsers(id, JSON.parse(userIds));
}