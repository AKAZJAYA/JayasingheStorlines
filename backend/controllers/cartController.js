import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate({
    path: 'items.product',
    select: 'name price discountPrice stock imageUrl'
  });
  
  if (!cart) {
    // Create empty cart if none exists
    cart = await Cart.create({ user: req.user._id, items: [] });
  }
  
  res.status(200).json({
    success: true,
    cart
  });
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  
  // Validate product
  const product = await Product.findById(productId);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
  
  // Check if product is in stock
  if (product.stock < quantity) {
    return res.status(400).json({
      success: false,
      message: `Only ${product.stock} items available in stock`
    });
  }
  
  // Find user's cart or create if not exists
  let cart = await Cart.findOne({ user: req.user._id });
  
  if (!cart) {
    cart = await Cart.create({ 
      user: req.user._id, 
      items: [] 
    });
  }
  
  // Check if product already in cart
  const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
  
  // Get actual price (discounted or regular)
  const price = product.discountPrice ? product.discountPrice : product.price;
  
  if (itemIndex > -1) {
    // If product exists, update quantity
    const newQuantity = cart.items[itemIndex].quantity + Number(quantity);
    
    // Check if new quantity exceeds stock
    if (newQuantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: `Cannot add more. Only ${product.stock} items available in stock`
      });
    }
    
    cart.items[itemIndex].quantity = newQuantity;
    cart.items[itemIndex].price = price;
  } else {
    // If product does not exist, add new item
    cart.items.push({
      product: productId,
      quantity: Number(quantity),
      price,
      name: product.name,
      imageUrl: product.imageUrl
    });
  }
  
  // Update subtotal
  cart.subtotal = cart.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  cart.lastUpdated = Date.now();
  
  await cart.save();
  
  res.status(200).json({
    success: true,
    message: 'Item added to cart',
    cart
  });
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Private
export const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  
  if (!quantity || quantity < 1) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid quantity'
    });
  }
  
  // Find user's cart
  const cart = await Cart.findOne({ user: req.user._id });
  
  if (!cart) {
    return res.status(404).json({
      success: false,
      message: 'Cart not found'
    });
  }
  
  // Find item in cart
  const itemIndex = cart.items.findIndex(item => item.product.toString() === req.params.productId);
  
  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Item not found in cart'
    });
  }
  
  // Check if quantity exceeds stock
  const product = await Product.findById(req.params.productId);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
  
  if (quantity > product.stock) {
    return res.status(400).json({
      success: false,
      message: `Only ${product.stock} items available in stock`
    });
  }
  
  // Update quantity
  cart.items[itemIndex].quantity = Number(quantity);
  
  // Update subtotal
  cart.subtotal = cart.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  cart.lastUpdated = Date.now();
  
  await cart.save();
  
  res.status(200).json({
    success: true,
    message: 'Cart updated',
    cart
  });
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
export const removeCartItem = asyncHandler(async (req, res) => {
  // Find user's cart
  const cart = await Cart.findOne({ user: req.user._id });
  
  if (!cart) {
    return res.status(404).json({
      success: false,
      message: 'Cart not found'
    });
  }
  
  // Remove item from cart
  cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
  
  // Update subtotal
  cart.subtotal = cart.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  cart.lastUpdated = Date.now();
  
  await cart.save();
  
  res.status(200).json({
    success: true,
    message: 'Item removed from cart',
    cart
  });
});

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = asyncHandler(async (req, res) => {
  // Find user's cart
  const cart = await Cart.findOne({ user: req.user._id });
  
  if (!cart) {
    return res.status(404).json({
      success: false,
      message: 'Cart not found'
    });
  }
  
  // Clear cart items
  cart.items = [];
  cart.subtotal = 0;
  cart.promoCode = {};
  cart.lastUpdated = Date.now();
  
  await cart.save();
  
  res.status(200).json({
    success: true,
    message: 'Cart cleared',
    cart
  });
});

// @desc    Apply promo code to cart
// @route   POST /api/cart/promo
// @access  Private
export const applyPromoCode = asyncHandler(async (req, res) => {
  const { code } = req.body;
  
  // Find user's cart
  const cart = await Cart.findOne({ user: req.user._id });
  
  if (!cart) {
    return res.status(404).json({
      success: false,
      message: 'Cart not found'
    });
  }
  
  // For this example, we'll hard-code some promo codes
  // In a production app, these would come from a database
  const promoCodes = {
    'WELCOME10': { discount: 0.1, minAmount: 0 },
    'SAVE20': { discount: 0.2, minAmount: 50000 },
    'FREESHIP': { discount: 0.05, minAmount: 10000 }
  };
  
  if (!promoCodes[code]) {
    return res.status(400).json({
      success: false,
      message: 'Invalid promo code'
    });
  }
  
  // Check minimum amount requirement
  if (cart.subtotal < promoCodes[code].minAmount) {
    return res.status(400).json({
      success: false,
      message: `This code requires a minimum purchase of Rs. ${promoCodes[code].minAmount}`
    });
  }
  
  // Apply promo code
  cart.promoCode = {
    code,
    discount: promoCodes[code].discount
  };
  
  await cart.save();
  
  res.status(200).json({
    success: true,
    message: 'Promo code applied',
    cart
  });
});

// @desc    Remove promo code from cart
// @route   DELETE /api/cart/promo
// @access  Private
export const removePromoCode = asyncHandler(async (req, res) => {
  // Find user's cart
  const cart = await Cart.findOne({ user: req.user._id });
  
  if (!cart) {
    return res.status(404).json({
      success: false,
      message: 'Cart not found'
    });
  }
  
  // Remove promo code
  cart.promoCode = {};
  
  await cart.save();
  
  res.status(200).json({
    success: true,
    message: 'Promo code removed',
    cart
  });
});