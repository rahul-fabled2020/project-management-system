import { Router } from 'express';

import hasPrivilege from '../middlewares/authorize';
import * as taskController from '../controllers/tasks';
import { checkDuplicateTask, taskValidator, findTask } from '../validators/taskValidator';

const router = Router();

/**
 * GET /api/tasks
 */
router.get('/', hasPrivilege('access_tasks'), taskController.fetchAll);

/**
 * GET /api/tasks/:id
 */
router.get('/:id', hasPrivilege('access_task'),taskController.fetchById);

/**
 * GET /api/tasks/:id/comments
 */
router.get('/:id/comments',hasPrivilege('access_task'), taskController.fetchCommentsByTask);

/**
 * POST /api/tasks
 */
router.post('/',hasPrivilege('create_tasks'), checkDuplicateTask, taskValidator, taskController.create);

/**
 * PUT /api/tasks/:id
 */
router.put('/:id',hasPrivilege('update_tasks'), taskValidator, findTask, taskController.update);

/**
 * DELETE /api/tasks/:id
 */
router.delete('/:id',hasPrivilege('delete_tasks'), findTask, taskController.deleteTask);

export default router;
