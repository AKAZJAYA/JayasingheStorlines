import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiChevronDown, FiPhone, FiMapPin } from 'react-icons/fi';
import logoImg from '../assets/logo.png';
import { useSearch } from '../context/SearchContext';

// Add category data
const categories = [
  { name: 'TVs & Audio', link: '/category/electronics' },
  { name: 'Phones & Gadgets', link: '/category/electronics' },
  { name: 'Furniture', link: '/category/furniture' },
  { name: 'Cooling', link: '/category/cooling' },
  { name: 'Kitchen Appliances', link: '/category/kitchen' },
  { name: 'Cameras', link: '/category/electronics' },
  { name: 'Audio', link: '/category/electronics' },
  { name: 'Wearables', link: '/category/electronics' },
  { name: 'Lighting', link: '/category/furniture' },
  { name: 'Office', link: '/category/furniture' },
  { name: 'Decor', link: '/category/furniture' },
  { name: 'Gifts', link: '/category/appliances' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  
  // Use search context instead of local state
  const { searchQuery, setSearchQuery, performSearch } = useSearch();

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  return (
    <>
      {/* Top navbar */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <Link to="/" className="flex items-center">
                <img 
                  src={logoImg} 
                  alt="Jayasinghe Storelines Logo" 
                  className="h-12 w-auto"
                />
                <div className="ml-2">
                  <h1 className="text-xl font-bold text-primary">
                    Jayasinghe Storelines
                  </h1>
                  <p className="text-xs text-gray-600">PREMIUM ELECTRONICS & FURNITURE</p>
                </div>
              </Link>
            </motion.div>

            {/* Search */}
            <div className="hidden md:flex flex-grow max-w-2xl mx-4">
              <form className="relative w-full" onSubmit={handleSearch}>
                <input 
                  type="text" 
                  placeholder="Search for products, categories and more" 
                  className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 bg-primary text-white rounded-r-md"
                >
                  <FiSearch size={18} />
                </button>
              </form>
            </div>

            {/* Right side items */}
            <div className="flex items-center space-x-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="hidden md:flex items-center cursor-pointer"
              >
                <FiPhone size={16} className="text-primary" />
                <span className="ml-1 text-sm font-medium">+94 112 222 888</span>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="hidden md:flex items-center cursor-pointer"
              >
                <FiUser size={20} />
                <Link to="/auth" className="ml-1 text-sm font-medium">Login</Link>
              </motion.div>
              
              <Link to="/cart" className="flex items-center cursor-pointer">
                <div className="relative">
                  <FiShoppingCart size={20} />
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
                </div>
                <span className="ml-1 text-sm font-medium hidden md:inline">Cart</span>
              </Link>
              
              <div className="md:hidden">
                <button onClick={() => setIsOpen(!isOpen)}>
                  <FiMenu size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Categories navbar */}
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-10">
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <div 
                className="relative flex items-center cursor-pointer h-full"
                onMouseEnter={() => setIsCategoryOpen(true)}
                onMouseLeave={() => setIsCategoryOpen(false)}
              >
                <FiMenu className="mr-2" />
                <span>All Categories</span>
                <FiChevronDown size={14} className={`ml-1 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
                
                {/* Dropdown menu */}
                <AnimatePresence>
                  {isCategoryOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-1 w-64 bg-white shadow-lg rounded-md z-50"
                    >
                      <div className="grid grid-cols-1 gap-1 p-3">
                        {categories.map((category) => (
                          <motion.div
                            key={category.name}
                            whileHover={{ backgroundColor: '#f3f4f6' }}
                          >
                            <Link
                              to={category.link}
                              className="block px-3 py-2 rounded-md text-gray-800 hover:text-primary transition-colors"
                              onClick={() => setIsCategoryOpen(false)}
                            >
                              {category.name}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link to="/category/electronics" className="cursor-pointer hover:underline">Electronics</Link>
              <Link to="/category/furniture" className="cursor-pointer hover:underline">Furniture</Link>
              <Link to="/category/appliances" className="cursor-pointer hover:underline">Appliances</Link>
              <Link to="/category/offers" className="cursor-pointer hover:underline">Special Offers</Link>
              <Link to="/services" className="cursor-pointer hover:underline">Premium Service</Link>
            </div>
            
            <div className="md:hidden flex-grow"></div>
            
            <div className="flex items-center space-x-4 ml-auto text-sm">
              <div className="cursor-pointer flex items-center hover:underline">
                <span>Track your order</span>
              </div>
              <div className="hidden md:flex items-center cursor-pointer hover:underline">
                <FiMapPin size={14} className="mr-1" />
                <span>Find a Store</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white border-b"
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col space-y-3">
              <form onSubmit={handleSearch} className="relative">
                <input 
                  type="text" 
                  placeholder="Search products" 
                  className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 bg-primary text-white rounded-r-md"
                >
                  <FiSearch size={18} />
                </button>
              </form>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {categories.slice(0, 6).map((category) => (
                  <Link 
                    key={category.name}
                    to={category.link}
                    className="p-2 border rounded-md text-center hover:bg-gray-50 hover:border-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              <Link to="/categories" onClick={() => setIsOpen(false)} className="text-primary text-center py-2">View All Categories</Link>
              <div className="flex items-center justify-between border-t pt-2">
                <div className="flex items-center">
                  <FiPhone size={16} className="text-primary" />
                  <span className="ml-1 text-sm">+94 112 222 888</span>
                </div>
                <div className="flex items-center">
                  <FiMapPin size={16} className="text-primary" />
                  <span className="ml-1 text-sm">Find a Store</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;