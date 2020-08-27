import {TABLE} from '../../constants';

/**
 * Create roles_privileges table.
 *
 * @param   {object} client
 */
export function up(client) {
  const query = `
  CREATE TABLE IF NOT EXISTS ${TABLE.roles_privileges} (
    privilege_id INT NOT NULL,
    role_id INT NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(privilege_id, role_id),
    CONSTRAINT fk_privilege_id_${TABLE.roles_privileges}
      FOREIGN KEY(privilege_id)
        REFERENCES privileges(id),
    CONSTRAINT fk_role_id_${TABLE.roles_privileges}
    FOREIGN KEY(role_id)
      REFERENCES roles(id)
  );
  `;

  return client
    .query(query);
}

/**
 * Drop roles_privileges table.
 *
 * @param   {object} client
 */
export function down(client) {
  const query = `
    DROP TABLE IF EXISTS ${TABLE.roles_privileges}`;

  return client
    .query(query);
}
