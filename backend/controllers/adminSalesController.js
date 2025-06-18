import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get sales overview
// @route   GET /api/admin/sales/overview
// @access  Private/Admin
export const getSalesOverview = asyncHandler(async (req, res) => {
  const { period = 'month' } = req.query;
  
  let dateFilter = {};
  const now = new Date();
  
  switch (period) {
    case 'day':
      dateFilter = {
        createdAt: {
          $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
          $lte: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
        }
      };
      break;
    case 'week':
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      dateFilter = { createdAt: { $gte: weekAgo } };
      break;
    case 'month':
      dateFilter = {
        createdAt: {
          $gte: new Date(now.getFullYear(), now.getMonth(), 1),
          $lte: new Date(now.getFullYear(), now.getMonth() + 1, 0)
        }
      };
      break;
    case 'year':
      dateFilter = {
        createdAt: {
          $gte: new Date(now.getFullYear(), 0, 1),
          $lte: new Date(now.getFullYear() + 1, 0, 0)
        }
      };
      break;
  }

  // Add filter for completed orders only
  const queryFilter = {
    ...dateFilter,
    status: { $in: ['delivered'] }
  };

  const salesData = await Order.aggregate([
    { $match: queryFilter },
    {
      $group: {
        _id: null,
        totalSales: { $sum: '$total' },
        totalOrders: { $sum: 1 },
        averageOrderValue: { $avg: '$total' }
      }
    }
  ]);

  // Get previous period data for comparison
  let previousPeriodFilter = {};
  switch (period) {
    case 'day':
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      previousPeriodFilter = {
        createdAt: {
          $gte: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate()),
          $lte: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate() + 1)
        },
        status: { $in: ['delivered'] }
      };
      break;
    case 'week':
      const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      previousPeriodFilter = {
        createdAt: { $gte: twoWeeksAgo, $lte: oneWeekAgo },
        status: { $in: ['delivered'] }
      };
      break;
    case 'month':
      previousPeriodFilter = {
        createdAt: {
          $gte: new Date(now.getFullYear(), now.getMonth() - 1, 1),
          $lte: new Date(now.getFullYear(), now.getMonth(), 0)
        },
        status: { $in: ['delivered'] }
      };
      break;
  }

  const previousSalesData = await Order.aggregate([
    { $match: previousPeriodFilter },
    {
      $group: {
        _id: null,
        totalSales: { $sum: '$total' },
        totalOrders: { $sum: 1 }
      }
    }
  ]);

  const currentData = salesData[0] || { totalSales: 0, totalOrders: 0, averageOrderValue: 0 };
  const previousData = previousSalesData[0] || { totalSales: 0, totalOrders: 0 };

  // Calculate growth percentages
  const salesGrowth = previousData.totalSales > 0 
    ? ((currentData.totalSales - previousData.totalSales) / previousData.totalSales * 100).toFixed(1)
    : 0;
  
  const ordersGrowth = previousData.totalOrders > 0
    ? ((currentData.totalOrders - previousData.totalOrders) / previousData.totalOrders * 100).toFixed(1)
    : 0;

  res.status(200).json({
    success: true,
    data: {
      totalSales: currentData.totalSales,
      totalOrders: currentData.totalOrders,
      averageOrderValue: currentData.averageOrderValue,
      salesGrowth: `${salesGrowth >= 0 ? '+' : ''}${salesGrowth}%`,
      ordersGrowth: `${ordersGrowth >= 0 ? '+' : ''}${ordersGrowth}%`
    }
  });
});

// @desc    Get sales by category
// @route   GET /api/admin/sales/by-category
// @access  Private/Admin
export const getSalesByCategory = asyncHandler(async (req, res) => {
  const { period = 'month' } = req.query;
  
  let dateFilter = {};
  const now = new Date();
  
  // Set date filter based on period
  switch (period) {
    case 'week':
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      dateFilter = { createdAt: { $gte: weekAgo } };
      break;
    case 'month':
      dateFilter = {
        createdAt: {
          $gte: new Date(now.getFullYear(), now.getMonth(), 1),
          $lte: new Date(now.getFullYear(), now.getMonth() + 1, 0)
        }
      };
      break;
    case 'year':
      dateFilter = {
        createdAt: {
          $gte: new Date(now.getFullYear(), 0, 1),
          $lte: new Date(now.getFullYear() + 1, 0, 0)
        }
      };
      break;
  }

  const salesByCategory = await Order.aggregate([
    {
      $match: {
        ...dateFilter,
        status: { $in: ['delivered'] }
      }
    },
    { $unwind: '$items' },
    {
      $lookup: {
        from: 'products',
        localField: 'items.product',
        foreignField: '_id',
        as: 'product'
      }
    },
    { $unwind: '$product' },
    {
      $lookup: {
        from: 'categories',
        localField: 'product.category',
        foreignField: '_id',
        as: 'category'
      }
    },
    { $unwind: '$category' },
    {
      $group: {
        _id: '$category.name',
        totalSales: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
        totalQuantity: { $sum: '$items.quantity' }
      }
    },
    { $sort: { totalSales: -1 } }
  ]);

  // Calculate total sales for percentage calculation
  const totalSales = salesByCategory.reduce((sum, category) => sum + category.totalSales, 0);

  const categoriesWithPercentage = salesByCategory.map(category => ({
    name: category._id,
    sales: category.totalSales,
    quantity: category.totalQuantity,
    percentage: totalSales > 0 ? ((category.totalSales / totalSales) * 100).toFixed(1) : 0
  }));

  res.status(200).json({
    success: true,
    data: categoriesWithPercentage
  });
});

// @desc    Get top selling products
// @route   GET /api/admin/sales/top-products
// @access  Private/Admin
export const getTopSellingProducts = asyncHandler(async (req, res) => {
  const { limit = 10, period = 'month' } = req.query;
  
  let dateFilter = {};
  const now = new Date();
  
  switch (period) {
    case 'week':
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      dateFilter = { createdAt: { $gte: weekAgo } };
      break;
    case 'month':
      dateFilter = {
        createdAt: {
          $gte: new Date(now.getFullYear(), now.getMonth(), 1),
          $lte: new Date(now.getFullYear(), now.getMonth() + 1, 0)
        }
      };
      break;
    case 'year':
      dateFilter = {
        createdAt: {
          $gte: new Date(now.getFullYear(), 0, 1),
          $lte: new Date(now.getFullYear() + 1, 0, 0)
        }
      };
      break;
  }

  const topProducts = await Order.aggregate([
    {
      $match: {
        ...dateFilter,
        status: { $in: ['delivered'] }
      }
    },
    { $unwind: '$items' },
    {
      $group: {
        _id: '$items.product',
        totalQuantity: { $sum: '$items.quantity' },
        totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
        productName: { $first: '$items.name' }
      }
    },
    { $sort: { totalQuantity: -1 } },
    { $limit: Number(limit) },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'product'
      }
    },
    { $unwind: '$product' },
    {
      $lookup: {
        from: 'categories',
        localField: 'product.category',
        foreignField: '_id',
        as: 'category'
      }
    },
    { $unwind: '$category' },
    {
      $project: {
        name: '$productName',
        category: '$category.name',
        quantitySold: '$totalQuantity',
        revenue: '$totalRevenue',
        imageUrl: '$product.imageUrl',
        sku: '$product.sku'
      }
    }
  ]);

  res.status(200).json({
    success: true,
    data: topProducts
  });
});

// @desc    Get sales trends
// @route   GET /api/admin/sales/trends
// @access  Private/Admin
export const getSalesTrends = asyncHandler(async (req, res) => {
  const { period = 'month' } = req.query;
  
  let groupBy = {};
  let dateRange = {};
  const now = new Date();
  
  switch (period) {
    case 'week':
      // Group by day for the last 7 days
      groupBy = {
        year: { $year: '$createdAt' },
        month: { $month: '$createdAt' },
        day: { $dayOfMonth: '$createdAt' }
      };
      dateRange = {
        createdAt: {
          $gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        }
      };
      break;
    case 'month':
      // Group by day for the current month
      groupBy = {
        year: { $year: '$createdAt' },
        month: { $month: '$createdAt' },
        day: { $dayOfMonth: '$createdAt' }
      };
      dateRange = {
        createdAt: {
          $gte: new Date(now.getFullYear(), now.getMonth(), 1),
          $lte: new Date(now.getFullYear(), now.getMonth() + 1, 0)
        }
      };
      break;
    case 'year':
      // Group by month for the current year
      groupBy = {
        year: { $year: '$createdAt' },
        month: { $month: '$createdAt' }
      };
      dateRange = {
        createdAt: {
          $gte: new Date(now.getFullYear(), 0, 1),
          $lte: new Date(now.getFullYear() + 1, 0, 0)
        }
      };
      break;
  }

  const salesTrends = await Order.aggregate([
    {
      $match: {
        ...dateRange,
        status: { $in: ['delivered'] }
      }
    },
    {
      $group: {
        _id: groupBy,
        totalSales: { $sum: '$total' },
        totalOrders: { $sum: 1 }
      }
    },
    { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
  ]);

  res.status(200).json({
    success: true,
    data: salesTrends
  });
});