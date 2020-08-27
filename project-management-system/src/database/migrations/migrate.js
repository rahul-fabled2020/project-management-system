import client from '../db';
import * as tags from './create_tags_table';
import * as users from './create_users_table';
import * as roles from './create_roles_table';
import * as tasks from './create_tasks_table';
import * as projects from './create_projects_table';
import * as comments from './create_comments_table';
import * as privileges from './create_privileges_table';
import * as user_roles from './create_users_roles_table';
import * as users_projects from './create_users_projects';
import * as notifications from './create_notifications_table';
import * as roles_privileges from './create_roles_privileges_table';

Promise.all([users.up(client), roles.up(client), privileges.up(client), notifications.up(client)])
  .then(() => projects.up(client))
  .then(() => tasks.up(client))
  .then(() =>
    Promise.all([
      users_projects.up(client),
      tags.up(client),
      comments.up(client),
      user_roles.up(client),
      roles_privileges.up(client)
    ])
  )
  .then(() => console.log('All the tables are created successfully'))
  .catch((err) => console.log(err));
