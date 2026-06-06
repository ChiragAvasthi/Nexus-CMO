import express from 'express';
import { getIntegrations, connectIntegration } from '../controllers/integration.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = express.Router({ mergeParams: true });

router.get('/', requireAuth, getIntegrations);
router.post('/connect', requireAuth, connectIntegration);

export default router;
