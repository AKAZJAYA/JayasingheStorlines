import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiShoppingBag,
  FiCheck,
  FiCreditCard,
  FiTruck,
  FiShield,
  FiArrowLeft,
  FiLock,
  FiClock,
  FiMapPin,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { fetchCart, clearCart } from "../store/slices/cartSlice";
import { createOrder } from "../store/slices/orderSlice";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    items = [],
    subtotal = 0,
    total = 0,
    promoCode,
    promoDiscount = 0,
    shippingCost = 0,
    loading,
  } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // States
  const [activeStep, setActiveStep] = useState("shipping");
  const [shippingInfo, setShippingInfo] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    phone: "",
  });
  const [billingInfo, setBillingInfo] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
  });
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNotes, setOrderNotes] = useState("");

  // Formatter for currency
  const formatter = new Intl.NumberFormat("en-US");

  // Fetch cart on component mount
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth?redirect=checkout");
    }
  }, [isAuthenticated, navigate]);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !loading) {
      navigate("/cart");
      toast.info("Your cart is empty.");
    }
  }, [items, loading, navigate]);

  // Update billing info if same as shipping is checked
  useEffect(() => {
    if (sameAsShipping) {
      setBillingInfo({
        ...billingInfo,
        firstName: shippingInfo.firstName,
        lastName: shippingInfo.lastName,
        address: shippingInfo.address,
        city: shippingInfo.city,
        province: shippingInfo.province,
        postalCode: shippingInfo.postalCode,
        phone: shippingInfo.phone,
      });
    }
  }, [sameAsShipping, shippingInfo]);

  // Handle shipping form input changes
  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };

  // Handle billing form input changes
  const handleBillingInfoChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo({
      ...billingInfo,
      [name]: value,
    });
  };

  // Handle card info changes
  const handleCardInfoChange = (e) => {
    const { name, value } = e.target;
    setCardInfo({
      ...cardInfo,
      [name]: value,
    });
  };

  // Handle step changes
  const handleContinueToPayment = (e) => {
    e.preventDefault();
    // Validate shipping form
    if (
      !shippingInfo.firstName ||
      !shippingInfo.lastName ||
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.province ||
      !shippingInfo.postalCode ||
      !shippingInfo.phone
    ) {
      toast.error("Please fill all required shipping fields");
      return;
    }
    setActiveStep("payment");
  };

  const handleBackToShipping = () => {
    setActiveStep("shipping");
  };

  const handleContinueToReview = (e) => {
    e.preventDefault();
    // Validate payment form
    if (paymentMethod === "card") {
      if (
        !cardInfo.cardNumber ||
        !cardInfo.cardName ||
        !cardInfo.expiryDate ||
        !cardInfo.cvv
      ) {
        toast.error("Please fill all required payment fields");
        return;
      }
    }
    setActiveStep("review");
  };

  const handleBackToPayment = () => {
    setActiveStep("payment");
  };

  // Handle order submission
  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      // Create proper billing info that includes email
      const finalBillingInfo = sameAsShipping
        ? {
            ...shippingInfo,
            email: billingInfo.email, // Make sure email is included
          }
        : billingInfo;

      // Map payment method to valid enum value
      const validPaymentMethod =
        paymentMethod === "cod" ? "cash-on-delivery" : paymentMethod;

      // Prepare order data
      const orderData = {
        items: items.map((item) => ({
          product: item.product,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingInfo,
        billingInfo: finalBillingInfo,
        shippingMethod:
          shippingCost === 2990
            ? "express"
            : shippingCost === 1590
            ? "standard"
            : "pickup",
        paymentMethod: validPaymentMethod,
        paymentDetails:
          paymentMethod === "card"
            ? {
                cardLast4: cardInfo.cardNumber.slice(-4),
                cardType: getCardType(cardInfo.cardNumber),
                status: "paid",
              }
            : {
                status: paymentMethod === "cod" ? "pending" : "processing",
              },
        subtotal,
        shippingCost,
        discount: promoDiscount * subtotal,
        total,
        notes: orderNotes,
        promoCode: promoCode || null,
        orderNumber: `TEMP-${Date.now()}`, // Add a temporary order number
      };

      // Dispatch create order action
      const result = await dispatch(createOrder(orderData)).unwrap();

      // Clear cart after successful order
      await dispatch(clearCart()).unwrap();

      // Redirect to order confirmation page
      navigate(`/order-confirmation/${result.order._id}`);

      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Helper function to determine card type based on number
  const getCardType = (cardNumber) => {
    const firstDigit = cardNumber.charAt(0);
    if (firstDigit === "4") return "Visa";
    if (firstDigit === "5") return "MasterCard";
    if (firstDigit === "3") return "American Express";
    return "Unknown";
  };

  // Loading state
  if (loading) {
    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading checkout...</p>
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
          <Link to="/cart" className="hover:text-primary">
            Cart
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-900">Checkout</span>
        </div>

        {/* Checkout Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
                  activeStep === "shipping"
                    ? "bg-primary text-white"
                    : "bg-primary text-white"
                }`}
              >
                <FiMapPin />
              </div>
              <span
                className={`ml-2 ${
                  activeStep === "shipping"
                    ? "font-medium text-primary"
                    : "font-medium text-primary"
                }`}
              >
                Shipping
              </span>
            </div>
            <div
              className={`w-16 h-1 mx-2 ${
                activeStep === "shipping" ? "bg-gray-300" : "bg-primary"
              }`}
            ></div>
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activeStep === "payment" || activeStep === "review"
                    ? "bg-primary text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                <FiCreditCard />
              </div>
              <span
                className={`ml-2 ${
                  activeStep === "payment"
                    ? "font-medium text-primary"
                    : activeStep === "review"
                    ? "font-medium text-primary"
                    : "text-gray-600"
                }`}
              >
                Payment
              </span>
            </div>
            <div
              className={`w-16 h-1 mx-2 ${
                activeStep === "review" ? "bg-primary" : "bg-gray-300"
              }`}
            ></div>
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activeStep === "review"
                    ? "bg-primary text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                <FiShoppingBag />
              </div>
              <span
                className={`ml-2 ${
                  activeStep === "review"
                    ? "font-medium text-primary"
                    : "text-gray-600"
                }`}
              >
                Review
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Checkout Form */}
          <div className="lg:w-8/12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Shipping Information Form */}
              {activeStep === "shipping" && (
                <div>
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold">Shipping Information</h2>
                  </div>
                  <form
                    onSubmit={handleContinueToPayment}
                    className="p-6 space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name*
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={shippingInfo.firstName}
                          onChange={handleShippingInfoChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name*
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={shippingInfo.lastName}
                          onChange={handleShippingInfoChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address*
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleShippingInfoChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City*
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={shippingInfo.city}
                          onChange={handleShippingInfoChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Province*
                        </label>
                        <input
                          type="text"
                          name="province"
                          value={shippingInfo.province}
                          onChange={handleShippingInfoChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Postal Code*
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={shippingInfo.postalCode}
                          onChange={handleShippingInfoChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number*
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleShippingInfoChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 px-4 rounded-md font-medium hover:bg-primary-dark transition-colors cursor-pointer"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Payment Information Form */}
              {activeStep === "payment" && (
                <div>
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold">Payment Information</h2>
                  </div>
                  <form
                    onSubmit={handleContinueToReview}
                    className="p-6 space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Method
                      </label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            id="card-payment"
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={paymentMethod === "card"}
                            onChange={() => setPaymentMethod("card")}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                          />
                          <label
                            htmlFor="card-payment"
                            className="ml-2 flex items-center cursor-pointer"
                          >
                            <span className="text-sm text-gray-700 mr-2">
                              Credit/Debit Card
                            </span>
                            <div className="flex space-x-1">
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
                            </div>
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="paypal-payment"
                            type="radio"
                            name="paymentMethod"
                            value="paypal"
                            checked={paymentMethod === "paypal"}
                            onChange={() => setPaymentMethod("paypal")}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                          />
                          <label
                            htmlFor="paypal-payment"
                            className="ml-2 flex items-center cursor-pointer"
                          >
                            <span className="text-sm text-gray-700 mr-2">
                              PayPal
                            </span>
                            <img
                              src="https://cdn-icons-png.flaticon.com/512/196/196559.png"
                              alt="PayPal"
                              className="h-6"
                            />
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="cod-payment"
                            type="radio"
                            name="paymentMethod"
                            value="cod"
                            checked={paymentMethod === "cod"}
                            onChange={() => setPaymentMethod("cod")}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                          />
                          <label
                            htmlFor="cod-payment"
                            className="ml-2 flex items-center cursor-pointer"
                          >
                            <span className="text-sm text-gray-700">
                              Cash on Delivery
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Card Details (only show if card payment selected) */}
                    {paymentMethod === "card" && (
                      <div className="border-t border-gray-200 pt-4 mt-4 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={cardInfo.cardNumber}
                            onChange={handleCardInfoChange}
                            placeholder="0000 0000 0000 0000"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name on Card
                          </label>
                          <input
                            type="text"
                            name="cardName"
                            value={cardInfo.cardName}
                            onChange={handleCardInfoChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              name="expiryDate"
                              value={cardInfo.expiryDate}
                              onChange={handleCardInfoChange}
                              placeholder="MM/YY"
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              CVV
                            </label>
                            <input
                              type="text"
                              name="cvv"
                              value={cardInfo.cvv}
                              onChange={handleCardInfoChange}
                              placeholder="123"
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Billing Information */}
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">
                          Billing Information
                        </h3>
                        <div className="flex items-center">
                          <input
                            id="same-as-shipping"
                            type="checkbox"
                            checked={sameAsShipping}
                            onChange={(e) =>
                              setSameAsShipping(e.target.checked)
                            }
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                          <label
                            htmlFor="same-as-shipping"
                            className="ml-2 text-sm text-gray-700 cursor-pointer"
                          >
                            Same as shipping address
                          </label>
                        </div>
                      </div>

                      {!sameAsShipping && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                First Name
                              </label>
                              <input
                                type="text"
                                name="firstName"
                                value={billingInfo.firstName}
                                onChange={handleBillingInfoChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name
                              </label>
                              <input
                                type="text"
                                name="lastName"
                                value={billingInfo.lastName}
                                onChange={handleBillingInfoChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={billingInfo.email}
                              onChange={handleBillingInfoChange}
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Address
                            </label>
                            <input
                              type="text"
                              name="address"
                              value={billingInfo.address}
                              onChange={handleBillingInfoChange}
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                City
                              </label>
                              <input
                                type="text"
                                name="city"
                                value={billingInfo.city}
                                onChange={handleBillingInfoChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Province
                              </label>
                              <input
                                type="text"
                                name="province"
                                value={billingInfo.province}
                                onChange={handleBillingInfoChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Postal Code
                              </label>
                              <input
                                type="text"
                                name="postalCode"
                                value={billingInfo.postalCode}
                                onChange={handleBillingInfoChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number
                            </label>
                            <input
                              type="text"
                              name="phone"
                              value={billingInfo.phone}
                              onChange={handleBillingInfoChange}
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                              required
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-4">
                      <button
                        type="button"
                        onClick={handleBackToShipping}
                        className="mt-3 sm:mt-0 w-full sm:w-auto border border-gray-300 bg-white text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-50 transition-colors flex items-center justify-center cursor-pointer"
                      >
                        <FiArrowLeft className="mr-2" /> Back to Shipping
                      </button>
                      <button
                        type="submit"
                        className="w-full sm:w-auto bg-primary text-white py-2 px-6 rounded-md font-medium hover:bg-primary-dark transition-colors cursor-pointer"
                      >
                        Review Order
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Order Review */}
              {activeStep === "review" && (
                <div>
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold">Review Your Order</h2>
                  </div>
                  <div className="p-6 space-y-6">
                    {/* Order Items */}
                    <div>
                      <h3 className="font-semibold text-lg mb-3">
                        Order Items
                      </h3>
                      <div className="space-y-4">
                        {items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center border-b border-gray-200 pb-4"
                          >
                            <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-full h-full object-contain p-2"
                              />
                            </div>
                            <div className="ml-4 flex-grow">
                              <h4 className="font-medium">{item.name}</h4>
                              <div className="flex justify-between mt-1">
                                <div className="text-sm text-gray-600">
                                  Qty: {item.quantity}
                                </div>
                                <div className="font-semibold">
                                  Rs.{" "}
                                  {formatter.format(item.price * item.quantity)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-3">
                          Shipping Information
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="font-medium">
                            {shippingInfo.firstName} {shippingInfo.lastName}
                          </p>
                          <p>{shippingInfo.address}</p>
                          <p>
                            {shippingInfo.city}, {shippingInfo.province}{" "}
                            {shippingInfo.postalCode}
                          </p>
                          <p>{shippingInfo.phone}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-3">
                          Payment Information
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          {paymentMethod === "card" && (
                            <>
                              <p className="font-medium">Credit/Debit Card</p>
                              <p>
                                Card ending in {cardInfo.cardNumber.slice(-4)}
                              </p>
                              <p>Name: {cardInfo.cardName}</p>
                              <p>Expiry: {cardInfo.expiryDate}</p>
                            </>
                          )}
                          {paymentMethod === "paypal" && (
                            <p className="font-medium">PayPal</p>
                          )}
                          {paymentMethod === "cod" && (
                            <p className="font-medium">Cash on Delivery</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Order Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Order Notes (Optional)
                      </label>
                      <textarea
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Add any special instructions or notes for your order..."
                      ></textarea>
                    </div>

                    <div className="pt-4 flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-4">
                      <button
                        type="button"
                        onClick={handleBackToPayment}
                        className="mt-3 sm:mt-0 w-full sm:w-auto border border-gray-300 bg-white text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-50 transition-colors flex items-center justify-center cursor-pointer"
                      >
                        <FiArrowLeft className="mr-2" /> Back to Payment
                      </button>
                      <button
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                        className="w-full sm:w-auto bg-primary text-white py-2 px-6 rounded-md font-medium hover:bg-primary-dark transition-colors flex items-center justify-center cursor-pointer"
                      >
                        {isProcessing ? (
                          <>
                            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                            Processing...
                          </>
                        ) : (
                          <>Place Order</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
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

                {/* Discount */}
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({promoDiscount * 100}%)</span>
                    <span>
                      - Rs. {formatter.format(promoDiscount * subtotal)}
                    </span>
                  </div>
                )}

                {/* Shipping Cost */}
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shippingCost === 0
                      ? "Free"
                      : `Rs. ${formatter.format(shippingCost)}`}
                  </span>
                </div>

                {/* Total */}
                <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-200">
                  <span>Total</span>
                  <span>Rs. {formatter.format(total)}</span>
                </div>
              </div>

              {/* Secure Checkout Badge */}
              <div className="p-6 bg-gray-50 space-y-4">
                <div className="flex items-center justify-center space-x-2 bg-green-50 p-3 rounded-lg border border-green-100">
                  <FiLock className="text-green-600" />
                  <span className="text-sm text-green-700 font-medium">
                    Secure Checkout
                  </span>
                </div>

                {/* Additional Cart Highlights */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <FiTruck className="mr-2 text-primary" />
                    <span>Free delivery on orders above Rs. 25,000</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiClock className="mr-2 text-primary" />
                    <span>Estimated delivery: 3-5 business days</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiShield className="mr-2 text-primary" />
                    <span>30-day easy returns on most items</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
