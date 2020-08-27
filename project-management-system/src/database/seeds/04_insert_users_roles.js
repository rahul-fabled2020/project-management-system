import {TABLE} from '../../constants';

export function insertUsersRoles(client) {
  
  const query = `
    INSERT INTO ${TABLE.users_roles} (user_id, role_id) VALUES 
    (1, 1),
    (2,2),
    (3,3),
    (4,4),
    (5,4),
    (6,3),
    (7,2)
  `;
  
  return client
    .query(query);
}