import { Router } from 'express';

import hasPrivilege from '../middlewares/authorize';
import * as roleController from '../controllers/roles';
import { checkDuplicateRole, roleValidator, findRole } from '../validators/roleValidator';

const router = Router();

/**
 * GET /api/roles
 */
router.get('/', roleController.fetchAll);

/**
 * GET /api/roles/:id
 */
router.get('/:id', roleController.fetchById);

/**
 * GET /api/roles/:id/privileges
 */
router.get('/:id/privileges', roleController.fetchPrivilegesByRole);

/**
 * POST /api/roles
 */
router.post('/', hasPrivilege('create_roles'), checkDuplicateRole, roleValidator, roleController.create);

/**
 * POST /api/roles/:id/privileges
 */
router.post('/:id/privileges', roleController.syncPrivilegesByRole);

/**
 * PUT /api/roles/:id
 */
router.put('/:id', hasPrivilege('update_roles'),roleValidator, findRole, roleController.update);

/**
 * DELETE /api/roles/:id
 */
router.delete('/:id', hasPrivilege('delete_roles'),findRole, roleController.deleteRole);

export default router;
