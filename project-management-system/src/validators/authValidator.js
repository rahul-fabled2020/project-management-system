import bcrypt from 'bcrypt';
import Boom from '@hapi/boom';

/**
 * Compares the provided password with password stored in the database
 * @param {string} password 
 * @param {string} hash 
 */
export function matchPassword(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, match) => {
      if (match) resolve('Password matched');
      else reject(Boom.badRequest("The password didn't match."));

      if (err) reject(err);
    });
  });
}