import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiTruck,
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
  FiPackage,
  FiClock,
  FiCheck,
  FiAlertTriangle,
  FiRefreshCw,
  FiActivity,
  FiBarChart2,
} from "react-icons/fi";
import {
  fetchDeliveries,
  fetchDeliveryStats,
  fetchDrivers,
  createDelivery,
  updateDelivery,
  updateDeliveryStatus,
  assignDriver,
  setFilters,
  setPage,
  clearCurrentDelivery,
  clearError,
} from "../store/slices/deliverySlice";

const DeliveryManagement = () => {
  const dispatch = useDispatch();

  // Redux state with safe defaults
  const {
    deliveries = [],
    drivers = [],
    currentDelivery,
    stats = {},
    loading = false,
    error = null,
    pagination = { page: 1, limit: 10, total: 0, totalPages: 0 },
    filters = {},
  } = useSelector((state) => state.deliveries || {});

  // Local state
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("deliveries");
  const [showAssignDriverModal, setShowAssignDriverModal] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    search: "",
    status: "",
    date: "",
    driver: "",
  });

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchDeliveries({}));
    dispatch(fetchDeliveryStats());
    dispatch(fetchDrivers());
  }, [dispatch]);

  // Fetch deliveries when filters change
  useEffect(() => {
    const params = {
      page: pagination.page,
      limit: pagination.limit,
      search: localFilters.search,
      status: localFilters.status,
      dateFrom: localFilters.date,
      driverId: localFilters.driver,
    };

    // Remove empty parameters
    Object.keys(params).forEach((key) => {
      if (!params[key]) delete params[key];
    });

    dispatch(fetchDeliveries(params));
  }, [dispatch, pagination.page, localFilters]);

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
    dispatch(setPage(1)); // Reset to first page when filters change
  };

  // Reset filters
  const resetFilters = () => {
    setLocalFilters({
      search: "",
      status: "",
      date: "",
      driver: "",
    });
    dispatch(setPage(1));
  };

  // Pagination handler
  const handlePageChange = (pageNumber) => {
    dispatch(setPage(pageNumber));
  };

  // Status badges
  const getStatusBadge = (status) => {
    switch (status) {
      case "delivered":
        return (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs flex items-center whitespace-nowrap">
            <FiCheck className="mr-1" /> Delivered
          </span>
        );
      case "in_transit":
        return (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center whitespace-nowrap">
            <FiTruck className="mr-1" /> In Transit
          </span>
        );
      case "scheduled":
        return (
          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs flex items-center whitespace-nowrap">
            <FiCalendar className="mr-1" /> Scheduled
          </span>
        );
      case "pending":
        return (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs flex items-center whitespace-nowrap">
            <FiClock className="mr-1" /> Pending
          </span>
        );
      case "failed":
        return (
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs flex items-center whitespace-nowrap">
            <FiAlertTriangle className="mr-1" /> Failed
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

  // Handlers
  const handleViewDelivery = (delivery) => {
    setSelectedDelivery(delivery);
    setIsEditing(false);
  };

  const handleEditDelivery = (delivery) => {
    setSelectedDelivery({ ...delivery });
    setIsEditing(true);
  };

  const handleDeleteDelivery = async (id) => {
    if (window.confirm("Are you sure you want to delete this delivery?")) {
      try {
        // Implement delete functionality in deliverySlice if needed
        // For now, we'll just refresh the data
        dispatch(fetchDeliveries({}));
        if (selectedDelivery && selectedDelivery._id === id) {
          setSelectedDelivery(null);
        }
      } catch (error) {
        console.error("Error deleting delivery:", error);
      }
    }
  };

  const handleUpdateDeliveryStatus = async (id, newStatus) => {
    try {
      await dispatch(
        updateDeliveryStatus({ deliveryId: id, status: newStatus })
      ).unwrap();

      // Update selected delivery if it's the one being updated
      if (selectedDelivery && selectedDelivery._id === id) {
        setSelectedDelivery((prev) => ({
          ...prev,
          status: newStatus,
          actualDeliveryTime:
            newStatus === "delivered"
              ? new Date().toISOString()
              : prev.actualDeliveryTime,
        }));
      }

      // Refresh stats
      dispatch(fetchDeliveryStats());
    } catch (error) {
      console.error("Error updating delivery status:", error);
    }
  };

  const handleAssignDriver = async (deliveryId, driverId) => {
    try {
      await dispatch(assignDriver({ deliveryId, driverId })).unwrap();
      setShowAssignDriverModal(false);

      // Update selected delivery if it's the one being updated
      if (selectedDelivery && selectedDelivery._id === deliveryId) {
        const driver = drivers.find((d) => d.id === driverId);
        setSelectedDelivery((prev) => ({
          ...prev,
          driver: driver,
        }));
      }
    } catch (error) {
      console.error("Error assigning driver:", error);
    }
  };

  const handleSaveDelivery = async (deliveryData) => {
    try {
      if (selectedDelivery._id) {
        // Update existing delivery
        await dispatch(
          updateDelivery({
            deliveryId: selectedDelivery._id,
            deliveryData,
          })
        ).unwrap();
      } else {
        // Create new delivery (if needed)
        await dispatch(createDelivery(deliveryData)).unwrap();
      }

      setIsEditing(false);
      setSelectedDelivery(null);

      // Refresh data
      dispatch(fetchDeliveries({}));
      dispatch(fetchDeliveryStats());
    } catch (error) {
      console.error("Error saving delivery:", error);
    }
  };

  // Show loading spinner
  if (loading && deliveries.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error handling */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <FiAlertTriangle className="text-red-400 mt-0.5 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-1 text-sm text-red-700">{error}</div>
            </div>
            <button
              onClick={() => dispatch(clearError())}
              className="ml-auto text-red-400 hover:text-red-600"
            >
              <FiX />
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Delivery Management
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              dispatch(fetchDeliveries({}));
              dispatch(fetchDeliveryStats());
              dispatch(fetchDrivers());
            }}
            className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            disabled={loading}
          >
            <FiRefreshCw className={`mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <div className="text-sm text-gray-600">
            Total Deliveries: {pagination.total || 0}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "deliveries"
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("deliveries")}
          >
            <FiTruck className="inline mr-2" /> Deliveries
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "drivers"
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("drivers")}
          >
            <FiUser className="inline mr-2" /> Drivers
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "analytics"
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("analytics")}
          >
            <FiActivity className="inline mr-2" /> Analytics
          </button>
        </div>
      </div>

      {activeTab === "deliveries" && (
        <>
          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <motion.div
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-xs text-gray-500 mb-1">Total Deliveries</div>
              <div className="text-2xl font-semibold">{stats.total || 0}</div>
            </motion.div>

            <motion.div
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="text-xs text-gray-500 mb-1">Delivered</div>
              <div className="text-2xl font-semibold text-green-600">
                {stats.delivered || 0}
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-xs text-gray-500 mb-1">In Transit</div>
              <div className="text-2xl font-semibold text-blue-600">
                {stats.inTransit || 0}
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <div className="text-xs text-gray-500 mb-1">Scheduled</div>
              <div className="text-2xl font-semibold text-purple-600">
                {stats.scheduled || 0}
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-xs text-gray-500 mb-1">Pending</div>
              <div className="text-2xl font-semibold text-yellow-600">
                {stats.pending || 0}
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <div className="text-xs text-gray-500 mb-1">Failed</div>
              <div className="text-2xl font-semibold text-red-600">
                {stats.failed || 0}
              </div>
            </motion.div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search deliveries or customers..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    value={localFilters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                  />
                  <FiSearch className="absolute left-3 top-3 text-gray-400" />
                </div>

                <div className="relative">
                  <select
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                    value={localFilters.status}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                  >
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="in_transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                    <option value="failed">Failed</option>
                  </select>
                  <FiFilter className="absolute left-3 top-3 text-gray-400" />
                  <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
                </div>

                <div className="relative">
                  <input
                    type="date"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    value={localFilters.date}
                    onChange={(e) => handleFilterChange("date", e.target.value)}
                  />
                  <FiCalendar className="absolute left-3 top-3 text-gray-400" />
                </div>

                <div className="relative">
                  <select
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                    value={localFilters.driver}
                    onChange={(e) =>
                      handleFilterChange("driver", e.target.value)
                    }
                  >
                    <option value="">All Drivers</option>
                    {Array.isArray(drivers) &&
                      drivers.map((driver) => (
                        <option key={driver.id} value={driver.id}>
                          {driver.name}
                        </option>
                      ))}
                  </select>
                  <FiUser className="absolute left-3 top-3 text-gray-400" />
                  <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
                </div>
              </div>

              {(localFilters.search ||
                localFilters.status ||
                localFilters.date ||
                localFilters.driver) && (
                <button
                  onClick={resetFilters}
                  className="flex items-center text-gray-600 hover:text-gray-800"
                >
                  <FiX className="mr-1" /> Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Deliveries Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Delivery ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Order
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Driver
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Schedule
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                  {Array.isArray(deliveries) &&
                    deliveries.map((delivery) => (
                      <tr
                        key={delivery._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-primary">
                            {delivery.deliveryId}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {delivery.orderId?.orderNumber || "N/A"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {delivery.orderId?.items?.length || 0} items
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {delivery.customer?.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {delivery.customer?.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {delivery.driver ? (
                            <>
                              <div className="text-sm font-medium text-gray-900">
                                {delivery.driver.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {delivery.driver.vehicle}
                              </div>
                            </>
                          ) : (
                            <button
                              className="px-2 py-1 text-xs border border-gray-300 rounded bg-gray-50 hover:bg-gray-100 text-gray-600"
                              onClick={() => {
                                setSelectedDelivery(delivery);
                                setShowAssignDriverModal(true);
                              }}
                            >
                              Assign Driver
                            </button>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(
                              delivery.scheduledDate
                            ).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {delivery.scheduledTime}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(delivery.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleViewDelivery(delivery)}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="View details"
                            >
                              <FiEye />
                            </button>
                            <button
                              onClick={() => handleEditDelivery(delivery)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Edit delivery"
                            >
                              <FiEdit2 />
                            </button>
                            <button
                              onClick={() => handleDeleteDelivery(delivery._id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete delivery"
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
                deliveries
              </div>
              <div className="flex space-x-2">
                <button
                  className={`px-3 py-1 rounded ${
                    pagination.page === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() =>
                    pagination.page > 1 && handlePageChange(pagination.page - 1)
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
          </div>
        </>
      )}

      {activeTab === "drivers" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Driver ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Contact
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Vehicle
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Deliveries
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Array.isArray(drivers) &&
                  drivers.map((driver) => (
                    <tr
                      key={driver.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-primary">
                          {driver.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {driver.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {driver.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {driver.vehicle}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          {driver.status || "Active"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {driver.deliveriesCompleted || 0}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-center py-16">
            <FiBarChart2 className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500">
              Delivery analytics will be displayed here
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Connect to actual data source for real-time updates
            </p>
          </div>
        </div>
      )}

      {/* Delivery Detail Modal */}
      <AnimatePresence>
        {selectedDelivery && !isEditing && !showAssignDriverModal && (
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
                  Delivery Details:{" "}
                  <span className="text-primary">
                    {selectedDelivery.deliveryId}
                  </span>
                </h2>
                <div>{getStatusBadge(selectedDelivery.status)}</div>
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
                      {selectedDelivery.customer?.name}
                    </p>
                    <div className="flex items-start">
                      <FiMail className="mt-0.5 mr-2 text-gray-400" />
                      <span>{selectedDelivery.customer?.email}</span>
                    </div>
                    <div className="flex items-start">
                      <FiPhone className="mt-0.5 mr-2 text-gray-400" />
                      <span>{selectedDelivery.customer?.phone}</span>
                    </div>
                    <div className="flex items-start">
                      <FiMapPin className="mt-0.5 mr-2 text-gray-400" />
                      <span>{selectedDelivery.customer?.address}</span>
                    </div>
                  </div>
                </div>

                {/* Driver Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                    <FiUser className="mr-2 text-primary" /> Driver Information
                  </h3>
                  {selectedDelivery.driver ? (
                    <div className="space-y-2 text-sm">
                      <p className="font-medium">
                        {selectedDelivery.driver.name}
                      </p>
                      <div className="flex items-start">
                        <FiPhone className="mt-0.5 mr-2 text-gray-400" />
                        <span>{selectedDelivery.driver.phone}</span>
                      </div>
                      <div className="flex items-start">
                        <FiTruck className="mt-0.5 mr-2 text-gray-400" />
                        <span>{selectedDelivery.driver.vehicle}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-24">
                      <p className="text-gray-500 mb-2">
                        No driver assigned yet
                      </p>
                      <button
                        className="px-4 py-2 bg-primary text-white rounded-lg text-sm"
                        onClick={() => setShowAssignDriverModal(true)}
                      >
                        Assign Driver
                      </button>
                    </div>
                  )}
                </div>

                {/* Delivery Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                    <FiPackage className="mr-2 text-primary" /> Delivery
                    Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order ID:</span>
                      <span className="font-medium">
                        {selectedDelivery.orderId?.orderNumber || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Scheduled:</span>
                      <span className="font-medium">
                        {new Date(
                          selectedDelivery.scheduledDate
                        ).toLocaleDateString()}
                        , {selectedDelivery.scheduledTime}
                      </span>
                    </div>
                    {selectedDelivery.actualDeliveryTime && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivered At:</span>
                        <span className="font-medium">
                          {new Date(
                            selectedDelivery.actualDeliveryTime
                          ).toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Items:</span>
                      <span className="font-medium">
                        {selectedDelivery.orderId?.items?.length || 0}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {selectedDelivery.notes && (
                  <div className="md:col-span-3">
                    <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                      <div className="flex">
                        <FiAlertTriangle className="flex-shrink-0 text-yellow-400 mt-0.5" />
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">
                            Notes
                          </h3>
                          <div className="mt-2 text-sm text-yellow-700">
                            {selectedDelivery.notes}
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
                      <button
                        className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                          selectedDelivery.status === "pending"
                            ? "bg-yellow-600 text-white"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        }`}
                        onClick={() =>
                          handleUpdateDeliveryStatus(
                            selectedDelivery._id,
                            "pending"
                          )
                        }
                        disabled={loading}
                      >
                        <FiClock className="inline mr-1" /> Pending
                      </button>
                      <button
                        className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                          selectedDelivery.status === "scheduled"
                            ? "bg-purple-600 text-white"
                            : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                        }`}
                        onClick={() =>
                          handleUpdateDeliveryStatus(
                            selectedDelivery._id,
                            "scheduled"
                          )
                        }
                        disabled={loading}
                      >
                        <FiCalendar className="inline mr-1" /> Scheduled
                      </button>
                      <button
                        className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                          selectedDelivery.status === "in_transit"
                            ? "bg-blue-600 text-white"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                        }`}
                        onClick={() =>
                          handleUpdateDeliveryStatus(
                            selectedDelivery._id,
                            "in_transit"
                          )
                        }
                        disabled={loading}
                      >
                        <FiTruck className="inline mr-1" /> In Transit
                      </button>
                      <button
                        className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                          selectedDelivery.status === "delivered"
                            ? "bg-green-600 text-white"
                            : "bg-green-100 text-green-800 hover:bg-green-200"
                        }`}
                        onClick={() =>
                          handleUpdateDeliveryStatus(
                            selectedDelivery._id,
                            "delivered"
                          )
                        }
                        disabled={loading}
                      >
                        <FiCheck className="inline mr-1" /> Delivered
                      </button>
                      <button
                        className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                          selectedDelivery.status === "failed"
                            ? "bg-red-600 text-white"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }`}
                        onClick={() =>
                          handleUpdateDeliveryStatus(
                            selectedDelivery._id,
                            "failed"
                          )
                        }
                        disabled={loading}
                      >
                        <FiAlertTriangle className="inline mr-1" /> Failed
                      </button>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      onClick={() => setSelectedDelivery(null)}
                    >
                      Close
                    </button>
                    <button
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700"
                      onClick={() => handleEditDelivery(selectedDelivery)}
                    >
                      Edit Delivery
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Delivery Modal */}
      <AnimatePresence>
        {selectedDelivery && isEditing && (
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
                  Edit Delivery:{" "}
                  <span className="text-primary">
                    {selectedDelivery.deliveryId}
                  </span>
                </h2>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveDelivery(selectedDelivery);
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
                          Name
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          value={selectedDelivery.customer?.name || ""}
                          onChange={(e) =>
                            setSelectedDelivery({
                              ...selectedDelivery,
                              customer: {
                                ...selectedDelivery.customer,
                                name: e.target.value,
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
                          value={selectedDelivery.customer?.email || ""}
                          onChange={(e) =>
                            setSelectedDelivery({
                              ...selectedDelivery,
                              customer: {
                                ...selectedDelivery.customer,
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
                          value={selectedDelivery.customer?.phone || ""}
                          onChange={(e) =>
                            setSelectedDelivery({
                              ...selectedDelivery,
                              customer: {
                                ...selectedDelivery.customer,
                                phone: e.target.value,
                              },
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          value={selectedDelivery.customer?.address || ""}
                          onChange={(e) =>
                            setSelectedDelivery({
                              ...selectedDelivery,
                              customer: {
                                ...selectedDelivery.customer,
                                address: e.target.value,
                              },
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Delivery Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Delivery Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Scheduled Date
                        </label>
                        <input
                          type="date"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          value={
                            selectedDelivery.scheduledDate
                              ? new Date(selectedDelivery.scheduledDate)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            setSelectedDelivery({
                              ...selectedDelivery,
                              scheduledDate: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Scheduled Time
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          value={selectedDelivery.scheduledTime || ""}
                          onChange={(e) =>
                            setSelectedDelivery({
                              ...selectedDelivery,
                              scheduledTime: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <select
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          value={selectedDelivery.status}
                          onChange={(e) =>
                            setSelectedDelivery({
                              ...selectedDelivery,
                              status: e.target.value,
                            })
                          }
                          required
                        >
                          <option value="pending">Pending</option>
                          <option value="scheduled">Scheduled</option>
                          <option value="in_transit">In Transit</option>
                          <option value="delivered">Delivered</option>
                          <option value="failed">Failed</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Driver Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Driver Information
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Assigned Driver
                        </label>
                        <select
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          value={selectedDelivery.driver?.id || ""}
                          onChange={(e) => {
                            if (!e.target.value) {
                              // Remove driver
                              const deliveryWithoutDriver = {
                                ...selectedDelivery,
                              };
                              delete deliveryWithoutDriver.driver;
                              setSelectedDelivery(deliveryWithoutDriver);
                            } else {
                              // Assign driver
                              const driver = drivers.find(
                                (d) => d.id === e.target.value
                              );
                              setSelectedDelivery({
                                ...selectedDelivery,
                                driver: driver,
                              });
                            }
                          }}
                        >
                          <option value="">No Driver</option>
                          {Array.isArray(drivers) &&
                            drivers.map((driver) => (
                              <option key={driver.id} value={driver.id}>
                                {driver.name} - {driver.vehicle}
                              </option>
                            ))}
                        </select>
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
                      value={selectedDelivery.notes || ""}
                      onChange={(e) =>
                        setSelectedDelivery({
                          ...selectedDelivery,
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
                      setSelectedDelivery(null);
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

      {/* Assign Driver Modal */}
      <AnimatePresence>
        {showAssignDriverModal && selectedDelivery && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  Assign Driver to Delivery
                </h2>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-2">
                    Delivery ID: {selectedDelivery.deliveryId}
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    Order ID: {selectedDelivery.orderId?.orderNumber || "N/A"}
                  </div>
                  <div className="text-sm text-gray-500">
                    Customer: {selectedDelivery.customer?.name}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Driver
                  </label>
                  <div className="mt-1 max-h-60 overflow-y-auto border border-gray-300 rounded-lg">
                    {Array.isArray(drivers) &&
                      drivers.map((driver) => (
                        <div
                          key={driver.id}
                          className="p-3 border-b border-gray-300 hover:bg-gray-50 cursor-pointer"
                          onClick={() =>
                            handleAssignDriver(selectedDelivery._id, driver.id)
                          }
                        >
                          <div className="font-medium">{driver.name}</div>
                          <div className="text-sm text-gray-500">
                            {driver.vehicle} • {driver.phone}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {driver.deliveriesCompleted || 0} deliveries
                            completed
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 p-6 flex justify-end">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowAssignDriverModal(false)}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeliveryManagement;
