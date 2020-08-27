import { Router } from 'express';

import * as statsController from '../controllers/stats';

const router = Router();

/**
 * GET /api/stats
 */
router.get('/',  statsController.getTotalCount);

export default router;
