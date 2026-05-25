import express from 'express';
import { getMaterials, getNotices } from '../controllers/materialController.js';

const router = express.Router();

router.get('/', getMaterials);
router.get('/notices', getNotices);

export default router;
