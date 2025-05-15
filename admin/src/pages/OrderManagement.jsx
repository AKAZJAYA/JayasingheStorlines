import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPackage, FiSearch, FiFilter, FiChevronDown, FiEye, FiEdit2, 
  FiTrash2, FiX, FiCalendar, FiUser, FiMapPin, FiMail, FiPhone,
  FiTruck, FiCreditCard, FiAlertCircle
} from 'react-icons/fi';

const OrderManagement = () => {
  // Mock data for orders
  const [orders, setOrders] = useState([
    { 
      id: 'ORD-5723', 
      customer: {
        name: 'Saman Perera',
        email: 'saman@example.com',
        phone: '+94 771 234 567',
        address: '123 Main St, Colombo 05'
      },
      date: '2023-04-18',
      total: 12500,
      items: [
        { name: 'Samsung 65" QLED TV', quantity: 1, price: 150000, subtotal: 150000 },
        { name: 'HDMI Cable', quantity: 2, price: 1500, subtotal: 3000 }
      ],
      payment: {
        method: 'Credit Card',
        status: 'Paid',
        transactionId: 'TXN-78901234'
      },
      status: 'delivered',
      notes: 'Customer requested delivery after 6 PM'
    },
    { 
      id: 'ORD-5722', 
      customer: {
        name: 'Nimali Silva',
        email: 'nimali@example.com',
        phone: '+94 772 345 678',
        address: '456 Palm Ave, Kandy'
      },
      date: '2023-04-18',
      total: 87500,
      items: [
        { name: 'Apple iPhone 14 Pro', quantity: 1, price: 250000, subtotal: 250000 },
        { name: 'Phone Case', quantity: 1, price: 3500, subtotal: 3500 }
      ],
      payment: {
        method: 'Online Banking',
        status: 'Paid',
        transactionId: 'TXN-45678901'
      },
      status: 'processing',
      notes: ''
    },
    { 
      id: 'ORD-5721', 
      customer: {
        name: 'Kamal Jayasuriya',
        email: 'kamal@example.com',
        phone: '+94 773 456 789',
        address: '789 Ocean View, Galle'
      },
      date: '2023-04-17',
      total: 24300,
      items: [
        { name: 'Wireless Noise Cancelling Headphones', quantity: 1, price: 45000, subtotal: 45000 }
      ],
      payment: {
        method: 'Cash on Delivery',
        status: 'Pending',
        transactionId: ''
      },
      status: 'delivered',
      notes: ''
    },
    { 
      id: 'ORD-5720', 
      customer: {
        name: 'Priya Fernando',
        email: 'priya@example.com',
        phone: '+94 774 567 890',
        address: '101 Hill St, Nuwara Eliya'
      },
      date: '2023-04-17',
      total: 52000,
      items: [
        { name: 'Modern L-Shaped Sofa', quantity: 1, price: 150000, subtotal: 150000 }
      ],
      payment: {
        method: 'Debit Card',
        status: 'Paid',
        transactionId: 'TXN-23456789'
      },
      status: 'processing',
      notes: 'Requires installation'
    },
    { 
      id: 'ORD-5719', 
      customer: {
        name: 'Nimal Gunawardena',
        email: 'nimal@example.com',
        phone: '+94 775 678 901',
        address: '222 Lake Road, Colombo 06'
      },
      date: '2023-04-16',
      total: 18900,
      items: [
        { name: 'Dell XPS 15 Laptop', quantity: 1, price: 200000, subtotal: 200000 },
        { name: 'Laptop Bag', quantity: 1, price: 6500, subtotal: 6500 }
      ],
      payment: {
        method: 'Credit Card',
        status: 'Paid',
        transactionId: 'TXN-34567890'
      },
      status: 'delivered',
      notes: ''
    },
    { 
      id: 'ORD-5718', 
      customer: {
        name: 'Lakshmi Rajapaksa',
        email: 'lakshmi@example.com',
        phone: '+94 776 789 012',
        address: '333 Temple Road, Matara'
      },
      date: '2023-04-16',
      total: 145000,
      items: [
        { name: 'Smart Home Hub', quantity: 2, price: 25000, subtotal: 50000 },
        { name: 'Smart Light Bulbs (Pack of 4)', quantity: 3, price: 12000, subtotal: 36000 }
      ],
      payment: {
        method: 'Online Banking',
        status: 'Paid',
        transactionId: 'TXN-56789012'
      },
      status: 'shipped',
      notes: ''
    },
    { 
      id: 'ORD-5717', 
      customer: {
        name: 'Ashan Mendis',
        email: 'ashan@example.com',
        phone: '+94 777 890 123',
        address: '444 Beach Road, Negombo'
      },
      date: '2023-04-15',
      total: 65000,
      items: [
        { name: 'Teak Wood Dining Table', quantity: 1, price: 85000, subtotal: 85000 }
      ],
      payment: {
        method: 'Cash on Delivery',
        status: 'Pending',
        transactionId: ''
      },
      status: 'cancelled',
      notes: 'Customer changed their mind'
    }
  ]);
  
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'descending' });
  
  // Filter orders
  const filteredOrders = orders.filter(order => {
    return (
      (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
       order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === '' || order.status === filterStatus) &&
      (filterDate === '' || order.date.includes(filterDate))
    );
  });

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortConfig.key === 'total') {
      if (a.total < b.total) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a.total > b.total) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    } else {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    }
  });

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

  // Handlers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsEditing(false);
  };

  const handleEditOrder = (order) => {
    setSelectedOrder({...order});
    setIsEditing(true);
  };

  const handleUpdateOrderStatus = (id, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === id ? {...order, status: newStatus} : order
    );
    setOrders(updatedOrders);
    
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({...selectedOrder, status: newStatus});
    }
  };

  const handleDeleteOrder = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter(order => order.id !== id));
      if (selectedOrder && selectedOrder.id === id) {
        setSelectedOrder(null);
      }
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilterStatus('');
    setFilterDate('');
  };

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
      case 'pending':
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">Pending</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Order Management</h1>
        <div className="text-sm text-gray-600">Total Orders: {orders.length}</div>
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
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <FiFilter className="absolute left-3 top-3 text-gray-400" />
              <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
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
          
          {(searchTerm || filterStatus || filterDate) && (
            <button
              onClick={resetFilters}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <FiX className="mr-1" /> Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('id')}
                >
                  Order ID
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('customer')}
                >
                  Customer
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('date')}
                >
                  Date
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('total')}
                >
                  Total
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('status')}
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
              {currentOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-primary">{order.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                    <div className="text-sm text-gray-500">{order.customer.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Rs. {order.total.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
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
                        onClick={() => handleDeleteOrder(order.id)}
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
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{indexOfFirstOrder + 1}</span> to <span className="font-medium">
              {Math.min(indexOfLastOrder, filteredOrders.length)}
            </span> of <span className="font-medium">{filteredOrders.length}</span> orders
          </div>
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 rounded ${
                currentPage === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className={`px-3 py-1 rounded ${
                currentPage === totalPages 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
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
                  Order Details: <span className="text-primary">{selectedOrder.id}</span>
                </h2>
                <div>
                  {getStatusBadge(selectedOrder.status)}
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Customer Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                    <FiUser className="mr-2 text-primary" /> Customer Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">{selectedOrder.customer.name}</p>
                    <div className="flex items-start">
                      <FiMail className="mt-0.5 mr-2 text-gray-400" />
                      <span>{selectedOrder.customer.email}</span>
                    </div>
                    <div className="flex items-start">
                      <FiPhone className="mt-0.5 mr-2 text-gray-400" />
                      <span>{selectedOrder.customer.phone}</span>
                    </div>
                    <div className="flex items-start">
                      <FiMapPin className="mt-0.5 mr-2 text-gray-400" />
                      <span>{selectedOrder.customer.address}</span>
                    </div>
                  </div>
                </div>

                {/* Order Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                    <FiPackage className="mr-2 text-primary" /> Order Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{selectedOrder.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total:</span>
                      <span className="font-medium">Rs. {selectedOrder.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Items:</span>
                      <span className="font-medium">{selectedOrder.items.length}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                    <FiCreditCard className="mr-2 text-primary" /> Payment Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Method:</span>
                      <span className="font-medium">{selectedOrder.payment.method}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`font-medium ${selectedOrder.payment.status === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {selectedOrder.payment.status}
                      </span>
                    </div>
                    {selectedOrder.payment.transactionId && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transaction ID:</span>
                        <span className="font-medium">{selectedOrder.payment.transactionId}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Items */}
                <div className="md:col-span-3">
                  <h3 className="font-medium text-gray-900 mb-3">Order Items</h3>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr className="bg-gray-100">
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                          <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Quantity</th>
                          <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Price</th>
                          <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedOrder.items.map((item, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-500 text-center">{item.quantity}</td>
                            <td className="px-4 py-3 text-sm text-gray-500 text-right">Rs. {item.price.toLocaleString()}</td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">Rs. {item.subtotal.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <th scope="row" colSpan="3" className="px-4 py-3 text-sm font-medium text-gray-900 text-right">Total</th>
                          <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">Rs. {selectedOrder.total.toLocaleString()}</td>
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
                          <h3 className="text-sm font-medium text-yellow-800">Notes</h3>
                          <div className="mt-2 text-sm text-yellow-700">{selectedOrder.notes}</div>
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
                    <span className="text-sm font-medium text-gray-700">Update Status:</span>
                    <div className="flex flex-wrap gap-2">
                      <button 
                        className={`px-3 py-1.5 text-xs font-medium rounded-full ${selectedOrder.status === 'pending' ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'}`}
                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'pending')}
                      >
                        Pending
                      </button>
                      <button 
                        className={`px-3 py-1.5 text-xs font-medium rounded-full ${selectedOrder.status === 'processing' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'processing')}
                      >
                        Processing
                      </button>
                      <button 
                        className={`px-3 py-1.5 text-xs font-medium rounded-full ${selectedOrder.status === 'shipped' ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}`}
                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'shipped')}
                      >
                        <FiTruck className="inline mr-1" /> Shipped
                      </button>
                      <button 
                        className={`px-3 py-1.5 text-xs font-medium rounded-full ${selectedOrder.status === 'delivered' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'delivered')}
                      >
                        Delivered
                      </button>
                      <button 
                        className={`px-3 py-1.5 text-xs font-medium rounded-full ${selectedOrder.status === 'cancelled' ? 'bg-red-600 text-white' : 'bg-red-100 text-red-800 hover:bg-red-200'}`}
                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'cancelled')}
                      >
                        Cancelled
                      </button>
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
                  Edit Order: <span className="text-primary">{selectedOrder.id}</span>
                </h2>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                const updatedOrders = orders.map(order => 
                  order.id === selectedOrder.id ? selectedOrder : order
                );
                setOrders(updatedOrders);
                setIsEditing(false);
                setSelectedOrder(null);
              }}>
                <div className="p-6 space-y-6">
                  {/* Customer Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          value={selectedOrder.customer.name}
                          onChange={(e) => setSelectedOrder({
                            ...selectedOrder,
                            customer: {...selectedOrder.customer, name: e.target.value}
                          })}
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
                          value={selectedOrder.customer.email}
                          onChange={(e) => setSelectedOrder({
                            ...selectedOrder,
                            customer: {...selectedOrder.customer, email: e.target.value}
                          })}
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
                          value={selectedOrder.customer.phone}
                          onChange={(e) => setSelectedOrder({
                            ...selectedOrder,
                            customer: {...selectedOrder.customer, phone: e.target.value}
                          })}
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
                          value={selectedOrder.customer.address}
                          onChange={(e) => setSelectedOrder({
                            ...selectedOrder,
                            customer: {...selectedOrder.customer, address: e.target.value}
                          })}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Order Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Order Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date
                        </label>
                        <input
                          type="date"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          value={selectedOrder.date}
                          onChange={(e) => setSelectedOrder({
                            ...selectedOrder,
                            date: e.target.value
                          })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <select
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          value={selectedOrder.status}
                          onChange={(e) => setSelectedOrder({
                            ...selectedOrder,
                            status: e.target.value
                          })}
                          required
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Payment Method
                        </label>
                        <select
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          value={selectedOrder.payment.method}
                          onChange={(e) => setSelectedOrder({
                            ...selectedOrder,
                            payment: {...selectedOrder.payment, method: e.target.value}
                          })}
                          required
                        >
                          <option value="Credit Card">Credit Card</option>
                          <option value="Debit Card">Debit Card</option>
                          <option value="Online Banking">Online Banking</option>
                          <option value="Cash on Delivery">Cash on Delivery</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Payment Status
                        </label>
                        <select
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          value={selectedOrder.payment.status}
                          onChange={(e) => setSelectedOrder({
                            ...selectedOrder,
                            payment: {...selectedOrder.payment, status: e.target.value}
                          })}
                          required
                        >
                          <option value="Paid">Paid</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Transaction ID
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          value={selectedOrder.payment.transactionId}
                          onChange={(e) => setSelectedOrder({
                            ...selectedOrder,
                            payment: {...selectedOrder.payment, transactionId: e.target.value}
                          })}
                        />
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
                      value={selectedOrder.notes}
                      onChange={(e) => setSelectedOrder({
                        ...selectedOrder,
                        notes: e.target.value
                      })}
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
                  >
                    Save Changes
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