import {TABLE} from '../../constants';

export function insertRolesPrivileges(client) {
  
  const query = `
    INSERT INTO ${TABLE.roles_privileges} (role_id, privilege_id) 
    SELECT r.id, p.id
    FROM roles r
    CROSS JOIN privileges p
    WHERE r.id = 1;

    INSERT INTO ${TABLE.roles_privileges} (role_id, privilege_id)
    VALUES(2, 5),
      (2, 6),
      (2, 8),
      (2, 10),
      (2, 11),
      (2, 12),
      (2, 13),
      (2, 14),
      (2, 15),
      (2, 16),
      (2, 17),
      (2, 18),
      (2, 20),
      (2, 21),
      (2, 22),

      (3, 5),
      (3, 10),
      (3, 11),
      (3, 12),
      (3, 13),
      (3, 14),
      (3, 15),
      (3, 16),
      (3, 17),
      (3, 18),
      (3, 20),
      (3, 21),
      (3, 22),
      
      (4, 5),
      (4, 10),
      (4, 12),
      (4, 14),
      (4, 15),
      (4, 16),
      (4, 17),
      (4, 18),
      (4, 20),
      (4, 21),
      (4, 22)           
  `;
  
  return client
    .query(query);
}