import {TABLE} from '../../constants';

/**
 * Create tags table.
 *
 * @param   {object} client
 */
export function up(client) {
  const query = `
  CREATE TABLE IF NOT EXISTS ${TABLE.tags} (
      id serial primary key,
      tagged_user_id INT NOT NULL,
      tagged_by_id INT NOT NULL,
      task_id INT NOT NULL,
      created_at timestamp DEFAULT CURRENT_TIMESTAMP,
      updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_tagged_user_id_${TABLE.tags}
        FOREIGN KEY(tagged_user_id)
          REFERENCES users(id),
      CONSTRAINT fk_tagged_by_id_${TABLE.tags}
      FOREIGN KEY(tagged_by_id)
        REFERENCES users(id),
      CONSTRAINT fk_task_id_${TABLE.tags}
      FOREIGN KEY(task_id)
        REFERENCES tasks(id)              
  );
  `;

  return client
    .query(query);
}

/**
 * Drop tags table.
 *
 * @param   {object} client
 */
export function down(client) {
  const query = `
    DROP TABLE IF EXISTS ${TABLE.tags}`;

  return client
    .query(query);
}
