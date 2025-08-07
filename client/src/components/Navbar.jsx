import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiChevronDown,
  FiPhone,
  FiMapPin,
  FiPackage,
  FiHeart,
  FiLogOut,
} from "react-icons/fi";
import logoImg from "../assets/logo.png";
import { useSearch } from "../context/SearchContext";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

// Categories data for the dropdown
const categories = [
  { name: "Televisions", link: "/category/televisions" },
  { name: "Laptops", link: "/category/laptops" },
  { name: "Smartphones", link: "/category/smartphones" },
  { name: "Audio", link: "/category/audio" },
  { name: "Cameras", link: "/category/cameras" },
  { name: "Kitchen Appliances", link: "/category/kitchen-appliances" },
  { name: "Home Appliances", link: "/category/home-appliances" },
  { name: "Gaming", link: "/category/gaming" },
  { name: "Sofa Sets", link: "/category/sofa-sets" },
  { name: "Dining Tables", link: "/category/dining-tables" },
  { name: "Bedroom Furniture", link: "/category/bedroom-furniture" },
  { name: "Office Furniture", link: "/category/office-furniture" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Use search context instead of local state
  const { searchQuery, setSearchQuery, performSearch } = useSearch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  // Get cart items from Redux store
  const { items } = useSelector((state) => state.cart);

  // Calculate total quantity of items in cart
  const cartItemsCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {/* Top navbar */}
      <div className="bg-white shadow-sm relative z-50">
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
                  <p className="text-xs text-gray-600">
                    PREMIUM ELECTRONICS & FURNITURE
                  </p>
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
                <span className="ml-1 text-sm font-medium">
                  +94 112 222 888
                </span>
              </motion.div>

              {/* User/Account section with dropdown */}
              {isAuthenticated ? (
                <motion.div
                  className="hidden md:flex items-center cursor-pointer relative"
                  onMouseEnter={() => setIsUserMenuOpen(true)}
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary">
                    <img
                      src={user?.image || "https://via.placeholder.com/150"}
                      alt={user?.name || "User"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    {user?.name?.split(" ")[0] || "Account"}
                  </span>
                  <FiChevronDown size={14} className="ml-1" />

                  {/* User dropdown menu */}
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full right-0 mt-1 w-48 bg-white shadow-lg rounded-md z-50"
                      >
                        <div className="py-1">
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <span className="flex items-center">
                              <FiUser className="mr-2" />
                              My Profile
                            </span>
                          </Link>
                          <Link
                            to="/my-orders"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <span className="flex items-center">
                              <FiPackage className="mr-2" />
                              My Orders
                            </span>
                          </Link>
                          <Link
                            to="/wishlist"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <span className="flex items-center">
                              <FiHeart className="mr-2" />
                              Wishlist
                            </span>
                          </Link>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              handleLogout();
                            }}
                          >
                            <span className="flex items-center">
                              <FiLogOut className="mr-2" />
                              Sign Out
                            </span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <Link
                  to="/auth"
                  className="hidden md:flex items-center cursor-pointer"
                >
                  <FiUser size={20} />
                  <span className="ml-1 text-sm font-medium">Sign In</span>
                </Link>
              )}

              {/* Mobile login link */}
              <Link
                to="/auth"
                className="md:hidden flex items-center cursor-pointer"
              >
                <FiUser size={20} />
              </Link>

              <Link to="/cart" className="flex items-center cursor-pointer">
                <div className="relative">
                  <FiShoppingCart size={20} />
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                </div>
                <span className="ml-1 text-sm font-medium hidden md:inline">
                  Cart
                </span>
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
      <div className="bg-primary text-white relative z-40">
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
                <FiChevronDown
                  size={14}
                  className={`ml-1 transition-transform duration-200 ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                />

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
                            whileHover={{ backgroundColor: "#f3f4f6" }}
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
              <Link
                to="/category/electronics"
                className="cursor-pointer hover:underline"
              >
                Electronics
              </Link>
              <Link
                to="/category/furniture"
                className="cursor-pointer hover:underline"
              >
                Furniture
              </Link>
              <Link
                to="/category/appliances"
                className="cursor-pointer hover:underline"
              >
                Appliances
              </Link>
              <Link
                to="/special-offers"
                className="cursor-pointer hover:underline"
              >
                Special Offers
              </Link>
            </div>

            <div className="md:hidden flex-grow"></div>

            <div className="flex items-center space-x-4 ml-auto text-sm">
              <Link
                to="/my-orders"
                className="cursor-pointer flex items-center hover:underline"
              >
                <FiPackage className="mr-1" />
                <span>Track your orders</span>
              </Link>
              <div className="hidden md:flex items-center cursor-pointer hover:underline">
                <FiMapPin size={14} className="mr-1" />
                <Link to="/store-locator">Find the Store</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-white border-b fixed top-[60px] left-0 right-0 z-50 shadow-lg"
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
              <Link
                to="/categories"
                onClick={() => setIsOpen(false)}
                className="text-primary text-center py-2"
              >
                View All Categories
              </Link>
              <Link
                to="/my-orders"
                className="p-2 border rounded-md flex items-center justify-center text-center hover:bg-gray-50 hover:border-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <FiPackage className="mr-2" />
                My Orders
              </Link>
              <Link
                to="/profile"
                className="p-2 border rounded-md flex items-center justify-center text-center hover:bg-gray-50 hover:border-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <FiUser className="mr-2" />
                My Profile
              </Link>
              <Link
                to="/wishlist"
                className="p-2 border rounded-md flex items-center justify-center text-center hover:bg-gray-50 hover:border-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <FiHeart className="mr-2" />
                My Wishlist
              </Link>
              <div className="flex items-center justify-between border-t pt-2">
                <div className="flex items-center">
                  <FiPhone size={16} className="text-primary" />
                  <span className="ml-1 text-sm">+94 112 222 888</span>
                </div>
                <div className="flex items-center">
                  <FiMapPin size={16} className="text-primary" />
                  <Link to="/store-locator" className="ml-1 text-sm">
                    Find a Store
                  </Link>
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
