import { Router } from 'express';

import hasPrivilege from '../middlewares/authorize';
import * as commentController from '../controllers/comments';
import { checkDuplicateComment, commentValidator, findComment } from '../validators/commentValidator';

const router = Router();

/**
 * GET /api/comments
 */
router.get('/', hasPrivilege('access_comments'), commentController.fetchAll);

/**
 * GET /api/comments/:id
 */
router.get('/:id', hasPrivilege('access_comment'),commentController.fetchById);

/**
 * POST /api/comments
 */
router.post('/', hasPrivilege('create_comments'),checkDuplicateComment, commentValidator, commentController.create);

/**
 * PUT /api/comments/:id
 */
router.put('/:id', hasPrivilege('update_comments'),commentValidator, findComment, commentController.update);

/**
 * DELETE /api/comments/:id
 */
router.delete('/:id', hasPrivilege('delete_comments'),findComment, commentController.deleteComment);

export default router;
