import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendEmail } from '../utils/email.js';

// @desc    Get all orders for admin
// @route   GET /api/admin/orders
// @access  Private/Admin
export const getAllOrders = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search,
    status,
    paymentStatus,
    dateFrom,
    dateTo,
    sort = 'createdAt',
    order = 'desc'
  } = req.query;

  // Build query object
  const queryObj = {};

  // Search by order number or customer email
  if (search) {
    const users = await User.find({
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    }).select('_id');
    
    const userIds = users.map(user => user._id);
    
    queryObj.$or = [
      { orderNumber: { $regex: search, $options: 'i' } },
      { user: { $in: userIds } }
    ];
  }

  // Filter by status
  if (status) {
    queryObj.status = status;
  }

  // Filter by payment status
  if (paymentStatus) {
    queryObj['paymentDetails.status'] = paymentStatus;
  }

  // Filter by date range
  if (dateFrom || dateTo) {
    queryObj.createdAt = {};
    if (dateFrom) {
      queryObj.createdAt.$gte = new Date(dateFrom);
    }
    if (dateTo) {
      queryObj.createdAt.$lte = new Date(dateTo);
    }
  }

  // Calculate pagination
  const skip = (Number(page) - 1) * Number(limit);

  // Execute query with pagination and sort
  const sortOptions = {};
  sortOptions[sort] = order === 'desc' ? -1 : 1;

  const orders = await Order.find(queryObj)
    .populate('user', 'name email phone')
    .populate('items.product', 'name imageUrl')
    .sort(sortOptions)
    .skip(skip)
    .limit(Number(limit));

  // Get total count for pagination
  const totalOrders = await Order.countDocuments(queryObj);

  res.status(200).json({
    success: true,
    count: orders.length,
    totalPages: Math.ceil(totalOrders / Number(limit)),
    currentPage: Number(page),
    total: totalOrders,
    orders
  });
});

// @desc    Get single order
// @route   GET /api/admin/orders/:id
// @access  Private/Admin
export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email phone')
    .populate('items.product', 'name imageUrl sku');

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  res.status(200).json({
    success: true,
    order
  });
});

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, trackingNumber } = req.body;
  
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  // Update order status
  order.status = status;
  
  if (trackingNumber) {
    order.trackingNumber = trackingNumber;
  }

  // Set shipped date if status is shipped
  if (status === 'shipped' && !order.shippedAt) {
    order.shippedAt = new Date();
  }

  // Set delivered date if status is delivered
  if (status === 'delivered' && !order.deliveredAt) {
    order.deliveredAt = new Date();
  }

  await order.save();

  // Send status update email
  try {
    let emailSubject = '';
    let emailMessage = '';

    switch (status) {
      case 'processing':
        emailSubject = `Order #${order.orderNumber} is being processed`;
        emailMessage = `Your order #${order.orderNumber} is now being processed. We'll notify you when it ships.`;
        break;
      case 'shipped':
        emailSubject = `Order #${order.orderNumber} has been shipped`;
        emailMessage = `Your order #${order.orderNumber} has been shipped. ${trackingNumber ? `Tracking number: ${trackingNumber}` : ''}`;
        break;
      case 'delivered':
        emailSubject = `Order #${order.orderNumber} has been delivered`;
        emailMessage = `Your order #${order.orderNumber} has been delivered. Thank you for shopping with us!`;
        break;
    }

    if (emailSubject) {
      await sendEmail({
        email: order.user.email,
        subject: emailSubject,
        message: emailMessage
      });
    }
  } catch (err) {
    console.error('Error sending order status email:', err);
  }

  res.status(200).json({
    success: true,
    order
  });
});

// @desc    Update order
// @route   PUT /api/admin/orders/:id
// @access  Private/Admin
export const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  ).populate('user', 'name email phone')
   .populate('items.product', 'name imageUrl sku');

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  res.status(200).json({
    success: true,
    order
  });
});

// @desc    Delete order
// @route   DELETE /api/admin/orders/:id
// @access  Private/Admin
export const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  // Return products to stock if order is being deleted
  for (const item of order.items) {
    const product = await Product.findById(item.product);
    if (product) {
      product.stock += item.quantity;
      await product.save();
    }
  }

  await Order.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Order deleted successfully'
  });
});

// @desc    Get order statistics
// @route   GET /api/admin/orders/stats
// @access  Private/Admin
export const getOrderStats = asyncHandler(async (req, res) => {
  const totalOrders = await Order.countDocuments();
  const pendingOrders = await Order.countDocuments({ status: 'pending' });
  const processingOrders = await Order.countDocuments({ status: 'processing' });
  const shippedOrders = await Order.countDocuments({ status: 'shipped' });
  const deliveredOrders = await Order.countDocuments({ status: 'delivered' });
  const cancelledOrders = await Order.countDocuments({ status: 'cancelled' });

  // Revenue statistics
  const revenueStats = await Order.aggregate([
    {
      $match: { status: { $in: ['delivered'] } }
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$total' },
        averageOrderValue: { $avg: '$total' }
      }
    }
  ]);

  // Orders by month
  const ordersByMonth = await Order.aggregate([
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' }
        },
        count: { $sum: 1 },
        revenue: { $sum: '$total' }
      }
    },
    {
      $sort: { '_id.year': -1, '_id.month': -1 }
    },
    {
      $limit: 12
    }
  ]);

  res.status(200).json({
    success: true,
    stats: {
      totalOrders,
      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue: revenueStats[0]?.totalRevenue || 0,
      averageOrderValue: revenueStats[0]?.averageOrderValue || 0,
      ordersByMonth
    }
  });
});