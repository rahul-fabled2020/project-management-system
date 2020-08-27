import {TABLE} from '../../constants';

/**
 * Create notifications table.
 *
 * @param   {object} client
 */
export function up(client) {
  const query = `
  CREATE TABLE IF NOT EXISTS ${TABLE.notifications} (
      id serial primary key,
      message VARCHAR ( 100 ) NOT NULL,
      is_read BOOLEAN DEFAULT FALSE,
      created_at timestamp DEFAULT CURRENT_TIMESTAMP,
      updated_at timestamp DEFAULT CURRENT_TIMESTAMP
  );
  `;

  return client
    .query(query);
}

/**
 * Drop notifications table.
 *
 * @param   {object} client
 */
export function down(client) {
  const query = `
    DROP TABLE IF EXISTS ${TABLE.notifications}`;

  return client
    .query(query);
}
