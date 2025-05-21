import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiFilter,
  FiGrid,
  FiList,
  FiChevronDown,
  FiShoppingCart,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory } from "../store/slices/productSlice";
import { addToCart } from "../store/slices/cartSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import ServiceHighlights from "../components/ServiceHighlights";

const CategoryPage = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const [view, setView] = useState("grid");
  const [sortOption, setSortOption] = useState("featured");

  // Get products and loading state from Redux store
  const { productsByCategory, loading, error } = useSelector(
    (state) => state.products
  );

  // Get current category data from Redux store
  const currentCategoryProducts = productsByCategory[category] || [];

  // Get category banner data (you could fetch this from API too in the future)
  const categoryBanners = {
    electronics: {
      title: "Electronics",
      description:
        "Explore our wide range of electronic products from premium brands",
      bannerImage:
        "https://images.pexels.com/photos/4112236/pexels-photo-4112236.jpeg",
    },
    furniture: {
      title: "Furniture",
      description: "Premium quality furniture for your home and office",
      bannerImage:
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
    },
    appliances: {
      title: "Appliances",
      description: "Top-of-the-line home appliances for modern living",
      bannerImage:
        "https://images.pexels.com/photos/4050318/pexels-photo-4050318.jpeg",
    },
    cooling: {
      title: "Cooling Solutions",
      description:
        "Stay cool with our range of air conditioners and cooling systems",
      bannerImage:
        "https://images.pexels.com/photos/3735210/pexels-photo-3735210.jpeg",
    },
    kitchen: {
      title: "Kitchen Appliances",
      description: "Modern kitchen appliances for the contemporary chef",
      bannerImage:
        "https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg",
    },
  };

  const currentCategoryInfo = categoryBanners[category] || {
    title: category,
    description: "Browse our selection of high-quality products",
    bannerImage:
      "https://images.pexels.com/photos/3735210/pexels-photo-3735210.jpeg",
  };

  useEffect(() => {
    // Fetch products when category changes
    dispatch(fetchProductsByCategory(category));

    // Scroll to top when category changes
    window.scrollTo(0, 0);
  }, [dispatch, category]);

  // Handle add to cart
  const handleAddToCart = (productId) => {
    dispatch(
      addToCart({
        productId,
        quantity: 1,
      })
    );
  };

  // Sort products based on selected option
  const sortProducts = (products) => {
    if (!products) return [];

    const sortedProducts = [...products];

    switch (sortOption) {
      case "price-low":
        return sortedProducts.sort((a, b) => a.price - b.price);
      case "price-high":
        return sortedProducts.sort((a, b) => b.price - a.price);
      case "newest":
        return sortedProducts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      default:
        return sortedProducts; // featured or default sort
    }
  };

  const sortedProducts = sortProducts(currentCategoryProducts);

  if (loading && !currentCategoryProducts.length) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-600 mb-2">
            Error Loading Products
          </h2>
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!currentCategoryProducts.length && !loading) {
    return (
      <>
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl text-gray-600 mb-4">No products found</h2>
            <Link to="/" className="bg-primary text-white px-6 py-2 rounded-md">
              Return to Home
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Category Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${currentCategoryInfo.bannerImage})`,
            filter: "brightness(70%)",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {currentCategoryInfo.title}
            </h1>
            <p className="md:text-lg max-w-xl">
              {currentCategoryInfo.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <button className="flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-md">
            <FiFilter size={18} />
            <span>Filter</span>
          </button>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setView("grid")}
                className={`p-2 rounded-md ${
                  view === "grid" ? "bg-primary text-white" : "bg-gray-100"
                }`}
              >
                <FiGrid />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 rounded-md ${
                  view === "list" ? "bg-primary text-white" : "bg-gray-100"
                }`}
              >
                <FiList />
              </button>
            </div>

            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none bg-white border border-gray-300 px-4 py-2 pr-8 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {view === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {sortedProducts.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Link to={`/product/${product._id}`} className="block">
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1">
                      {product.name}
                    </h3>
                    <p className="font-bold text-primary">
                      Rs. {(product.price || 0).toLocaleString()}
                    </p>
                  </div>
                </Link>
                <div className="px-4 pb-4">
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="w-full bg-primary text-white py-2 rounded-md font-medium hover:bg-primary-dark transition-colors flex items-center justify-center"
                  >
                    <FiShoppingCart className="mr-2" /> Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedProducts.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-lg shadow-md overflow-hidden flex"
              >
                <div className="w-1/3 bg-gray-100">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                <div className="w-2/3 p-4 flex flex-col justify-between">
                  <div>
                    <Link
                      to={`/product/${product._id}`}
                      className="hover:text-primary"
                    >
                      <h3 className="font-medium text-gray-900 text-lg mb-2">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 mb-4">
                      {product.shortDescription ||
                        "Premium quality product with 1-year warranty"}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-primary text-xl">
                      Rs. {(product.price || 0).toLocaleString()}
                    </p>
                    <button
                      onClick={() => handleAddToCart(product._id)}
                      className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary-dark transition-colors flex items-center"
                    >
                      <FiShoppingCart className="mr-2" /> Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add these components at the bottom */}
      <div className="mt-12">
        <ServiceHighlights />
      </div>
      <Newsletter />
    </>
  );
};

export default CategoryPage;
