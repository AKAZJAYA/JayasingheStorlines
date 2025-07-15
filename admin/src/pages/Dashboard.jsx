import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiShoppingBag,
  FiShoppingCart,
  FiDollarSign,
  FiArrowUp,
  FiArrowDown,
  FiEye,
  FiActivity,
  FiRefreshCw,
  FiAlertCircle,
} from "react-icons/fi";
import {
  fetchDashboardStats,
  fetchRecentOrders,
  fetchTopProducts,
  clearError,
  refreshDashboard,
} from "../store/slices/dashboardSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, recentOrders, topProducts, loading, error, lastUpdated } =
    useSelector((state) => state.dashboard);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchRecentOrders(5));
    dispatch(fetchTopProducts(5));
  }, [dispatch]);

  // Handle refresh
  const handleRefresh = () => {
    dispatch(refreshDashboard());
    dispatch(fetchDashboardStats());
    dispatch(fetchRecentOrders(5));
    dispatch(fetchTopProducts(5));
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `Rs. ${amount?.toLocaleString() || "0"}`;
  };

  // Format percentage
  const formatPercentage = (value) => {
    const sign = value > 0 ? "+" : "";
    return `${sign}${value}%`;
  };

  // Create stats array from Redux state
  const statsArray = [
    {
      title: "Total Users",
      value: stats.users?.totalUsers?.toLocaleString() || "0",
      change: formatPercentage(stats.users?.growth || 0),
      icon: <FiUsers />,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      up: (stats.users?.growth || 0) >= 0,
    },
    {
      title: "Products",
      value: stats.products?.totalProducts?.toLocaleString() || "0",
      change: formatPercentage(stats.products?.growth || 0),
      icon: <FiShoppingBag />,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      up: (stats.products?.growth || 0) >= 0,
    },
    {
      title: "Orders",
      value: stats.orders?.totalOrders?.toLocaleString() || "0",
      change: formatPercentage(stats.orders?.growth || 0),
      icon: <FiShoppingCart />,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      up: (stats.orders?.growth || 0) >= 0,
    },
    {
      title: "Revenue",
      value: formatCurrency(stats.orders?.revenue || 0),
      change: formatPercentage(stats.sales?.growth || 0),
      icon: <FiDollarSign />,
      iconBg: (stats.sales?.growth || 0) >= 0 ? "bg-green-100" : "bg-red-100",
      iconColor:
        (stats.sales?.growth || 0) >= 0 ? "text-green-600" : "text-red-600",
      up: (stats.sales?.growth || 0) >= 0,
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "delivered":
        return (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
            Delivered
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
            Shipped
          </span>
        );
      case "cancelled":
        return (
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
            Cancelled
          </span>
        );
      case "pending":
        return (
          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
            Pending
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

  // Loading component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      <span className="ml-2 text-gray-600">Loading dashboard data...</span>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Dashboard Overview
        </h1>
        <div className="flex items-center space-x-4">
          {lastUpdated && (
            <div className="text-sm text-gray-600">
              Last updated: {new Date(lastUpdated).toLocaleString()}
            </div>
          )}
          <button
            onClick={handleRefresh}
            className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            <FiRefreshCw className={`mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="flex items-center">
            <FiAlertCircle className="text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
            <button
              onClick={() => dispatch(clearError())}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}

      {/* Show loading or content */}
      {loading && statsArray.every((stat) => stat.value === "0") ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsArray.map((stat, index) => (
              <motion.div
                key={stat.title}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center">
                  <div
                    className={`p-3 rounded-full ${stat.iconBg} ${stat.iconColor}`}
                  >
                    {stat.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </h3>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </p>
                      <span
                        className={`ml-2 text-sm font-medium ${
                          stat.up ? "text-green-600" : "text-red-600"
                        } flex items-center`}
                      >
                        {stat.up ? (
                          <FiArrowUp className="mr-1" />
                        ) : (
                          <FiArrowDown className="mr-1" />
                        )}
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Recent Orders & Top Products */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-200 lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Recent Orders
                </h2>
                <button className="text-primary font-medium text-sm flex items-center hover:text-blue-700 transition-colors">
                  View All <FiEye className="ml-1" />
                </button>
              </div>
              <div className="overflow-x-auto">
                {recentOrders && recentOrders.length > 0 ? (
                  <table className="w-full">
                    <thead className="bg-gray-50 text-left">
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentOrders.map((order) => (
                        <tr
                          key={order._id || order.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                            {order.orderNumber || order._id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {order.user?.name || order.customerName || "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(
                              order.createdAt || order.date
                            ).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {formatCurrency(order.totalAmount || order.total)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(order.status)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    No recent orders found
                  </div>
                )}
              </div>
            </motion.div>

            {/* Top Products */}
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">
                  Top Selling Products
                </h2>
              </div>
              <div className="p-6">
                {topProducts &&
                Array.isArray(topProducts) &&
                topProducts.length > 0 ? (
                  <div className="space-y-6">
                    {topProducts.map((product, index) => (
                      <div
                        key={product._id || product.id || index}
                        className="flex justify-between items-center"
                      >
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-800">
                            {product.name || product.productName}
                          </h3>
                          <div className="flex items-center mt-1">
                            <span className="text-sm text-gray-500">
                              {product.sales || product.totalSold || 0} sold
                            </span>
                            <span className="mx-2 text-gray-300">|</span>
                            <span className="text-sm text-gray-500">
                              {formatCurrency(
                                product.revenue || product.totalRevenue
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-800 font-semibold text-sm">
                          {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    No top products data available
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sales Chart */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Sales Overview
              </h2>
              <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>This Month</option>
                <option>Last Month</option>
              </select>
            </div>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <FiActivity className="mx-auto h-10 w-10 text-gray-300 mb-4" />
                <p className="text-gray-500">
                  Sales chart will be displayed here
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Connect to actual data source for real-time updates
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
