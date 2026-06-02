import express from 'express';
import { approveTask } from '../controllers/tasks.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.put('/:taskId/approve', requireAuth, approveTask);

export default router;
