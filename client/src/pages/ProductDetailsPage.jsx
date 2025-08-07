import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingCart,
  FiHeart,
  FiShare2,
  FiChevronRight,
  FiChevronLeft,
  FiStar,
  FiCheck,
  FiTruck,
  FiShield,
  FiCreditCard,
  FiArrowRight,
} from "react-icons/fi";
import {
  fetchProductDetails,
  //   fetchSimilarProducts,
  addProductReview,
  reportImageLoadFailure,
} from "../store/slices/productSlice";
import { addToCart } from "../store/slices/cartSlice";
import { addToWishlist } from "../store/slices/wishlistSlice";
import Newsletter from "../components/Newsletter";
import ServiceHighlights from "../components/ServiceHighlights";
import FeaturedProducts from "../components/FeaturedProducts";
import NewArrivals from "../components/NewArrivals";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    currentProduct: product,
    loading,
    error,
  } = useSelector((state) => state.products);
  const [activeImage, setActiveImage] = useState(-1);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewName, setReviewName] = useState("");
  const [reviewEmail, setReviewEmail] = useState("");
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const [wishlistSuccess, setWishlistSuccess] = useState(false);

  useEffect(() => {
    // Fetch product details when component mounts or id changes
    if (id) {
      dispatch(fetchProductDetails(id));
    }

    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Clear product details when component unmounts
    return () => {
      // Optional: dispatch an action to clear current product
    };
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          productId: product._id,
          quantity: quantity,
        })
      );
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      setIsAddingToWishlist(true);
      dispatch(addToWishlist(product._id))
        .unwrap()
        .then(() => {
          setWishlistSuccess(true);
          // Reset success state after 2 seconds
          setTimeout(() => setWishlistSuccess(false), 2000);
        })
        .catch((error) => {
          // Handle error - could show a toast notification here
          console.error("Failed to add to wishlist:", error);
        })
        .finally(() => {
          setIsAddingToWishlist(false);
        });
    }
  };

  const handleImageError = (imageUrl) => {
    if (product) {
      dispatch(reportImageLoadFailure({ productId: product._id, imageUrl }));
    }
  };

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(
      1,
      Math.min(product.stock || 10, quantity + value)
    );
    setQuantity(newQuantity);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (product) {
      dispatch(
        addProductReview({
          productId: product._id,
          reviewData: {
            rating: reviewRating,
            comment: reviewComment,
            name: reviewName,
            email: reviewEmail,
          },
        })
      );
      // Reset form
      setReviewRating(5);
      setReviewComment("");
      setReviewName("");
      setReviewEmail("");
    }
  };

  const formatter = new Intl.NumberFormat("en-US");

  // Handle loading state
  if (loading) {
    return (
      <>
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </>
    );
  }

  // Handle error state
  if (error) {
    return (
      <>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Error</h2>
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => dispatch(fetchProductDetails(id))}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  // Handle product not found
  if (!product) {
    return (
      <>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <p className="text-gray-500 mb-4">
              The product you are looking for does not exist or has been
              removed.
            </p>
            <Link
              to="/products"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </>
    );
  }

  const discountPercentage =
    product.discountPrice && product.price
      ? Math.round(
          ((product.price - product.discountPrice) / product.price) * 100
        )
      : 0;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="text-sm text-gray-600 flex items-center">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <FiChevronRight className="mx-2" />
            <Link to="/products" className="hover:text-primary">
              Products
            </Link>
            <FiChevronRight className="mx-2" />
            <Link
              to={`/category/${product.category}`}
              className="hover:text-primary"
            >
              {product.category}
            </Link>
            <FiChevronRight className="mx-2" />
            <span className="font-medium text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Product Images */}
            <div className="lg:w-1/2">
              <motion.div
                className="relative rounded-lg overflow-hidden bg-gray-100 mb-4 aspect-square"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Main Product Image */}
                <img
                  src={
                    activeImage === -1
                      ? product.imageUrl
                      : product.additionalImages &&
                        activeImage < product.additionalImages.length
                      ? product.additionalImages[activeImage]
                      : product.imageUrl
                  }
                  alt={product.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/600x600/e2e8f0/a0aec0?text=Image+Not+Available";
                    handleImageError(e.target.src);
                  }}
                />

                {/* Discount Badge */}
                {discountPercentage > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-md z-10">
                    {discountPercentage}% OFF
                  </div>
                )}

                {/* Image Navigation Arrows */}
                {product.additionalImages &&
                  product.additionalImages.length > 0 && (
                    <>
                      <button
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full text-gray-800 focus:outline-none transition-all duration-300"
                        onClick={() =>
                          setActiveImage((prev) =>
                            prev === -1
                              ? product.additionalImages.length - 1
                              : prev === 0
                              ? -1
                              : prev - 1
                          )
                        }
                      >
                        <FiChevronLeft size={20} />
                      </button>
                      <button
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full text-gray-800 focus:outline-none transition-all duration-300"
                        onClick={() =>
                          setActiveImage((prev) =>
                            prev === product.additionalImages.length - 1
                              ? -1
                              : prev === -1
                              ? 0
                              : prev + 1
                          )
                        }
                      >
                        <FiChevronRight size={20} />
                      </button>
                    </>
                  )}
              </motion.div>

              {/* Thumbnail Images */}
              {product.additionalImages &&
                product.additionalImages.length > 0 && (
                  <motion.div
                    className="grid grid-cols-5 gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div
                      className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                        activeImage === -1
                          ? "border-primary"
                          : "border-transparent"
                      }`}
                      onClick={() => setActiveImage(-1)}
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover aspect-square"
                        onError={(e) => {
                          e.target.src =
                            "https://placehold.co/100x100/e2e8f0/a0aec0?text=Thumbnail";
                          handleImageError(e.target.src);
                        }}
                      />
                    </div>
                    {product.additionalImages.map((image, index) => (
                      <div
                        key={index}
                        className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                          activeImage === index
                            ? "border-primary"
                            : "border-transparent"
                        }`}
                        onClick={() => setActiveImage(index)}
                      >
                        <img
                          src={image}
                          alt={`${product.name} - Image ${index + 1}`}
                          className="w-full h-full object-cover aspect-square"
                          onError={(e) => {
                            e.target.src =
                              "https://placehold.co/100x100/e2e8f0/a0aec0?text=Thumbnail";
                            handleImageError(e.target.src);
                          }}
                        />
                      </div>
                    ))}
                  </motion.div>
                )}
            </div>

            {/* Right Column - Product Info */}
            <div className="lg:w-1/2">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Product Badges */}
                <div className="flex flex-wrap gap-2">
                  {product.isNewArrival && (
                    <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                      New Arrival
                    </span>
                  )}
                  {product.isFeatured && (
                    <span className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                      Featured
                    </span>
                  )}
                  {product.isOnSale && (
                    <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                      On Sale
                    </span>
                  )}
                  {product.stock <= 5 && product.stock > 0 && (
                    <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                      Only {product.stock} left
                    </span>
                  )}
                </div>

                {/* Product Title */}
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>

                {/* Product Rating */}
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FiStar
                        key={star}
                        className={`${
                          star <= (product.ratings?.average || 0)
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">
                    {product.ratings?.average.toFixed(1) || "No ratings"} (
                    {product.ratings?.count || 0} reviews)
                  </span>
                </div>

                {/* Product Price */}
                <div className="flex items-center space-x-4">
                  {product.discountPrice ? (
                    <>
                      <span className="text-3xl font-bold text-primary">
                        Rs. {formatter.format(product.discountPrice)}
                      </span>
                      <span className="text-xl text-gray-500 line-through">
                        Rs. {formatter.format(product.price)}
                      </span>
                      <span className="text-green-600 font-medium">
                        Save Rs.{" "}
                        {formatter.format(
                          product.price - product.discountPrice
                        )}
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-primary">
                      Rs. {formatter.format(product.price)}
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <div className="text-gray-700">
                  <p>
                    {product.shortDescription ||
                      product.description?.substring(0, 200)}
                  </p>
                </div>

                {/* Availability */}
                <div className="flex items-center">
                  <span className="font-medium mr-2">Availability:</span>
                  {product.stock > 0 ? (
                    <span className="text-green-600 flex items-center">
                      <FiCheck className="mr-1" /> In Stock ({product.stock}{" "}
                      units)
                    </span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </div>

                {/* SKU */}
                <div className="flex items-center">
                  <span className="font-medium mr-2">SKU:</span>
                  <span className="text-gray-600">{product.sku || "N/A"}</span>
                </div>

                {/* Category */}
                <div className="flex items-center">
                  <span className="font-medium mr-2">Category:</span>
                  <Link
                    to={`/category/${product.category}`}
                    className="text-primary hover:underline"
                  >
                    {product.category}
                  </Link>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center">
                  <span className="font-medium mr-2">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className={`px-3 py-1 ${
                        quantity <= 1
                          ? "text-gray-400"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 border-l border-r border-gray-300">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= (product.stock || 10)}
                      className={`px-3 py-1 ${
                        quantity >= (product.stock || 10)
                          ? "text-gray-400"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                    className={`flex-1 py-3 px-6 rounded-md font-medium flex items-center justify-center ${
                      product.stock <= 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-primary text-white hover:bg-primary-dark"
                    }`}
                  >
                    <FiShoppingCart className="mr-2" /> Add to Cart
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToWishlist}
                    disabled={isAddingToWishlist}
                    className={`p-3 rounded-md border ${
                      wishlistSuccess
                        ? "border-primary bg-primary-light text-primary"
                        : "border-gray-300 hover:border-primary hover:bg-primary-light text-gray-700 hover:text-primary"
                    } transition-colors`}
                    aria-label="Add to Wishlist"
                  >
                    {isAddingToWishlist ? (
                      <span className="inline-block w-4 h-4 border-2 border-gray-500 border-t-primary rounded-full animate-spin"></span>
                    ) : (
                      <FiHeart
                        className={wishlistSuccess ? "fill-primary" : ""}
                      />
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-md border border-gray-300 hover:border-primary hover:bg-primary-light text-gray-700 hover:text-primary"
                    aria-label="Share Product"
                  >
                    <FiShare2 />
                  </motion.button>
                </div>

                {/* Delivery Options */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-bold text-lg mb-4">Delivery & Returns</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-gray-700">
                      <FiTruck className="mr-3 text-primary" size={18} />
                      <span>Free shipping on orders above Rs. 25,000</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FiCreditCard className="mr-3 text-primary" size={18} />
                      <span>Cash on delivery available</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FiShield className="mr-3 text-primary" size={18} />
                      <span>30-day easy returns</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`px-6 py-4 font-medium whitespace-nowrap ${
                    activeTab === "description"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("specifications")}
                  className={`px-6 py-4 font-medium whitespace-nowrap ${
                    activeTab === "specifications"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`px-6 py-4 font-medium whitespace-nowrap ${
                    activeTab === "reviews"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  Reviews ({product.reviews?.length || 0})
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "description" && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="py-6"
                >
                  <div className="prose max-w-none text-gray-700">
                    {product.description ? (
                      <p>{product.description}</p>
                    ) : (
                      <p>No description available for this product.</p>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === "specifications" && (
                <motion.div
                  key="specifications"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="py-6"
                >
                  <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50"></thead>
                      <tbody className="divide-y divide-gray-200">
                        {product.specifications &&
                        Object.keys(product.specifications).length > 0 ? (
                          Object.entries(product.specifications).map(
                            ([key, value]) => (
                              <tr key={key}>
                                <td className="px-6 py-4 whitespace-nowrap bg-gray-50 text-sm font-medium text-gray-900">
                                  {key}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                  {value}
                                </td>
                              </tr>
                            )
                          )
                        ) : (
                          <tr>
                            <td
                              className="px-6 py-4 text-sm text-gray-500 text-center"
                              colSpan={2}
                            >
                              No specifications available for this product.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === "reviews" && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="py-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Review List */}
                    <div>
                      <h3 className="font-bold text-lg mb-4">
                        Customer Reviews
                      </h3>
                      {product.reviews && product.reviews.length > 0 ? (
                        <div className="space-y-6">
                          {product.reviews.map((review, index) => (
                            <div
                              key={index}
                              className="border-b border-gray-200 pb-6"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <FiStar
                                      key={star}
                                      className={`${
                                        star <= review.rating
                                          ? "text-yellow-500 fill-yellow-500"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                  <span className="ml-2 font-medium">
                                    {review.name}
                                  </span>
                                </div>
                                <span className="text-sm text-gray-500">
                                  {new Date(
                                    review.createdAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-gray-700">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-50 p-6 rounded-lg text-center">
                          <p className="text-gray-600">
                            This product has no reviews yet. Be the first to
                            review!
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Write a Review Form */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-bold text-lg mb-4">Write a Review</h3>
                      <form onSubmit={handleSubmitReview} className="space-y-4">
                        <div>
                          <label className="block text-gray-700 mb-1">
                            Your Rating
                          </label>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setReviewRating(star)}
                                className="focus:outline-none"
                              >
                                <FiStar
                                  size={24}
                                  className={`${
                                    star <= reviewRating
                                      ? "text-yellow-500 fill-yellow-500"
                                      : "text-gray-300"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-1">
                            Your Name
                          </label>
                          <input
                            type="text"
                            value={reviewName}
                            onChange={(e) => setReviewName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-1">
                            Your Email
                          </label>
                          <input
                            type="email"
                            value={reviewEmail}
                            onChange={(e) => setReviewEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-1">
                            Your Review
                          </label>
                          <textarea
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            rows={4}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-3 bg-primary text-white rounded-md font-medium hover:bg-primary-dark transition-colors"
                        >
                          Submit Review
                        </button>
                      </form>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Services and Newsletter */}
      <ServiceHighlights />
      <Newsletter />
    </>
  );
};

export default ProductDetailsPage;
