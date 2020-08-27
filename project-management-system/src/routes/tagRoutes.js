import { Router } from 'express';

import hasPrivilege from '../middlewares/authorize';
import * as tagController from '../controllers/tags';
import { checkDuplicateTag, tagValidator, findTag } from '../validators/tagValidator';

const router = Router();

/**
 * GET /api/tags
 */
router.get('/', tagController.fetchAll);

/**
 * GET /api/tags/:id
 */
router.get('/:id', tagController.fetchById);

/**
 * POST /api/tags
 */
router.post('/', hasPrivilege('tag_users'), checkDuplicateTag, tagValidator, tagController.create);

/**
 * PUT /api/tags/:id
 */
router.put('/:id', tagValidator, findTag, tagController.update);

/**
 * DELETE /api/tags/:id
 */
router.delete('/:id', hasPrivilege('tag_users'), findTag, tagController.deleteTag);

export default router;
