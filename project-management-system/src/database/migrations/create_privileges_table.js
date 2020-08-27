import {TABLE} from '../../constants';

/**
 * Create privileges table.
 *
 * @param   {object} client
 */
export function up(client) {
  const query = `
  CREATE TABLE IF NOT EXISTS ${TABLE.privileges} (
      id serial PRIMARY KEY,
      title VARCHAR ( 100 ) NOT NULL,
      created_at timestamp DEFAULT CURRENT_TIMESTAMP,
      updated_at timestamp DEFAULT CURRENT_TIMESTAMP
  );
  `;

  return client
    .query(query);
}

/**
 * Drop privileges table.
 *
 * @param   {object} client
 */
export function down(client) {
  const query = `
    DROP TABLE IF EXISTS ${TABLE.privileges}`;

  return client
    .query(query);
}
