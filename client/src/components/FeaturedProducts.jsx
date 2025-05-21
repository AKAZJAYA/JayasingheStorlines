import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FiChevronRight, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { fetchFeaturedProducts } from "../store/slices/productSlice";
import { addToCart } from "../store/slices/cartSlice";
import { addToWishlist } from "../store/slices/wishlistSlice";

const ProductCard = ({ product, index }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product._id,
        quantity: 1,
      })
    );
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product._id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      {/* Discount badge */}
      {product.discountPercentage > 0 && (
        <div className="absolute top-2 right-2 bg-accent text-white text-xs font-semibold px-2 py-1 rounded-md">
          {product.discountPercentage}% OFF
        </div>
      )}

      {/* Product tag */}
      {product.tag && (
        <div className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-md">
          {product.tag}
        </div>
      )}

      <Link to={`/product/${product._id}`} className="block">
        <div className="relative pt-[75%] bg-gray-100">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={product.imageUrl}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-contain p-4"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddToWishlist();
            }}
            className="absolute top-2 right-2 p-2 rounded-full bg-white text-gray-500 hover:text-accent"
          >
            <FiHeart />
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1 truncate">
            {product.name}
          </h3>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-primary">
              Rs.{" "}
              {product.discountPrice
                ? formatter.format(product.discountPrice)
                : formatter.format(product.price)}
            </span>
            {product.discountPrice && (
              <span className="text-gray-500 text-sm line-through">
                Rs. {formatter.format(product.price)}
              </span>
            )}
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={handleAddToCart}
          className="w-full mt-3 bg-primary text-white py-2 rounded-md font-medium"
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

const FeaturedProducts = ({ title = "Featured Products", viewAll = false }) => {
  const dispatch = useDispatch();
  const { featuredProducts, loading } = useSelector((state) => state.products);
  const formatter = new Intl.NumberFormat("en-US");

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  if (loading && featuredProducts.length === 0) {
    return (
      <div className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          {viewAll && (
            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center text-primary font-medium"
            >
              View All <FiChevronRight className="ml-1" />
            </motion.button>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredProducts.products &&
            featuredProducts.products.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
