import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiPackage, FiTruck, FiCheckCircle, FiClock, FiX, 
  FiChevronDown, FiChevronUp, FiSearch, FiFilter, FiCalendar,
  FiMapPin, FiShield
} from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import ServiceHighlights from '../components/ServiceHighlights';

// Mock order data for demonstration
const orderData = [
  {
    id: 'JS24050789',
    date: 'May 7, 2024',
    status: 'Delivered',
    total: 374999,
    items: [
      { 
        id: 'phone',
        name: 'Samsung Galaxy S24 Ultra', 
        price: 374999,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      }
    ],
    trackingHistory: [
      { status: 'Order Placed', date: 'May 7, 2024 - 10:35 AM', completed: true },
      { status: 'Payment Confirmed', date: 'May 7, 2024 - 11:20 AM', completed: true },
      { status: 'Processing', date: 'May 7, 2024 - 2:45 PM', completed: true },
      { status: 'Shipped', date: 'May 8, 2024 - 9:30 AM', completed: true },
      { status: 'Out for Delivery', date: 'May 9, 2024 - 8:15 AM', completed: true },
      { status: 'Delivered', date: 'May 9, 2024 - 2:40 PM', completed: true }
    ],
    deliveryAddress: {
      name: 'John Doe',
      address: '42 Main Street, Colombo 04',
      phone: '071-1234567'
    }
  },
  {
    id: 'JS24042512',
    date: 'April 25, 2024',
    status: 'Processing',
    total: 199999,
    items: [
      { 
        id: 'tv',
        name: 'LG 43 Inch UHD 4K Smart TV', 
        price: 199999,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      }
    ],
    trackingHistory: [
      { status: 'Order Placed', date: 'April 25, 2024 - 3:15 PM', completed: true },
      { status: 'Payment Confirmed', date: 'April 25, 2024 - 3:30 PM', completed: true },
      { status: 'Processing', date: 'April 26, 2024 - 10:20 AM', completed: true },
      { status: 'Shipped', date: 'Estimated April 29, 2024', completed: false },
      { status: 'Out for Delivery', date: 'Pending', completed: false },
      { status: 'Delivered', date: 'Pending', completed: false }
    ],
    deliveryAddress: {
      name: 'John Doe',
      address: '42 Main Street, Colombo 04',
      phone: '071-1234567'
    }
  },
  {
    id: 'JS24031856',
    date: 'March 18, 2024',
    status: 'Cancelled',
    total: 15990,
    items: [
      { 
        id: 'speaker',
        name: 'Bluetooth Speaker', 
        price: 15990,
        quantity: 1, 
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      }
    ],
    trackingHistory: [
      { status: 'Order Placed', date: 'March 18, 2024 - 5:45 PM', completed: true },
      { status: 'Payment Confirmed', date: 'March 18, 2024 - 5:55 PM', completed: true },
      { status: 'Cancelled', date: 'March 19, 2024 - 9:30 AM', completed: true, isCancellation: true },
    ],
    cancellationReason: 'Customer requested cancellation',
    deliveryAddress: {
      name: 'John Doe',
      address: '42 Main Street, Colombo 04',
      phone: '071-1234567'
    }
  }
];

const MyOrdersPage = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Format currency
  const formatter = new Intl.NumberFormat('en-US');
  
  // Toggle order details
  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };
  
  // Filter orders based on status and search query
  const filteredOrders = orderData.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });
  
  // Get status color
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'out for delivery':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get status icon
  const getStatusIcon = (status) => {
    switch(status.toLowerCase()) {
      case 'delivered':
        return <FiCheckCircle />;
      case 'processing':
        return <FiClock />;
      case 'shipped':
        return <FiTruck />;
      case 'out for delivery':
        return <FiTruck />;
      case 'cancelled':
        return <FiX />;
      default:
        return <FiPackage />;
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6 flex items-center">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-900">My Orders</span>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>
        
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
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-md w-full md:w-48 focus:ring-primary focus:border-primary appearance-none"
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
        
        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-6">
            {filteredOrders.map(order => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-bold text-lg">Order #{order.id}</h3>
                        <span className={`ml-4 px-3 py-1 rounded-full text-xs font-medium inline-flex items-center ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1">{order.status}</span>
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Placed on {order.date}</p>
                    </div>
                    <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Total</div>
                        <div className="font-bold">Rs. {formatter.format(order.total)}</div>
                      </div>
                      <button
                        onClick={() => toggleOrderDetails(order.id)}
                        className="text-primary hover:text-primary-dark"
                      >
                        {expandedOrder === order.id ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Order Details (expanded) */}
                {expandedOrder === order.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Order Items */}
                    <div className="p-6 border-b border-gray-200">
                      <h4 className="font-semibold mb-4">Order Items</h4>
                      <div className="space-y-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                              <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                            </div>
                            <div className="ml-4 flex-grow">
                              <Link to={`/product/${item.id}`} className="font-medium hover:text-primary">
                                {item.name}
                              </Link>
                              <div className="flex justify-between mt-1">
                                <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                                <div className="font-semibold">Rs. {formatter.format(item.price)}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Shipping Information */}
                    <div className="p-6 border-b border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-4 flex items-center">
                            <FiMapPin className="mr-2 text-primary" />
                            Delivery Address
                          </h4>
                          <div className="text-gray-700">
                            <p className="font-medium">{order.deliveryAddress.name}</p>
                            <p>{order.deliveryAddress.address}</p>
                            <p>{order.deliveryAddress.phone}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-4 flex items-center">
                            <FiShield className="mr-2 text-primary" />
                            Order Protection
                          </h4>
                          <p className="text-gray-700">
                            All products in this order are covered by our standard warranty policy. 
                            If you face any issues, please contact our customer service.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Order Timeline */}
                    <div className="p-6">
                      <h4 className="font-semibold mb-4">Order Timeline</h4>
                      <div className="relative pl-8 space-y-6 pb-2">
                        {/* Vertical line */}
                        <div className="absolute left-3 top-2 bottom-0 w-0.5 bg-gray-200"></div>
                        
                        {order.trackingHistory.map((step, index) => (
                          <div key={index} className="relative">
                            {/* Status dot */}
                            <div className={`absolute -left-8 w-6 h-6 rounded-full flex items-center justify-center ${
                              step.completed 
                                ? step.isCancellation 
                                  ? 'bg-red-500' 
                                  : 'bg-primary' 
                                : 'bg-gray-200'
                            }`}>
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            
                            <div>
                              <h5 className={`font-medium ${step.isCancellation ? 'text-red-600' : ''}`}>
                                {step.status}
                              </h5>
                              <p className="text-sm text-gray-500">{step.date}</p>
                              {step.isCancellation && order.cancellationReason && (
                                <p className="text-sm mt-1 text-red-600">
                                  Reason: {order.cancellationReason}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="p-6 bg-gray-50 flex flex-wrap gap-4 justify-end">
                      {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                        <button className="px-4 py-2 border border-red-500 text-red-500 rounded-md font-medium hover:bg-red-50">
                          Cancel Order
                        </button>
                      )}
                      <Link to={`/support/order/${order.id}`} className="px-4 py-2 border border-primary text-primary rounded-md font-medium hover:bg-primary/10">
                        Need Help?
                      </Link>
                      {order.status === 'Delivered' && (
                        <button className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary-dark">
                          Write a Review
                        </button>
                      )}
                      <button className="px-4 py-2 bg-gray-800 text-white rounded-md font-medium hover:bg-gray-700">
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
              {searchQuery || filterStatus !== 'all' 
                ? "No orders match your current filter criteria." 
                : "You haven't placed any orders yet."}
            </p>
            <Link 
              to="/" 
              className="inline-block px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary-dark"
            >
              Start Shopping
            </Link>
          </div>
        )}
        
        {/* Help Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h3 className="text-lg font-bold mb-4">Need Help With Your Order?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-md hover:border-primary hover:shadow-md transition-all">
              <h4 className="font-medium mb-2">Return & Refund Policy</h4>
              <p className="text-sm text-gray-600 mb-3">
                Learn about our easy return process and refund policies.
              </p>
              <Link to="/returns-policy" className="text-primary text-sm font-medium hover:underline">
                Read more
              </Link>
            </div>
            <div className="p-4 border border-gray-200 rounded-md hover:border-primary hover:shadow-md transition-all">
              <h4 className="font-medium mb-2">Shipping Information</h4>
              <p className="text-sm text-gray-600 mb-3">
                Get details on delivery timeframes and tracking options.
              </p>
              <Link to="/shipping-info" className="text-primary text-sm font-medium hover:underline">
                Read more
              </Link>
            </div>
            <div className="p-4 border border-gray-200 rounded-md hover:border-primary hover:shadow-md transition-all">
              <h4 className="font-medium mb-2">Contact Customer Service</h4>
              <p className="text-sm text-gray-600 mb-3">
                Our team is available 7 days a week to assist you.
              </p>
              <Link to="/contact-us" className="text-primary text-sm font-medium hover:underline">
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