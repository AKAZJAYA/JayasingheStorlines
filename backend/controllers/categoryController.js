import Category from '../models/Category.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
  const { featured } = req.query;
  
  const queryObj = {};
  
  if (featured === 'true') {
    queryObj.featured = true;
  }
  
  const categories = await Category.find(queryObj).populate('subcategories');
  
  res.status(200).json({
    success: true,
    count: categories.length,
    categories
  });
});

// @desc    Get category by slug
// @route   GET /api/categories/:slug
// @access  Public
export const getCategoryBySlug = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug }).populate('subcategories');
  
  if (!category) {
    return res.status(404).json({
      success: false,
      message: 'Category not found'
    });
  }
  
  res.status(200).json({
    success: true,
    category
  });
});

// @desc    Get featured categories
// @route   GET /api/categories/featured
// @access  Public
export const getFeaturedCategories = asyncHandler(async (req, res) => {
  const { limit = 6 } = req.query;
  
  const categories = await Category.find({ featured: true })
    .sort({ name: 1 })
    .limit(Number(limit));
  
  res.status(200).json({
    success: true,
    count: categories.length,
    categories
  });
});

// @desc    Get parent categories with subcategories
// @route   GET /api/categories/with-subcategories
// @access  Public
export const getCategoriesWithSubcategories = asyncHandler(async (req, res) => {
  // Get only parent categories
  const parentCategories = await Category.find({ parent: null }).populate('subcategories');
  
  res.status(200).json({
    success: true,
    count: parentCategories.length,
    categories: parentCategories
  });
});