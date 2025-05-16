import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendEmail } from '../utils/email.js';

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
  console.log('Register endpoint hit');
  console.log('Request body:', req.body);
  
  const { name, email, password, phone } = req.body;

  // Validation
  if (!name || !email || !password) {
    console.log('Missing required fields');
    return res.status(400).json({
      success: false,
      message: 'Please provide name, email and password'
    });
  }

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: 'User with this email already exists'
    });
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password, // will be hashed by the pre-save hook in the model
    phone,
    joinDate: new Date()
  });

  // Create token
  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      image: user.image,
      role: user.role,
      joinDate: user.joinDate,
      addresses: user.addresses,
      paymentMethods: user.paymentMethods,
      loyaltyPoints: user.loyaltyPoints,
      loyaltyTier: user.loyaltyTier,
      marketingPreferences: user.marketingPreferences
    }
  });
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password'
    });
  }

  // Check if user exists
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  // Create token
  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      image: user.image,
      role: user.role,
      joinDate: user.joinDate,
      addresses: user.addresses,
      paymentMethods: user.paymentMethods,
      loyaltyPoints: user.loyaltyPoints,
      loyaltyTier: user.loyaltyTier,
      marketingPreferences: user.marketingPreferences
    }
  });
});

// @desc    Get current user profile
// @route   GET /api/users/profile
// @access  Private
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.status(200).json({
    success: true,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      birthday: user.birthday,
      image: user.image,
      role: user.role,
      joinDate: user.joinDate,
      addresses: user.addresses,
      paymentMethods: user.paymentMethods,
      wishlist: user.wishlist,
      loyaltyPoints: user.loyaltyPoints,
      loyaltyTier: user.loyaltyTier,
      marketingPreferences: user.marketingPreferences,
      twoFactorEnabled: user.twoFactorEnabled
    }
  });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, phone, birthday, image } = req.body;

  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Update fields if provided
  if (name) user.name = name;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  if (birthday) user.birthday = birthday;
  if (image) user.image = image;

  const updatedUser = await user.save();

  res.status(200).json({
    success: true,
    user: {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      birthday: updatedUser.birthday,
      image: updatedUser.image,
      role: updatedUser.role,
      joinDate: updatedUser.joinDate,
      addresses: updatedUser.addresses,
      paymentMethods: updatedUser.paymentMethods
    }
  });
});

// @desc    Change password
// @route   PUT /api/users/password
// @access  Private
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: 'Please provide current and new password'
    });
  }

  const user = await User.findById(req.user.id).select('+password');

  // Check if current password is correct
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Current password is incorrect'
    });
  }

  // Set new password (will be hashed by pre-save hook)
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password updated successfully'
  });
});

// @desc    Forgot password
// @route   POST /api/users/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Please provide your email'
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'No user with that email'
    });
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  // Hash token and set to resetPasswordToken field
  user.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  // Set token expire time (1 hour)
  user.resetPasswordExpire = Date.now() + 60 * 60 * 1000;
  
  await user.save();

  // Create reset URL
  const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;

  const message = `You requested a password reset. Please go to this link to reset your password: ${resetUrl}. If you didn't request this, please ignore this email.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password Reset Request',
      message
    });

    res.status(200).json({
      success: true,
      message: 'Email sent'
    });
  } catch (error) {
    console.error('Email error:', error);
    
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    
    await user.save();

    return res.status(500).json({
      success: false,
      message: 'Email could not be sent'
    });
  }
});

// @desc    Reset password
// @route   POST /api/users/reset-password/:resetToken
// @access  Public
export const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  if (!password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a new password'
    });
  }

  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }

  // Set new password and remove reset token fields
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  // Create new token for automatic login
  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    token,
    message: 'Password reset successful'
  });
});

// @desc    Get user addresses
// @route   GET /api/users/addresses
// @access  Private
export const getAddresses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.status(200).json({
    success: true,
    addresses: user.addresses
  });
});

// @desc    Add new address
// @route   POST /api/users/addresses
// @access  Private
export const addAddress = asyncHandler(async (req, res) => {
  const { street, city, province, postalCode, phone, isDefault } = req.body;

  // Validation
  if (!street || !city || !province || !postalCode) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required address fields'
    });
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // If this is set as default, unset any existing default
  if (isDefault) {
    user.addresses.forEach(address => {
      address.isDefault = false;
    });
  }

  // Add new address (first address is automatically default)
  user.addresses.push({
    street,
    city,
    province,
    postalCode,
    phone,
    isDefault: isDefault || user.addresses.length === 0
  });

  await user.save();

  res.status(201).json({
    success: true,
    addresses: user.addresses,
    message: 'Address added successfully'
  });
});

// @desc    Update address
// @route   PUT /api/users/addresses/:id
// @access  Private
export const updateAddress = asyncHandler(async (req, res) => {
  const { street, city, province, postalCode, phone, isDefault } = req.body;
  const { id } = req.params;

  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Find the address to update
  const address = user.addresses.id(id);

  if (!address) {
    return res.status(404).json({
      success: false,
      message: 'Address not found'
    });
  }

  // If setting as default, unset any existing default
  if (isDefault && !address.isDefault) {
    user.addresses.forEach(addr => {
      addr.isDefault = false;
    });
  }

  // Update address fields
  if (street) address.street = street;
  if (city) address.city = city;
  if (province) address.province = province;
  if (postalCode) address.postalCode = postalCode;
  if (phone) address.phone = phone;
  if (isDefault !== undefined) address.isDefault = isDefault;

  await user.save();

  res.status(200).json({
    success: true,
    addresses: user.addresses,
    message: 'Address updated successfully'
  });
});

// @desc    Delete address
// @route   DELETE /api/users/addresses/:id
// @access  Private
export const deleteAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Find the address
  const address = user.addresses.id(id);

  if (!address) {
    return res.status(404).json({
      success: false,
      message: 'Address not found'
    });
  }

  // Check if it's the default address
  const wasDefault = address.isDefault;

  // Remove the address
  address.remove();

  // If removed address was default and there are other addresses, make the first one default
  if (wasDefault && user.addresses.length > 0) {
    user.addresses[0].isDefault = true;
  }

  await user.save();

  res.status(200).json({
    success: true,
    addresses: user.addresses,
    message: 'Address deleted successfully'
  });
});

// @desc    Get user payment methods
// @route   GET /api/users/payment-methods
// @access  Private
export const getPaymentMethods = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.status(200).json({
    success: true,
    paymentMethods: user.paymentMethods
  });
});

// @desc    Add payment method
// @route   POST /api/users/payment-methods
// @access  Private
export const addPaymentMethod = asyncHandler(async (req, res) => {
  const { type, last4, expiry, isDefault } = req.body;

  // Validation
  if (!type || !last4 || !expiry) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required payment method fields'
    });
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // If this is set as default, unset any existing default
  if (isDefault) {
    user.paymentMethods.forEach(method => {
      method.isDefault = false;
    });
  }

  // Add new payment method (first payment method is automatically default)
  user.paymentMethods.push({
    type,
    last4,
    expiry,
    isDefault: isDefault || user.paymentMethods.length === 0
  });

  await user.save();

  res.status(201).json({
    success: true,
    paymentMethods: user.paymentMethods,
    message: 'Payment method added successfully'
  });
});

// @desc    Update payment method
// @route   PUT /api/users/payment-methods/:id
// @access  Private
export const updatePaymentMethod = asyncHandler(async (req, res) => {
  const { expiry, isDefault } = req.body;
  const { id } = req.params;

  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Find the payment method to update
  const paymentMethod = user.paymentMethods.id(id);

  if (!paymentMethod) {
    return res.status(404).json({
      success: false,
      message: 'Payment method not found'
    });
  }

  // If setting as default, unset any existing default
  if (isDefault && !paymentMethod.isDefault) {
    user.paymentMethods.forEach(method => {
      method.isDefault = false;
    });
  }

  // Update payment method fields
  if (expiry) paymentMethod.expiry = expiry;
  if (isDefault !== undefined) paymentMethod.isDefault = isDefault;

  await user.save();

  res.status(200).json({
    success: true,
    paymentMethods: user.paymentMethods,
    message: 'Payment method updated successfully'
  });
});

// @desc    Delete payment method
// @route   DELETE /api/users/payment-methods/:id
// @access  Private
export const deletePaymentMethod = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Find the payment method
  const paymentMethod = user.paymentMethods.id(id);

  if (!paymentMethod) {
    return res.status(404).json({
      success: false,
      message: 'Payment method not found'
    });
  }

  // Check if it's the default payment method
  const wasDefault = paymentMethod.isDefault;

  // Remove the payment method
  paymentMethod.remove();

  // If removed payment method was default and there are others, make the first one default
  if (wasDefault && user.paymentMethods.length > 0) {
    user.paymentMethods[0].isDefault = true;
  }

  await user.save();

  res.status(200).json({
    success: true,
    paymentMethods: user.paymentMethods,
    message: 'Payment method deleted successfully'
  });
});

// @desc    Add product to wishlist
// @route   POST /api/users/wishlist
// @access  Private
export const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a product ID'
    });
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Check if product is already in wishlist
  if (user.wishlist.includes(productId)) {
    return res.status(400).json({
      success: false,
      message: 'Product already in wishlist'
    });
  }

  // Add product to wishlist
  user.wishlist.push(productId);
  await user.save();

  res.status(200).json({
    success: true,
    wishlist: user.wishlist,
    message: 'Product added to wishlist'
  });
});

// @desc    Remove product from wishlist
// @route   DELETE /api/users/wishlist/:productId
// @access  Private
export const removeFromWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Remove product from wishlist
  user.wishlist = user.wishlist.filter(
    id => id.toString() !== productId
  );
  
  await user.save();

  res.status(200).json({
    success: true,
    wishlist: user.wishlist,
    message: 'Product removed from wishlist'
  });
});

// @desc    Get user wishlist
// @route   GET /api/users/wishlist
// @access  Private
export const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate('wishlist');

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.status(200).json({
    success: true,
    wishlist: user.wishlist
  });
});

// @desc    Update marketing preferences
// @route   PUT /api/users/marketing-preferences
// @access  Private
export const updateMarketingPreferences = asyncHandler(async (req, res) => {
  const { emailOffers, smsUpdates } = req.body;

  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Update preferences if provided
  if (emailOffers !== undefined) {
    user.marketingPreferences.emailOffers = emailOffers;
  }
  
  if (smsUpdates !== undefined) {
    user.marketingPreferences.smsUpdates = smsUpdates;
  }

  await user.save();

  res.status(200).json({
    success: true,
    marketingPreferences: user.marketingPreferences,
    message: 'Marketing preferences updated successfully'
  });
});

// @desc    Toggle two-factor authentication
// @route   PUT /api/users/two-factor
// @access  Private
export const toggleTwoFactor = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Toggle two-factor authentication
  user.twoFactorEnabled = !user.twoFactorEnabled;
  await user.save();

  res.status(200).json({
    success: true,
    twoFactorEnabled: user.twoFactorEnabled,
    message: `Two-factor authentication ${user.twoFactorEnabled ? 'enabled' : 'disabled'}`
  });
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Successfully logged out'
  });
});

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d'
  });
};