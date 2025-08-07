import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  FiTrash2,
  FiMinus,
  FiPlus,
  FiArrowRight,
  FiShoppingBag,
  FiShield,
  FiCreditCard,
  FiTruck,
  FiUser,
  FiMapPin,
  FiPhone,
  FiMail,
  FiChevronsDown,
  FiChevronsUp,
  FiHome,
  FiCheckCircle,
  FiDollarSign,
  FiCreditCard as FiCard,
} from "react-icons/fi";
import ServiceHighlights from "../components/ServiceHighlights";
import Newsletter from "../components/Newsletter";
import {
  fetchCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  applyPromoCode,
  removePromoCode,
  setShippingCost,
} from "../store/slices/cartSlice";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    items = [],
    subtotal = 0,
    total = 0,
    promoCode,
    promoDiscount = 0,
    shippingCost = 0,
    loading,
    error,
  } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Local state for UI
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const [billingExpanded, setBillingExpanded] = useState(true);
  const [paymentExpanded, setPaymentExpanded] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [promoCodeInput, setPromoCodeInput] = useState("");

  // Form state
  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
  });

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    phone: "",
  });

  // Formatter for currency
  const formatter = new Intl.NumberFormat("en-US");

  // Fetch cart on component mount
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Check if cart is empty
  useEffect(() => {
    setIsCartEmpty(items.length === 0);
  }, [items]);

  // Handle quantity changes
  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    dispatch(updateCartItem({ productId: id, quantity: newQuantity }))
      .unwrap()
      .catch((error) => {
        console.error("Failed to update quantity", error);
        // Show error notification
      });
  };

  // Remove item from cart
  const handleRemoveFromCart = (id) => {
    dispatch(removeCartItem(id))
      .unwrap()
      .catch((error) => {
        console.error("Failed to remove item", error);
        // Show error notification
      });
  };

  // Apply promo code
  const handleApplyPromoCode = () => {
    if (!promoCodeInput) return;

    dispatch(applyPromoCode(promoCodeInput))
      .unwrap()
      .then(() => {
        // Show success notification
      })
      .catch((error) => {
        console.error("Failed to apply promo code", error);
        // Show error notification
      });
  };

  // Handle shipping method change
  const handleShippingMethodChange = (method) => {
    setShippingMethod(method);

    // Set the shipping cost based on the selected method
    const cost = method === "express" ? 2990 : method === "standard" ? 1590 : 0;
    dispatch(setShippingCost(cost));
  };

  // Handle proceed to checkout
  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      // Redirect to login with a return URL
      navigate("/auth?redirect=checkout");
      return;
    }

    // Proceed to checkout page
    navigate("/checkout");
  };

  // Handle clear cart
  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
    }
  };

  // Empty cart view
  if (isCartEmpty && !loading) {
    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-lg mx-auto"
          >
            <div className="h-40 w-40 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiShoppingBag size={70} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet. Browse our
              featured products and discover amazing deals!
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-dark transition-colors"
            >
              Continue Shopping <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading && items.length === 0) {
    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6 flex items-center">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-900">Shopping Cart</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:w-8/12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Shopping Cart</h2>
                  <span className="text-gray-600 font-medium">
                    {items.length} {items.length === 1 ? "item" : "items"}
                  </span>
                </div>
              </div>

              {/* Cart Item List */}
              <div className="divide-y divide-gray-200">
                {items.map((item, index) => (
                  <motion.div
                    key={item.product}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 flex flex-col sm:flex-row"
                  >
                    <div className="sm:w-1/4 mb-4 sm:mb-0">
                      <div className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-contain p-4"
                        />
                      </div>
                    </div>
                    <div className="sm:w-3/4 sm:pl-6 flex flex-col">
                      <div className="flex justify-between mb-2">
                        <Link
                          to={`/product/${item.product}`}
                          className="text-lg font-medium text-gray-900 hover:text-primary"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => handleRemoveFromCart(item.product)}
                          className="text-gray-500 hover:text-red-600 p-1"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>

                      <div className="mt-auto flex flex-wrap justify-between items-center">
                        <div className="flex items-center border rounded-md overflow-hidden">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                item.product,
                                item.quantity - 1
                              )
                            }
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                            disabled={item.quantity <= 1}
                          >
                            <FiMinus size={16} />
                          </button>
                          <span className="px-4 py-1 bg-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                item.product,
                                item.quantity + 1
                              )
                            }
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                          >
                            <FiPlus size={16} />
                          </button>
                        </div>
                        <div className="font-bold text-lg text-gray-900">
                          Rs. {formatter.format(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Continue Shopping & Clear Cart */}
              <div className="p-6 flex justify-between items-center bg-gray-50">
                <Link
                  to="/"
                  className="flex items-center text-primary font-medium hover:underline"
                >
                  <FiArrowRight className="mr-2 rotate-180" /> Continue Shopping
                </Link>
                <button
                  onClick={handleClearCart}
                  className="text-gray-600 hover:text-red-600 font-medium"
                >
                  Clear Cart
                </button>
              </div>
            </motion.div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:w-4/12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-md overflow-hidden sticky top-6"
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold">Order Summary</h3>
              </div>

              <div className="p-6 space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    Rs. {formatter.format(subtotal)}
                  </span>
                </div>

                {/* Shipping Method */}
                <div>
                  <h4 className="font-medium mb-2">Shipping Method</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="standard-shipping"
                        type="radio"
                        name="shipping"
                        value="standard"
                        checked={shippingMethod === "standard"}
                        onChange={() => handleShippingMethodChange("standard")}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <label
                        htmlFor="standard-shipping"
                        className="ml-2 flex justify-between w-full"
                      >
                        <span className="text-sm text-gray-700">
                          Standard Delivery (3-5 days)
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          Rs. 1,590
                        </span>
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="express-shipping"
                        type="radio"
                        name="shipping"
                        value="express"
                        checked={shippingMethod === "express"}
                        onChange={() => handleShippingMethodChange("express")}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <label
                        htmlFor="express-shipping"
                        className="ml-2 flex justify-between w-full"
                      >
                        <span className="text-sm text-gray-700">
                          Express Delivery (1-2 days)
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          Rs. 2,990
                        </span>
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="pickup"
                        type="radio"
                        name="shipping"
                        value="pickup"
                        checked={shippingMethod === "pickup"}
                        onChange={() => handleShippingMethodChange("pickup")}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <label
                        htmlFor="pickup"
                        className="ml-2 flex justify-between w-full"
                      >
                        <span className="text-sm text-gray-700">
                          Store Pickup (Today)
                        </span>
                        <span className="text-sm font-medium text-green-600">
                          Free
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Promo Code */}
                <div>
                  <h4 className="font-medium mb-2">Promo Code</h4>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      disabled={promoCode}
                      className="flex-grow border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                    <button
                      onClick={
                        promoCode
                          ? () => dispatch(removePromoCode())
                          : handleApplyPromoCode
                      }
                      className={`px-4 py-2 text-white font-medium rounded-r-md ${
                        promoCode
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-primary hover:bg-primary-dark"
                      }`}
                    >
                      {promoCode ? "Remove" : "Apply"}
                    </button>
                  </div>
                  {promoCode && (
                    <p className="text-sm text-green-600 mt-1">
                      {promoDiscount * 100}% discount successfully applied!
                    </p>
                  )}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-4 pt-4">
                  {/* Discount */}
                  {promoDiscount > 0 && (
                    <div className="flex justify-between mb-2 text-green-600">
                      <span>Discount ({promoDiscount * 100}%)</span>
                      <span>- Rs. {formatter.format(promoDiscount * subtotal)}</span>
                    </div>
                  )}

                  {/* Shipping Cost */}
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shippingMethod === "pickup"
                        ? "Free"
                        : `Rs. ${formatter.format(shippingCost)}`}
                    </span>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between text-lg font-bold mt-4">
                    <span>Total</span>
                    <span>Rs. {formatter.format(total)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout and Payment Options */}
              <div className="p-6 bg-gray-50">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-primary text-white py-3 px-4 rounded-md font-medium flex items-center justify-center mb-4 hover:bg-primary-dark transition-colors"
                >
                  Proceed to Checkout <FiArrowRight className="ml-2" />
                </button>

                <div className="flex flex-wrap justify-between items-center mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <FiShield className="mr-1" /> Secure Checkout
                  </div>
                  <div className="flex items-center space-x-1">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/196/196578.png"
                      alt="Mastercard"
                      className="h-6"
                    />
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/196/196566.png"
                      alt="Visa"
                      className="h-6"
                    />
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/196/196559.png"
                      alt="PayPal"
                      className="h-6"
                    />
                  </div>
                </div>

                {/* Additional Cart Highlights */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <FiTruck className="mr-2 text-primary" />
                    <span>Free delivery on orders above Rs. 25,000</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiCreditCard className="mr-2 text-primary" />
                    <span>Easy payment with 0% interest installments</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Service highlights and newsletter */}
      <div className="mt-12">
        <ServiceHighlights />
      </div>
      <Newsletter />
    </div>
  );
};

export default CartPage;
