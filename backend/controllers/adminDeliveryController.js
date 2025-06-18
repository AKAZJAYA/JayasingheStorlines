import Delivery from '../models/Delivery.js';
import Order from '../models/Order.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all deliveries
// @route   GET /api/admin/deliveries
// @access  Private/Admin
export const getAllDeliveries = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search,
    status,
    driverId,
    dateFrom,
    dateTo,
    sort = 'createdAt',
    order = 'desc'
  } = req.query;

  // Build query object
  const queryObj = {};

  // Search by delivery ID, customer name, or driver name
  if (search) {
    queryObj.$or = [
      { deliveryId: { $regex: search, $options: 'i' } },
      { 'customer.name': { $regex: search, $options: 'i' } },
      { 'driver.name': { $regex: search, $options: 'i' } }
    ];
  }

  // Filter by status
  if (status) {
    queryObj.status = status;
  }

  // Filter by driver
  if (driverId) {
    queryObj['driver.id'] = driverId;
  }

  // Filter by date range
  if (dateFrom || dateTo) {
    queryObj.scheduledDate = {};
    if (dateFrom) {
      queryObj.scheduledDate.$gte = new Date(dateFrom);
    }
    if (dateTo) {
      queryObj.scheduledDate.$lte = new Date(dateTo);
    }
  }

  // Calculate pagination
  const skip = (Number(page) - 1) * Number(limit);

  // Execute query with pagination and sort
  const sortOptions = {};
  sortOptions[sort] = order === 'desc' ? -1 : 1;

  const deliveries = await Delivery.find(queryObj)
    .populate('orderId', 'orderNumber total items')
    .sort(sortOptions)
    .skip(skip)
    .limit(Number(limit));

  // Get total count for pagination
  const totalDeliveries = await Delivery.countDocuments(queryObj);

  res.status(200).json({
    success: true,
    count: deliveries.length,
    totalPages: Math.ceil(totalDeliveries / Number(limit)),
    currentPage: Number(page),
    total: totalDeliveries,
    deliveries
  });
});

// @desc    Create new delivery
// @route   POST /api/admin/deliveries
// @access  Private/Admin
export const createDelivery = asyncHandler(async (req, res) => {
  const {
    orderId,
    driver,
    customer,
    scheduledDate,
    scheduledTime,
    deliveryInstructions,
    notes
  } = req.body;

  // Verify order exists
  const order = await Order.findById(orderId);
  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  // Check if delivery already exists for this order
  const existingDelivery = await Delivery.findOne({ orderId });
  if (existingDelivery) {
    return res.status(400).json({
      success: false,
      message: 'Delivery already exists for this order'
    });
  }

  const delivery = await Delivery.create({
    orderId,
    driver,
    customer,
    scheduledDate,
    scheduledTime,
    deliveryInstructions,
    notes
  });

  await delivery.populate('orderId', 'orderNumber total items');

  res.status(201).json({
    success: true,
    delivery
  });
});

// @desc    Update delivery
// @route   PUT /api/admin/deliveries/:id
// @access  Private/Admin
export const updateDelivery = asyncHandler(async (req, res) => {
  const delivery = await Delivery.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  ).populate('orderId', 'orderNumber total items');

  if (!delivery) {
    return res.status(404).json({
      success: false,
      message: 'Delivery not found'
    });
  }

  res.status(200).json({
    success: true,
    delivery
  });
});

// @desc    Update delivery status
// @route   PUT /api/admin/deliveries/:id/status
// @access  Private/Admin
export const updateDeliveryStatus = asyncHandler(async (req, res) => {
  const { status, notes, location } = req.body;
  
  const delivery = await Delivery.findById(req.params.id);

  if (!delivery) {
    return res.status(404).json({
      success: false,
      message: 'Delivery not found'
    });
  }

  // Update delivery status
  delivery.status = status;
  
  // Add tracking update
  delivery.trackingUpdates.push({
    status,
    timestamp: new Date(),
    location: location || '',
    notes: notes || ''
  });

  // Set actual delivery time if delivered
  if (status === 'delivered' && !delivery.actualDeliveryTime) {
    delivery.actualDeliveryTime = new Date();
    
    // Update order status to delivered
    await Order.findByIdAndUpdate(delivery.orderId, { status: 'delivered' });
  }

  await delivery.save();

  res.status(200).json({
    success: true,
    delivery
  });
});

// @desc    Assign driver to delivery
// @route   PUT /api/admin/deliveries/:id/assign-driver
// @access  Private/Admin
export const assignDriver = asyncHandler(async (req, res) => {
  const { driver } = req.body;
  
  const delivery = await Delivery.findById(req.params.id);

  if (!delivery) {
    return res.status(404).json({
      success: false,
      message: 'Delivery not found'
    });
  }

  delivery.driver = driver;
  
  // Update status to scheduled if currently pending
  if (delivery.status === 'pending') {
    delivery.status = 'scheduled';
  }

  await delivery.save();

  res.status(200).json({
    success: true,
    delivery
  });
});

// @desc    Get delivery statistics
// @route   GET /api/admin/deliveries/stats
// @access  Private/Admin
export const getDeliveryStats = asyncHandler(async (req, res) => {
  const totalDeliveries = await Delivery.countDocuments();
  const pendingDeliveries = await Delivery.countDocuments({ status: 'pending' });
  const scheduledDeliveries = await Delivery.countDocuments({ status: 'scheduled' });
  const inTransitDeliveries = await Delivery.countDocuments({ status: 'in_transit' });
  const deliveredDeliveries = await Delivery.countDocuments({ status: 'delivered' });
  const failedDeliveries = await Delivery.countDocuments({ status: 'failed' });

  // Get delivery performance metrics
  const deliveryPerformance = await Delivery.aggregate([
    {
      $match: { status: 'delivered' }
    },
    {
      $group: {
        _id: null,
        averageDeliveryTime: {
          $avg: {
            $subtract: ['$actualDeliveryTime', '$scheduledDate']
          }
        },
        onTimeDeliveries: {
          $sum: {
            $cond: [
              { $lte: ['$actualDeliveryTime', '$scheduledDate'] },
              1,
              0
            ]
          }
        },
        totalDelivered: { $sum: 1 }
      }
    }
  ]);

  const performance = deliveryPerformance[0] || {
    averageDeliveryTime: 0,
    onTimeDeliveries: 0,
    totalDelivered: 0
  };

  const onTimePercentage = performance.totalDelivered > 0 
    ? ((performance.onTimeDeliveries / performance.totalDelivered) * 100).toFixed(1)
    : 0;

  res.status(200).json({
    success: true,
    stats: {
      totalDeliveries,
      pendingDeliveries,
      scheduledDeliveries,
      inTransitDeliveries,
      deliveredDeliveries,
      failedDeliveries,
      onTimePercentage,
      averageDeliveryTime: Math.round(performance.averageDeliveryTime / (1000 * 60 * 60)) // Convert to hours
    }
  });
});

// @desc    Get drivers list
// @route   GET /api/admin/deliveries/drivers
// @access  Private/Admin
export const getDrivers = asyncHandler(async (req, res) => {
  // Get unique drivers from deliveries
  const drivers = await Delivery.aggregate([
    {
      $match: { 'driver.id': { $exists: true, $ne: null } }
    },
    {
      $group: {
        _id: '$driver.id',
        name: { $first: '$driver.name' },
        phone: { $first: '$driver.phone' },
        vehicle: { $first: '$driver.vehicle' },
        totalDeliveries: { $sum: 1 },
        completedDeliveries: {
          $sum: {
            $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0]
          }
        },
        currentDeliveries: {
          $sum: {
            $cond: [{ $in: ['$status', ['scheduled', 'in_transit']] }, 1, 0]
          }
        }
      }
    },
    {
      $project: {
        id: '$_id',
        name: 1,
        phone: 1,
        vehicle: 1,
        totalDeliveries: 1,
        completedDeliveries: 1,
        currentDeliveries: 1,
        successRate: {
          $cond: [
            { $gt: ['$totalDeliveries', 0] },
            { $multiply: [{ $divide: ['$completedDeliveries', '$totalDeliveries'] }, 100] },
            0
          ]
        }
      }
    }
  ]);

  res.status(200).json({
    success: true,
    drivers
  });
});