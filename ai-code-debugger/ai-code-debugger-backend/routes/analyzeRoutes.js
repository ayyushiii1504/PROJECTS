import express from 'express';
import { analyzeCode, getHistory } from '../controllers/analyzeController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/analyze', auth, analyzeCode);
router.get('/history', auth, getHistory);

export default router;