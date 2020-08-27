import * as statsService from '../services/statsService';

/**
 * Get all stats.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function getTotalCount(req, res, next) {
  statsService
    .getTotalCount()
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}
