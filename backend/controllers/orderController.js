import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendEmail } from '../utils/email.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
  const {
    billingInfo,
    shippingInfo,
    shippingMethod,
    paymentMethod,
    paymentDetails,
    notes,
    promoCode
  } = req.body;
  
  // Get the user's cart
  const cart = await Cart.findOne({ user: req.user._id }).populate({
    path: 'items.product',
    select: 'name price discountPrice stock imageUrl'
  });
  
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Your cart is empty'
    });
  }
  
  // Check items stock
  for (const item of cart.items) {
    const product = await Product.findById(item.product);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product not found: ${item.name}`
      });
    }
    
    if (product.stock < item.quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} units of ${product.name} available`
      });
    }
  }
  
  // Calculate shipping cost based on shipping method
  let shippingCost = 0;
  switch (shippingMethod) {
    case 'standard':
      shippingCost = 1590;
      break;
    case 'express':
      shippingCost = 2990;
      break;
    case 'pickup':
      shippingCost = 0;
      break;
    default:
      shippingCost = 1590;
  }
  
  // Calculate subtotal
  const subtotal = cart.subtotal;
  
  // Calculate discount if promo code exists
  let discount = 0;
  if (cart.promoCode && cart.promoCode.code) {
    discount = subtotal * cart.promoCode.discount;
  }
  
  // Calculate total
  const total = subtotal + shippingCost - discount;
  
  // Create order items from cart items
  const orderItems = cart.items.map(item => ({
    product: item.product._id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    imageUrl: item.imageUrl
  }));
  
  // Create the order
  const order = await Order.create({
    user: req.user._id,
    items: orderItems,
    billingInfo,
    shippingInfo,
    shippingMethod,
    shippingCost,
    paymentMethod,
    paymentDetails,
    subtotal,
    discount,
    total,
    notes,
    promoCode: cart.promoCode.code
  });
  
  // Update product stock
  for (const item of cart.items) {
    const product = await Product.findById(item.product);
    product.stock -= item.quantity;
    await product.save();
  }
  
  // Clear the cart
  cart.items = [];
  cart.subtotal = 0;
  cart.promoCode = {};
  cart.lastUpdated = Date.now();
  await cart.save();
  
  // Send order confirmation email
  try {
    await sendEmail({
      email: req.user.email,
      subject: `Order Confirmation #${order.orderNumber}`,
      message: `Thank you for your order! Your order #${order.orderNumber} has been received and is being processed. You can track your order status in your account.`
    });
  } catch (err) {
    console.error('Error sending order confirmation email:', err);
  }
  
  res.status(201).json({
    success: true,
    order
  });
});

// @desc    Get all user orders
// @route   GET /api/orders
// @access  Private
export const getUserOrders = asyncHandler(async (req, res) => {
  const { status, sort = 'createdAt', order = 'desc', page = 1, limit = 10 } = req.query;
  
  const queryObj = { user: req.user._id };
  
  if (status) {
    queryObj.status = status;
  }
  
  // Calculate pagination
  const skip = (Number(page) - 1) * Number(limit);
  
  // Execute query with pagination and sort
  const sortOptions = {};
  sortOptions[sort] = order === 'desc' ? -1 : 1;
  
  const orders = await Order.find(queryObj)
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
    orders
  });
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  
  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }
  
  // Check if the order belongs to the user
  if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to access this order'
    });
  }
  
  res.status(200).json({
    success: true,
    order
  });
});

// @desc    Get order by order number
// @route   GET /api/orders/number/:orderNumber
// @access  Private
export const getOrderByNumber = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ orderNumber: req.params.orderNumber });
  
  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }
  
  // Check if the order belongs to the user
  if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to access this order'
    });
  }
  
  res.status(200).json({
    success: true,
    order
  });
});

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
export const cancelOrder = asyncHandler(async (req, res) => {
  const { reason } = req.body;
  
  const order = await Order.findById(req.params.id);
  
  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }
  
  // Check if the order belongs to the user
  if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to cancel this order'
    });
  }
  
  // Check if order can be cancelled
  if (!['pending', 'processing'].includes(order.status)) {
    return res.status(400).json({
      success: false,
      message: `Order cannot be cancelled in ${order.status} status`
    });
  }
  
  // Update order status
  order.status = 'cancelled';
  order.cancellationReason = reason;
  
  await order.save();
  
  // Return products to stock
  for (const item of order.items) {
    const product = await Product.findById(item.product);
    if (product) {
      product.stock += item.quantity;
      await product.save();
    }
  }
  
  // Send cancellation email
  try {
    await sendEmail({
      email: req.user.email,
      subject: `Order Cancellation #${order.orderNumber}`,
      message: `Your order #${order.orderNumber} has been cancelled. If you have any questions, please contact our customer support.`
    });
  } catch (err) {
    console.error('Error sending order cancellation email:', err);
  }
  
  res.status(200).json({
    success: true,
    message: 'Order cancelled successfully',
    order
  });
});

// @desc    Track order status
// @route   GET /api/orders/:id/track
// @access  Private
export const trackOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  
  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }
  
  // Check if the order belongs to the user
  if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to track this order'
    });
  }
  
  // Create tracking information based on status
  let trackingInfo = [];
  
  // Always add the order placement step
  trackingInfo.push({
    status: 'Order Placed',
    date: order.createdAt,
    completed: true
  });
  
  if (['processing', 'shipped', 'delivered', 'cancelled'].includes(order.status)) {
    trackingInfo.push({
      status: 'Processing',
      date: new Date(new Date(order.createdAt).getTime() + 24 * 60 * 60 * 1000), // 1 day after order placed
      completed: true
    });
  }
  
  if (['shipped', 'delivered'].includes(order.status)) {
    trackingInfo.push({
      status: 'Shipped',
      date: order.shippedAt || new Date(),
      completed: true,
      trackingNumber: order.trackingNumber
    });
  }
  
  if (order.status === 'delivered') {
    trackingInfo.push({
      status: 'Delivered',
      date: order.deliveredAt || new Date(),
      completed: true
    });
  }
  
  if (order.status === 'cancelled') {
    trackingInfo.push({
      status: 'Cancelled',
      date: order.updatedAt,
      completed: true,
      isCancellation: true,
      reason: order.cancellationReason
    });
  }
  
  res.status(200).json({
    success: true,
    order,
    trackingInfo
  });
});