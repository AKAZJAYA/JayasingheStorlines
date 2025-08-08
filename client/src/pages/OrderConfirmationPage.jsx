import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiPackage,
  FiTruck,
  FiClock,
  FiShield,
  FiMapPin,
  FiFileText,
  FiMail,
  FiArrowRight,
} from "react-icons/fi";
import { fetchOrderDetails } from "../store/slices/orderSlice";

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { currentOrder: order, loading } = useSelector((state) => state.orders);

  // Formatter for currency
  const formatter = new Intl.NumberFormat("en-US");

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderDetails(orderId));
    }
  }, [dispatch, orderId]);

  if (loading) {
    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <FiPackage size={40} className="text-red-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find the order you're looking for.
          </p>
          <Link
            to="/my-orders"
            className="inline-block px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary-dark cursor-pointer"
          >
            View My Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Confirmation Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-8 text-center mb-8"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <FiCheckCircle size={50} className="text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase. Your order has been received.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="px-4 py-2 bg-gray-50 rounded-lg">
              <span className="font-medium">Order Number:</span>{" "}
              {order.orderNumber}
            </div>
            <div className="px-4 py-2 bg-gray-50 rounded-lg">
              <span className="font-medium">Date:</span>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </div>
            <div className="px-4 py-2 bg-gray-50 rounded-lg">
              <span className="font-medium">Payment Method:</span>{" "}
              {order.paymentMethod}
            </div>
            <div className="px-4 py-2 bg-gray-50 rounded-lg">
              <span className="font-medium">Total:</span> Rs.{" "}
              {formatter.format(order.total)}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold">Order Details</h2>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-4">Items</h3>
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
                        <h4 className="font-medium">{item.name}</h4>
                        <div className="flex justify-between mt-1">
                          <div className="text-sm text-gray-600">
                            Qty: {item.quantity}
                          </div>
                          <div className="font-semibold">
                            Rs. {formatter.format(item.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="p-6 bg-gray-50">
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
                      <span>- Rs. {formatter.format(order.discount)}</span>
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow-md overflow-hidden mt-6"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold">Delivery Timeline</h2>
              </div>
              <div className="p-6">
                <div className="relative">
                  {/* Connecting Line */}
                  <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                  <div className="space-y-8 relative">
                    <div className="flex">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center z-10">
                        <FiCheckCircle className="text-green-500" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">Order Placed</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Your order has been received and is being processed.
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center z-10">
                        <FiClock className="text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">Processing</h3>
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
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center z-10">
                        <FiTruck className="text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">Shipping</h3>
                        <p className="text-sm text-gray-500">
                          Estimated:{" "}
                          {new Date(
                            new Date(order.createdAt).getTime() +
                              2 * 24 * 60 * 60 * 1000
                          ).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Your order will be handed to our delivery partner.
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center z-10">
                        <FiPackage className="text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">Delivery</h3>
                        <p className="text-sm text-gray-500">
                          Estimated:{" "}
                          {new Date(
                            new Date(order.createdAt).getTime() +
                              5 * 24 * 60 * 60 * 1000
                          ).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Your order will be delivered to your address.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold flex items-center">
                  <FiMapPin className="mr-2 text-primary" /> Shipping Address
                </h2>
              </div>
              <div className="p-6">
                <p className="font-medium">
                  {order.shippingInfo.firstName} {order.shippingInfo.lastName}
                </p>
                <p>{order.shippingInfo.address}</p>
                <p>
                  {order.shippingInfo.city}, {order.shippingInfo.province}{" "}
                  {order.shippingInfo.postalCode}
                </p>
                <p>{order.shippingInfo.phone}</p>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold flex items-center">
                  <FiFileText className="mr-2 text-primary" /> Payment Details
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Method</span>
                    <span className="font-medium">{order.paymentMethod}</span>
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
                      <span className="text-gray-600">Transaction ID</span>
                      <span className="font-medium">
                        {order.paymentDetails.transactionId}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Support Information */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold flex items-center">
                  <FiMail className="mr-2 text-primary" /> Need Help?
                </h2>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">
                  If you have any questions or concerns about your order, please
                  contact our customer support team.
                </p>
                <Link
                  to="/contact-us"
                  className="inline-flex items-center text-primary font-medium hover:underline cursor-pointer"
                >
                  Contact Support <FiArrowRight className="ml-1" />
                </Link>
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <Link
                  to="/"
                  className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-primary-dark transition-colors flex items-center justify-center cursor-pointer"
                >
                  Continue Shopping
                </Link>
                <Link
                  to="/my-orders"
                  className="w-full mt-3 border border-gray-300 bg-white text-gray-700 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors flex items-center justify-center cursor-pointer"
                >
                  View All Orders
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
