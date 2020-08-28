import {TABLE} from '../../constants';

/**
 * Create tasks table.
 *
 * @param   {object} client
 */
export function up(client) {
  const query = `
  CREATE TABLE IF NOT EXISTS ${TABLE.tasks} (
      id serial PRIMARY KEY,
      title VARCHAR ( 100 ) NOT NULL,
      description VARCHAR ( 1000 ) NOT NULL,
      deadline timestamp NOT NULL,
      previous_assignee_id INT,      
      assignee_id INT,
      project_id INT NOT NULL,
      created_at timestamp DEFAULT CURRENT_TIMESTAMP,
      updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_assignee_id_${TABLE.tasks}
        FOREIGN KEY(assignee_id)
          REFERENCES users(id),
      CONSTRAINT fk_previous_assignee_id_${TABLE.tasks}
      FOREIGN KEY(previous_assignee_id)
        REFERENCES users(id),          
      CONSTRAINT fk_project_id_${TABLE.tasks}
      FOREIGN KEY(project_id)
        REFERENCES projects(id) ON DELETE CASCADE               
  );
  `;

  return client
    .query(query);
}

/**
 * Drop tasks table.
 *
 * @param   {object} client
 */
export function down(client) {
  const query = `
    DROP TABLE IF EXISTS ${TABLE.tasks}`;

  return client
    .query(query);
}
