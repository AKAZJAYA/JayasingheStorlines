import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  FiMinus,
  FiPlus,
  FiHeart,
  FiShare2,
  FiTruck,
  FiPackage,
  FiShield,
} from "react-icons/fi";
import ServiceHighlights from "../components/ServiceHighlights";
import FeaturedProducts from "../components/FeaturedProducts";
import Newsletter from "../components/Newsletter";
import {
  fetchProductDetails,
  addProductReview,
} from "../store/slices/productSlice";
import { addToCart } from "../store/slices/cartSlice";
import { addToWishlist } from "../store/slices/wishlistSlice";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { currentProduct, loading, error } = useSelector(
    (state) => state.products
  );

  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    // Fetch product details when the component mounts
    dispatch(fetchProductDetails(productId));
  }, [dispatch, productId]);

  const formatter = new Intl.NumberFormat("en-US");

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: currentProduct._id,
        quantity,
      })
    );
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(currentProduct._id));
  };

  if (loading) {
    return (
      <div className="py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 container mx-auto px-4">
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="py-16 container mx-auto px-4">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-2">
        <div className="container mx-auto px-4">
          <div className="text-sm text-gray-600">
            <span className="hover:text-primary cursor-pointer">Home</span>
            <span className="mx-2">/</span>
            <span className="hover:text-primary cursor-pointer">
              {currentProduct.brand}
            </span>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{currentProduct.name}</span>
          </div>
        </div>
      </div>

      {/* Product Info Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
              <motion.img
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={currentProduct.images[currentImage]}
                alt={currentProduct.name}
                className="w-full h-full object-contain"
              />
              {currentProduct.discount > 0 && (
                <div className="absolute top-4 left-4 bg-accent text-white font-bold text-lg w-16 h-16 flex items-center justify-center rounded-full">
                  {currentProduct.discount}%<br />
                  OFF
                </div>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {currentProduct.images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`cursor-pointer border-2 rounded-md overflow-hidden ${
                    currentImage === index
                      ? "border-primary"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${currentProduct.name} view ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={`https://upload.wikimedia.org/wikipedia/commons/thumb/${
                  currentProduct.brand === "LG"
                    ? "b/bf/LG_logo_%282015%29.svg/2560px-LG_logo_%282015%29.svg.png"
                    : "c/c7/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png"
                }`}
                alt={currentProduct.brand}
                className="h-8"
              />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {currentProduct.name}
            </h1>

            <div className="flex items-baseline space-x-4 mb-4">
              <span className="text-2xl font-bold text-primary">
                Rs. {formatter.format(currentProduct.discountedPrice)}
              </span>
              {currentProduct.discount > 0 && (
                <span className="text-lg text-gray-500 line-through">
                  Rs. {formatter.format(currentProduct.originalPrice)}
                </span>
              )}
            </div>

            <div className="flex flex-col border-t border-b border-gray-200 py-4 space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Model Number</span>
                <span className="font-medium">{currentProduct.model}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">SKU</span>
                <span className="font-medium">{currentProduct.sku}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Warranty</span>
                <span className="font-medium">
                  {currentProduct.specifications.warranty}
                </span>
              </div>
            </div>

            {/* Easy Payment Plans */}
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Easy Payment Plans</h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {currentProduct.paymentOptions.map((option, index) => (
                  <div
                    key={index}
                    className="border rounded-md p-2 text-center"
                  >
                    <img
                      src={option.logo}
                      alt={option.bank}
                      className="h-6 mx-auto mb-1"
                    />
                    <div className="text-xs font-medium">Monthly</div>
                    <div className="text-sm font-bold">
                      Rs. {option.monthly}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-3 text-sm">
                or 3 x Rs. 66,667 with <span className="font-bold">BOLO</span>
              </div>
            </div>

            {/* Add to cart section */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
              <div className="flex border rounded-md">
                <button
                  onClick={decrementQuantity}
                  className="px-4 py-2 border-r"
                >
                  <FiMinus />
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-16 text-center focus:outline-none"
                />
                <button
                  onClick={incrementQuantity}
                  className="px-4 py-2 border-l"
                >
                  <FiPlus />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-grow bg-primary text-white py-3 rounded-md font-medium hover:bg-primary-dark transition-colors"
              >
                ADD TO CART
              </button>

              <button className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition-colors">
                BUY NOW
              </button>
            </div>

            {/* Wishlist and Share */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={handleAddToWishlist}
                className="flex items-center text-gray-600 hover:text-primary"
              >
                <FiHeart className="mr-2" />
                Add To Wishlist
              </button>
              <button className="flex items-center text-gray-600 hover:text-primary">
                <FiShare2 className="mr-2" />
                Share Product
              </button>
            </div>

            {/* Delivery Options */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-3 mb-6">
              <div className="flex items-center">
                <FiTruck className="text-primary mr-3" size={20} />
                <div>
                  <div className="font-medium">Standard Delivery</div>
                  <div className="text-sm text-gray-600">
                    {currentProduct.deliveryOptions.standard} - Available
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <FiPackage className="text-primary mr-3" size={20} />
                <div>
                  <div className="font-medium">Pickup In-Store</div>
                  <div className="text-sm text-gray-600">
                    {currentProduct.deliveryOptions.pickup}
                  </div>
                </div>
              </div>
            </div>

            {/* Special Offers */}
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
              <h3 className="font-semibold flex items-center mb-3">
                <FiShield className="text-primary mr-2" />
                Special Offers
              </h3>
              <ul className="space-y-2 text-sm">
                {currentProduct.offers.map((offer, index) => (
                  <li key={index} className="flex items-center">
                    <div className="h-2 w-2 bg-primary rounded-full mr-2"></div>
                    {offer}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Product description tabs */}
      <div className="bg-white border-t border-b border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex border-b mb-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-6 py-3 font-medium whitespace-nowrap ${
                activeTab === "description"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-600"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("specification")}
              className={`px-6 py-3 font-medium whitespace-nowrap ${
                activeTab === "specification"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-600"
              }`}
            >
              Specification
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-6 py-3 font-medium whitespace-nowrap ${
                activeTab === "reviews"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-600"
              }`}
            >
              Reviews
            </button>
          </div>

          {activeTab === "description" && (
            <div className="prose max-w-none">
              <h2 className="text-xl font-bold mb-4">
                About {currentProduct.name}
              </h2>
              <p className="mb-4">
                Experience stunning 4K resolution and vibrant colors with the{" "}
                {currentProduct.name}. Powered by the advanced{" "}
                {currentProduct.specifications.processor}, this{" "}
                {currentProduct.brand}
                device delivers exceptional picture quality and smart features
                for an immersive viewing experience.
              </p>

              <div className="my-6">
                <img
                  src="https://images.pexels.com/photos/4050318/pexels-photo-4050318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Product feature"
                  className="rounded-lg w-full"
                />
              </div>

              <h3 className="text-lg font-bold mb-3">Key Features</h3>
              <ul className="list-disc pl-5 space-y-2">
                {currentProduct.specifications.features.map(
                  (feature, index) => (
                    <li key={index}>{feature}</li>
                  )
                )}
              </ul>
            </div>
          )}

          {activeTab === "specification" && (
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 gap-4">
                {Object.entries(currentProduct.specifications).map(
                  ([key, value], index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 border-b border-gray-200 py-3"
                    >
                      <div className="font-medium text-gray-700 capitalize">
                        {key}
                      </div>
                      <div className="col-span-2">
                        {Array.isArray(value) ? (
                          <ul className="list-disc pl-5">
                            {value.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          value
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <div className="text-center py-8">
                <h3 className="text-xl font-bold mb-2">Customer Reviews</h3>
                <p className="text-gray-600 mb-6">
                  Be the first to review this product
                </p>
                <button className="bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-primary-dark transition-colors">
                  Write a Review
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product highlights */}
      <div className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Product Highlights</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg flex">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Superior Performance</h3>
                <p className="text-gray-600">
                  {currentProduct.brand === "LG"
                    ? `The α5 AI Processor 4K enhances colors and contrast for lifelike picture quality.`
                    : `The Snapdragon 8 Gen 3 offers unprecedented speed and efficiency for all your tasks.`}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg flex">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Smart Features</h3>
                <p className="text-gray-600">
                  {currentProduct.brand === "LG"
                    ? `WebOS 24 provides access to streaming apps and a seamless user experience.`
                    : `Galaxy AI delivers intelligent features that adapt to your needs and preferences.`}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg flex">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Premium Quality</h3>
                <p className="text-gray-600">
                  Built with high-grade materials and backed by a comprehensive{" "}
                  {currentProduct.specifications.warranty} warranty.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg flex">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Exclusive Benefits</h3>
                <p className="text-gray-600">
                  Enjoy special offers, easy payment plans, and premium service
                  with your purchase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service highlights */}
      <ServiceHighlights />

      {/* Related products */}
      <FeaturedProducts title="You May Also Like" viewAll={false} />

      {/* Newsletter */}
      <Newsletter />
    </>
  );
};

export default ProductDetailsPage;
