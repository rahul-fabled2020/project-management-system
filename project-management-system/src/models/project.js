import Model from './model';

import {TABLE} from '../constants';

const TABLE_NAME = TABLE.projects;
const COLUMN_TYPES = {
  id: 'number',
  title: 'string',
  description: 'string',
  manager_id: 'number',
  created_at: 'string',
  updated_at: 'string'
};

/**
 * Project model.
 */
class Project extends Model {
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
   * Fetches all the users with their roles
   */
  all = () => {
    const sql = `
    SELECT p.*, u.firstname||' '||u.lastname "manager"
    FROM ${TABLE.projects} p
    LEFT JOIN ${TABLE.users} u
      ON u.id = p.manager_id
    `;

    return this.queryDatabase(sql);
  };

  getManager = (id) => {
    const sql = `
      SELECT u.* 
      FROM ${TABLE.users} u
      JOIN ${TABLE.projects} p
        ON u.id = p.manager_id
      WHERE p.id = ${id}`;

    return this.queryDatabase(sql);
  };

  /**
   * Fetch tasks of a particular project
   * @param {number} id Project id
   * @returns {Promise}
   */
  getTasks = (id) => {
    const sql = `
      SELECT t.*, u.firstname||' '||u.lastname "assignee" 
      FROM ${TABLE.projects} p
      JOIN ${TABLE.tasks} t
        ON p.id = t.project_id
      LEFT JOIN users u
        ON u.id = t.assignee_id
      WHERE p.id = ${id}`;

    return this.queryDatabase(sql);
  };

  /**
   * Fetch users of a particular project
   * @param {number} id Project id
   * @returns {Promise}
   */
  getUsers = (id) => {
    const sql = `
      SELECT u.* 
      FROM ${TABLE.projects} p
      JOIN ${TABLE.users_projects} up
        ON p.id = up.project_id
      JOIN ${TABLE.users} u
        ON u.id = up.user_id
      WHERE p.id = ${id}`;

    return this.queryDatabase(sql);
  };  

  /**
   * Assign users to particular project
   * @param {number} id Project id
   * @param {Array} userIds array of user_id
   * @returns {Promise}
   */
  syncUsers = (id, userIds) => {
    const sql = `
    DO $$
      BEGIN
        DELETE FROM ${TABLE.users_projects} up
        WHERE up.project_id = ${id};

        INSERT INTO ${TABLE.users_projects}(project_id, user_id)
        VALUES ${userIds.map((userId) => `(${id}, ${userId})`)};
      
      EXCEPTION when others THEN raise notice 'Rollbacked';
      END; $$
    `;

    return this.queryDatabase(sql);
  };  

  /**
   * Get total projects count
   * @returns {Promise}
   */
  getTotalProjectsCount = () => {
    const sql = `
    SELECT count(p.id)
    FROM ${TABLE.projects} p;
    `;

    return this.queryDatabase(sql);
  };  
}

export default Project;
