import {TABLE} from '../../constants';

export function insertPrivileges(client) {
  
  const query = `
    INSERT INTO ${TABLE.privileges} (title) VALUES 
    ('access_users'),
    ('create_users'),
    ('update_users'),
    ('delete_users'),
    ('tag_users'),
    ('access_projects'),
    ('create_projects'),
    ('update_projects'),
    ('delete_projects'),
    ('access_tasks'),
    ('create_tasks'),
    ('update_tasks'),
    ('delete_tasks'),
    ('assign_tasks'),
    ('access_comments'),
    ('create_comments'),
    ('update_comments'),
    ('delete_comments'),
    ('access_user'),
    ('access_project'),
    ('access_task'),
    ('access_comment')           
  `;
  
  return client
    .query(query);
}