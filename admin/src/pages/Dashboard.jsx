import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiUsers, FiShoppingBag, FiShoppingCart, FiDollarSign, 
  FiArrowUp, FiArrowDown, FiEye, FiActivity
} from 'react-icons/fi';

const Dashboard = () => {
  // Mock data for dashboard
  const stats = [
    { 
      title: 'Total Users', 
      value: '2,540', 
      change: '+14%', 
      icon: <FiUsers />, 
      iconBg: 'bg-blue-100', 
      iconColor: 'text-blue-600',
      up: true
    },
    { 
      title: 'Products', 
      value: '356', 
      change: '+2%', 
      icon: <FiShoppingBag />, 
      iconBg: 'bg-purple-100', 
      iconColor: 'text-purple-600',
      up: true
    },
    { 
      title: 'Orders', 
      value: '1,204', 
      change: '+28%', 
      icon: <FiShoppingCart />, 
      iconBg: 'bg-green-100', 
      iconColor: 'text-green-600',
      up: true
    },
    { 
      title: 'Revenue', 
      value: 'Rs. 245,600', 
      change: '-3%', 
      icon: <FiDollarSign />, 
      iconBg: 'bg-red-100', 
      iconColor: 'text-red-600',
      up: false
    },
  ];

  const recentOrders = [
    { id: '#ORD-5723', customer: 'Saman Perera', date: '2023-04-18', total: 'Rs. 12,500', status: 'delivered' },
    { id: '#ORD-5722', customer: 'Nimali Silva', date: '2023-04-18', total: 'Rs. 8,750', status: 'processing' },
    { id: '#ORD-5721', customer: 'Kamal Jayasuriya', date: '2023-04-17', total: 'Rs. 24,300', status: 'delivered' },
    { id: '#ORD-5720', customer: 'Priya Fernando', date: '2023-04-17', total: 'Rs. 5,200', status: 'processing' },
    { id: '#ORD-5719', customer: 'Nimal Gunawardena', date: '2023-04-16', total: 'Rs. 18,900', status: 'delivered' },
  ];

  const topProducts = [
    { name: 'Samsung 65" QLED TV', sales: 48, revenue: 'Rs. 7,200,000' },
    { name: 'Apple iPhone 14 Pro', sales: 36, revenue: 'Rs. 9,000,000' },
    { name: 'Modern L-Shaped Sofa', sales: 32, revenue: 'Rs. 4,800,000' },
    { name: 'Sony PlayStation 5', sales: 28, revenue: 'Rs. 2,800,000' },
    { name: 'Dell XPS 15 Laptop', sales: 25, revenue: 'Rs. 5,000,000' },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'delivered':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Delivered</span>;
      case 'processing':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Processing</span>;
      case 'shipped':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Shipped</span>;
      case 'cancelled':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Cancelled</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>
        <div className="text-sm text-gray-600">Last updated: April 19, 2023 | 10:45 AM</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.iconBg} ${stat.iconColor}`}>
                {stat.icon}
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <span className={`ml-2 text-sm font-medium ${stat.up ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                    {stat.up ? <FiArrowUp className="mr-1" /> : <FiArrowDown className="mr-1" />}
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
            <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
            <button className="text-primary font-medium text-sm flex items-center">
              View All <FiEye className="ml-1" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(order.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            <h2 className="text-lg font-semibold text-gray-800">Top Selling Products</h2>
          </div>
          <div className="p-6 space-y-6">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-gray-500">{product.sales} sold</span>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="text-sm text-gray-500">{product.revenue}</span>
                  </div>
                </div>
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-800 font-semibold text-sm">
                  {index + 1}
                </div>
              </div>
            ))}
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
          <h2 className="text-lg font-semibold text-gray-800">Sales Overview</h2>
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
            <p className="text-gray-500">Sales chart will be displayed here</p>
            <p className="text-sm text-gray-400 mt-1">Connect to actual data source for real-time updates</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;