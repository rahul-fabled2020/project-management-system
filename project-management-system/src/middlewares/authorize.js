import Boom from '@hapi/boom';

import * as userService from '../services/userService';
import * as taskService from '../services/taskService';
import * as projectService from '../services/projectService';

/**
 * Checks if the logged in user has privilege
 * @param {string} privilege
 * @returns {Function}
 */
export default function hasPrivilege(privilege) {
  /**
   * Authorizes user based on provided token
   * @param {Object} req HTTP Request Object
   * @param {Object} res HTTP Response Object
   * @param {Function} next Forwards to next middleware
   */
  return function authorize(req, res, next) {
    userService
      .getPrivilegesByUser(req.user.id)
      .then((privilegesArray) => {
        let hasPermission = false;
        privilegesArray.forEach((privilegeObject) => {
          if (privilegeObject.title === privilege) hasPermission = true;
        });

        if (!hasPermission) return next(Boom.unauthorized('You do not have permission.'));

        //Admin is allowed to do anything
        if (req.user.roles[0].title === 'Admin') return next();

        switch (privilege) {
          case 'update_projects': //Project Manager
            const projectId = req.params.id;

            projectService.getManagerByProject(projectId).then((manager) => {
              if (manager && manager.id === req.user.id) return next();
              next(Boom.unauthorized('You are not allowed to update other projects.'));
            });

            break;
            
          case 'update_tasks': //Engineer
            const taskId = req.params.id;
            
            if(req.user.roles[0].title === 'Engineer') {
              taskService.getAssigneeByTask(taskId)
              .then(assignee => {
                if(assignee && assignee.id === req.user.id) return next();
                return next(Boom.unauthorized('You are not allowed to update other tasks.'));
              })
            }
            
            next();
            break;
          default:
            next();
        }
      })
      .catch((err) => next(err));
  };
}
