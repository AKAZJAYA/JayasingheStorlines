import Product from "../models/Product.js";
import asyncHandler from "../utils/asyncHandler.js";
import { cloudinary } from "../config/cloudinary.js";

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
    sort = "createdAt",
    order = "desc",
  } = req.query;

  // Build query object
  const queryObj = {};

  // Search by name or SKU
  if (search) {
    queryObj.$or = [
      { name: { $regex: search, $options: "i" } },
      { sku: { $regex: search, $options: "i" } },
    ];
  }

  // Filter by category
  if (category && category !== "all") {
    queryObj.category = { $regex: new RegExp(`^${category}$`, "i") };
  }

  // Filter by status
  if (status && status !== "all") {
    queryObj.status = status;
  }

  // Filter by featured
  if (featured) {
    queryObj.isFeatured = featured === "true";
  }

  // Calculate pagination
  const skip = (Number(page) - 1) * Number(limit);

  // Execute query with pagination and sort
  const sortOptions = {};
  sortOptions[sort] = order === "desc" ? -1 : 1;

  const products = await Product.find(queryObj)
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
    products,
  });
});

// @desc    Upload product images
// @route   POST /api/admin/products/upload-images
// @access  Private/Admin
export const uploadProductImages = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No images uploaded",
    });
  }

  const imageUrls = req.files.map((file) => ({
    url: file.path,
    public_id: file.filename,
  }));

  res.status(200).json({
    success: true,
    message: "Images uploaded successfully",
    images: imageUrls,
  });
});

// @desc    Delete image from Cloudinary
// @route   DELETE /api/admin/products/delete-image/:publicId
// @access  Private/Admin
export const deleteProductImage = asyncHandler(async (req, res) => {
  const { publicId } = req.params;

  try {
    await cloudinary.uploader.destroy(publicId);
    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete image",
    });
  }
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
    additionalImages = [],
    status = "active",
    isFeatured = false,
    isNewArrival = false,
    isOnSale = false,
  } = req.body;

  // Check if SKU already exists
  const existingProduct = await Product.findOne({ sku });
  if (existingProduct) {
    return res.status(400).json({
      success: false,
      message: "Product with this SKU already exists",
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
    additionalImages,
    status,
    isFeatured,
    isNewArrival,
    isOnSale,
  });

  res.status(201).json({
    success: true,
    product,
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
      message: "Product not found",
    });
  }

  // Check if SKU is being changed and if it already exists
  if (req.body.sku && req.body.sku !== product.sku) {
    const existingProduct = await Product.findOne({ sku: req.body.sku });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product with this SKU already exists",
      });
    }
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
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
      message: "Product not found",
    });
  }

  // Delete images from Cloudinary
  try {
    if (product.imageUrl) {
      const publicId = product.imageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(
        `jayasinghe-storelines/products/${publicId}`
      );
    }

    if (product.additionalImages && product.additionalImages.length > 0) {
      const deletePromises = product.additionalImages.map((imageUrl) => {
        const publicId = imageUrl.split("/").pop().split(".")[0];
        return cloudinary.uploader.destroy(
          `jayasinghe-storelines/products/${publicId}`
        );
      });
      await Promise.all(deletePromises);
    }
  } catch (error) {
    console.error("Error deleting images from Cloudinary:", error);
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// @desc    Get product statistics
// @route   GET /api/admin/products/stats
// @access  Private/Admin
export const getProductStats = asyncHandler(async (req, res) => {
  const totalProducts = await Product.countDocuments();
  const activeProducts = await Product.countDocuments({ status: "active" });
  const inactiveProducts = await Product.countDocuments({ status: "inactive" });
  const outOfStock = await Product.countDocuments({ stock: 0 });
  const lowStock = await Product.countDocuments({
    stock: { $lte: 10, $gt: 0 },
  });
  const featuredProducts = await Product.countDocuments({ isFeatured: true });

  // Get products by category
  const productsByCategory = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        category: "$_id",
        count: 1,
        _id: 0,
      },
    },
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
      productsByCategory,
    },
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
      message: "Please provide product IDs to update",
    });
  }

  const result = await Product.updateMany(
    { _id: { $in: productIds } },
    updateData
  );

  res.status(200).json({
    success: true,
    message: `${result.modifiedCount} products updated successfully`,
    modifiedCount: result.modifiedCount,
  });
});
