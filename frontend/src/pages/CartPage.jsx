import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiTrash2, FiMinus, FiPlus, FiArrowRight, FiShoppingBag, FiShield, 
  FiCreditCard, FiTruck, FiUser, FiMapPin, FiPhone, FiMail, FiChevronsDown,
  FiChevronsUp, FiHome, FiCheckCircle, FiDollarSign, FiCreditCard as FiCard
} from 'react-icons/fi';
import ServiceHighlights from '../components/ServiceHighlights';
import Newsletter from '../components/Newsletter';

// Mock cart data - in a real app, this would come from a state management solution like Redux or Context
const initialCartItems = [
  {
    id: 'tv',
    name: 'LG 43 Inch UHD 4K Smart TV',
    sku: 'LGTV43UF850P5B',
    price: 199999,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    warranty: '36 Months',
    stock: 5
  },
  {
    id: 'phone',
    name: 'Samsung Galaxy S24 Ultra',
    sku: 'SAMS24U256GB',
    price: 374999,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    warranty: '12 Months',
    stock: 8
  }
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const [billingExpanded, setBillingExpanded] = useState(true);
  const [paymentExpanded, setPaymentExpanded] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [sameAsShipping, setSameAsShipping] = useState(true);
  
  // Billing information
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
  });

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    phone: '',
  });
  
  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = shippingMethod === 'express' ? 2990 : (shippingMethod === 'standard' ? 1590 : 0);
  const discount = promoApplied ? Math.round(subtotal * 0.10) : 0; // 10% discount if promo code applied
  const total = subtotal + shippingCost - discount;
  
  const formatter = new Intl.NumberFormat('en-US');

  // Handle quantity changes
  const updateQuantity = (id, newQuantity) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: Math.max(1, Math.min(newQuantity, item.stock)) } : item
      )
    );
  };
  
  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  // Apply promo code
  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'WELCOME10') {
      setPromoApplied(true);
    }
  };

  // Handle billing form changes
  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo({
      ...billingInfo,
      [name]: value
    });
    
    if (sameAsShipping) {
      setShippingInfo({
        ...shippingInfo,
        [name]: value
      });
    }
  };
  
  // Handle shipping form changes
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value
    });
  };

  // Handle same as billing checkbox
  const handleSameAsShipping = (e) => {
    setSameAsShipping(e.target.checked);
    if (e.target.checked) {
      setShippingInfo({
        firstName: billingInfo.firstName,
        lastName: billingInfo.lastName,
        address: billingInfo.address,
        city: billingInfo.city,
        province: billingInfo.province,
        postalCode: billingInfo.postalCode,
        phone: billingInfo.phone,
      });
    }
  };
  
  // Expand/collapse sections
  const toggleBillingSection = () => {
    setBillingExpanded(!billingExpanded);
    // If opening billing, close payment
    if (!billingExpanded) {
      setPaymentExpanded(false);
    }
  };
  
  const togglePaymentSection = () => {
    setPaymentExpanded(!paymentExpanded);
    // If opening payment, close billing
    if (!paymentExpanded) {
      setBillingExpanded(false);
    }
  };
  
  // Check if cart is empty after items are removed
  useEffect(() => {
    setIsCartEmpty(cartItems.length === 0);
  }, [cartItems]);

  // Empty cart view
  if (isCartEmpty) {
    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-lg mx-auto"
          >
            <div className="h-40 w-40 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiShoppingBag size={70} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet. 
              Browse our featured products and discover amazing deals!
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-dark transition-colors"
            >
              Continue Shopping <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
          
          {/* Featured products suggestion */}
          <div className="mt-20">
            <h3 className="text-xl font-bold mb-6 text-center">You might be interested in</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Suggested products would go here */}
            </div>
          </div>
        </div>
        
        <div className="mt-20">
          <ServiceHighlights />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6 flex items-center">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-900">Shopping Cart</span>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Cart, Billing, Payment */}
          <div className="lg:w-8/12">
            {/* Cart Items Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Shopping Cart</h2>
                  <span className="text-gray-600 font-medium">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</span>
                </div>
              </div>

              {/* Cart Item List */}
              <div className="divide-y divide-gray-200">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 flex flex-col sm:flex-row"
                  >
                    <div className="sm:w-1/4 mb-4 sm:mb-0">
                      <div className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain p-4" />
                      </div>
                    </div>
                    <div className="sm:w-3/4 sm:pl-6 flex flex-col">
                      <div className="flex justify-between mb-2">
                        <Link to={`/product/${item.id}`} className="text-lg font-medium text-gray-900 hover:text-primary">{item.name}</Link>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-red-600 p-1"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <span>SKU: {item.sku}</span>
                        <span className="mx-2">•</span>
                        <span>{item.warranty} Warranty</span>
                      </div>
                      
                      <div className="mt-auto flex flex-wrap justify-between items-center">
                        <div className="flex items-center border rounded-md overflow-hidden">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                          >
                            <FiMinus size={16} />
                          </button>
                          <span className="px-4 py-1 bg-white">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                            disabled={item.quantity >= item.stock}
                          >
                            <FiPlus size={16} />
                          </button>
                        </div>
                        <div className="font-bold text-lg text-gray-900">
                          Rs. {formatter.format(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Continue Shopping & Clear Cart */}
              <div className="p-6 flex justify-between items-center bg-gray-50">
                <Link to="/" className="flex items-center text-primary font-medium hover:underline">
                  <FiArrowRight className="mr-2 rotate-180" /> Continue Shopping
                </Link>
                <button 
                  onClick={() => setCartItems([])} 
                  className="text-gray-600 hover:text-red-600 font-medium"
                >
                  Clear Cart
                </button>
              </div>
            </motion.div>

            {/* Billing Details Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
            >
              <div 
                className="p-6 border-b border-gray-200 flex justify-between items-center cursor-pointer"
                onClick={toggleBillingSection}
              >
                <div className="flex items-center">
                  <div className="bg-primary text-white h-7 w-7 rounded-full flex items-center justify-center font-bold mr-3">
                    1
                  </div>
                  <h3 className="text-xl font-bold">Billing Details</h3>
                </div>
                <button className="text-gray-500">
                  {billingExpanded ? <FiChevronsUp size={24} /> : <FiChevronsDown size={24} />}
                </button>
              </div>

              {billingExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="firstName">
                        First Name*
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiUser className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={billingInfo.firstName}
                          onChange={handleBillingChange}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="lastName">
                        Last Name*
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={billingInfo.lastName}
                        onChange={handleBillingChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                        Email Address*
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiMail className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={billingInfo.email}
                          onChange={handleBillingChange}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phone">
                        Phone Number*
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiPhone className="text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={billingInfo.phone}
                          onChange={handleBillingChange}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="address">
                        Address*
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiHome className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={billingInfo.address}
                          onChange={handleBillingChange}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          placeholder="Enter your street address"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="city">
                        City*
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={billingInfo.city}
                        onChange={handleBillingChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        placeholder="Enter your city"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="province">
                        Province*
                      </label>
                      <select
                        id="province"
                        name="province"
                        value={billingInfo.province}
                        onChange={handleBillingChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        required
                      >
                        <option value="">Select Province</option>
                        <option value="Western">Western</option>
                        <option value="Central">Central</option>
                        <option value="Southern">Southern</option>
                        <option value="Northern">Northern</option>
                        <option value="Eastern">Eastern</option>
                        <option value="North Western">North Western</option>
                        <option value="North Central">North Central</option>
                        <option value="Uva">Uva</option>
                        <option value="Sabaragamuwa">Sabaragamuwa</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="postalCode">
                        Postal Code*
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={billingInfo.postalCode}
                        onChange={handleBillingChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        placeholder="Enter your postal code"
                        required
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-200 mt-6 pt-6">
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id="sameAsShipping"
                        checked={sameAsShipping}
                        onChange={handleSameAsShipping}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="sameAsShipping" className="ml-2 block text-sm text-gray-700">
                        Shipping address is the same as my billing address
                      </label>
                    </div>

                    {!sameAsShipping && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-6"
                      >
                        <h4 className="text-md font-semibold mb-4 border-b pb-2">Shipping Address</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                              First Name*
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              value={shippingInfo.firstName}
                              onChange={handleShippingChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                              Last Name*
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              value={shippingInfo.lastName}
                              onChange={handleShippingChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                              required
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                              Address*
                            </label>
                            <input
                              type="text"
                              name="address"
                              value={shippingInfo.address}
                              onChange={handleShippingChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                              City*
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={shippingInfo.city}
                              onChange={handleShippingChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                              Province*
                            </label>
                            <select
                              name="province"
                              value={shippingInfo.province}
                              onChange={handleShippingChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                              required
                            >
                              <option value="">Select Province</option>
                              <option value="Western">Western</option>
                              <option value="Central">Central</option>
                              <option value="Southern">Southern</option>
                              <option value="Northern">Northern</option>
                              <option value="Eastern">Eastern</option>
                              <option value="North Western">North Western</option>
                              <option value="North Central">North Central</option>
                              <option value="Uva">Uva</option>
                              <option value="Sabaragamuwa">Sabaragamuwa</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                              Postal Code*
                            </label>
                            <input
                              type="text"
                              name="postalCode"
                              value={shippingInfo.postalCode}
                              onChange={handleShippingChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                              Phone Number*
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={shippingInfo.phone}
                              onChange={handleShippingChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                              required
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="flex justify-end mt-6">
                    <button 
                      onClick={togglePaymentSection}
                      className="bg-primary text-white px-6 py-2 rounded-md font-medium flex items-center"
                    >
                      Continue to Payment <FiArrowRight className="ml-2" />
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Payment Methods Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
            >
              <div 
                className="p-6 border-b border-gray-200 flex justify-between items-center cursor-pointer"
                onClick={togglePaymentSection}
              >
                <div className="flex items-center">
                  <div className="bg-primary text-white h-7 w-7 rounded-full flex items-center justify-center font-bold mr-3">
                    2
                  </div>
                  <h3 className="text-xl font-bold">Payment Details</h3>
                </div>
                <button className="text-gray-500">
                  {paymentExpanded ? <FiChevronsUp size={24} /> : <FiChevronsDown size={24} />}
                </button>
              </div>

              {paymentExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  <div className="space-y-4">
                    <div className="border border-gray-300 rounded-md p-4 cursor-pointer hover:border-primary transition-colors" onClick={() => setPaymentMethod('card')}>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="card-payment"
                          name="payment-method"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                        />
                        <label htmlFor="card-payment" className="ml-3 flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <FiCard size={20} className="mr-2 text-primary" />
                            <span className="font-medium">Credit / Debit Card</span>
                          </div>
                          <div className="flex space-x-2">
                            <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Mastercard" className="h-6" />
                            <img src="https://cdn-icons-png.flaticon.com/512/196/196566.png" alt="Visa" className="h-6" />
                            <img src="https://cdn-icons-png.flaticon.com/512/196/196559.png" alt="PayPal" className="h-6" />
                          </div>
                        </label>
                      </div>

                      {paymentMethod === 'card' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 pl-7 space-y-4"
                        >
                          <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                              Card Number*
                            </label>
                            <input
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-gray-700 text-sm font-medium mb-2">
                                Expiry Date*
                              </label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 text-sm font-medium mb-2">
                                CVC/CVV*
                              </label>
                              <input
                                type="text"
                                placeholder="123"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                              Cardholder Name*
                            </label>
                            <input
                              type="text"
                              placeholder="John Doe"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <div className="border border-gray-300 rounded-md p-4 cursor-pointer hover:border-primary transition-colors" onClick={() => setPaymentMethod('bank-transfer')}>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="bank-transfer"
                          name="payment-method"
                          checked={paymentMethod === 'bank-transfer'}
                          onChange={() => setPaymentMethod('bank-transfer')}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                        />
                        <label htmlFor="bank-transfer" className="ml-3 flex items-center w-full">
                          <FiDollarSign size={20} className="mr-2 text-primary" />
                          <span className="font-medium">Bank Transfer</span>
                        </label>
                      </div>

                      {paymentMethod === 'bank-transfer' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 pl-7"
                        >
                          <div className="bg-gray-50 rounded-md p-4">
                            <h4 className="text-sm font-semibold mb-2">Bank Account Details:</h4>
                            <p className="text-sm mb-1"><span className="font-medium">Bank Name:</span> Bank of Ceylon</p>
                            <p className="text-sm mb-1"><span className="font-medium">Account Name:</span> Jayasinghe Storelines (Pvt) Ltd</p>
                            <p className="text-sm mb-1"><span className="font-medium">Account Number:</span> 0123456789</p>
                            <p className="text-sm mb-1"><span className="font-medium">Branch:</span> Colombo Main</p>
                            <p className="text-sm text-gray-600 mt-3">
                              Please include your order number in the payment reference. Your order will be processed once we receive the payment confirmation.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <div className="border border-gray-300 rounded-md p-4 cursor-pointer hover:border-primary transition-colors" onClick={() => setPaymentMethod('cod')}>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="cod"
                          name="payment-method"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                        />
                        <label htmlFor="cod" className="ml-3 flex items-center w-full">
                          <FiCheckCircle size={20} className="mr-2 text-primary" />
                          <span className="font-medium">Cash on Delivery</span>
                        </label>
                      </div>

                      {paymentMethod === 'cod' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 pl-7 text-sm text-gray-600"
                        >
                          <p>Pay with cash upon delivery of your order. Please ensure the exact amount is ready when the delivery arrives.</p>
                          <p className="mt-2 text-primary font-medium">Available for orders under Rs. 100,000</p>
                          {total > 100000 && (
                            <p className="mt-2 text-red-500">Your order exceeds the Cash on Delivery limit. Please choose another payment method.</p>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Terms and Conditions Checkbox */}
                  <div className="mt-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="terms"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                        I agree to the <a href="#" className="text-primary">Terms and Conditions</a>, <a href="#" className="text-primary">Privacy Policy</a> and <a href="#" className="text-primary">Return Policy</a>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Recently viewed or you might also like section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
              <h3 className="text-lg font-bold mb-4">You Might Also Like</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Suggested products would be mapped here */}
                <div className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-gray-100">
                    <img 
                      src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1" 
                      alt="Bluetooth Speaker" 
                      className="w-full h-full object-contain p-2" 
                    />
                  </div>
                  <div className="mt-2">
                    <h4 className="font-medium">Premium Bluetooth Speaker</h4>
                    <div className="text-primary font-semibold">Rs. 15,990</div>
                  </div>
                </div>
                <div className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-gray-100">
                    <img 
                      src="https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46" 
                      alt="Wireless Earbuds" 
                      className="w-full h-full object-contain p-2" 
                    />
                  </div>
                  <div className="mt-2">
                    <h4 className="font-medium">Wireless Earbuds Pro</h4>
                    <div className="text-primary font-semibold">Rs. 22,990</div>
                  </div>
                </div>
                <div className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-gray-100">
                    <img 
                      src="https://images.unsplash.com/photo-1544726576-dca71d274162" 
                      alt="Smart Watch" 
                      className="w-full h-full object-contain p-2" 
                    />
                  </div>
                  <div className="mt-2">
                    <h4 className="font-medium">Smart Watch Series 7</h4>
                    <div className="text-primary font-semibold">Rs. 45,990</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:w-4/12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-md overflow-hidden sticky top-6"
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold">Order Summary</h3>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">Rs. {formatter.format(subtotal)}</span>
                </div>
                
                {/* Shipping Method */}
                <div>
                  <h4 className="font-medium mb-2">Shipping Method</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="standard-shipping"
                        type="radio"
                        name="shipping"
                        value="standard"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <label htmlFor="standard-shipping" className="ml-2 flex justify-between w-full">
                        <span className="text-sm text-gray-700">Standard Delivery (3-5 days)</span>
                        <span className="text-sm font-medium text-gray-900">Rs. 1,590</span>
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="express-shipping"
                        type="radio"
                        name="shipping"
                        value="express"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <label htmlFor="express-shipping" className="ml-2 flex justify-between w-full">
                        <span className="text-sm text-gray-700">Express Delivery (1-2 days)</span>
                        <span className="text-sm font-medium text-gray-900">Rs. 2,990</span>
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="pickup"
                        type="radio"
                        name="shipping"
                        value="pickup"
                        checked={shippingMethod === 'pickup'}
                        onChange={() => setShippingMethod('pickup')}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <label htmlFor="pickup" className="ml-2 flex justify-between w-full">
                        <span className="text-sm text-gray-700">Store Pickup (Today)</span>
                        <span className="text-sm font-medium text-green-600">Free</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Promo Code */}
                <div>
                  <h4 className="font-medium mb-2">Promo Code</h4>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                      className="flex-grow border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                    <button
                      onClick={applyPromoCode}
                      disabled={promoApplied}
                      className={`px-4 py-2 text-white font-medium rounded-r-md ${
                        promoApplied ? 'bg-green-600' : 'bg-primary hover:bg-primary-dark'
                      }`}
                    >
                      {promoApplied ? 'Applied' : 'Apply'}
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-sm text-green-600 mt-1">
                      10% discount successfully applied!
                    </p>
                  )}
                </div>
                
                {/* Divider */}
                <div className="border-t border-gray-200 my-4 pt-4">
                  {/* Discount */}
                  {promoApplied && (
                    <div className="flex justify-between mb-2 text-green-600">
                      <span>Discount (10%)</span>
                      <span>- Rs. {formatter.format(discount)}</span>
                    </div>
                  )}
                  
                  {/* Shipping Cost */}
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shippingMethod === 'pickup' ? 
                        'Free' : 
                        `Rs. ${formatter.format(shippingCost)}`
                      }
                    </span>
                  </div>
                  
                  {/* Total */}
                  <div className="flex justify-between text-lg font-bold mt-4">
                    <span>Total</span>
                    <span>Rs. {formatter.format(total)}</span>
                  </div>
                </div>
              </div>
              
              {/* Checkout and Payment Options */}
              <div className="p-6 bg-gray-50">
                <Link 
                  to="/checkout" 
                  className="w-full bg-primary text-white py-3 px-4 rounded-md font-medium flex items-center justify-center mb-4"
                >
                  Place Order <FiArrowRight className="ml-2" />
                </Link>
                
                <div className="flex flex-wrap justify-between items-center mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <FiShield className="mr-1" /> Secure Checkout
                  </div>
                  <div className="flex items-center space-x-1">
                    <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Mastercard" className="h-6" />
                    <img src="https://cdn-icons-png.flaticon.com/512/196/196566.png" alt="Visa" className="h-6" />
                    <img src="https://cdn-icons-png.flaticon.com/512/196/196559.png" alt="PayPal" className="h-6" />
                  </div>
                </div>
                
                {/* Additional Cart Highlights */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <FiTruck className="mr-2 text-primary" /> 
                    <span>Free delivery on orders above Rs. 25,000</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiCreditCard className="mr-2 text-primary" /> 
                    <span>Easy payment with 0% interest installments</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Service highlights and newsletter */}

        <ServiceHighlights />
        <Newsletter />

    </div>
  );
};

export default CartPage;