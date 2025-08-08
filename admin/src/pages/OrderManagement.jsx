import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPackage,
  FiSearch,
  FiFilter,
  FiChevronDown,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiX,
  FiCalendar,
  FiUser,
  FiMapPin,
  FiMail,
  FiPhone,
  FiTruck,
  FiCreditCard,
  FiAlertCircle,
  FiCheck,
  FiCheckCircle,
} from "react-icons/fi";
import {
  fetchOrders,
  fetchOrderStats,
  updateOrderStatus,
  updateOrder,
  deleteOrder,
  setFilters,
  setPage,
  clearError,
} from "../store/slices/orderSlice";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const {
    orders = [], // Add default empty array
    stats = {}, // Add default empty object
    loading = false, // Add default value
    error = null, // Add default value
    pagination = { page: 1, limit: 10, total: 0, totalPages: 0 }, // Add default pagination
    filters = {
      search: "",
      status: "all",
      sortBy: "createdAt",
      sortOrder: "desc",
    }, // Add default filters
  } = useSelector((state) => state.orders || {}); // Add fallback for entire state

  // Local state for UI
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState(filters.search || ""); // Add fallback
  const [filterStatus, setFilterStatus] = useState(filters.status || "all"); // Add fallback
  const [filterDate, setFilterDate] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: filters.sortBy || "createdAt", // Add fallback
    direction: filters.sortOrder === "desc" ? "descending" : "ascending",
  });

  // Fetch orders and stats on component mount and when filters change
  useEffect(() => {
    dispatch(
      fetchOrders({
        page: pagination.page,
        limit: pagination.limit,
        search: filters.search,
        status: filters.status === "all" ? "" : filters.status,
        paymentStatus:
          filters.paymentStatus === "all" ? "" : filters.paymentStatus,
        dateFrom: filters.dateFrom,
        dateTo: filters.dateTo,
        sort: filters.sortBy,
        order: filters.sortOrder,
      })
    );
    dispatch(fetchOrderStats());
  }, [dispatch, pagination.page, filters]);

  // Update filters when local state changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(
        setFilters({
          search: searchTerm,
          status: filterStatus,
          sortBy: sortConfig.key,
          sortOrder: sortConfig.direction === "descending" ? "desc" : "asc",
        })
      );
    }, 500); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchTerm, filterStatus, sortConfig, dispatch]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Handlers
  const handlePageChange = (pageNumber) => {
    dispatch(setPage(pageNumber));
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsEditing(false);
  };

  const handleEditOrder = (order) => {
    setSelectedOrder({ ...order });
    setIsEditing(true);
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await dispatch(
        updateOrderStatus({ orderId, status: newStatus })
      ).unwrap();

      // Update selected order if it's the one being updated
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await dispatch(deleteOrder(orderId)).unwrap();
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder(null);
        }
      } catch (error) {
        console.error("Failed to delete order:", error);
      }
    }
  };

  const handleEditSubmit = async (orderData) => {
    try {
      await dispatch(
        updateOrder({
          orderId: selectedOrder._id,
          orderData,
        })
      ).unwrap();
      setIsEditing(false);
      setSelectedOrder(null);
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilterStatus("all");
    setFilterDate("");
    dispatch(
      setFilters({
        search: "",
        status: "all",
        dateFrom: "",
        dateTo: "",
      })
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
            Pending
          </span>
        );
      case "processing":
        return (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
            Processing
          </span>
        );
      case "shipped":
        return (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
            Shipping
          </span>
        );
      case "delivered":
        return (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
            Delivered
          </span>
        );
      case "cancelled":
        return (
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
            {status}
          </span>
        );
    }
  };

  // Show loading state - Update condition
  if (loading && (!orders || orders.length === 0)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <FiAlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
            <button
              onClick={() => dispatch(clearError())}
              className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg p-1.5 hover:bg-red-100"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Order Management
        </h1>
        <div className="text-sm text-gray-600">
          Total Orders: {pagination?.total || 0}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders or customers..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>

            <div className="relative">
              <input
                type="date"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
              <FiCalendar className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          {(searchTerm || filterStatus !== "all" || filterDate) && (
            <button
              onClick={resetFilters}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <FiX className="mr-1" /> Clear Filters
            </button>
          )}
        </div>

        {/* Status Tabs - Simplified */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-6 overflow-x-auto">
            <button
              onClick={() => setFilterStatus("all")}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                filterStatus === "all"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              All Orders
            </button>
            <button
              onClick={() => setFilterStatus("pending")}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                filterStatus === "pending"
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilterStatus("processing")}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                filterStatus === "processing"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Processing
            </button>
            <button
              onClick={() => setFilterStatus("shipped")}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                filterStatus === "shipped"
                  ? "border-yellow-500 text-yellow-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Shipping
            </button>
            <button
              onClick={() => setFilterStatus("delivered")}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                filterStatus === "delivered"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Delivered
            </button>
          </nav>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Show empty state if no orders */}
        {!orders || orders.length === 0 ? (
          <div className="text-center py-12">
            <FiPackage className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-500">
              {loading
                ? "Loading orders..."
                : "No orders match your current filters."}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("orderNumber")}
                    >
                      Order Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("user")}
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("createdAt")}
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("total")}
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("status")}
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => handleViewOrder(order)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-primary">
                          {order.orderNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.user?.name ||
                            `${order.billingInfo?.firstName || ""} ${
                              order.billingInfo?.lastName || ""
                            }`.trim() ||
                            "N/A"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.user?.email ||
                            order.billingInfo?.email ||
                            "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          Rs. {order.total?.toLocaleString() || "0"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div
                          className="flex justify-end space-x-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => handleViewOrder(order)}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="View details"
                          >
                            <FiEye />
                          </button>
                          <button
                            onClick={() => handleEditOrder(order)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit order"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(order._id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete order"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
                <div className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">
                    {(pagination.page - 1) * pagination.limit + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(
                      pagination.page * pagination.limit,
                      pagination.total
                    )}
                  </span>{" "}
                  of <span className="font-medium">{pagination.total}</span>{" "}
                  orders
                </div>
                <div className="flex space-x-2">
                  <button
                    className={`px-3 py-1 rounded ${
                      pagination.page === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() =>
                      pagination.page > 1 &&
                      handlePageChange(pagination.page - 1)
                    }
                    disabled={pagination.page === 1}
                  >
                    Previous
                  </button>
                  {[...Array(pagination.totalPages)].map((_, i) => (
                    <button
                      key={i}
                      className={`px-3 py-1 rounded ${
                        pagination.page === i + 1
                          ? "bg-primary text-white"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    className={`px-3 py-1 rounded ${
                      pagination.page === pagination.totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() =>
                      pagination.page < pagination.totalPages &&
                      handlePageChange(pagination.page + 1)
                    }
                    disabled={pagination.page === pagination.totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && !isEditing && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl w-full max-w-4xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  Order Details:{" "}
                  <span className="text-primary">
                    {selectedOrder.orderNumber}
                  </span>
                </h2>
                <div>{getStatusBadge(selectedOrder.status)}</div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Customer Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                    <FiUser className="mr-2 text-primary" /> Customer
                    Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">
                      {selectedOrder.user?.name ||
                        `${selectedOrder.billingInfo?.firstName || ""} ${
                          selectedOrder.billingInfo?.lastName || ""
                        }`.trim() ||
                        "N/A"}
                    </p>
                    <div className="flex items-start">
                      <FiMail className="mt-0.5 mr-2 text-gray-400" />
                      <span>
                        {selectedOrder.user?.email ||
                          selectedOrder.billingInfo?.email ||
                          "N/A"}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <FiPhone className="mt-0.5 mr-2 text-gray-400" />
                      <span>{selectedOrder.billingInfo?.phone || "N/A"}</span>
                    </div>
                    <div className="flex items-start">
                      <FiMapPin className="mt-0.5 mr-2 text-gray-400" />
                      <span>
                        {selectedOrder.billingInfo?.address
                          ? `${selectedOrder.billingInfo.address}${
                              selectedOrder.billingInfo.city
                                ? `, ${selectedOrder.billingInfo.city}`
                                : ""
                            }`
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                    <FiPackage className="mr-2 text-primary" /> Order
                    Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">
                        {selectedOrder.createdAt
                          ? new Date(
                              selectedOrder.createdAt
                            ).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total:</span>
                      <span className="font-medium">
                        Rs. {selectedOrder.total?.toLocaleString() || "0"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Items:</span>
                      <span className="font-medium">
                        {selectedOrder.items?.length || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="font-medium">
                        {selectedOrder.shippingMethod || "Standard"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                    <FiCreditCard className="mr-2 text-primary" /> Payment
                    Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Method:</span>
                      <span className="font-medium">
                        {selectedOrder.paymentMethod || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span
                        className={`font-medium ${
                          selectedOrder.paymentDetails?.status === "paid"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {selectedOrder.paymentDetails?.status || "Pending"}
                      </span>
                    </div>
                    {selectedOrder.paymentDetails?.transactionId && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transaction ID:</span>
                        <span className="font-medium">
                          {selectedOrder.paymentDetails.transactionId}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Enhanced Address Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                    <FiMapPin className="mr-2 text-primary" /> Address
                    Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="mb-3">
                      <h4 className="text-xs uppercase text-gray-500 mb-1">
                        Billing Address
                      </h4>
                      <p className="font-medium">
                        {selectedOrder.billingInfo?.firstName}{" "}
                        {selectedOrder.billingInfo?.lastName}
                      </p>
                      <p>{selectedOrder.billingInfo?.address}</p>
                      <p>
                        {selectedOrder.billingInfo?.city}
                        {selectedOrder.billingInfo?.city &&
                        selectedOrder.billingInfo?.state
                          ? `, ${selectedOrder.billingInfo.state}`
                          : ""}
                        {selectedOrder.billingInfo?.postalCode}
                      </p>
                      <p>{selectedOrder.billingInfo?.country}</p>
                    </div>

                    {selectedOrder.shippingInfo && (
                      <div>
                        <h4 className="text-xs uppercase text-gray-500 mb-1">
                          Shipping Address
                        </h4>
                        <p className="font-medium">
                          {selectedOrder.shippingInfo?.firstName}{" "}
                          {selectedOrder.shippingInfo?.lastName}
                        </p>
                        <p>{selectedOrder.shippingInfo?.address}</p>
                        <p>
                          {selectedOrder.shippingInfo?.city}
                          {selectedOrder.shippingInfo?.city &&
                          selectedOrder.shippingInfo?.state
                            ? `, ${selectedOrder.shippingInfo.state}`
                            : ""}
                          {selectedOrder.shippingInfo?.postalCode}
                        </p>
                        <p>{selectedOrder.shippingInfo?.country}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Payment Details */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                    <FiCreditCard className="mr-2 text-primary" /> Payment
                    Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transaction ID:</span>
                      <span className="font-medium">
                        {selectedOrder.paymentDetails?.transactionId || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Date:</span>
                      <span className="font-medium">
                        {selectedOrder.paymentDetails?.date
                          ? new Date(
                              selectedOrder.paymentDetails.date
                            ).toLocaleString()
                          : "N/A"}
                      </span>
                    </div>
                    {selectedOrder.paymentDetails?.cardLast4 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Card:</span>
                        <span className="font-medium">
                          •••• •••• ••••{" "}
                          {selectedOrder.paymentDetails.cardLast4}
                        </span>
                      </div>
                    )}
                    {selectedOrder.promoCode && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Promo Code:</span>
                        <span className="font-medium">
                          {selectedOrder.promoCode}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Items */}
                <div className="md:col-span-3">
                  <h3 className="font-medium text-gray-900 mb-3">
                    Order Items
                  </h3>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr className="bg-gray-100">
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                          >
                            Product
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                          >
                            Quantity
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase"
                          >
                            Subtotal
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {(selectedOrder.items || []).map((item, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                              {item.name || "N/A"}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500 text-center">
                              {item.quantity || 0}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500 text-right">
                              Rs. {item.price?.toLocaleString() || "0"}
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                              Rs.{" "}
                              {(
                                (item.price || 0) * (item.quantity || 0)
                              ).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <th
                            scope="row"
                            colSpan="3"
                            className="px-4 py-3 text-sm font-medium text-gray-900 text-right"
                          >
                            Subtotal: Rs.{" "}
                            {selectedOrder.subtotal?.toLocaleString() || "0"}
                            <br />
                            Shipping: Rs.{" "}
                            {selectedOrder.shippingCost?.toLocaleString() ||
                              "0"}
                            <br />
                            {selectedOrder.discount > 0 && (
                              <>
                                Discount: -Rs.{" "}
                                {selectedOrder.discount.toLocaleString()}
                                <br />
                              </>
                            )}
                            <strong>Total</strong>
                          </th>
                          <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">
                            Rs. {selectedOrder.total?.toLocaleString() || "0"}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* Notes */}
                {selectedOrder.notes && (
                  <div className="md:col-span-3">
                    <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                      <div className="flex">
                        <FiAlertCircle className="flex-shrink-0 text-yellow-400 mt-0.5" />
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">
                            Notes
                          </h3>
                          <div className="mt-2 text-sm text-yellow-700">
                            {selectedOrder.notes}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Update Status and Actions */}
              <div className="border-t border-gray-200 p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700">
                      Update Status:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {/* Show buttons based on current status */}
                      {selectedOrder.status === "pending" && (
                        <button
                          className="px-3 py-1.5 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                          onClick={() =>
                            handleUpdateOrderStatus(
                              selectedOrder._id,
                              "ready_to_prepare"
                            )
                          }
                          disabled={loading}
                        >
                          <FiCheckCircle className="inline mr-1" /> Mark Ready
                          to Prepare
                        </button>
                      )}

                      {selectedOrder.status === "ready_to_prepare" && (
                        <button
                          className="px-3 py-1.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200"
                          onClick={() =>
                            handleUpdateOrderStatus(
                              selectedOrder._id,
                              "preparing"
                            )
                          }
                          disabled={loading}
                        >
                          <FiClock className="inline mr-1" /> Start Preparing
                        </button>
                      )}

                      {selectedOrder.status === "preparing" && (
                        <button
                          className="px-3 py-1.5 text-xs font-medium rounded-full bg-teal-100 text-teal-800 hover:bg-teal-200"
                          onClick={() =>
                            handleUpdateOrderStatus(
                              selectedOrder._id,
                              "order_ready"
                            )
                          }
                          disabled={loading}
                        >
                          <FiCheckCircle className="inline mr-1" /> Mark Order
                          Ready
                        </button>
                      )}

                      {selectedOrder.status === "order_ready" && (
                        <button
                          className="px-3 py-1.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                          onClick={() =>
                            handleUpdateOrderStatus(
                              selectedOrder._id,
                              "delivering"
                            )
                          }
                          disabled={loading}
                        >
                          <FiTruck className="inline mr-1" /> Start Delivery
                        </button>
                      )}

                      {selectedOrder.status === "processing" && (
                        <button
                          className="px-3 py-1.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                          onClick={() =>
                            handleUpdateOrderStatus(
                              selectedOrder._id,
                              "shipped"
                            )
                          }
                          disabled={loading}
                        >
                          <FiTruck className="inline mr-1" /> Start Shipping
                        </button>
                      )}

                      {selectedOrder.status === "shipped" && (
                        <button
                          className="px-3 py-1.5 text-xs font-medium rounded-full bg-green-100 text-green-800 hover:bg-green-200"
                          onClick={() =>
                            handleUpdateOrderStatus(
                              selectedOrder._id,
                              "delivered"
                            )
                          }
                          disabled={loading}
                        >
                          <FiCheck className="inline mr-1" /> Mark Delivered
                        </button>
                      )}

                      {/* Allow cancellation for orders that aren't delivered or cancelled */}
                      {!["delivered", "cancelled"].includes(
                        selectedOrder.status
                      ) && (
                        <button
                          className="px-3 py-1.5 text-xs font-medium rounded-full bg-red-100 text-red-800 hover:bg-red-200"
                          onClick={() =>
                            handleUpdateOrderStatus(
                              selectedOrder._id,
                              "cancelled"
                            )
                          }
                          disabled={loading}
                        >
                          <FiX className="inline mr-1" /> Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      onClick={() => setSelectedOrder(null)}
                    >
                      Close
                    </button>
                    <button
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700"
                      onClick={() => handleEditOrder(selectedOrder)}
                    >
                      Edit Order
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Order Modal */}
      <AnimatePresence>
        {selectedOrder && isEditing && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  Edit Order:{" "}
                  <span className="text-primary">
                    {selectedOrder.orderNumber}
                  </span>
                </h2>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditSubmit({
                    billingInfo: selectedOrder.billingInfo,
                    shippingInfo: selectedOrder.shippingInfo,
                    status: selectedOrder.status,
                    paymentMethod: selectedOrder.paymentMethod,
                    paymentDetails: selectedOrder.paymentDetails,
                    notes: selectedOrder.notes,
                  });
                }}
              >
                <div className="p-6 space-y-6">
                  {/* Customer Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Customer Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          value={selectedOrder.billingInfo?.firstName || ""}
                          onChange={(e) =>
                            setSelectedOrder({
                              ...selectedOrder,
                              billingInfo: {
                                ...selectedOrder.billingInfo,
                                firstName: e.target.value,
                              },
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          value={selectedOrder.billingInfo?.lastName || ""}
                          onChange={(e) =>
                            setSelectedOrder({
                              ...selectedOrder,
                              billingInfo: {
                                ...selectedOrder.billingInfo,
                                lastName: e.target.value,
                              },
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          value={selectedOrder.billingInfo?.email || ""}
                          onChange={(e) =>
                            setSelectedOrder({
                              ...selectedOrder,
                              billingInfo: {
                                ...selectedOrder.billingInfo,
                                email: e.target.value,
                              },
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          value={selectedOrder.billingInfo?.phone || ""}
                          onChange={(e) =>
                            setSelectedOrder({
                              ...selectedOrder,
                              billingInfo: {
                                ...selectedOrder.billingInfo,
                                phone: e.target.value,
                              },
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Order Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Order Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            {
                              value: "pending",
                              label: "Pending",
                              color: "purple",
                            },
                            {
                              value: "processing",
                              label: "Processing",
                              color: "blue",
                            },
                            {
                              value: "shipped",
                              label: "Shipping",
                              color: "yellow",
                            },
                            {
                              value: "delivered",
                              label: "Delivered",
                              color: "green",
                            },
                          ].map((status) => (
                            <button
                              key={status.value}
                              type="button"
                              className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                                selectedOrder.status === status.value
                                  ? `bg-${status.color}-600 text-white`
                                  : `bg-${status.color}-100 text-${status.color}-800 hover:bg-${status.color}-200`
                              }`}
                              onClick={() =>
                                setSelectedOrder({
                                  ...selectedOrder,
                                  status: status.value,
                                })
                              }
                            >
                              {status.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Payment Method
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { value: "card", label: "Credit/Debit Card" },
                            { value: "bank-transfer", label: "Bank Transfer" },
                            {
                              value: "cash-on-delivery",
                              label: "Cash on Delivery",
                            },
                          ].map((method) => (
                            <button
                              key={method.value}
                              type="button"
                              className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                                selectedOrder.paymentMethod === method.value
                                  ? `bg-gray-700 text-white`
                                  : `bg-gray-100 text-gray-800 hover:bg-gray-200`
                              }`}
                              onClick={() =>
                                setSelectedOrder({
                                  ...selectedOrder,
                                  paymentMethod: method.value,
                                })
                              }
                            >
                              {method.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Payment Status
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            {
                              value: "pending",
                              label: "Pending",
                              color: "yellow",
                            },
                            { value: "paid", label: "Paid", color: "green" },
                            { value: "failed", label: "Failed", color: "red" },
                          ].map((status) => (
                            <button
                              key={status.value}
                              type="button"
                              className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                                (selectedOrder.paymentDetails?.status ||
                                  "pending") === status.value
                                  ? `bg-${status.color}-600 text-white`
                                  : `bg-${status.color}-100 text-${status.color}-800 hover:bg-${status.color}-200`
                              }`}
                              onClick={() =>
                                setSelectedOrder({
                                  ...selectedOrder,
                                  paymentDetails: {
                                    ...selectedOrder.paymentDetails,
                                    status: status.value,
                                  },
                                })
                              }
                            >
                              {status.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-24"
                      value={selectedOrder.notes || ""}
                      onChange={(e) =>
                        setSelectedOrder({
                          ...selectedOrder,
                          notes: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                </div>

                <div className="border-t border-gray-200 p-6 flex justify-end space-x-4">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    onClick={() => {
                      setIsEditing(false);
                      setSelectedOrder(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderManagement;
