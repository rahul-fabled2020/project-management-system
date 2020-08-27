import Boom from '@hapi/boom';
import Comment from '../models/comment';

const comment = new Comment();

/**
 * Get all comments.
 *
 * @returns {Promise}
 */
export function getAllComments() {
  return comment.all().then((res) => res.rows);
}

/**
 * Get a comment.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getComment(id) {
  return comment.find(id).then((res) => {
    if (res.rows.length === 0) throw Boom.notFound("The comment doesn't exist.");

    return res.rows[0];
  });
}

/**
 * Get filtered comments
 * @param {Object} filterData
 */
export function getCommentBy(filterData) {
  return comment.filterBy(filterData).then((res) => {
    if (res.rows.length === 0) throw Boom.notFound("The comment doesn't exist.");

    return res.rows;
  });
}

/**
 * Checks if comment exists in the table
 * @param {Object} param0 comment Object
 */
export function checkCommentExistence({ text }) {
  return comment.filterBy({ text }).then((res) => {
    if (res.rows.length > 0) throw Boom.badRequest('The comment is already present.');

    return res;
  });
}

/**
 * Create new comment.
 *
 * @param   {Object}  comment
 * @returns {Promise}
 */
export function createComment(commentData) {
  return comment
    .create(commentData)
    .then((res) => comment.find(res.rows[0].id))
    .then((res) => res.rows[0])
    .catch((err) => err);
}

/**
 * Update a comment.
 *
 * @param   {Number|String}  id
 * @param   {Object}         comment
 * @returns {Promise}
 */
export function updateComment(id, commentData) {
  return comment
    .update(id, commentData)
    .then((res) => comment.find(id))
    .then((res) => res.rows[0])
    .catch((err) => err);
}

/**
 * Delete a comment.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function deleteComment(id) {
  return comment.destroy(id);
}