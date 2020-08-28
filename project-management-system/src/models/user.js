import Model from './model';

import { TABLE } from '../constants';

const TABLE_NAME = TABLE.users;
const COLUMN_TYPES = {
  id: 'number',
  firstname: 'string',
  lastname: 'string',
  email: 'string',
  password: 'string',
  created_at: 'string',
  updated_at: 'string'
};

/**
 * User model.
 */
class User extends Model {
  constructor() {
    super(TABLE_NAME, COLUMN_TYPES);
  }

  /**
   * Get table name.
   * @returns {string}
   */
  get tableName() {
    return TABLE_NAME;
  }

  /**
   * Fetches all the users with their roles
   */
  all = () => {
    const sql = `
    SELECT u.*, r.title "role"
    FROM ${TABLE.users} u
    LEFT JOIN ${TABLE.users_roles} ur
      ON u.id = ur.user_id
    LEFT JOIN ${TABLE.roles} r
      ON r.id = ur.role_id
    `;

    return this.queryDatabase(sql);
  };

  /**
   * Fetch roles of a particular user
   * @param {number} id User id
   * @returns {Promise}
   */
  getRoles = (id) => {
    const sql = `
      SELECT r.* 
      FROM ${TABLE.users} u
      JOIN ${TABLE.users_roles} ur
        ON u.id = ur.user_id
      JOIN ${TABLE.roles} r
        ON r.id = ur.role_id
      WHERE u.id = ${id}`;

    return this.queryDatabase(sql);
  };

  /**
   * Assign roles to particular user
   * @param {number} id User id
   * @param {Array} roleIds array of role_id
   * @returns {Promise}
   */
  syncRoles = (id, roleIds) => {
    const sql = `
    DO $$
      BEGIN
        DELETE FROM ${TABLE.users_roles} ur
        WHERE ur.user_id = ${id};

        INSERT INTO ${TABLE.users_roles}(user_id, role_id)
        VALUES ${roleIds.map((roleId) => `(${id}, ${roleId})`)};
      
      EXCEPTION when others THEN raise notice 'Rollbacked';
      END; $$
    `;

    return this.queryDatabase(sql);
  };

  /**
   * Returns users who are managers, i.e. has role_id = 2
   * @returns {Promise}
   */
  getAllManagers = () => {
    const sql = `
    SELECT u.*
    FROM ${TABLE.users} u
    JOIN ${TABLE.users_roles} ur
      ON u.id = ur.user_id
    JOIN ${TABLE.roles} r
      ON r.id = ur.role_id
    WHERE r.id = 2;
    `;

    return this.queryDatabase(sql);
  };
 
  /**
   * Returns users who are not managers and admin, i.e. has role_id = 1 or role_id = 2
   * @returns {Promise}
   */
  getAllNonManagers = () => {
    const sql = `
    SELECT u.*
    FROM ${TABLE.users} u
    JOIN ${TABLE.users_roles} ur
      ON u.id = ur.user_id
    JOIN ${TABLE.roles} r
      ON r.id = ur.role_id
    WHERE r.id NOT IN (1, 2);
    `;

    return this.queryDatabase(sql);
  };
  

  /**
   * Returns the user if the user has role Project Manager, i.e. role_id = 2
   * @param {number} id User id
   * @returns {Promise}
   */
  getManager = (id) => {
    const sql = `
    SELECT u.*
    FROM ${TABLE.users} u
    JOIN ${TABLE.users_roles} ur
      ON u.id = ur.user_id
    JOIN ${TABLE.roles} r
      ON r.id = ur.role_id
    WHERE u.id=${id} AND r.id = 2;
  `;

    return this.queryDatabase(sql);
  };

  /**
   * Fetch privileges of a particular user
   * @param {number} id User id
   * @returns {Promise}
   */
  getPrivileges = (id) => {
    const sql = `
    SELECT DISTINCT p.*
    FROM ${TABLE.users} u
    JOIN ${TABLE.users_roles} ur
      ON u.id = ur.user_id
    JOIN ${TABLE.roles} r
      ON r.id = ur.role_id
    JOIN ${TABLE.roles_privileges} rp
      ON r.id = rp.role_id
    JOIN ${TABLE.privileges} p
      ON p.id = rp.privilege_id
    WHERE u.id=${id};
  `;

    return this.queryDatabase(sql);
  };

  /**
   * Fetch projects of a particular user
   * @param {number} id User id
   * @returns {Promise}
   */
  getProjects = (id) => {
    const sql = `
    SELECT p.*, m.firstname||' '||m.lastname "manager"
    FROM ${TABLE.users} u
    JOIN ${TABLE.users_projects} up
      ON u.id = up.user_id
    JOIN ${TABLE.projects} p
      ON p.id = up.project_id
    LEFT JOIN ${TABLE.users} m
      ON m.id = p.manager_id
    WHERE u.id=${id};
  `;

    return this.queryDatabase(sql);
  };

  /**
   * Get total users count
   * @returns {Promise}
   */
  getTotalUsersCount = () => {
    const sql = `
    SELECT count(u.id)
    FROM ${TABLE.users} u;
    `;

    return this.queryDatabase(sql);
  };
}

export default User;
