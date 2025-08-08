import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  FiHeart,
  FiTrash2,
  FiShoppingCart,
  FiShare2,
  FiAlertCircle,
  FiPlus,
  FiMinus,
  FiChevronDown,
  FiChevronUp,
  FiSearch,
} from "react-icons/fi";
import ServiceHighlights from "../components/ServiceHighlights";
import Newsletter from "../components/Newsletter";
import {
  fetchWishlist,
  removeFromWishlist,
  toggleCollection,
} from "../store/slices/wishlistSlice";
import { addToCart } from "../store/slices/cartSlice";
import { toast } from "react-toastify";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { collections, loading, error } = useSelector(
    (state) => state.wishlist
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch wishlist when component mounts
  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  // Toggle collection open/close
  const handleToggleCollection = (collectionId) => {
    dispatch(toggleCollection(collectionId));
  };

  // Remove item from wishlist
  const handleRemoveItem = (productId) => {
    dispatch(removeFromWishlist(productId))
      .unwrap()
      .then(() => {
        toast.success("Item removed from wishlist");
      })
      .catch((error) => {
        toast.error(error.message || "Failed to remove from wishlist");
      });
  };

  // Add item to cart
  const handleAddToCart = (item) => {
    const productData = {
      productId: item.id,
      quantity: 1,
    };

    dispatch(addToCart(productData))
      .unwrap()
      .then(() => {
        toast.success(`${item.name} added to cart!`);
      })
      .catch((error) => {
        toast.error(error.message || "Failed to add item to cart");
      });
  };

  // Filter items based on search
  const filteredCollections = Array.isArray(collections)
    ? collections
        .map((collection) => ({
          ...collection,
          items: collection.items.filter(
            (item) =>
              searchQuery === "" ||
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((collection) => collection.items.length > 0)
    : [];

  // Total wishlist items
  const totalItems = Array.isArray(collections)
    ? collections.reduce(
        (total, collection) => total + collection.items.length,
        0
      )
    : 0;

  // Format currency
  const formatter = new Intl.NumberFormat("en-US");

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6 flex items-center">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-900">My Wishlist</span>
        </div>

        {/* Wishlist Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">My Wishlist</h1>
            <p className="text-gray-600">{totalItems} items saved</p>
          </div>

          {/* Search */}
          <div className="relative max-w-md w-full mt-4 md:mt-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              placeholder="Search your wishlist"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Create Collection Button */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Collections</h2>
              <p className="text-sm text-gray-600 mt-1">
                Organize your wishlist into separate collections
              </p>
            </div>
            <button className="bg-primary text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-primary-dark transition-colors cursor-pointer">
              + Create Collection
            </button>
          </div>
        </div>

        {/* Wishlist Collections */}
        {filteredCollections.length > 0 ? (
          <div className="space-y-6">
            {filteredCollections.map((collection) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Collection Header */}
                <div
                  className="p-6 border-b border-gray-200 flex justify-between items-center cursor-pointer"
                  onClick={() => handleToggleCollection(collection.id)}
                >
                  <div className="flex items-center">
                    <FiHeart
                      className={`mr-3 ${
                        collection.id === "favorites"
                          ? "text-red-500"
                          : "text-primary"
                      }`}
                      size={20}
                    />
                    <div>
                      <h2 className="text-xl font-bold">{collection.name}</h2>
                      <span className="text-sm text-gray-600">
                        {collection.items.length} items
                      </span>
                    </div>
                  </div>
                  <button className="text-gray-500 cursor-pointer">
                    {collection.isOpen ? (
                      <FiChevronUp size={24} />
                    ) : (
                      <FiChevronDown size={24} />
                    )}
                  </button>
                </div>

                {/* Collection Items */}
                <AnimatePresence>
                  {collection.isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {collection.items.map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-lg shadow-md overflow-hidden group relative"
                          >
                            {/* Discount badge */}
                            {item.discount > 0 && (
                              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md z-10">
                                {item.discount}% OFF
                              </div>
                            )}

                            {/* Product badges - add if needed */}
                            <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                              {item.isFeatured && (
                                <span className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                                  Featured
                                </span>
                              )}
                              {item.isNewArrival && (
                                <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                                  New
                                </span>
                              )}
                              {item.isOnSale && (
                                <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                                  Sale
                                </span>
                              )}
                            </div>

                            <Link to={`/product/${item.id}`} className="block">
                              <div className="relative pt-[75%] bg-gray-100 overflow-hidden">
                                <motion.img
                                  whileHover={{ scale: 1.05 }}
                                  src={item.image}
                                  alt={item.name}
                                  className="absolute inset-0 w-full h-full object-contain p-4"
                                />

                                {/* Out of stock overlay */}
                                {!item.stock && (
                                  <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10">
                                    <div className="px-4 py-2 bg-red-100 text-red-800 rounded-md font-medium text-sm flex items-center">
                                      <FiAlertCircle className="mr-2" /> Out of
                                      Stock
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="p-4">
                                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
                                  {item.name}
                                </h3>

                                {/* Price */}
                                <div className="flex items-center space-x-2 mb-3">
                                  <span className="font-bold text-primary text-lg">
                                    Rs. {formatter.format(item.discountedPrice)}
                                  </span>
                                  {item.discount > 0 && (
                                    <span className="text-gray-500 text-sm line-through">
                                      Rs. {formatter.format(item.price)}
                                    </span>
                                  )}
                                </div>

                                {/* Stock status */}
                                <div className="text-sm">
                                  {item.stock ? (
                                    <span className="text-green-600">
                                      {item.stock < 10
                                        ? `Only ${item.stock} left`
                                        : "In Stock"}
                                    </span>
                                  ) : (
                                    <span className="text-red-600">
                                      Out of Stock
                                    </span>
                                  )}
                                </div>
                              </div>
                            </Link>

                            <div className="px-4 pb-4 flex gap-2">
                              {/* Add to Cart Button */}
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleAddToCart(item)}
                                disabled={!item.stock}
                                className={`flex-1 py-2 rounded-md font-medium transition-colors ${
                                  !item.stock
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-primary text-white hover:bg-primary-dark"
                                }`}
                              >
                                {!item.stock ? "Out of Stock" : "Add to Cart"}
                              </motion.button>

                              {/* Remove from Wishlist Button */}
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleRemoveItem(item.id)}
                                className="p-2 rounded-md border border-gray-300 hover:border-red-500 hover:bg-red-50 text-gray-700 hover:text-red-500 transition-colors"
                                aria-label="Remove from Wishlist"
                              >
                                <FiTrash2 />
                              </motion.button>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Collection Actions */}
                      <div className="bg-gray-50 p-6 flex flex-wrap gap-4 justify-end">
                        <button className="px-4 py-2 border border-red-500 text-red-500 rounded-md font-medium hover:bg-red-50 cursor-pointer">
                          Clear Collection
                        </button>
                        <button className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary-dark cursor-pointer">
                          Add All to Cart
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md p-12 text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <FiHeart size={40} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">
              {searchQuery
                ? "No items match your search criteria."
                : "Start saving items you like for future reference."}
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary-dark"
            >
              Continue Shopping
            </Link>
          </motion.div>
        )}

        {/* Product Suggestions */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Suggested product 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Link to="/product/camera" className="block">
                <div className="aspect-square bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
                    alt="Digital Camera"
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1 truncate">
                    Digital Camera X2000
                  </h3>
                  <div className="font-bold text-primary">Rs. 89,990</div>
                </div>
              </Link>
              <div className="px-4 pb-4">
                <button className="w-full bg-primary text-white py-2 rounded-md font-medium cursor-pointer hover:bg-primary-dark transition-colors">
                  Add to Wishlist
                </button>
              </div>
            </motion.div>

            {/* Suggested product 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Link to="/product/headphones" className="block">
                <div className="aspect-square bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1546435770-a3e426bf472b"
                    alt="Wireless Headphones"
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1 truncate">
                    Premium Wireless Headphones
                  </h3>
                  <div className="font-bold text-primary">Rs. 35,990</div>
                </div>
              </Link>
              <div className="px-4 pb-4">
                <button className="w-full bg-primary text-white py-2 rounded-md font-medium cursor-pointer hover:bg-primary-dark transition-colors">
                  Add to Wishlist
                </button>
              </div>
            </motion.div>

            {/* Suggested product 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Link to="/product/watch" className="block">
                <div className="aspect-square bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                    alt="Smart Watch"
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1 truncate">
                    Smart Watch Pro
                  </h3>
                  <div className="font-bold text-primary">Rs. 49,990</div>
                </div>
              </Link>
              <div className="px-4 pb-4">
                <button className="w-full bg-primary text-white py-2 rounded-md font-medium cursor-pointer hover:bg-primary-dark transition-colors">
                  Add to Wishlist
                </button>
              </div>
            </motion.div>

            {/* Suggested product 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Link to="/product/tablet" className="block">
                <div className="aspect-square bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0"
                    alt="Tablet"
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1 truncate">
                    10.2-inch Tablet
                  </h3>
                  <div className="font-bold text-primary">Rs. 79,990</div>
                </div>
              </Link>
              <div className="px-4 pb-4">
                <button className="w-full bg-primary text-white py-2 rounded-md font-medium cursor-pointer hover:bg-primary-dark transition-colors">
                  Add to Wishlist
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <ServiceHighlights />
      </div>
      <Newsletter />
    </div>
  );
};

export default WishlistPage;
