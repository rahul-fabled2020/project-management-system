import {TABLE} from '../../constants';

export function insertRoles(client) {
  
  const query = `
    INSERT INTO ${TABLE.roles} (title) VALUES 
    ('Admin'),
    ('Project Manager'),
    ('Team Lead'),
    ('Engineer')
  `;
  
  return client
    .query(query);
}