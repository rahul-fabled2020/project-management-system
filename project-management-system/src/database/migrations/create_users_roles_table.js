import {TABLE} from '../../constants';

/**
 * Create users_roles table.
 *
 * @param   {object} client
 */
export function up(client) {
  const query = `
  CREATE TABLE IF NOT EXISTS ${TABLE.users_roles} (
      user_id INT NOT NULL,
      role_id INT NOT NULL,
      created_at timestamp DEFAULT CURRENT_TIMESTAMP,
      updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY(user_id, role_id),
      CONSTRAINT fk_user_id_${TABLE.users_roles}
        FOREIGN KEY(user_id)
          REFERENCES users(id) ON DELETE CASCADE,
      CONSTRAINT fk_role_id_${TABLE.users_roles}
      FOREIGN KEY(role_id)
        REFERENCES roles(id)                
  );
  `;

  return client
    .query(query);
}

/**
 * Drop users_roles table.
 *
 * @param   {object} client
 */
export function down(client) {
  const query = `
    DROP TABLE IF EXISTS ${TABLE.users_roles}`;

  return client
    .query(query);
}
