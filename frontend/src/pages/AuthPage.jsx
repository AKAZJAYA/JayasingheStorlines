import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiUser, FiLock, FiMail, FiEye, FiEyeOff, FiArrowRight, FiCheck } from 'react-icons/fi';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import ServiceHighlights from '../components/ServiceHighlights';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    rememberMe: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login/register logic here
    console.log('Form submitted:', formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left Panel - Decorative */}
              <div className="md:w-1/2 bg-primary relative hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-900 opacity-90" />
                <div className="relative z-10 flex flex-col justify-center items-center h-full p-12 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="mb-8"
                  >
                    <svg className="w-32 h-32 text-white/90" viewBox="0 0 256 256" fill="none">
                      <circle cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="12" />
                      <motion.circle 
                        cx="128" 
                        cy="128" 
                        r="80" 
                        fill="currentColor" 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8, duration: 1, type: "spring" }}
                      />
                    </svg>
                  </motion.div>
                  
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-3xl font-bold mb-6 text-center"
                  >
                    {activeTab === 'login' 
                      ? 'Welcome Back!' 
                      : 'Join Jayasinghe Storelines'}
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-center text-white/80 mb-8"
                  >
                    {activeTab === 'login'
                      ? 'Access your account to track orders, manage your profile, and enjoy a personalized shopping experience.'
                      : 'Create an account to enjoy exclusive member benefits, fast checkout, and special discounts on premium products.'}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="grid grid-cols-1 gap-4 w-full max-w-xs"
                  >
                    {activeTab === 'login' ? (
                      <>
                        <div className="flex items-center space-x-3">
                          <FiCheck className="text-secondary" />
                          <span>Track your order status</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FiCheck className="text-secondary" />
                          <span>Access exclusive offers</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FiCheck className="text-secondary" />
                          <span>Save your wishlist</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center space-x-3">
                          <FiCheck className="text-secondary" />
                          <span>Fast checkout process</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FiCheck className="text-secondary" />
                          <span>Member-only discounts</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FiCheck className="text-secondary" />
                          <span>Premium support access</span>
                        </div>
                      </>
                    )}
                  </motion.div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-60 h-60 bg-white opacity-10 rounded-full translate-x-1/4 translate-y-1/4" />
              </div>
              
              {/* Right Panel - Form */}
              <div className="md:w-1/2 p-8 md:p-12">
                {/* Tabs */}
                <div className="flex space-x-4 mb-8 justify-center md:justify-start">
                  <motion.button
                    whileHover={{ y: -2 }}
                    onClick={() => setActiveTab('login')}
                    className={`px-6 py-2 rounded-full font-medium transition-colors ${
                      activeTab === 'login'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    Sign In
                  </motion.button>
                  <motion.button
                    whileHover={{ y: -2 }}
                    onClick={() => setActiveTab('register')}
                    className={`px-6 py-2 rounded-full font-medium transition-colors ${
                      activeTab === 'register'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    Register
                  </motion.button>
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={variants}
                    transition={{ duration: 0.3 }}
                  >
                    <form onSubmit={handleSubmit}>
                      {activeTab === 'register' && (
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Full Name
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FiUser className="text-gray-400" />
                            </div>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                              placeholder="Enter your full name"
                              required
                            />
                          </div>
                        </div>
                      )}
                      
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiMail className="text-gray-400" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiLock className="text-gray-400" />
                          </div>
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Enter your password"
                            required
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showPassword ? <FiEyeOff className="text-gray-400" /> : <FiEye className="text-gray-400" />}
                          </button>
                        </div>
                      </div>
                      
                      {activeTab === 'register' && (
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Confirm Password
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FiLock className="text-gray-400" />
                            </div>
                            <input
                              type={showPassword ? "text" : "password"}
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                              placeholder="Confirm your password"
                              required
                            />
                          </div>
                        </div>
                      )}
                      
                      {activeTab === 'login' && (
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              name="rememberMe"
                              id="rememberMe"
                              checked={formData.rememberMe}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                              Remember me
                            </label>
                          </div>
                          <a href="#" className="text-sm text-primary hover:text-blue-800">
                            Forgot password?
                          </a>
                        </div>
                      )}
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-primary text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center"
                      >
                        {activeTab === 'login' ? 'Sign In' : 'Create Account'}
                        <FiArrowRight className="ml-2" />
                      </motion.button>
                    </form>
                    
                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-white text-gray-500">Or continue with</span>
                        </div>
                      </div>
                      
                      <div className="mt-6 grid grid-cols-3 gap-3">
                        <motion.button
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          <FaGoogle className="text-red-500" />
                        </motion.button>
                        <motion.button
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          <FaFacebook className="text-blue-600" />
                        </motion.button>
                        <motion.button
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          <FaApple />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
          
          {/* Trust badges */}
          <div className="mt-12">
            <ServiceHighlights />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;