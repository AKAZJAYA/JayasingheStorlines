import express from 'express';
import { 
  getProducts, 
  getProduct, 
  getProductsByCategory,
  getFeaturedProducts, 
  getNewArrivals, 
  getOnSaleProducts,
  addProductReview
} from '../controllers/productController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/new-arrivals', getNewArrivals);
router.get('/on-sale', getOnSaleProducts);
router.get('/category/:slug', getProductsByCategory);
router.get('/:id', getProduct);

// Protected routes
router.post('/:id/reviews', protect, addProductReview);

export default router;