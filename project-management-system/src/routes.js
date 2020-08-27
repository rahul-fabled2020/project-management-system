import { Router } from 'express';

import tagRoutes from './routes/tagRoutes';
import userRoutes from './routes/userRoutes';
import roleRoutes from './routes/roleRoutes';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import statsRoutes from './routes/statsRoutes';
import commentRoutes from './routes/commentRoutes';
import projectRoutes from './routes/projectRoutes';
import authenticate from './middlewares/authenticate';
import privilegeRoutes from './routes/privilegeRouters';

/**
 * Contains all API routes for the application.
 */
const router = Router();

/**
 * GET /api
 */
router.get('/', (req, res) => {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version
  });
});

router.use('/auth', authRoutes);
router.use('/tags', authenticate, tagRoutes);
router.use('/users', authenticate, userRoutes);
router.use('/roles', authenticate, roleRoutes);
router.use('/tasks', authenticate, taskRoutes);
router.use('/stats', authenticate, statsRoutes);
router.use('/comments', authenticate, commentRoutes);
router.use('/projects', authenticate, projectRoutes);
router.use('/privileges', authenticate, privilegeRoutes);

export default router;
