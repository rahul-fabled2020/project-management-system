import Boom from '@hapi/boom';
import Tag from '../models/tag';

const tag = new Tag();

/**
 * Get all tags.
 *
 * @returns {Promise}
 */
export function getAllTags() {
  return tag.all().then((res) => res.rows);
}

/**
 * Get a tag.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getTag(id) {
  return tag.find(id).then((res) => {
    if (res.rows.length === 0) throw Boom.notFound("The tag doesn't exist.");

    return res.rows[0];
  });
}

/**
 * Get filtered tags
 * @param {Object} filterData
 */
export function getTagBy(filterData) {
  return tag.filterBy(filterData).then((res) => {
    if (res.rows.length === 0) throw Boom.notFound("The tag doesn't exist.");

    return res.rows;
  });
}

/**
 * Checks if tag exists in the table
 * @param {Object} param0 tag Object
 */
export function checkTagExistence({ tagged_user_id, tagged_by_id, task_id }) {
  return tag.filterBy({ tagged_user_id, tagged_by_id, task_id }).then((res) => {
    if (res.rows.length > 0) throw Boom.badRequest('The tag is already present.');

    return res;
  });
}

/**
 * Create new tag.
 *
 * @param   {Object}  tag
 * @returns {Promise}
 */
export function createTag(tagData) {
  return tag
    .create(tagData)
    .then((res) => tag.find(res.rows[0].id))
    .then((res) => res.rows[0])
    .catch((err) => err);
}

/**
 * Update a tag.
 *
 * @param   {Number|String}  id
 * @param   {Object}         tag
 * @returns {Promise}
 */
export function updateTag(id, tagData) {
  return tag
    .update(id, tagData)
    .then((res) => tag.find(id))
    .then((res) => res.rows[0])
    .catch((err) => err);
}

/**
 * Delete a tag.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function deleteTag(id) {
  return tag.destroy(id);
}