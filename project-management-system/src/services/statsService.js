import User from '../models/user';
import Task from '../models/task';
import Project from '../models/project';

const task = new Task();
const user = new User();
const project = new Project();

/**
 * Get counts of users, projects and tasks.
 *
 * @returns {Promise}
 */
export function getTotalCount() {
  return Promise.all([user.getTotalUsersCount(), project.getTotalProjectsCount(), task.getTotalTasksCount()]).then(
    ([users, projects, tasks]) => {
      const usersCount = users.rows[0].count;
      const projectsCount = projects.rows[0].count;
      const tasksCount = tasks.rows[0].count;

      return { usersCount, projectsCount, tasksCount };
    }
  );
}
