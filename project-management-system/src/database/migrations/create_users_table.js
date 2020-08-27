import {TABLE} from '../../constants';
/**
 * Create users table.
 *
 * @param   {object} client
 */
export function up(client) {
  const query = `
  CREATE TABLE IF NOT EXISTS ${TABLE.users} (
      id serial primary key,
      firstname VARCHAR ( 50 ) NOT NULL,
      lastname VARCHAR ( 50 ) NOT NULL,
      email VARCHAR ( 255 ) UNIQUE NOT NULL,
	    password VARCHAR ( 100 ) NOT NULL,
      created_at timestamp DEFAULT CURRENT_TIMESTAMP,
      updated_at timestamp DEFAULT CURRENT_TIMESTAMP
  );
  `;

  return client
    .query(query);
}

/**
 * Drop users table.
 *
 * @param   {object} client
 */
export function down(client) {
  const query = `
    DROP TABLE IF EXISTS ${TABLE.users}`;

  return client
    .query(query);
}
