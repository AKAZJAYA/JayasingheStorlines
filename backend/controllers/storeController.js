import Store from '../models/Store.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all stores
// @route   GET /api/stores
// @access  Public
export const getAllStores = asyncHandler(async (req, res) => {
  const stores = await Store.find({ isOpen: true });
  
  res.status(200).json({
    success: true,
    count: stores.length,
    stores
  });
});

// @desc    Get single store
// @route   GET /api/stores/:id
// @access  Public
export const getStore = asyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.id);
  
  if (!store) {
    return res.status(404).json({
      success: false,
      message: 'Store not found'
    });
  }
  
  res.status(200).json({
    success: true,
    store
  });
});

// @desc    Get nearest stores
// @route   GET /api/stores/nearest
// @access  Public
export const getNearestStores = asyncHandler(async (req, res) => {
  const { latitude, longitude, radius = 50 } = req.query;
  
  if (!latitude || !longitude) {
    return res.status(400).json({
      success: false,
      message: 'Please provide latitude and longitude coordinates'
    });
  }
  
  // Find stores with coordinates
  const stores = await Store.find({
    isOpen: true,
    'location.coordinates': { $exists: true }
  });
  
  // Calculate distance for each store
  // This is a simple calculation and not accurate for long distances
  // For production, consider using MongoDB's geospatial queries
  const storesWithDistance = stores.map(store => {
    if (store.location.coordinates && store.location.coordinates.latitude && store.location.coordinates.longitude) {
      const lat1 = parseFloat(latitude);
      const lon1 = parseFloat(longitude);
      const lat2 = store.location.coordinates.latitude;
      const lon2 = store.location.coordinates.longitude;
      
      // Calculate distance using Haversine formula
      const R = 6371; // Radius of the earth in km
      const dLat = deg2rad(lat2 - lat1);
      const dLon = deg2rad(lon2 - lon1);
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      const distance = R * c; // Distance in km
      
      return { ...store.toObject(), distance };
    }
    return { ...store.toObject(), distance: Infinity };
  });
  
  // Filter by radius and sort by distance
  const nearestStores = storesWithDistance
    .filter(store => store.distance <= radius)
    .sort((a, b) => a.distance - b.distance);
  
  res.status(200).json({
    success: true,
    count: nearestStores.length,
    stores: nearestStores
  });
});

// Helper function for calculating distance
function deg2rad(deg) {
  return deg * (Math.PI/180);
}

// @desc    Get store hours
// @route   GET /api/stores/:id/hours
// @access  Public
export const getStoreHours = asyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.id);
  
  if (!store) {
    return res.status(404).json({
      success: false,
      message: 'Store not found'
    });
  }
  
  res.status(200).json({
    success: true,
    storeId: store._id,
    name: store.name,
    hours: store.hours
  });
});

// @desc    Check if store is currently open
// @route   GET /api/stores/:id/isopen
// @access  Public
export const checkStoreOpen = asyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.id);
  
  if (!store) {
    return res.status(404).json({
      success: false,
      message: 'Store not found'
    });
  }
  
  if (!store.isOpen) {
    return res.status(200).json({
      success: true,
      isOpen: false,
      message: 'This store is currently closed'
    });
  }
  
  // Get current day and time
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const now = new Date();
  const currentDay = days[now.getDay()];
  
  // Parse hours for current day
  const hoursToday = store.hours[currentDay];
  
  if (!hoursToday || hoursToday.toLowerCase() === 'closed') {
    return res.status(200).json({
      success: true,
      isOpen: false,
      message: 'This store is closed today'
    });
  }
  
  // Parse hours (format: "9:00 AM - 6:00 PM")
  const [openTime, closeTime] = hoursToday.split(' - ');
  
  // Check if current time is within store hours
  const currentTimeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  
  // Simple string comparison (not perfect but works for basic cases)
  const isCurrentlyOpen = currentTimeStr >= openTime && currentTimeStr <= closeTime;
  
  res.status(200).json({
    success: true,
    isOpen: isCurrentlyOpen,
    hours: hoursToday,
    message: isCurrentlyOpen ? 'This store is currently open' : 'This store is currently closed'
  });
});