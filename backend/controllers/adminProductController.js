import Product from '../models/Product.js';
// import Category from '../models/Category.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all products for admin
// @route   GET /api/admin/products
// @access  Private/Admin
export const getAllProducts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search,
    category,
    status,
    featured,
    sort = 'createdAt',
    order = 'desc'
  } = req.query;

  // Build query object
  const queryObj = {};

  // Search by name or SKU
  if (search) {
    queryObj.$or = [
      { name: { $regex: search, $options: 'i' } },
      { sku: { $regex: search, $options: 'i' } }
    ];
  }

  // Filter by category
  if (category) {
    const categoryObj = await Category.findOne({ slug: category });
    if (categoryObj) {
      queryObj.category = categoryObj._id;
    }
  }

  // Filter by status
  if (status) {
    queryObj.status = status;
  }

  // Filter by featured
  if (featured) {
    queryObj.isFeatured = featured === 'true';
  }

  // Calculate pagination
  const skip = (Number(page) - 1) * Number(limit);

  // Execute query with pagination and sort
  const sortOptions = {};
  sortOptions[sort] = order === 'desc' ? -1 : 1;

  const products = await Product.find(queryObj)
    .populate('category', 'name slug')
    .sort(sortOptions)
    .skip(skip)
    .limit(Number(limit));

  // Get total count for pagination
  const totalProducts = await Product.countDocuments(queryObj);

  res.status(200).json({
    success: true,
    count: products.length,
    totalPages: Math.ceil(totalProducts / Number(limit)),
    currentPage: Number(page),
    total: totalProducts,
    products
  });
});

// @desc    Create new product
// @route   POST /api/admin/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    sku,
    description,
    price,
    discountPrice,
    category,
    stock,
    imageUrl,
    images,
    status = 'active',
    isFeatured = false,
    isNewArrival = false,
    isOnSale = false
  } = req.body;

  // Check if SKU already exists
  const existingProduct = await Product.findOne({ sku });
  if (existingProduct) {
    return res.status(400).json({
      success: false,
      message: 'Product with this SKU already exists'
    });
  }

  const product = await Product.create({
    name,
    sku,
    description,
    price,
    discountPrice,
    category,
    stock,
    imageUrl,
    images,
    status,
    isFeatured,
    isNewArrival,
    isOnSale
  });

  await product.populate('category', 'name slug');

  res.status(201).json({
    success: true,
    product
  });
});

// @desc    Update product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  // Check if SKU is being changed and if it already exists
  if (req.body.sku && req.body.sku !== product.sku) {
    const existingProduct = await Product.findOne({ sku: req.body.sku });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: 'Product with this SKU already exists'
      });
    }
  }

  product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  ).populate('category', 'name slug');

  res.status(200).json({
    success: true,
    product
  });
});

// @desc    Delete product
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully'
  });
});

// @desc    Get product statistics
// @route   GET /api/admin/products/stats
// @access  Private/Admin
export const getProductStats = asyncHandler(async (req, res) => {
  const totalProducts = await Product.countDocuments();
  const activeProducts = await Product.countDocuments({ status: 'active' });
  const inactiveProducts = await Product.countDocuments({ status: 'inactive' });
  const outOfStock = await Product.countDocuments({ stock: 0 });
  const lowStock = await Product.countDocuments({ stock: { $lte: 10, $gt: 0 } });
  const featuredProducts = await Product.countDocuments({ isFeatured: true });

  // Get products by category
  const productsByCategory = await Product.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: 'categories',
        localField: '_id',
        foreignField: '_id',
        as: 'category'
      }
    },
    {
      $unwind: '$category'
    },
    {
      $project: {
        name: '$category.name',
        count: 1
      }
    }
  ]);

  res.status(200).json({
    success: true,
    stats: {
      totalProducts,
      activeProducts,
      inactiveProducts,
      outOfStock,
      lowStock,
      featuredProducts,
      productsByCategory
    }
  });
});

// @desc    Bulk update products
// @route   PUT /api/admin/products/bulk-update
// @access  Private/Admin
export const bulkUpdateProducts = asyncHandler(async (req, res) => {
  const { productIds, updateData } = req.body;

  if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Please provide product IDs to update'
    });
  }

  const result = await Product.updateMany(
    { _id: { $in: productIds } },
    updateData
  );

  res.status(200).json({
    success: true,
    message: `${result.modifiedCount} products updated successfully`,
    modifiedCount: result.modifiedCount
  });
});