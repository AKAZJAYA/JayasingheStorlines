import express from 'express';
import { 
  getAllStores, 
  getStore, 
  getNearestStores,
  getStoreHours,
  checkStoreOpen
} from '../controllers/storeController.js';

const router = express.Router();

router.get('/', getAllStores);
router.get('/nearest', getNearestStores);
router.get('/:id', getStore);
router.get('/:id/hours', getStoreHours);
router.get('/:id/isopen', checkStoreOpen);

export default router;