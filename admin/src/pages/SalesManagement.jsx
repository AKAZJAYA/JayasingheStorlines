import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  FiBarChart2,
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
  FiUsers,
  FiCalendar,
  FiFilter,
  FiChevronDown,
  FiSearch,
  FiShoppingBag,
  FiPieChart,
  FiMap,
  FiDownload,
  FiRefreshCw,
  FiLoader,
} from "react-icons/fi";
import {
  fetchSalesOverview,
  fetchSalesByCategory,
  fetchTopSellingProducts,
  fetchSalesTrends,
  setTimeframe,
  setFilters,
  clearError,
} from "../store/slices/salesSlice";

const SalesManagement = () => {
  const dispatch = useDispatch();

  // Redux state
  const {
    overview,
    salesByCategory,
    topProducts,
    salesTrends,
    loading,
    error,
    timeframe: currentTimeframe,
    filters,
  } = useSelector((state) => state.sales);

  // Local state management
  const [salesFilter, setSalesFilter] = useState("all");
  const [salesPeriod, setSalesPeriod] = useState("current");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch data on component mount and when filters change
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all sales data
        await Promise.all([
          dispatch(fetchSalesOverview(currentTimeframe)),
          dispatch(
            fetchSalesByCategory({ period: currentTimeframe, ...filters })
          ),
          dispatch(
            fetchTopSellingProducts({ period: currentTimeframe, limit: 5 })
          ),
          dispatch(fetchSalesTrends({ period: currentTimeframe })),
        ]);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchData();
  }, [dispatch, currentTimeframe, filters]);

  // Handle time frame change
  const handleTimeframeChange = (value) => {
    dispatch(setTimeframe(value));
  };

  // Handle category filter change
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    dispatch(setFilters({ category: value === "all" ? "" : value }));
  };

  // Handle refresh
  const handleRefresh = () => {
    dispatch(fetchSalesOverview(currentTimeframe));
    dispatch(fetchSalesByCategory({ period: currentTimeframe, ...filters }));
    dispatch(fetchTopSellingProducts({ period: currentTimeframe, limit: 5 }));
    dispatch(fetchSalesTrends({ period: currentTimeframe }));
  };

  // Handle export (placeholder)
  const handleExport = () => {
    // Implement export functionality
    console.log("Exporting sales data...");
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `Rs. ${amount?.toLocaleString() || "0"}`;
  };

  // Format percentage
  const formatPercentage = (value, showSign = true) => {
    const sign = showSign && value > 0 ? "+" : "";
    return `${sign}${value}%`;
  };

  // Render progress bar
  const renderProgressBar = (percentage) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
    );
  };

  // Loading component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-8">
      <FiLoader className="animate-spin h-8 w-8 text-primary mr-3" />
      <span className="text-gray-600">Loading sales data...</span>
    </div>
  );

  // Error component
  const ErrorDisplay = () => (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <FiAlertCircle className="h-5 w-5 text-red-400" />
        </div>
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
  );

  return (
    <div className="space-y-6">
      {/* Error Display */}
      {error && <ErrorDisplay />}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Sales Management
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center text-gray-700 hover:bg-gray-50"
            disabled={loading}
          >
            <FiDownload className="mr-2" /> Export
          </button>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center text-gray-700 hover:bg-gray-50"
            disabled={loading}
          >
            <FiRefreshCw className={`mr-2 ${loading ? "animate-spin" : ""}`} />{" "}
            Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                value={currentTimeframe}
                onChange={(e) => handleTimeframeChange(e.target.value)}
                disabled={loading}
              >
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
              <FiCalendar className="absolute left-3 top-3 text-gray-400" />
              <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
            </div>

            <div className="relative">
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                value={salesFilter}
                onChange={(e) => setSalesFilter(e.target.value)}
                disabled={loading}
              >
                <option value="all">All Sales</option>
                <option value="online">Online Sales</option>
                <option value="offline">In-Store Sales</option>
                <option value="app">Mobile App</option>
              </select>
              <FiFilter className="absolute left-3 top-3 text-gray-400" />
              <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
            </div>

            <div className="relative">
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                disabled={loading}
              >
                <option value="all">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="smartphones">Smartphones</option>
                <option value="furniture">Furniture</option>
                <option value="gaming">Gaming</option>
                <option value="appliances">Appliances</option>
              </select>
              <FiShoppingBag className="absolute left-3 top-3 text-gray-400" />
              <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>

          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                salesPeriod === "previous"
                  ? "bg-gray-100 text-gray-700"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border border-gray-300 rounded-l-lg`}
              onClick={() => setSalesPeriod("previous")}
              disabled={loading}
            >
              Previous Period
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                salesPeriod === "current"
                  ? "bg-gray-100 text-gray-700"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border-t border-b border-r border-gray-300`}
              onClick={() => setSalesPeriod("current")}
              disabled={loading}
            >
              Current Period
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                salesPeriod === "comparison"
                  ? "bg-gray-100 text-gray-700"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border-t border-b border-r border-gray-300 rounded-r-md`}
              onClick={() => setSalesPeriod("comparison")}
              disabled={loading}
            >
              Comparison
            </button>
          </div>
        </div>
      </div>

      {/* Show loading spinner when fetching data */}
      {loading && <LoadingSpinner />}

      {/* Sales Overview Stats */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                <FiDollarSign size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">
                  Total Sales
                </h3>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatCurrency(overview.totalSales)}
                  </p>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      overview.growth?.sales >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    } flex items-center`}
                  >
                    {overview.growth?.sales >= 0 ? (
                      <FiTrendingUp className="mr-1" />
                    ) : (
                      <FiTrendingDown className="mr-1" />
                    )}
                    {formatPercentage(overview.growth?.sales || 0)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Compared to previous period
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full text-green-600">
                <FiBarChart2 size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">
                  Total Revenue
                </h3>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatCurrency(overview.totalRevenue)}
                  </p>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      overview.growth?.revenue >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    } flex items-center`}
                  >
                    {overview.growth?.revenue >= 0 ? (
                      <FiTrendingUp className="mr-1" />
                    ) : (
                      <FiTrendingDown className="mr-1" />
                    )}
                    {formatPercentage(overview.growth?.revenue || 0)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Total completed orders
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                <FiShoppingBag size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">
                  Average Order
                </h3>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatCurrency(overview.avgOrderValue)}
                  </p>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      overview.growth?.avgOrder >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    } flex items-center`}
                  >
                    {overview.growth?.avgOrder >= 0 ? (
                      <FiTrendingUp className="mr-1" />
                    ) : (
                      <FiTrendingDown className="mr-1" />
                    )}
                    {formatPercentage(overview.growth?.avgOrder || 0)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Revenue per transaction
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full text-yellow-600">
                <FiUsers size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">
                  Conversion Rate
                </h3>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">
                    {overview.conversionRate}%
                  </p>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      overview.growth?.conversion >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    } flex items-center`}
                  >
                    {overview.growth?.conversion >= 0 ? (
                      <FiTrendingUp className="mr-1" />
                    ) : (
                      <FiTrendingDown className="mr-1" />
                    )}
                    {formatPercentage(overview.growth?.conversion || 0)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Visitors who made a purchase
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Sales Charts and Breakdowns */}
      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Chart */}
          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-200 lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Sales Trend
              </h2>
              <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Quarterly</option>
              </select>
            </div>
            <div className="p-6 h-80 flex items-center justify-center">
              {salesTrends && salesTrends.length > 0 ? (
                <div className="text-center">
                  <FiBarChart2 className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-gray-500">Chart implementation needed</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {salesTrends.length} data points available
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <FiBarChart2 className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-gray-500">No sales trend data available</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Sales by Category */}
          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Sales by Category
              </h2>
            </div>
            <div className="p-6">
              {salesByCategory &&
              Array.isArray(salesByCategory) &&
              salesByCategory.length > 0 ? (
                <div className="space-y-6">
                  {salesByCategory.map((category, index) => (
                    <div key={category.name || index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-800">
                          {category.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatCurrency(category.sales)} (
                          {category.percentage}%)
                        </span>
                      </div>
                      {renderProgressBar(category.percentage)}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FiPieChart className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-gray-500">No category data available</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Top Selling Products */}
      {!loading && (
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Top Selling Products
            </h2>
            <button className="text-primary font-medium text-sm flex items-center">
              View All Products
            </button>
          </div>

          {topProducts &&
          Array.isArray(topProducts) &&
          topProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Units Sold
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Revenue
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topProducts.map((product, index) => (
                    <tr
                      key={product.id || index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {product.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-500">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                          {product.quantitySold || product.sales}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          {formatCurrency(product.revenue)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <FiShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500">
                No top selling products data available.
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default SalesManagement;
