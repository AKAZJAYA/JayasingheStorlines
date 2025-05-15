import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiTruck, FiSearch, FiFilter, FiChevronDown, FiEye, FiEdit2, 
  FiTrash2, FiX, FiCalendar, FiUser, FiMapPin, FiMail, FiPhone,
  FiPackage, FiClock, FiCheck, FiAlertTriangle, FiRefreshCw, FiActivity, FiBarChart2
} from 'react-icons/fi';

const DeliveryManagement = () => {
  // State management
  const [deliveries, setDeliveries] = useState([
    {
      id: 'DEL-4278',
      orderId: 'ORD-5723',
      customer: {
        name: 'Saman Perera',
        email: 'saman@example.com',
        phone: '+94 771 234 567',
        address: '123 Main St, Colombo 05'
      },
      driver: {
        id: 'DRV-12',
        name: 'Ajith Fernando',
        phone: '+94 765 432 109',
        vehicle: 'LJ-5432 (Van)'
      },
      scheduledDate: '2023-04-19',
      scheduledTime: '10:00 - 12:00',
      status: 'delivered',
      deliveredAt: '2023-04-19 11:23',
      notes: 'Customer requested to call before arrival',
      products: [
        { name: 'Samsung 65" QLED TV', quantity: 1 },
        { name: 'HDMI Cable', quantity: 2 }
      ]
    },
    {
      id: 'DEL-4277',
      orderId: 'ORD-5722',
      customer: {
        name: 'Nimali Silva',
        email: 'nimali@example.com',
        phone: '+94 772 345 678',
        address: '456 Palm Ave, Kandy'
      },
      driver: {
        id: 'DRV-08',
        name: 'Malith Jayawardena',
        phone: '+94 761 234 567',
        vehicle: 'KP-7890 (Truck)'
      },
      scheduledDate: '2023-04-19',
      scheduledTime: '14:00 - 16:00',
      status: 'in_transit',
      deliveredAt: null,
      notes: 'Fragile items, handle with care',
      products: [
        { name: 'Apple iPhone 14 Pro', quantity: 1 },
        { name: 'Phone Case', quantity: 1 }
      ]
    },
    {
      id: 'DEL-4276',
      orderId: 'ORD-5721',
      customer: {
        name: 'Kamal Jayasuriya',
        email: 'kamal@example.com',
        phone: '+94 773 456 789',
        address: '789 Ocean View, Galle'
      },
      driver: {
        id: 'DRV-15',
        name: 'Sunil Rajapakse',
        phone: '+94 767 890 123',
        vehicle: 'GL-2468 (Van)'
      },
      scheduledDate: '2023-04-19',
      scheduledTime: '12:00 - 14:00',
      status: 'pending',
      deliveredAt: null,
      notes: '',
      products: [
        { name: 'Wireless Noise Cancelling Headphones', quantity: 1 }
      ]
    },
    {
      id: 'DEL-4275',
      orderId: 'ORD-5720',
      customer: {
        name: 'Priya Fernando',
        email: 'priya@example.com',
        phone: '+94 774 567 890',
        address: '101 Hill St, Nuwara Eliya'
      },
      driver: {
        id: 'DRV-10',
        name: 'Roshan Perera',
        phone: '+94 768 901 234',
        vehicle: 'NE-1357 (Truck)'
      },
      scheduledDate: '2023-04-20',
      scheduledTime: '09:00 - 11:00',
      status: 'scheduled',
      deliveredAt: null,
      notes: 'Requires installation',
      products: [
        { name: 'Modern L-Shaped Sofa', quantity: 1 }
      ]
    },
    {
      id: 'DEL-4274',
      orderId: 'ORD-5718',
      customer: {
        name: 'Lakshmi Rajapaksa',
        email: 'lakshmi@example.com',
        phone: '+94 776 789 012',
        address: '333 Temple Road, Matara'
      },
      driver: {
        id: 'DRV-07',
        name: 'Kumara Dissanayake',
        phone: '+94 769 012 345',
        vehicle: 'MT-8642 (Van)'
      },
      scheduledDate: '2023-04-20',
      scheduledTime: '13:00 - 15:00',
      status: 'failed',
      deliveredAt: null,
      notes: 'Customer was not available. Rescheduling needed.',
      products: [
        { name: 'Smart Home Hub', quantity: 2 },
        { name: 'Smart Light Bulbs (Pack of 4)', quantity: 3 }
      ]
    }
  ]);
  
  const [drivers, setDrivers] = useState([
    { id: 'DRV-07', name: 'Kumara Dissanayake', phone: '+94 769 012 345', vehicle: 'MT-8642 (Van)', status: 'active', deliveriesCompleted: 128 },
    { id: 'DRV-08', name: 'Malith Jayawardena', phone: '+94 761 234 567', vehicle: 'KP-7890 (Truck)', status: 'active', deliveriesCompleted: 95 },
    { id: 'DRV-10', name: 'Roshan Perera', phone: '+94 768 901 234', vehicle: 'NE-1357 (Truck)', status: 'active', deliveriesCompleted: 76 },
    { id: 'DRV-12', name: 'Ajith Fernando', phone: '+94 765 432 109', vehicle: 'LJ-5432 (Van)', status: 'active', deliveriesCompleted: 210 },
    { id: 'DRV-15', name: 'Sunil Rajapakse', phone: '+94 767 890 123', vehicle: 'GL-2468 (Van)', status: 'active', deliveriesCompleted: 143 }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterDriver, setFilterDriver] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deliveriesPerPage] = useState(5);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('deliveries');
  const [showAssignDriverModal, setShowAssignDriverModal] = useState(false);
  
  // Filter deliveries
  const filteredDeliveries = deliveries.filter(delivery => {
    return (
      (delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
       delivery.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
       delivery.customer.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === '' || delivery.status === filterStatus) &&
      (filterDate === '' || delivery.scheduledDate === filterDate) &&
      (filterDriver === '' || (delivery.driver && delivery.driver.id === filterDriver))
    );
  });
  
  // Pagination
  const indexOfLastDelivery = currentPage * deliveriesPerPage;
  const indexOfFirstDelivery = indexOfLastDelivery - deliveriesPerPage;
  const currentDeliveries = filteredDeliveries.slice(indexOfFirstDelivery, indexOfLastDelivery);
  const totalPages = Math.ceil(filteredDeliveries.length / deliveriesPerPage);
  
  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilterStatus('');
    setFilterDate('');
    setFilterDriver('');
  };
  
  // Status badges
  const getStatusBadge = (status) => {
    switch(status) {
      case 'delivered':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs flex items-center whitespace-nowrap"><FiCheck className="mr-1" /> Delivered</span>;
      case 'in_transit':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center whitespace-nowrap"><FiTruck className="mr-1" /> In Transit</span>;
      case 'scheduled':
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs flex items-center whitespace-nowrap"><FiCalendar className="mr-1" /> Scheduled</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs flex items-center whitespace-nowrap"><FiClock className="mr-1" /> Pending</span>;
      case 'failed':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs flex items-center whitespace-nowrap"><FiAlertTriangle className="mr-1" /> Failed</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">{status}</span>;
    }
  };
  
  // Handlers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const handleViewDelivery = (delivery) => {
    setSelectedDelivery(delivery);
    setIsEditing(false);
  };
  
  const handleEditDelivery = (delivery) => {
    setSelectedDelivery({...delivery});
    setIsEditing(true);
  };
  
  const handleDeleteDelivery = (id) => {
    if (window.confirm('Are you sure you want to delete this delivery?')) {
      setDeliveries(deliveries.filter(delivery => delivery.id !== id));
      if (selectedDelivery && selectedDelivery.id === id) {
        setSelectedDelivery(null);
      }
    }
  };
  
  const handleUpdateDeliveryStatus = (id, newStatus) => {
    const updatedDeliveries = deliveries.map(delivery => 
      delivery.id === id ? {
        ...delivery, 
        status: newStatus,
        deliveredAt: newStatus === 'delivered' ? new Date().toISOString().slice(0, 16).replace('T', ' ') : delivery.deliveredAt
      } : delivery
    );
    setDeliveries(updatedDeliveries);
    
    if (selectedDelivery && selectedDelivery.id === id) {
      setSelectedDelivery({
        ...selectedDelivery, 
        status: newStatus,
        deliveredAt: newStatus === 'delivered' ? new Date().toISOString().slice(0, 16).replace('T', ' ') : selectedDelivery.deliveredAt
      });
    }
  };
  
  const handleAssignDriver = (deliveryId, driverId) => {
    const driver = drivers.find(d => d.id === driverId);
    
    const updatedDeliveries = deliveries.map(delivery => 
      delivery.id === deliveryId ? {
        ...delivery,
        driver: driver,
        status: delivery.status === 'pending' ? 'scheduled' : delivery.status
      } : delivery
    );
    
    setDeliveries(updatedDeliveries);
    setShowAssignDriverModal(false);
    
    if (selectedDelivery && selectedDelivery.id === deliveryId) {
      setSelectedDelivery({
        ...selectedDelivery,
        driver: driver,
        status: selectedDelivery.status === 'pending' ? 'scheduled' : selectedDelivery.status
      });
    }
  };
  
  // Dashboard metrics
  const metrics = {
    total: deliveries.length,
    delivered: deliveries.filter(d => d.status === 'delivered').length,
    inTransit: deliveries.filter(d => d.status === 'in_transit').length,
    pending: deliveries.filter(d => d.status === 'pending').length,
    failed: deliveries.filter(d => d.status === 'failed').length,
    scheduled: deliveries.filter(d => d.status === 'scheduled').length
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Delivery Management</h1>
        <div className="text-sm text-gray-600">Total Deliveries: {deliveries.length}</div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'deliveries' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('deliveries')}
          >
            <FiTruck className="inline mr-2" /> Deliveries
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'drivers' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('drivers')}
          >
            <FiUser className="inline mr-2" /> Drivers
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'analytics' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('analytics')}
          >
            <FiActivity className="inline mr-2" /> Analytics
          </button>
        </div>
      </div>
      
      {activeTab === 'deliveries' && (
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
              <div className="text-2xl font-semibold">{metrics.total}</div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="text-xs text-gray-500 mb-1">Delivered</div>
              <div className="text-2xl font-semibold text-green-600">{metrics.delivered}</div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-xs text-gray-500 mb-1">In Transit</div>
              <div className="text-2xl font-semibold text-blue-600">{metrics.inTransit}</div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <div className="text-xs text-gray-500 mb-1">Scheduled</div>
              <div className="text-2xl font-semibold text-purple-600">{metrics.scheduled}</div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-xs text-gray-500 mb-1">Pending</div>
              <div className="text-2xl font-semibold text-yellow-600">{metrics.pending}</div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <div className="text-xs text-gray-500 mb-1">Failed</div>
              <div className="text-2xl font-semibold text-red-600">{metrics.failed}</div>
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
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                  />
                  <FiCalendar className="absolute left-3 top-3 text-gray-400" />
                </div>
                
                <div className="relative">
                  <select
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                    value={filterDriver}
                    onChange={(e) => setFilterDriver(e.target.value)}
                  >
                    <option value="">All Drivers</option>
                    {drivers.map(driver => (
                      <option key={driver.id} value={driver.id}>{driver.name}</option>
                    ))}
                  </select>
                  <FiUser className="absolute left-3 top-3 text-gray-400" />
                  <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
                </div>
              </div>
              
              {(searchTerm || filterStatus || filterDate || filterDriver) && (
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Delivery ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Driver
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Schedule
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentDeliveries.map(delivery => (
                    <tr key={delivery.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-primary">{delivery.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{delivery.orderId}</div>
                        <div className="text-xs text-gray-500">{delivery.products.length} items</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{delivery.customer.name}</div>
                        <div className="text-xs text-gray-500">{delivery.customer.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {delivery.driver ? (
                          <>
                            <div className="text-sm font-medium text-gray-900">{delivery.driver.name}</div>
                            <div className="text-xs text-gray-500">{delivery.driver.vehicle}</div>
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
                        <div className="text-sm text-gray-900">{delivery.scheduledDate}</div>
                        <div className="text-xs text-gray-500">{delivery.scheduledTime}</div>
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
                            onClick={() => handleDeleteDelivery(delivery.id)}
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
                Showing <span className="font-medium">{indexOfFirstDelivery + 1}</span> to <span className="font-medium">
                  {Math.min(indexOfLastDelivery, filteredDeliveries.length)}
                </span> of <span className="font-medium">{filteredDeliveries.length}</span> deliveries
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
        </>
      )}
      
      {activeTab === 'drivers' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Driver ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deliveries
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {drivers.map(driver => (
                  <tr key={driver.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-primary">{driver.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{driver.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{driver.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{driver.vehicle}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{driver.deliveriesCompleted}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {activeTab === 'analytics' && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-center py-16">
            <FiBarChart2 className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500">Delivery analytics will be displayed here</p>
            <p className="text-sm text-gray-400 mt-1">Connect to actual data source for real-time updates</p>
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
                  Delivery Details: <span className="text-primary">{selectedDelivery.id}</span>
                </h2>
                <div>
                  {getStatusBadge(selectedDelivery.status)}
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Customer Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                    <FiUser className="mr-2 text-primary" /> Customer Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">{selectedDelivery.customer.name}</p>
                    <div className="flex items-start">
                      <FiMail className="mt-0.5 mr-2 text-gray-400" />
                      <span>{selectedDelivery.customer.email}</span>
                    </div>
                    <div className="flex items-start">
                      <FiPhone className="mt-0.5 mr-2 text-gray-400" />
                      <span>{selectedDelivery.customer.phone}</span>
                    </div>
                    <div className="flex items-start">
                      <FiMapPin className="mt-0.5 mr-2 text-gray-400" />
                      <span>{selectedDelivery.customer.address}</span>
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
                      <p className="font-medium">{selectedDelivery.driver.name}</p>
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
                      <p className="text-gray-500 mb-2">No driver assigned yet</p>
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
                    <FiPackage className="mr-2 text-primary" /> Delivery Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order ID:</span>
                      <span className="font-medium">{selectedDelivery.orderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Scheduled:</span>
                      <span className="font-medium">{selectedDelivery.scheduledDate}, {selectedDelivery.scheduledTime}</span>
                    </div>
                    {selectedDelivery.deliveredAt && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivered At:</span>
                        <span className="font-medium">{selectedDelivery.deliveredAt}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Items:</span>
                      <span className="font-medium">{selectedDelivery.products.length}</span>
                    </div>
                  </div>
                </div>
                
                {/* Products */}
                <div className="md:col-span-3">
                  <h3 className="font-medium text-gray-900 mb-3">Products</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ul className="space-y-2">
                      {selectedDelivery.products.map((product, index) => (
                        <li key={index} className="flex justify-between">
                          <span>{product.name}</span>
                          <span className="font-medium">x{product.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Notes */}
                {selectedDelivery.notes && (
                  <div className="md:col-span-3">
                    <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                      <div className="flex">
                        <FiAlertCircle className="flex-shrink-0 text-yellow-400 mt-0.5" />
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">Notes</h3>
                          <div className="mt-2 text-sm text-yellow-700">{selectedDelivery.notes}</div>
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
                        className={`px-3 py-1.5 text-xs font-medium rounded-full ${selectedDelivery.status === 'pending' ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}`}
                        onClick={() => handleUpdateDeliveryStatus(selectedDelivery.id, 'pending')}
                      >
                        <FiClock className="inline mr-1" /> Pending
                      </button>
                      <button 
                        className={`px-3 py-1.5 text-xs font-medium rounded-full ${selectedDelivery.status === 'scheduled' ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'}`}
                        onClick={() => handleUpdateDeliveryStatus(selectedDelivery.id, 'scheduled')}
                      >
                        <FiCalendar className="inline mr-1" /> Scheduled
                      </button>
                      <button 
                        className={`px-3 py-1.5 text-xs font-medium rounded-full ${selectedDelivery.status === 'in_transit' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                        onClick={() => handleUpdateDeliveryStatus(selectedDelivery.id, 'in_transit')}
                      >
                        <FiTruck className="inline mr-1" /> In Transit
                      </button>
                      <button 
                        className={`px-3 py-1.5 text-xs font-medium rounded-full ${selectedDelivery.status === 'delivered' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
                        onClick={() => handleUpdateDeliveryStatus(selectedDelivery.id, 'delivered')}
                      >
                        <FiCheck className="inline mr-1" /> Delivered
                      </button>
                      <button 
                        className={`px-3 py-1.5 text-xs font-medium rounded-full ${selectedDelivery.status === 'failed' ? 'bg-red-600 text-white' : 'bg-red-100 text-red-800 hover:bg-red-200'}`}
                        onClick={() => handleUpdateDeliveryStatus(selectedDelivery.id, 'failed')}
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
                  Edit Delivery: <span className="text-primary">{selectedDelivery.id}</span>
                </h2>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                const updatedDeliveries = deliveries.map(delivery => 
                  delivery.id === selectedDelivery.id ? selectedDelivery : delivery
                );
                setDeliveries(updatedDeliveries);
                setIsEditing(false);
                setSelectedDelivery(null);
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
                          value={selectedDelivery.customer.name}
                          onChange={(e) => setSelectedDelivery({
                            ...selectedDelivery,
                            customer: {...selectedDelivery.customer, name: e.target.value}
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
                          value={selectedDelivery.customer.email}
                          onChange={(e) => setSelectedDelivery({
                            ...selectedDelivery,
                            customer: {...selectedDelivery.customer, email: e.target.value}
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
                          value={selectedDelivery.customer.phone}
                          onChange={(e) => setSelectedDelivery({
                            ...selectedDelivery,
                            customer: {...selectedDelivery.customer, phone: e.target.value}
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
                          value={selectedDelivery.customer.address}
                          onChange={(e) => setSelectedDelivery({
                            ...selectedDelivery,
                            customer: {...selectedDelivery.customer, address: e.target.value}
                          })}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Delivery Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Scheduled Date
                        </label>
                        <input
                          type="date"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          value={selectedDelivery.scheduledDate}
                          onChange={(e) => setSelectedDelivery({
                            ...selectedDelivery,
                            scheduledDate: e.target.value
                          })}
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
                          value={selectedDelivery.scheduledTime}
                          onChange={(e) => setSelectedDelivery({
                            ...selectedDelivery,
                            scheduledTime: e.target.value
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
                          value={selectedDelivery.status}
                          onChange={(e) => setSelectedDelivery({
                            ...selectedDelivery,
                            status: e.target.value
                          })}
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
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Driver Information</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Assigned Driver
                        </label>
                        <select
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          value={selectedDelivery.driver ? selectedDelivery.driver.id : ''}
                          onChange={(e) => {
                            if (!e.target.value) {
                              // Remove driver
                              const deliveryWithoutDriver = {...selectedDelivery};
                              delete deliveryWithoutDriver.driver;
                              setSelectedDelivery(deliveryWithoutDriver);
                            } else {
                              // Assign driver
                              const driver = drivers.find(d => d.id === e.target.value);
                              setSelectedDelivery({
                                ...selectedDelivery,
                                driver: driver
                              });
                            }
                          }}
                        >
                          <option value="">No Driver</option>
                          {drivers.map(driver => (
                            <option key={driver.id} value={driver.id}>{driver.name} - {driver.vehicle}</option>
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
                      value={selectedDelivery.notes}
                      onChange={(e) => setSelectedDelivery({
                        ...selectedDelivery,
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
                      setSelectedDelivery(null);
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
                  <div className="text-sm text-gray-500 mb-2">Delivery ID: {selectedDelivery.id}</div>
                  <div className="text-sm text-gray-500 mb-2">Order ID: {selectedDelivery.orderId}</div>
                  <div className="text-sm text-gray-500">Customer: {selectedDelivery.customer.name}</div>
                </div>
                
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Driver
                  </label>
                  <div className="mt-1 max-h-60 overflow-y-auto border border-gray-300 rounded-lg">
                    {drivers.map(driver => (
                      <div 
                        key={driver.id}
                        className="p-3 border-b border-gray-300 hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleAssignDriver(selectedDelivery.id, driver.id)}
                      >
                        <div className="font-medium">{driver.name}</div>
                        <div className="text-sm text-gray-500">{driver.vehicle} • {driver.phone}</div>
                        <div className="text-xs text-gray-500 mt-1">{driver.deliveriesCompleted} deliveries completed</div>
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