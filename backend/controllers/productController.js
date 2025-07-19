import Product from "../models/Product.js";
// import Category from '../models/Category.js';
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const {
    keyword,
    category,
    minPrice,
    maxPrice,
    sort = "createdAt",
    order = "desc",
    page = 1,
    limit = 12,
    featured,
    newArrival,
    onSale,
  } = req.query;

  const queryObject = {};

  // Search by keyword
  if (keyword) {
    queryObject.$or = [
      { name: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ];
  }

  // Filter by category
  if (category) {
    const categoryObj = await Category.findOne({ slug: category });
    if (categoryObj) {
      queryObject.category = categoryObj._id;
    }
  }

  // Filter by price range
  if (minPrice && maxPrice) {
    queryObject.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
  } else if (minPrice) {
    queryObject.price = { $gte: Number(minPrice) };
  } else if (maxPrice) {
    queryObject.price = { $lte: Number(maxPrice) };
  }

  // Filter by featured, newArrival, or onSale
  if (featured === "true") {
    queryObject.isFeatured = true;
  }

  if (newArrival === "true") {
    queryObject.isNewArrival = true;
  }

  if (onSale === "true") {
    queryObject.isOnSale = true;
  }

  // Calculate pagination
  const skip = (Number(page) - 1) * Number(limit);

  // Execute query with pagination and sort
  const sortOptions = {};
  sortOptions[sort] = order === "desc" ? -1 : 1;

  const products = await Product.find(queryObject)
    .populate("category", "name slug")
    .sort(sortOptions)
    .skip(skip)
    .limit(Number(limit));

  // Get total count for pagination
  const totalProducts = await Product.countDocuments(queryObject);

  res.status(200).json({
    success: true,
    count: products.length,
    totalPages: Math.ceil(totalProducts / Number(limit)),
    currentPage: Number(page),
    products,
  });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "category",
    "name slug"
  );

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// @desc    Get products by category slug
// @route   GET /api/products/category/:slug
// @access  Public
export const getProductsByCategory = asyncHandler(async (req, res) => {
  const categorySlug = req.params.slug;

  // Convert slug to category name (assuming slug is the category name)
  const categoryName =
    categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);

  const {
    sort = "createdAt",
    order = "desc",
    page = 1,
    limit = 12,
  } = req.query;

  // Calculate pagination
  const skip = (Number(page) - 1) * Number(limit);

  // Execute query with pagination and sort
  const sortOptions = {};
  sortOptions[sort] = order === "desc" ? -1 : 1;

  // Search for products by category name (case-insensitive)
  const products = await Product.find({
    category: { $regex: new RegExp(`^${categoryName}$`, "i") },
  })
    .sort(sortOptions)
    .skip(skip)
    .limit(Number(limit));

  // Get total count for pagination
  const totalProducts = await Product.countDocuments({
    category: { $regex: new RegExp(`^${categoryName}$`, "i") },
  });

  res.status(200).json({
    success: true,
    category: {
      name: categoryName,
      slug: categorySlug,
    },
    count: products.length,
    totalPages: Math.ceil(totalProducts / Number(limit)),
    currentPage: Number(page),
    total: totalProducts,
    products,
  });
});

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const { limit = 8 } = req.query;

  const products = await Product.find({ isFeatured: true })
    .sort({ createdAt: -1 })
    .limit(Number(limit));

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});

// @desc    Get new arrival products
// @route   GET /api/products/new-arrivals
// @access  Public
export const getNewArrivals = asyncHandler(async (req, res) => {
  const { limit = 8 } = req.query;

  const products = await Product.find({ isNewArrival: true })
    .sort({ createdAt: -1 })
    .limit(Number(limit));

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});

// @desc    Get on sale products
// @route   GET /api/products/on-sale
// @access  Public
export const getOnSaleProducts = asyncHandler(async (req, res) => {
  const { limit = 8 } = req.query;

  const products = await Product.find({ isOnSale: true })
    .sort({ discountPercentage: -1 })
    .limit(Number(limit));

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});

// @desc    Add product review
// @route   POST /api/products/:id/reviews
// @access  Private
export const addProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  // Check if user already reviewed this product
  const alreadyReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    return res.status(400).json({
      success: false,
      message: "You have already reviewed this product",
    });
  }

  // Add review
  const review = {
    user: req.user._id,
    rating: Number(rating),
    comment,
    date: Date.now(),
  };

  product.reviews.push(review);

  // Update ratings average and count
  product.ratings.count = product.reviews.length;
  product.ratings.average =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save();

  res.status(201).json({
    success: true,
    message: "Review added successfully",
    review,
  });
});
