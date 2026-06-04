import express from 'express';
import { getWorkspace, getStats, getMessages, generateReport, updateWorkspace, createWorkspace } from '../controllers/workspace.controller.js';
import { getProducts, createProduct, updateProduct } from '../controllers/product.controller.js';
import { getTasks } from '../controllers/tasks.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/:id', requireAuth, getWorkspace);
router.post('/', requireAuth, createWorkspace);
router.get('/:id/stats', requireAuth, getStats);
router.get('/:id/messages', requireAuth, getMessages);
router.get('/:id/tasks', requireAuth, getTasks);
router.get('/:id/products', requireAuth, getProducts);
router.post('/:id/products', requireAuth, createProduct);
router.put('/:id/products/:productId', requireAuth, updateProduct);
router.post('/:id/generate-report', requireAuth, generateReport);
router.put('/:id', requireAuth, updateWorkspace);

export default router;
