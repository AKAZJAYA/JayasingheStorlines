import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiX,
  FiChevronDown,
  FiChevronUp,
  FiSearch,
  FiFilter,
  FiCalendar,
  FiMapPin,
  FiShield,
  FiAlertCircle,
  FiFileText,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelOrder,
  fetchUserOrders,
  clearOrderError,
} from "../store/slices/orderSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import ServiceHighlights from "../components/ServiceHighlights";

const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Format currency
  const formatter = new Intl.NumberFormat("en-US");

  // Fetch orders on component mount
  useEffect(() => {
    // Use a try-catch block to handle potential errors
    const fetchOrders = async () => {
      try {
        // Use unwrap() to properly handle promise rejection
        await dispatch(fetchUserOrders()).unwrap();
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();

    // Clear any errors when component unmounts
    return () => {
      dispatch(clearOrderError());
    };
  }, [dispatch]);

  // Toggle order details
  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Filter orders based on status and search query
  const filteredOrders =
    Array.isArray(orders) && orders.length > 0
      ? orders.filter((order) => {
          const matchesStatus =
            filterStatus === "all" ||
            order.status.toLowerCase() === filterStatus.toLowerCase();
          const matchesSearch =
            (order.orderNumber || order._id || "")
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            (order.items &&
              order.items.some((item) =>
                (item.name || "")
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              ));
          return matchesStatus && matchesSearch;
        })
      : [];

  // Get status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "out for delivery":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <FiCheckCircle className="text-green-600" />;
      case "processing":
        return <FiClock className="text-blue-600" />;
      case "shipped":
        return <FiTruck className="text-purple-600" />;
      case "out for delivery":
        return <FiTruck className="text-yellow-600" />;
      case "cancelled":
        return <FiX className="text-red-600" />;
      default:
        return <FiPackage className="text-gray-600" />;
    }
  };

  // Handle cancel order
  const handleCancelOrder = (orderId) => {
    if (
      window.confirm(
        "Are you sure you want to cancel this order? This action cannot be undone."
      )
    ) {
      dispatch(cancelOrder(orderId));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6 flex items-center">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-900">My Orders</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <FiAlertCircle className="text-red-400 mt-0.5 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative w-full md:w-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by order ID or product"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64 focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="relative w-full md:w-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiFilter className="text-gray-400" />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-md w-full md:w-48 focus:ring-primary focus:border-primary appearance-none cursor-pointer"
                >
                  <option value="all">All Orders</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="out for delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <FiChevronDown className="text-gray-500" />
                </div>
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <FiCalendar className="mr-2" />
              <span>Last 6 months</span>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-gray-600">Loading your orders...</p>
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Order Header - Made entire header clickable */}
                <div
                  className="p-6 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleOrderDetails(order._id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-bold text-lg">
                          Order #{order.orderNumber || order._id}
                        </h3>
                        <span
                          className={`ml-4 px-3 py-1 rounded-full text-xs font-medium inline-flex items-center ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          <span className="ml-1">{order.status}</span>
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Placed on{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Total</div>
                        <div className="font-bold">
                          Rs. {formatter.format(order.total)}
                        </div>
                      </div>
                      {/* Keep the chevron as a visual indicator only */}
                      <div className="text-primary">
                        {expandedOrder === order._id ? (
                          <FiChevronUp size={24} />
                        ) : (
                          <FiChevronDown size={24} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Details (expanded) */}
                {expandedOrder === order._id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                      {/* Left Column - Order Details */}
                      <div className="lg:col-span-2 space-y-6">
                        {/* Order Items */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                          <div className="p-4 border-b border-gray-200">
                            <h3 className="font-semibold text-lg">Items</h3>
                          </div>
                          <div className="p-4">
                            <div className="space-y-4">
                              {order.items.map((item, index) => (
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
                                    <Link
                                      to={`/product/${item.product}`}
                                      className="font-medium hover:text-primary"
                                    >
                                      {item.name}
                                    </Link>
                                    <div className="flex justify-between mt-1">
                                      <div className="text-sm text-gray-600">
                                        Qty: {item.quantity}
                                      </div>
                                      <div className="font-semibold">
                                        Rs.{" "}
                                        {formatter.format(
                                          item.price * item.quantity
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Order Summary */}
                          <div className="p-4 bg-gray-50">
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium">
                                  Rs. {formatter.format(order.subtotal)}
                                </span>
                              </div>
                              {order.discount > 0 && (
                                <div className="flex justify-between text-green-600">
                                  <span>Discount</span>
                                  <span>
                                    - Rs. {formatter.format(order.discount)}
                                  </span>
                                </div>
                              )}
                              <div className="flex justify-between">
                                <span className="text-gray-600">Shipping</span>
                                <span className="font-medium">
                                  Rs. {formatter.format(order.shippingCost)}
                                </span>
                              </div>
                              <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200 mt-2">
                                <span>Total</span>
                                <span>Rs. {formatter.format(order.total)}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Delivery Timeline */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                          <div className="p-4 border-b border-gray-200">
                            <h3 className="font-semibold text-lg">
                              Delivery Timeline
                            </h3>
                          </div>
                          <div className="p-4">
                            <div className="relative">
                              {/* Connecting Line */}
                              <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                              <div className="space-y-6 relative">
                                <div className="flex">
                                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center z-10">
                                    <FiCheckCircle className="text-green-500" />
                                  </div>
                                  <div className="ml-4">
                                    <h4 className="font-medium">
                                      Order Placed
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                      {new Date(
                                        order.createdAt
                                      ).toLocaleString()}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                      Your order has been received and is being
                                      processed.
                                    </p>
                                  </div>
                                </div>

                                <div className="flex">
                                  <div
                                    className={`flex-shrink-0 w-8 h-8 rounded-full ${
                                      order.status === "processing"
                                        ? "bg-blue-100"
                                        : "bg-gray-100"
                                    } flex items-center justify-center z-10`}
                                  >
                                    <FiClock
                                      className={
                                        order.status === "processing"
                                          ? "text-blue-500"
                                          : "text-gray-400"
                                      }
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <h4 className="font-medium">Processing</h4>
                                    <p className="text-sm text-gray-500">
                                      Estimated:{" "}
                                      {new Date(
                                        new Date(order.createdAt).getTime() +
                                          24 * 60 * 60 * 1000
                                      ).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                      Your order is being prepared for shipping.
                                    </p>
                                  </div>
                                </div>

                                <div className="flex">
                                  <div
                                    className={`flex-shrink-0 w-8 h-8 rounded-full ${
                                      order.status === "shipped"
                                        ? "bg-purple-100"
                                        : "bg-gray-100"
                                    } flex items-center justify-center z-10`}
                                  >
                                    <FiTruck
                                      className={
                                        order.status === "shipped"
                                          ? "text-purple-500"
                                          : "text-gray-400"
                                      }
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <h4 className="font-medium">Shipping</h4>
                                    <p className="text-sm text-gray-500">
                                      Estimated:{" "}
                                      {new Date(
                                        new Date(order.createdAt).getTime() +
                                          2 * 24 * 60 * 60 * 1000
                                      ).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                      Your order will be handed to our delivery
                                      partner.
                                    </p>
                                  </div>
                                </div>

                                <div className="flex">
                                  <div
                                    className={`flex-shrink-0 w-8 h-8 rounded-full ${
                                      order.status === "delivered" ||
                                      order.status === "out for delivery"
                                        ? "bg-green-100"
                                        : "bg-gray-100"
                                    } flex items-center justify-center z-10`}
                                  >
                                    <FiPackage
                                      className={
                                        order.status === "delivered" ||
                                        order.status === "out for delivery"
                                          ? "text-green-500"
                                          : "text-gray-400"
                                      }
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <h4 className="font-medium">Delivery</h4>
                                    <p className="text-sm text-gray-500">
                                      Estimated:{" "}
                                      {new Date(
                                        new Date(order.createdAt).getTime() +
                                          5 * 24 * 60 * 60 * 1000
                                      ).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                      Your order will be delivered to your
                                      address.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Side Information */}
                      <div className="space-y-6">
                        {/* Shipping Information */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                          <div className="p-4 border-b border-gray-200">
                            <h3 className="font-semibold flex items-center">
                              <FiMapPin className="mr-2 text-primary" />{" "}
                              Shipping Address
                            </h3>
                          </div>
                          <div className="p-4">
                            <p className="font-medium">
                              {order.shippingInfo.firstName}{" "}
                              {order.shippingInfo.lastName}
                            </p>
                            <p>{order.shippingInfo.address}</p>
                            <p>
                              {order.shippingInfo.city},{" "}
                              {order.shippingInfo.province}{" "}
                              {order.shippingInfo.postalCode}
                            </p>
                            <p>{order.shippingInfo.phone}</p>
                          </div>
                        </div>

                        {/* Payment Information */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                          <div className="p-4 border-b border-gray-200">
                            <h3 className="font-semibold flex items-center">
                              <FiFileText className="mr-2 text-primary" />{" "}
                              Payment Details
                            </h3>
                          </div>
                          <div className="p-4">
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Method</span>
                                <span className="font-medium">
                                  {order.paymentMethod}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Status</span>
                                <span
                                  className={`font-medium ${
                                    order.paymentDetails?.status === "paid"
                                      ? "text-green-600"
                                      : "text-yellow-600"
                                  }`}
                                >
                                  {order.paymentDetails?.status || "Processing"}
                                </span>
                              </div>
                              {order.paymentDetails?.transactionId && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">
                                    Transaction ID
                                  </span>
                                  <span className="font-medium">
                                    {order.paymentDetails.transactionId}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-6 bg-gray-50 flex flex-wrap gap-4 justify-end border-t border-gray-200">
                      {order.status !== "cancelled" &&
                        order.status !== "delivered" && (
                          <button
                            onClick={() => handleCancelOrder(order._id)}
                            className="px-4 py-2 border border-red-500 text-red-500 rounded-md font-medium hover:bg-red-50 cursor-pointer"
                          >
                            Cancel Order
                          </button>
                        )}
                      <Link
                        to={`/support/order/${order._id}`}
                        className="px-4 py-2 border border-primary text-primary rounded-md font-medium hover:bg-primary/10 cursor-pointer"
                      >
                        Need Help?
                      </Link>
                      {order.status === "delivered" && (
                        <button className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary-dark cursor-pointer">
                          Write a Review
                        </button>
                      )}
                      <button className="px-4 py-2 bg-gray-800 text-white rounded-md font-medium hover:bg-gray-700 cursor-pointer">
                        Download Invoice
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <FiPackage size={40} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No orders found</h2>
            <p className="text-gray-600 mb-6">
              {searchQuery || filterStatus !== "all"
                ? "No orders match your current filter criteria."
                : "You haven't placed any orders yet."}
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary-dark cursor-pointer"
            >
              Start Shopping
            </Link>
          </div>
        )}

        {/* Help Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h3 className="text-lg font-bold mb-4">Need Help With Your Order?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-md hover:border-primary hover:shadow-md transition-all cursor-pointer">
              <h4 className="font-medium mb-2">Return & Refund Policy</h4>
              <p className="text-sm text-gray-600 mb-3">
                Learn about our easy return process and refund policies.
              </p>
              <Link
                to="/returns-policy"
                className="text-primary text-sm font-medium hover:underline"
              >
                Read more
              </Link>
            </div>
            <div className="p-4 border border-gray-200 rounded-md hover:border-primary hover:shadow-md transition-all cursor-pointer">
              <h4 className="font-medium mb-2">Shipping Information</h4>
              <p className="text-sm text-gray-600 mb-3">
                Get details on delivery timeframes and tracking options.
              </p>
              <Link
                to="/shipping-info"
                className="text-primary text-sm font-medium hover:underline"
              >
                Read more
              </Link>
            </div>
            <div className="p-4 border border-gray-200 rounded-md hover:border-primary hover:shadow-md transition-all cursor-pointer">
              <h4 className="font-medium mb-2">Contact Customer Service</h4>
              <p className="text-sm text-gray-600 mb-3">
                Our team is available 7 days a week to assist you.
              </p>
              <Link
                to="/contact-us"
                className="text-primary text-sm font-medium hover:underline"
              >
                Contact us
              </Link>
            </div>
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

export default MyOrdersPage;
