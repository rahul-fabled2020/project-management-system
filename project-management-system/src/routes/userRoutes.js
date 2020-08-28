import { Router } from 'express';

import hasPrivilege from '../middlewares/authorize';
import * as userController from '../controllers/users';
import { findUser, userValidator, checkDuplicateUser, userUpdateValidator } from '../validators/userValidator';

const router = Router();

/**
 * GET /api/users
 */
router.get('/', hasPrivilege('access_users'), userController.fetchAll);

/**
 * GET /api/users/managers
 */
router.get('/managers', hasPrivilege('access_users'), userController.fetchAllManagers);

/**
 * GET /api/users/nonmanagers
 */
router.get('/nonmanagers', hasPrivilege('access_project'), userController.fetchAllNonManagers);

/**
 * GET /api/users/:id
 */
router.get('/:id', hasPrivilege('access_user'), userController.fetchById);

/**
 * GET /api/users/:id/roles
 */
router.get('/:id/roles', hasPrivilege('access_user'), userController.fetchRolesByUser);

/**
 * GET /api/users/:id/projects
 */
router.get('/:id/projects', hasPrivilege('access_project'), userController.fetchProjectsByUser);

/**
 * POST /api/users
 */
router.post('/', hasPrivilege('create_users'), checkDuplicateUser, userValidator, userController.create);

/**
 * POST /api/users/:id/roles
 */
router.post('/:id/roles', hasPrivilege('update_users'), userController.syncRolesByUser);

/**
 * PUT /api/users/:id
 */
router.put('/:id', hasPrivilege('update_users'), findUser, userUpdateValidator, userController.update);

/**
 * DELETE /api/users/:id
 */
router.delete('/:id', hasPrivilege('delete_users'), findUser, userController.deleteUser);

export default router;
