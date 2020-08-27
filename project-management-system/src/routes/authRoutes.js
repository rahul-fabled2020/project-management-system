import { Router } from 'express';

import * as authController from '../controllers/auth';
import { userValidator, checkDuplicateUser } from '../validators/userValidator';

const router = Router();

/**
 * POST /api/auth/login
 */
router.post('/login', authController.login);

/**
 * POST /api/auth/register
 */
router.post('/register', checkDuplicateUser, userValidator, authController.register);

export default router;