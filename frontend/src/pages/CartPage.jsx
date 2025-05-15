import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTrash2, FiMinus, FiPlus, FiArrowRight, FiShoppingBag, FiShield, FiCreditCard, FiTruck } from 'react-icons/fi';
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
          {/* Cart Items Section */}
          <div className="lg:w-8/12">
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
                  Proceed to Checkout <FiArrowRight className="ml-2" />
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
      <div className="mt-12">
        <ServiceHighlights />
      </div>
      <div className="mt-6">
        <Newsletter />
      </div>
    </div>
  );
};

export default CartPage;