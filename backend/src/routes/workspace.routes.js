import express from 'express';
import { getStats, getMessages, generateReport } from '../controllers/workspace.controller.js';
import { getTasks } from '../controllers/tasks.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/:id/stats', requireAuth, getStats);
router.get('/:id/messages', requireAuth, getMessages);
router.get('/:id/tasks', requireAuth, getTasks);
router.post('/:id/generate-report', requireAuth, generateReport);

export default router;
