import express from 'express';
import { 
  createOrder, 
  getUserOrders, 
  getOrder, 
  getOrderByNumber,
  cancelOrder,
  trackOrder
} from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All order routes are protected
router.use(protect);

router.post('/', createOrder);
router.get('/', getUserOrders);
router.get('/:id', getOrder);
router.get('/number/:orderNumber', getOrderByNumber);
router.put('/:id/cancel', cancelOrder);
router.get('/:id/track', trackOrder);

export default router;