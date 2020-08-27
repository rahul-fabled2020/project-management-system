import Boom from '@hapi/boom';
import jwt from 'jsonwebtoken';

import * as userService from '../services/userService';

/**
 * Authenticates user based on provided token
 * @param {Object} req HTTP Request Object
 * @param {Object} res HTTP Response Object
 * @param {Function} next Forwards to next middleware
 */
export default function authenticate(req, res, next) {
  let token;
  if (req.headers['authorization']) {
    token = req.headers['authorization'];
  } else if (req.headers['x-access-token']) {
    token = req.headers['x-access-token'];
  } else if (req.headers['token']) {
    token = req.headers['token'];
  }

  if (!token) {
    return next(Boom.badRequest('Token is not provided.'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(Boom.badRequest('Invalid Token'));
    }

    userService
      .getUser(decoded.id)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => next(Boom.badRequest('You have been deleted from database.')));
  });
}
