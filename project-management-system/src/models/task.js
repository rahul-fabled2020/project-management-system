import Model from './model';

import { TABLE } from '../constants';

const TABLE_NAME = TABLE.tasks;
const COLUMN_TYPES = {
  id: 'number',
  title: 'string',
  description: 'string',
  deadline: 'string',
  assignee_id: 'number',
  project_id: 'number',
  created_at: 'string',
  updated_at: 'string'
};

/**
 * Task model.
 */
class Task extends Model {
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
   * Fetch comments of a particular task
   * @param {number} id Task id
   * @returns {Promise}
   */
  getComments = (id) => {
    const sql = `
      SELECT c.* 
      FROM ${TABLE.comments} c
      JOIN ${TABLE.tasks} t
        ON t.id = c.task_id
      WHERE t.id = ${id}`;

    return this.queryDatabase(sql);
  };

  /**
   * Fetch assignee of a particular task
   * @param {number} id Task id
   * @returns {Promise}
   */
  getAssignee = (id) => {
    const sql = `
      SELECT u.* 
      FROM ${TABLE.users} u
      JOIN ${TABLE.tasks} t
        ON u.id = t.assignee_id
      WHERE t.id = ${id}`;

    return this.queryDatabase(sql);
  };

  /**
   * Get total tasks count
   * @returns {Promise}
   */
  getTotalTasksCount = () => {
    const sql = `
    SELECT count(t.id)
    FROM ${TABLE.tasks} t;
    `;

    return this.queryDatabase(sql);
  };
}

export default Task;
