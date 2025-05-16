import express from 'express';
import { 
  getCategories, 
  getCategoryBySlug, 
  getFeaturedCategories,
  getCategoriesWithSubcategories
} from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', getCategories);
router.get('/featured', getFeaturedCategories);
router.get('/with-subcategories', getCategoriesWithSubcategories);
router.get('/:slug', getCategoryBySlug);

export default router;