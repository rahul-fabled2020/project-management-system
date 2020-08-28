import {TABLE} from '../../constants';

/**
 * Create comments table.
 *
 * @param   {object} client
 */
export function up(client) {
  const query = `
  CREATE TABLE IF NOT EXISTS ${TABLE.comments} (
      id serial PRIMARY KEY,
      text VARCHAR ( 1000 ) NOT NULL,
      commenter_id INT NOT NULL,
      task_id INT NOT NULL,
      created_at timestamp DEFAULT CURRENT_TIMESTAMP,
      updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_commenter_id_${TABLE.comments}
        FOREIGN KEY(commenter_id)
          REFERENCES users(id),
      CONSTRAINT fk_task_id_${TABLE.comments}
      FOREIGN KEY(task_id)
        REFERENCES tasks(id) ON DELETE CASCADE     
  );
  `;

  return client
    .query(query);
}

/**
 * Drop comments table.
 *
 * @param   {object} client
 */
export function down(client) {
  const query = `
    DROP TABLE IF EXISTS ${TABLE.comments}`;

  return client
    .query(query);
}
