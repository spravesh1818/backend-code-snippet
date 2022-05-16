import { Router } from 'express';

import recordRoutes from './record';
import userRoutes from './user';
import groupRoutes from './group';
import contactRoutes from './contact';
import workflowRoutes from './workflow';
import { authenticateRequest } from '../middlewares/auth/authenticate';

const router = Router();

router.use(authenticateRequest);

router.use('/workflow', workflowRoutes);
router.use('/record', recordRoutes);
router.use('/users', userRoutes);
router.use('/group', groupRoutes);

router.use('/contact', contactRoutes);

export default router;
