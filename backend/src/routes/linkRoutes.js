import express from 'express';
import {
  createLink,
  getAllLinks,
  getLinkStats,
  deleteLink,
  redirectLink
} from '../controllers/linkController.js';
import { validateLink } from '../middleware/validateLink.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// API routes
router.post('/', validateLink, createLink);
router.get('/', getAllLinks);
router.get('/:code', getLinkStats);
router.delete('/:code', deleteLink);

export default router;

