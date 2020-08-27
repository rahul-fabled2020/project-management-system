import { Router } from 'express';

import hasPrivilege from '../middlewares/authorize';
import * as projectController from '../controllers/projects';
import { checkDuplicateProject, projectValidator, findProject, findManager } from '../validators/projectValidator';

const router = Router();

/**
 * GET /api/projects
 */
router.get('/', hasPrivilege('access_projects'), projectController.fetchAll);

/**
 * GET /api/projects/:id
 */
router.get('/:id', hasPrivilege('access_project'),projectController.fetchById);

/**
 * GET /api/projects/:id/tasks
 */
router.get('/:id/tasks', hasPrivilege('access_project'),projectController.fetchTasksByProject);

/**
 * GET /api/projects/:id/users
 */
router.get('/:id/users', hasPrivilege('access_project'),projectController.fetchUsersByProject);

/**
 * GET /api/projects/:id/manager
 */
router.get('/:id/manager', hasPrivilege('access_project'),projectController.fetchManagerByProject);

/**
 * POST /api/projects
 */
router.post('/', hasPrivilege('create_projects'),projectValidator, findManager, checkDuplicateProject, projectController.create);

/**
 * POST /api/projects/:id/users
 */
router.post('/:id/users', hasPrivilege('update_projects'), projectController.syncUsersByProject);

/**
 * PUT /api/projects/:id
 */
router.put('/:id', hasPrivilege('update_projects'),projectValidator, findManager, findProject, projectController.update);

/**
 * DELETE /api/projects/:id
 */
router.delete('/:id', hasPrivilege('delete_projects'),findProject, projectController.deleteProject);

export default router;
