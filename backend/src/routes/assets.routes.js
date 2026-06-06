import express from 'express';
import multer from 'multer';
import { getAssets, uploadFile } from '../controllers/assets.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.get('/', requireAuth, getAssets);
router.post('/upload', requireAuth, upload.array('files'), uploadFile);

export default router;
