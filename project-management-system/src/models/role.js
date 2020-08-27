import Model from './model';

import {TABLE} from '../constants';

const TABLE_NAME = TABLE.roles;
const COLUMN_TYPES = {
  id: 'number',
  title: 'string',
  created_at: 'string',
  updated_at: 'string'
};

/**
 * Role model.
 */
class Role extends Model {
  constructor() {
    super(TABLE_NAME, COLUMN_TYPES);
  }

  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  /**
   * Fetch privileges of a particular role
   * @param {number} id Role id
   * @returns {Promise}
   */
  getPrivileges = (id) => {
    const sql = `
      SELECT p.* 
      FROM ${TABLE.roles} r
      JOIN ${TABLE.roles_privileges} rp
        ON r.id = rp.role_id
      JOIN ${TABLE.privileges} p
        ON p.id = rp.privilege_id
      WHERE r.id = ${id}`;

    return this.queryDatabase(sql);    
  }

  /**
   * Assign privileges to particular role
   * @param {number} id Role id
   * @param {Array} privilegeIds array of privilege_id
   * @returns {Promise}
   */
  syncPrivileges = (id, privilegeIds) => {
    const sql = `
    DO $$
      BEGIN
        DELETE FROM ${TABLE.roles_privileges} rp
        WHERE rp.role_id = ${id};

        INSERT INTO ${TABLE.roles_privileges}(role_id, privilege_id)
        VALUES ${privilegeIds.map(privilegeId => `(${id}, ${privilegeId})`)};
      
      EXCEPTION when others THEN raise notice 'Rollbacked';
      END; $$
    `

    return this.queryDatabase(sql);
  }  
}

export default Role;
