import Model from './model';

import {TABLE} from '../constants';

const TABLE_NAME = TABLE.privileges;
const COLUMN_TYPES = {
  id: 'number',
  title: 'string',
  created_at: 'string',
  updated_at: 'string'
};

/**
 * Privilege model.
 */
class Privilege extends Model {
  constructor() {
    super(TABLE_NAME, COLUMN_TYPES);
  }

  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  getRoles = (id) => {
    const sql = `
      SELECT r.* 
      FROM ${TABLE.roles} r
      JOIN ${TABLE.roles_privileges} rp
        ON r.id = rp.role_id
      JOIN ${TABLE.privileges} p
        ON p.id = rp.privilege_id
      WHERE p.id = ${id}`;

    return this.queryDatabase(sql);    
  }
}

export default Privilege;
