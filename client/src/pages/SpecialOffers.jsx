import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiGift, FiTag, FiPercent, FiCalendar, FiInfo, FiAlertCircle, FiChevronRight, FiTruck, FiCreditCard, FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const SpecialOffers = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 36,
    seconds: 52
  });
  
  const [activeTab, setActiveTab] = useState('current');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft.seconds > 0) {
        setTimeLeft({ ...timeLeft, seconds: timeLeft.seconds - 1 });
      } else if (timeLeft.minutes > 0) {
        setTimeLeft({ ...timeLeft, minutes: timeLeft.minutes - 1, seconds: 59 });
      } else if (timeLeft.hours > 0) {
        setTimeLeft({ ...timeLeft, hours: timeLeft.hours - 1, minutes: 59, seconds: 59 });
      } else if (timeLeft.days > 0) {
        setTimeLeft({ ...timeLeft, days: timeLeft.days - 1, hours: 23, minutes: 59, seconds: 59 });
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft]);
  
  const currentOffers = [
    {
      id: 1,
      title: "Summer Electronics Sale",
      discount: "Up to 40% Off",
      image: "https://placehold.co/600x400/4F46E5/FFFFFF/?text=Electronics+Sale",
      endDate: "May 31, 2025",
      description: "Huge discounts on TVs, laptops, smartphones, and more! Summer is here, and so are the hottest deals on your favorite tech.",
      categories: ["Electronics", "Gadgets", "Accessories"],
      couponCode: "SUMMER40"
    },
    {
      id: 2,
      title: "Home Furniture Clearance",
      discount: "30-60% Off",
      image: "https://placehold.co/600x400/EC4899/FFFFFF/?text=Furniture+Sale",
      endDate: "June 15, 2025",
      description: "Refresh your home with our premium furniture collection at unbeatable prices. Limited stock available!",
      categories: ["Furniture", "Home Decor"],
      couponCode: "FURNISH60"
    },
    {
      id: 3,
      title: "Buy 1 Get 1 Free",
      discount: "Select Items",
      image: "https://placehold.co/600x400/10B981/FFFFFF/?text=BOGO+Sale",
      endDate: "May 20, 2025",
      description: "Purchase one item from our selected collection and get another one for free! Perfect opportunity to double your shopping joy.",
      categories: ["Fashion", "Accessories", "Home Goods"],
      couponCode: "BOGO2025"
    },
    {
      id: 4,
      title: "Weekend Flash Sale",
      discount: "Up to 70% Off",
      image: "https://placehold.co/600x400/F59E0B/FFFFFF/?text=Flash+Sale",
      endDate: "Sunday Midnight",
      description: "Weekend exclusive! Massive discounts across all categories for 48 hours only. Don't miss out!",
      categories: ["All Categories"],
      label: "Limited Time",
      couponCode: "FLASH70"
    }
  ];
  
  const upcomingOffers = [
    {
      id: 5,
      title: "Anniversary Sale",
      discount: "Up to 50% Off",
      image: "https://placehold.co/600x400/0EA5E9/FFFFFF/?text=Anniversary+Sale",
      startDate: "June 1, 2025",
      endDate: "June 7, 2025",
      description: "Celebrating our 10th anniversary with incredible deals across all categories! Stay tuned for some of our biggest discounts ever.",
      categories: ["All Categories"],
    },
    {
      id: 6,
      title: "Tech Tuesday",
      discount: "25% Off Electronics",
      image: "https://placehold.co/600x400/6366F1/FFFFFF/?text=Tech+Tuesday",
      startDate: "Every Tuesday",
      description: "Every Tuesday, get exclusive deals on the latest tech products. New offers each week!",
      categories: ["Electronics", "Gadgets"],
    }
  ];
  
  const exclusiveOffers = [
    {
      id: 7,
      title: "Loyalty Member Exclusive",
      discount: "Extra 10% Off",
      image: "https://placehold.co/600x400/8B5CF6/FFFFFF/?text=Members+Only",
      description: "Exclusive deal for our loyalty program members. Sign in to your account to unlock this special discount on any purchase.",
      requirement: "Loyalty Membership",
      couponCode: "LOYAL10"
    },
    {
      id: 8,
      title: "New Customer Welcome",
      discount: "15% Off First Order",
      image: "https://placehold.co/600x400/EC4899/FFFFFF/?text=New+Customers",
      description: "New to Jayasinghe Storelines? Enjoy 15% off your first purchase when you create an account.",
      requirement: "New Account",
      couponCode: "WELCOME15"
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    // You could add a toast notification here
    alert(`Coupon code ${code} copied to clipboard!`);
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-10">
        {/* Hero Banner */}
        <motion.div 
          className="relative mb-12 overflow-hidden rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500"></div>
          <div className="relative z-10 py-16 px-8 text-white">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Special Offers & Promotions</h1>
              <p className="text-xl max-w-3xl mb-8 text-pink-100">
                Discover incredible deals and limited-time offers on our wide range of products. Don't miss out on these amazing savings!
              </p>
              
              <div className="flex flex-wrap gap-4">
                <motion.a 
                  href="#current-offers" 
                  className="py-3 px-6 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiTag className="mr-2" /> Browse Offers
                </motion.a>
                <motion.a 
                  href="#exclusive" 
                  className="py-3 px-6 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors font-medium flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiGift className="mr-2" /> Exclusive Deals
                </motion.a>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="absolute bottom-4 right-8 flex items-center gap-1 text-white text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.8 }}
          >
            <FiInfo size={16} />
            <span>Offers subject to change. T&Cs apply.</span>
          </motion.div>
        </motion.div>
        
        {/* Featured Countdown Deal */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl overflow-hidden shadow-md">
            <div className="md:flex">
              <div className="md:w-2/5">
                <img 
                  src="https://placehold.co/800x600/F9A8D4/FFFFFF/?text=Flash+Sale" 
                  alt="Flash Sale" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-8 md:w-3/5">
                <div className="inline-block px-3 py-1 mb-4 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  <div className="flex items-center">
                    <FiClock className="mr-1" /> Limited Time Offer
                  </div>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Flash Sale Ending Soon!</h2>
                <p className="mb-6 text-lg text-gray-600">
                  Up to 70% off on select items across all categories. Hurry before time runs out!
                </p>
                
                <div className="mb-8">
                  <p className="text-sm text-gray-500 mb-2">Time Remaining:</p>
                  <div className="flex space-x-4">
                    {Object.entries(timeLeft).map(([unit, value]) => (
                      <div key={unit} className="text-center">
                        <div className="bg-white w-16 h-16 rounded-lg shadow-sm flex items-center justify-center mb-1">
                          <motion.span 
                            key={value}
                            className="text-2xl font-bold text-purple-600"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {value < 10 ? `0${value}` : value}
                          </motion.span>
                        </div>
                        <span className="text-xs text-gray-500 uppercase">{unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <motion.button 
                    className="py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiShoppingBag className="mr-2" /> Shop Now
                  </motion.button>
                  <motion.button 
                    className="py-3 px-6 border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => copyToClipboard("FLASH70")}
                  >
                    <FiTag className="mr-2" /> Use Code: FLASH70
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Offer Tabs */}
        <div id="current-offers" className="mb-16">
          <div className="mb-8 flex border-b border-gray-200">
            <motion.button
              className={`py-3 px-5 font-medium text-lg relative ${activeTab === 'current' ? 'text-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('current')}
              whileHover={{ y: -2 }}
            >
              Current Offers
              {activeTab === 'current' && (
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600"
                  layoutId="tabIndicator"
                />
              )}
            </motion.button>
            <motion.button
              className={`py-3 px-5 font-medium text-lg relative ${activeTab === 'upcoming' ? 'text-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('upcoming')}
              whileHover={{ y: -2 }}
            >
              Upcoming Offers
              {activeTab === 'upcoming' && (
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600"
                  layoutId="tabIndicator"
                />
              )}
            </motion.button>
            <motion.button
              className={`py-3 px-5 font-medium text-lg relative ${activeTab === 'exclusive' ? 'text-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('exclusive')}
              whileHover={{ y: -2 }}
            >
              Exclusive Offers
              {activeTab === 'exclusive' && (
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600"
                  layoutId="tabIndicator"
                />
              )}
            </motion.button>
          </div>
          
          <AnimatePresence mode="wait">
            {activeTab === 'current' && (
              <motion.div
                key="current"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {currentOffers.map((offer, index) => (
                    <motion.div 
                      key={offer.id}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={offer.image} 
                          alt={offer.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-purple-600 text-white py-1 px-3 rounded-full font-medium text-sm">
                          {offer.discount}
                        </div>
                        {offer.label && (
                          <div className="absolute top-4 left-4 bg-yellow-500 text-white py-1 px-3 rounded-full font-medium text-sm flex items-center">
                            <FiClock className="mr-1 text-xs" /> {offer.label}
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-gray-800">{offer.title}</h3>
                        <p className="text-gray-600 mb-4">{offer.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {offer.categories.map((category, i) => (
                            <span key={i} className="bg-purple-50 text-purple-600 px-2 py-1 rounded text-xs">
                              {category}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center mb-4 text-sm text-gray-500">
                          <FiCalendar className="mr-1" />
                          <span>Ends: {offer.endDate}</span>
                        </div>
                        
                        {offer.couponCode && (
                          <div className="mb-6">
                            <p className="text-sm text-gray-500 mb-1">Use Code:</p>
                            <div className="flex">
                              <div className="bg-gray-100 border border-gray-200 rounded-l py-2 px-3 font-mono font-medium text-gray-800 flex-grow">
                                {offer.couponCode}
                              </div>
                              <motion.button 
                                className="bg-purple-600 text-white py-2 px-4 rounded-r hover:bg-purple-700 transition-colors text-sm font-medium"
                                onClick={() => copyToClipboard(offer.couponCode)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Copy
                              </motion.button>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-gray-500">
                            *Terms and conditions apply
                          </div>
                          <motion.button 
                            className="text-purple-600 font-medium flex items-center text-sm"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            Shop Now <FiChevronRight className="ml-1" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {activeTab === 'upcoming' && (
              <motion.div
                key="upcoming"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {upcomingOffers.map((offer, index) => (
                    <motion.div 
                      key={offer.id}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={offer.image} 
                          alt={offer.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-blue-600 text-white py-1 px-3 rounded-full font-medium text-sm">
                          {offer.discount}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="inline-block px-3 py-1 mb-4 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          Coming Soon
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-800">{offer.title}</h3>
                        <p className="text-gray-600 mb-4">{offer.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {offer.categories.map((category, i) => (
                            <span key={i} className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs">
                              {category}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center mb-6 text-sm text-gray-500">
                          <FiCalendar className="mr-1" />
                          <span>
                            {offer.startDate} 
                            {offer.endDate && ` - ${offer.endDate}`}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-gray-500">
                            *Terms and conditions apply
                          </div>
                          <motion.button 
                            className="bg-blue-100 text-blue-800 py-2 px-4 rounded-lg text-sm font-medium flex items-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FiBell className="mr-2" /> Remind Me
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  className="bg-blue-50 p-6 rounded-xl mt-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-lg font-medium mb-2 text-blue-800">Stay Updated on New Offers</h3>
                  <p className="mb-4 text-blue-700">
                    Subscribe to our newsletter to be the first to know about upcoming deals and promotions.
                  </p>
                  <motion.button 
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium inline-flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiMail className="mr-2" /> Subscribe Now
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
            
            {activeTab === 'exclusive' && (
              <motion.div
                key="exclusive"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div id="exclusive" className="mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {exclusiveOffers.map((offer, index) => (
                      <motion.div 
                        key={offer.id}
                        className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={offer.image} 
                            alt={offer.title} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 right-4 bg-indigo-600 text-white py-1 px-3 rounded-full font-medium text-sm">
                            {offer.discount}
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="inline-block px-3 py-1 mb-4 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                            Exclusive Offer
                          </div>
                          <h3 className="text-xl font-bold mb-2 text-gray-800">{offer.title}</h3>
                          <p className="text-gray-600 mb-4">{offer.description}</p>
                          
                          <div className="flex items-center mb-4 text-sm text-gray-500">
                            <FiInfo className="mr-1" />
                            <span>Requirement: {offer.requirement}</span>
                          </div>
                          
                          {offer.couponCode && (
                            <div className="mb-6">
                              <p className="text-sm text-gray-500 mb-1">Use Code:</p>
                              <div className="flex">
                                <div className="bg-white border border-indigo-200 rounded-l py-2 px-3 font-mono font-medium text-gray-800 flex-grow">
                                  {offer.couponCode}
                                </div>
                                <motion.button 
                                  className="bg-indigo-600 text-white py-2 px-4 rounded-r hover:bg-indigo-700 transition-colors text-sm font-medium"
                                  onClick={() => copyToClipboard(offer.couponCode)}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  Copy
                                </motion.button>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center">
                            <div className="text-xs text-gray-500">
                              *Terms and conditions apply
                            </div>
                            {offer.requirement === 'New Account' ? (
                              <motion.button 
                                className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Create Account
                              </motion.button>
                            ) : (
                              <motion.button 
                                className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Sign In
                              </motion.button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <motion.div 
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-xl text-white text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-xl font-bold mb-3">Join Our Loyalty Program</h3>
                  <p className="mb-6 max-w-2xl mx-auto">
                    Sign up for our loyalty program to unlock exclusive member-only offers, earn points on every purchase, and enjoy special benefits.
                  </p>
                  <motion.button 
                    className="bg-white text-indigo-600 py-3 px-6 rounded-lg hover:bg-indigo-50 transition-colors font-medium inline-flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiUserCheck className="mr-2" /> Join Now
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Additional Benefits */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-8 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              More Ways to Save
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Free Shipping",
                description: "On orders over Rs. 10,000",
                icon: <FiTruck className="h-6 w-6" />,
                color: "from-blue-500 to-cyan-500",
                textColor: "text-blue-600"
              },
              {
                title: "Buy Now, Pay Later",
                description: "Flexible payment options available",
                icon: <FiCreditCard className="h-6 w-6" />,
                color: "from-purple-500 to-indigo-500",
                textColor: "text-purple-600"
              },
              {
                title: "Bundle Deals",
                description: "Save more when you buy sets",
                icon: <FiPercent className="h-6 w-6" />,
                color: "from-pink-500 to-rose-500",
                textColor: "text-pink-600"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white`}>
                    {item.icon}
                  </div>
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${item.textColor}`}>{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        {/* Terms and Conditions */}
        <motion.section 
          className="bg-gray-50 p-6 rounded-xl text-sm text-gray-600"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-start">
            <FiAlertCircle className="mt-1 mr-2 flex-shrink-0 text-gray-400" />
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Terms and Conditions</h3>
              <p className="mb-2">
                All offers are subject to availability and may be withdrawn at any time without notice. 
                Discounts cannot be used in conjunction with other promotional offers unless explicitly stated. 
                Some restrictions may apply.
              </p>
              <Link to="/terms-conditions" className="text-purple-600 hover:text-purple-800 font-medium">
                View Full Terms and Conditions
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </PageTransition>
  );
};

export default SpecialOffers;