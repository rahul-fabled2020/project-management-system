import {TABLE} from '../../constants';

/**
 * Create projects table.
 *
 * @param   {object} client
 */
export function up(client) {
  const query = `
  CREATE TABLE IF NOT EXISTS ${TABLE.projects} (
      id serial PRIMARY KEY,
      title VARCHAR ( 100 ) NOT NULL,
      description VARCHAR ( 1000 ) NOT NULL,
      manager_id INT NOT NULL,
      created_at timestamp DEFAULT CURRENT_TIMESTAMP,
      updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_manager_id_${TABLE.projects}
        FOREIGN KEY(manager_id)
          REFERENCES users(id)
  );
  `;

  return client
    .query(query);
}

/**
 * Drop projects table.
 *
 * @param   {object} client
 */
export function down(client) {
  const query = `
    DROP TABLE IF EXISTS ${TABLE.projects}`;

  return client
    .query(query);
}
