import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FiChevronRight, FiHeart, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { fetchFeaturedProducts } from "../store/slices/productSlice";
import { addToCart } from "../store/slices/cartSlice";
import { addToWishlist } from "../store/slices/wishlistSlice";
import { toast } from "react-toastify";

const ProductCard = ({ product, index }) => {
  const dispatch = useDispatch();
  const formatter = new Intl.NumberFormat("en-US");

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product._id,
        quantity: 1,
      })
    )
      .unwrap()
      .then(() => {
        toast.success(`${product.name} added to cart!`);
      })
      .catch((error) => {
        toast.error(error.message || "Failed to add item to cart");
      });
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product._id))
      .unwrap()
      .then(() => {
        toast.success(`${product.name} added to wishlist!`);
      })
      .catch((error) => {
        toast.error(error.message || "Failed to add to wishlist");
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-md overflow-hidden group relative"
    >
      {/* Discount badge */}
      {product.discountPercentage > 0 && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md z-10">
          {product.discountPercentage}% OFF
        </div>
      )}

      {/* Product badges */}
      <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
        {product.isFeatured && (
          <span className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
            Featured
          </span>
        )}
        {product.isNewArrival && (
          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
            New
          </span>
        )}
        {product.isOnSale && (
          <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
            Sale
          </span>
        )}
      </div>

      <Link to={`/product/${product._id}`} className="block">
        <div className="relative pt-[75%] bg-gray-100 overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={product.imageUrl || product.image || "/placeholder-image.jpg"}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-contain p-4 cursor-pointer"
            onError={(e) => {
              e.target.src = "/placeholder-image.jpg";
            }}
          />
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={i < Math.floor(product.rating) ? "★" : "☆"}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-1">
                ({product.numReviews || 0})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="font-bold text-primary text-lg">
              Rs.{" "}
              {product.discountPrice
                ? formatter.format(product.discountPrice)
                : formatter.format(product.price)}
            </span>
            {product.discountPrice && product.discountPrice < product.price && (
              <span className="text-gray-500 text-sm line-through">
                Rs. {formatter.format(product.price)}
              </span>
            )}
          </div>

          {/* Stock status */}
          <div className="text-sm">
            {product.stock > 0 ? (
              <span className="text-green-600">
                {product.stock < 10 ? `Only ${product.stock} left` : "In Stock"}
              </span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to Cart and Wishlist Buttons */}
      <div className="px-4 pb-4 flex gap-2">
        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`flex-1 py-2 rounded-md font-medium transition-colors cursor-pointer ${
            product.stock === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary-dark"
          }`}
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </motion.button>

        {/* Add to Wishlist Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToWishlist}
          className="p-2 rounded-md border border-gray-300 hover:border-red-500 hover:bg-red-50 text-gray-700 hover:text-red-500 transition-colors cursor-pointer"
          aria-label="Add to Wishlist"
        >
          <FiHeart />
        </motion.button>
      </div>
    </motion.div>
  );
};

const FeaturedProducts = ({
  title = "Featured Products",
  viewAll = false,
  limit,
}) => {
  const dispatch = useDispatch();
  const { featuredProducts, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  // Handle loading state
  if (
    loading &&
    (!featuredProducts.products || featuredProducts.products.length === 0)
  ) {
    return (
      <div className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="py-10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => dispatch(fetchFeaturedProducts())}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Get products to display
  const productsToShow = limit
    ? featuredProducts.products?.slice(0, limit)
    : featuredProducts.products || [];

  // Handle empty state
  if (!productsToShow || productsToShow.length === 0) {
    return (
      <div className="py-10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="text-gray-500">
              No featured products available at the moment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          {viewAll && (
            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center text-primary font-medium hover:text-primary-dark cursor-pointer"
            >
              View All <FiChevronRight className="ml-1" />
            </motion.button>
          )}
        </div>

        {/* Products count */}
        {featuredProducts.count > 0 && (
          <p className="text-gray-600 mb-4">
            Showing {productsToShow.length} of {featuredProducts.count} featured
            products
          </p>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productsToShow.map((product, index) => (
            <ProductCard
              key={product._id || product.id}
              product={product}
              index={index}
            />
          ))}
        </div>

        {/* Show more button if limited */}
        {limit &&
          featuredProducts.products &&
          featuredProducts.products.length > limit && (
            <div className="text-center mt-8">
              <Link
                to="/products?featured=true"
                className="inline-block bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-dark transition-colors cursor-pointer"
              >
                View All Featured Products ({featuredProducts.count})
              </Link>
            </div>
          )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
