import { Router } from 'express';

import userRoutes from './user';
import workflowRoutes from './workflow';
import { authenticateRequest } from '../middlewares/auth/authenticate';

const router = Router();

router.use(authenticateRequest);

router.use('/workflow', workflowRoutes);
router.use('/users', userRoutes);

export default router;
