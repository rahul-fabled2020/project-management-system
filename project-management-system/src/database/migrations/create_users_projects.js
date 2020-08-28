import {TABLE} from '../../constants';

/**
 * Create users_projects table.
 *
 * @param   {object} client
 */
export function up(client) {
  const query = `
  CREATE TABLE IF NOT EXISTS ${TABLE.users_projects} (
      user_id INT NOT NULL,
      project_id INT NOT NULL,
      created_at timestamp DEFAULT CURRENT_TIMESTAMP,
      updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY(user_id, project_id),
      CONSTRAINT fk_user_id_${TABLE.users_projects}
        FOREIGN KEY(user_id)
          REFERENCES users(id) ON DELETE CASCADE,
      CONSTRAINT fk_project_id_${TABLE.users_projects}
      FOREIGN KEY(project_id)
        REFERENCES projects(id) ON DELETE CASCADE               
  );
  `;

  return client
    .query(query);
}

/**
 * Drop users_projects table.
 *
 * @param   {object} client
 */
export function down(client) {
  const query = `
    DROP TABLE IF EXISTS ${TABLE.users_projects}`;

  return client
    .query(query);
}
