import { Router } from 'express';

import * as privilegeController from '../controllers/privileges';
import { checkDuplicatePrivilege, privilegeValidator, findPrivilege } from '../validators/privilegeValidator';
import hasPrivilege from '../middlewares/authorize';

const router = Router();

/**
 * GET /api/privileges
 */
router.get('/', privilegeController.fetchAll);

/**
 * GET /api/privileges/:id
 */
router.get('/:id', privilegeController.fetchById);

/**
 * GET /api/privileges/:id/roles
 */
router.get('/:id/roles', privilegeController.fetchRolesByPrivilege);

/**
 * POST /api/privileges
 */
router.post(
  '/',
  hasPrivilege('create_privileges'),
  checkDuplicatePrivilege,
  privilegeValidator,
  privilegeController.create
);

/**
 * PUT /api/privileges/:id
 */
router.put('/:id', hasPrivilege('update_privileges'), privilegeValidator, findPrivilege, privilegeController.update);

/**
 * DELETE /api/privileges/:id
 */
router.delete('/:id', hasPrivilege('delete_privileges'), findPrivilege, privilegeController.deletePrivilege);

export default router;
