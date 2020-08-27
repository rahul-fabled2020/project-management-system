import client from '../db';
import { insertUsers } from './01_insert_users';
import { insertRoles } from './02_insert_roles';
import { insertPrivileges } from './03_insert_privileges';
import { insertUsersRoles } from './04_insert_users_roles';
import { insertRolesPrivileges } from './05_insert_roles_privileges';

Promise.all([
  insertUsers(client),
  insertRoles(client),
  insertPrivileges(client)
]).then(()=>Promise.all([
  insertUsersRoles(client),
  insertRolesPrivileges(client)
])).then(()=>console.log("Seeding successfull"))
.catch(err => console.log(err));