import express from 'express';
import { getAssets } from '../controllers/assets.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', requireAuth, getAssets);

export default router;
