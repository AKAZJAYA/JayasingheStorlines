import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiBarChart2, FiDollarSign, FiTrendingUp, FiTrendingDown, 
  FiUsers, FiCalendar, FiFilter, FiChevronDown, FiSearch,
  FiShoppingBag, FiPieChart, FiMap, FiDownload, FiRefreshCw
} from 'react-icons/fi';

const SalesManagement = () => {
  // State management
  const [timeframe, setTimeframe] = useState('month');
  const [salesFilter, setSalesFilter] = useState('all');
  const [salesPeriod, setSalesPeriod] = useState('current');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Mock data for sales overview
  const salesOverview = {
    total: 'Rs. 4,586,320',
    growth: '+14.5%',
    isPositive: true,
    transactionCount: '1,248',
    transactionGrowth: '+8.2%',
    avgOrder: 'Rs. 3,675',
    avgOrderGrowth: '+5.3%',
    conversionRate: '3.2%',
    conversionGrowth: '+0.5%'
  };
  
  // Mock data for top selling categories
  const topCategories = [
    { name: 'Electronics', sales: 'Rs. 1,256,800', percentage: 27.4 },
    { name: 'Smartphones', sales: 'Rs. 982,500', percentage: 21.4 },
    { name: 'Furniture', sales: 'Rs. 754,320', percentage: 16.4 },
    { name: 'Gaming', sales: 'Rs. 485,200', percentage: 10.6 },
    { name: 'Appliances', sales: 'Rs. 356,750', percentage: 7.8 }
  ];
  
  // Mock data for top selling products
  const topProducts = [
    { 
      id: 1, 
      name: 'Samsung 65" QLED TV', 
      category: 'Electronics',
      sales: 48,
      revenue: 'Rs. 7,200,000',
      growth: '+12%',
      isPositive: true
    },
    { 
      id: 2, 
      name: 'Apple iPhone 14 Pro', 
      category: 'Smartphones',
      sales: 36,
      revenue: 'Rs. 9,000,000',
      growth: '+8%',
      isPositive: true
    },
    { 
      id: 3, 
      name: 'Modern L-Shaped Sofa', 
      category: 'Furniture',
      sales: 32,
      revenue: 'Rs. 4,800,000',
      growth: '+15%',
      isPositive: true
    },
    { 
      id: 4, 
      name: 'Sony PlayStation 5', 
      category: 'Gaming',
      sales: 28,
      revenue: 'Rs. 2,800,000', 
      growth: '-3%',
      isPositive: false
    },
    { 
      id: 5, 
      name: 'Dell XPS 15 Laptop', 
      category: 'Electronics',
      sales: 25,
      revenue: 'Rs. 5,000,000',
      growth: '+5%',
      isPositive: true
    }
  ];
  
  // Mock data for regional sales
  const regionalSales = [
    { region: 'Colombo', sales: 'Rs. 1,842,500', percentage: 40.2 },
    { region: 'Kandy', sales: 'Rs. 754,320', percentage: 16.4 },
    { region: 'Galle', sales: 'Rs. 582,560', percentage: 12.7 },
    { region: 'Jaffna', sales: 'Rs. 365,250', percentage: 8.0 },
    { region: 'Negombo', sales: 'Rs. 312,450', percentage: 6.8 }
  ];
  
  // Mock data for sales channels
  const salesChannels = [
    { channel: 'In-store', sales: 'Rs. 2,156,750', percentage: 47.0 },
    { channel: 'Website', sales: 'Rs. 1,528,420', percentage: 33.3 },
    { channel: 'Mobile App', sales: 'Rs. 642,850', percentage: 14.0 },
    { channel: 'Phone Orders', sales: 'Rs. 258,300', percentage: 5.7 }
  ];
  
  // Handle time frame change
  const handleTimeframeChange = (value) => {
    setTimeframe(value);
  };
  
  // Render progress bar
  const renderProgressBar = (percentage) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Sales Management</h1>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center text-gray-700 hover:bg-gray-50">
            <FiDownload className="mr-2" /> Export
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center text-gray-700 hover:bg-gray-50">
            <FiRefreshCw className="mr-2" /> Refresh
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
                value={timeframe}
                onChange={(e) => handleTimeframeChange(e.target.value)}
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
                onChange={(e) => setSelectedCategory(e.target.value)}
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
                salesPeriod === 'previous' 
                  ? 'bg-gray-100 text-gray-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-300 rounded-l-lg`}
              onClick={() => setSalesPeriod('previous')}
            >
              Previous Period
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                salesPeriod === 'current' 
                  ? 'bg-gray-100 text-gray-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border-t border-b border-r border-gray-300`}
              onClick={() => setSalesPeriod('current')}
            >
              Current Period
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                salesPeriod === 'comparison' 
                  ? 'bg-gray-100 text-gray-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border-t border-b border-r border-gray-300 rounded-r-md`}
              onClick={() => setSalesPeriod('comparison')}
            >
              Comparison
            </button>
          </div>
        </div>
      </div>

      {/* Sales Overview Stats */}
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
              <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
              <div className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{salesOverview.total}</p>
                <span className={`ml-2 text-sm font-medium ${salesOverview.isPositive ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                  {salesOverview.isPositive ? 
                    <FiTrendingUp className="mr-1" /> : 
                    <FiTrendingDown className="mr-1" />
                  }
                  {salesOverview.growth}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Compared to previous period</p>
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
              <h3 className="text-sm font-medium text-gray-500">Transactions</h3>
              <div className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{salesOverview.transactionCount}</p>
                <span className="ml-2 text-sm font-medium text-green-600 flex items-center">
                  <FiTrendingUp className="mr-1" /> 
                  {salesOverview.transactionGrowth}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Total completed orders</p>
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
              <h3 className="text-sm font-medium text-gray-500">Average Order</h3>
              <div className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{salesOverview.avgOrder}</p>
                <span className="ml-2 text-sm font-medium text-green-600 flex items-center">
                  <FiTrendingUp className="mr-1" /> 
                  {salesOverview.avgOrderGrowth}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Revenue per transaction</p>
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
              <h3 className="text-sm font-medium text-gray-500">Conversion Rate</h3>
              <div className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{salesOverview.conversionRate}</p>
                <span className="ml-2 text-sm font-medium text-green-600 flex items-center">
                  <FiTrendingUp className="mr-1" /> 
                  {salesOverview.conversionGrowth}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Visitors who made a purchase</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sales Charts and Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm border border-gray-200 lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Sales Trend</h2>
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Quarterly</option>
            </select>
          </div>
          <div className="p-6 h-80 flex items-center justify-center">
            <div className="text-center">
              <FiBarChart2 className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-500">Sales chart will be displayed here</p>
              <p className="text-sm text-gray-400 mt-1">Connect to actual data source for real-time updates</p>
            </div>
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
            <h2 className="text-lg font-semibold text-gray-800">Sales by Category</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {topCategories.map((category, index) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-800">{category.name}</span>
                    <span className="text-sm text-gray-500">{category.sales} ({category.percentage}%)</span>
                  </div>
                  {renderProgressBar(category.percentage)}
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <FiPieChart className="text-gray-300 h-24 w-24" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Top Selling Products */}
      <motion.div 
        className="bg-white rounded-xl shadow-sm border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Top Selling Products</h2>
          <button className="text-primary font-medium text-sm flex items-center">
            View All Products
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Units Sold
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Growth
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">{product.category}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{product.sales}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{product.revenue}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${product.isPositive ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                      {product.isPositive ? 
                        <FiTrendingUp className="mr-1" /> : 
                        <FiTrendingDown className="mr-1" />
                      }
                      {product.growth}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Sales Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Region */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Sales by Region</h2>
          </div>
          <div className="p-6 space-y-6">
            {regionalSales.map((region) => (
              <div key={region.region} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-800">{region.region}</span>
                  <span className="text-sm text-gray-500">{region.sales} ({region.percentage}%)</span>
                </div>
                {renderProgressBar(region.percentage)}
              </div>
            ))}
            <div className="mt-6 flex justify-center">
              <FiMap className="text-gray-300 h-24 w-24" />
            </div>
          </div>
        </motion.div>

        {/* Sales by Channel */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Sales by Channel</h2>
          </div>
          <div className="p-6 space-y-6">
            {salesChannels.map((channel) => (
              <div key={channel.channel} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-800">{channel.channel}</span>
                  <span className="text-sm text-gray-500">{channel.sales} ({channel.percentage}%)</span>
                </div>
                {renderProgressBar(channel.percentage)}
              </div>
            ))}
            <div className="mt-6 flex justify-center">
              <FiBarChart2 className="text-gray-300 h-24 w-24" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SalesManagement;