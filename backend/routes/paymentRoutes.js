import express from 'express';
import { 
  getPaymentMethods, 
  processPayment, 
  verifyPayment 
} from '../controllers/paymentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All payment routes are protected
router.use(protect);

router.get('/methods', getPaymentMethods);
router.post('/process', processPayment);
router.get('/verify/:paymentId', verifyPayment);

export default router;