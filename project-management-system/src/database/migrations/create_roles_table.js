import {TABLE} from '../../constants';

/**
 * Create roles table.
 *
 * @param   {object} client
 */
export function up(client) {
  const query = `
  CREATE TABLE IF NOT EXISTS ${TABLE.roles} (
      id serial PRIMARY KEY,
      title VARCHAR ( 50 ) NOT NULL,
      created_at timestamp DEFAULT CURRENT_TIMESTAMP,
      updated_at timestamp DEFAULT CURRENT_TIMESTAMP
  );
  `;

  return client
    .query(query);
}

/**
 * Drop roles table.
 *
 * @param   {object} client
 */
export function down(client) {
  const query = `
    DROP TABLE IF EXISTS ${TABLE.roles}`;

  return client
    .query(query);
}
