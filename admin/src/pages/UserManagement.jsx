import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUser, FiUserPlus, FiEdit, FiTrash2, FiX, FiSearch, 
  FiFilter, FiCheck, FiMail, FiPhone, FiMapPin, FiCalendar
} from 'react-icons/fi';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userForm, setUserForm] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    status: 'active',
    role: 'user'
  });
  const [isNew, setIsNew] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');

  // Simulate fetching users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // This would be an API call in a real application
        setTimeout(() => {
          setUsers([
            { 
              id: 1, 
              name: 'John Doe', 
              email: 'john@example.com', 
              phone: '+94 712 345 678',
              address: '123 Main St, Colombo',
              status: 'active',
              role: 'admin',
              lastLogin: '2023-04-15',
              registeredOn: '2022-11-20',
              orders: 12
            },
            { 
              id: 2, 
              name: 'Jane Smith', 
              email: 'jane@example.com', 
              phone: '+94 723 456 789',
              address: '456 Oak St, Kandy',
              status: 'active',
              role: 'user',
              lastLogin: '2023-04-12',
              registeredOn: '2023-01-05',
              orders: 5
            },
            { 
              id: 3, 
              name: 'Kumar Perera', 
              email: 'kumar@example.com', 
              phone: '+94 765 432 109',
              address: '789 Palm St, Galle',
              status: 'inactive',
              role: 'user',
              lastLogin: '2023-03-25',
              registeredOn: '2022-12-10',
              orders: 3
            },
            { 
              id: 4, 
              name: 'Nimal Fernando', 
              email: 'nimal@example.com', 
              phone: '+94 778 901 234',
              address: '101 Beach Rd, Negombo',
              status: 'active',
              role: 'user',
              lastLogin: '2023-04-14',
              registeredOn: '2023-02-15',
              orders: 7
            },
            { 
              id: 5, 
              name: 'Amali Jayasinghe', 
              email: 'amali@example.com', 
              phone: '+94 736 789 012',
              address: '202 Hill St, Nuwara Eliya',
              status: 'suspended',
              role: 'user',
              lastLogin: '2023-02-20',
              registeredOn: '2022-10-05',
              orders: 2
            },
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search query and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  // Pagination
  const usersPerPage = 4;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddUser = () => {
    setUserForm({
      id: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      status: 'active',
      role: 'user'
    });
    setIsNew(true);
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setUserForm({ ...user });
    setIsNew(false);
    setShowModal(true);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      // In a real app, you would call an API to delete the user
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUserForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would call an API to save the user
    if (isNew) {
      // Add new user
      const newUser = {
        ...userForm,
        id: Math.max(...users.map(u => u.id)) + 1,
        registeredOn: new Date().toISOString().split('T')[0],
        lastLogin: '-',
        orders: 0
      };
      setUsers([...users, newUser]);
    } else {
      // Update existing user
      setUsers(users.map(user => user.id === userForm.id ? userForm : user));
    }
    
    setShowModal(false);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>;
      case 'inactive':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Inactive</span>;
      case 'suspended':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Suspended</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">{status}</span>;
    }
  };

  const getRoleBadge = (role) => {
    switch(role) {
      case 'admin':
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">Admin</span>;
      case 'user':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">User</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">{role}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header section with stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full text-blue-600">
              <FiUser size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm">Total Users</h3>
              <p className="text-2xl font-semibold">{users.length}</p>
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
              <FiCheck size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm">Active Users</h3>
              <p className="text-2xl font-semibold">{users.filter(user => user.status === 'active').length}</p>
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
              <FiUser size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm">Admins</h3>
              <p className="text-2xl font-semibold">{users.filter(user => user.role === 'admin').length}</p>
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
            <div className="p-3 bg-red-100 rounded-full text-red-600">
              <FiX size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm">Suspended Users</h3>
              <p className="text-2xl font-semibold">{users.filter(user => user.status === 'suspended').length}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and filters section */}
      <motion.div 
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center">
              <label className="mr-2 text-sm text-gray-600">Status:</label>
              <select 
                className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <label className="mr-2 text-sm text-gray-600">Role:</label>
              <select 
                className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            
            <motion.button
              className="ml-auto bg-primary text-white rounded-lg px-4 py-2 flex items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddUser}
            >
              <FiUserPlus className="mr-2" />
              Add User
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* User table section */}
      <motion.div 
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading users...</p>
          </div>
        ) : currentUsers.length === 0 ? (
          <div className="p-8 text-center">
            <FiUser size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 mb-2">No users found</p>
            <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 mr-3">
                            <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          </div>
                          <div className="ml-1">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">Registered: {user.registeredOn}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                        <div className="text-sm text-gray-500">{user.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(user.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getRoleBadge(user.role)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.orders}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            className="text-gray-600 hover:text-primary"
                            onClick={() => handleViewUser(user)}
                          >
                            <FiUser />
                          </button>
                          <button
                            className="text-gray-600 hover:text-blue-600"
                            onClick={() => handleEditUser(user)}
                          >
                            <FiEdit />
                          </button>
                          <button
                            className="text-gray-600 hover:text-red-600"
                            onClick={() => handleDeleteUser(user.id)}
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
                Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to <span className="font-medium">
                  {Math.min(indexOfLastUser, filteredUsers.length)}
                </span> of <span className="font-medium">{filteredUsers.length}</span> users
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
          </>
        )}
      </motion.div>

      {/* User Detail Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedUser(null)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">User Details</h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedUser(null)}
                >
                  <FiX size={20} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-xl">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                    <div className="flex mt-1 space-x-2">
                      {getStatusBadge(selectedUser.status)}
                      {getRoleBadge(selectedUser.role)}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm text-gray-500 mb-1">Contact Information</h4>
                      <div className="flex items-center">
                        <FiMail className="text-gray-400 mr-2" />
                        <span>{selectedUser.email}</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <FiPhone className="text-gray-400 mr-2" />
                        <span>{selectedUser.phone}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-gray-500 mb-1">Address</h4>
                      <div className="flex items-start">
                        <FiMapPin className="text-gray-400 mr-2 mt-1" />
                        <span>{selectedUser.address}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm text-gray-500 mb-1">Account Information</h4>
                      <div className="flex items-center">
                        <FiCalendar className="text-gray-400 mr-2" />
                        <span>Registered on: {selectedUser.registeredOn}</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <FiCalendar className="text-gray-400 mr-2" />
                        <span>Last login: {selectedUser.lastLogin}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-gray-500 mb-1">Orders</h4>
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="text-2xl font-semibold">{selectedUser.orders}</div>
                        <div className="text-xs text-gray-500">Total orders placed</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 p-6 flex justify-end space-x-4">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  onClick={() => setSelectedUser(null)}
                >
                  Close
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={() => {
                    setSelectedUser(null);
                    handleEditUser(selectedUser);
                  }}
                >
                  Edit User
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit User Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  {isNew ? 'Add New User' : 'Edit User'}
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowModal(false)}
                >
                  <FiX size={20} />
                </button>
              </div>
              
              <form onSubmit={handleFormSubmit}>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      placeholder="Enter full name"
                      value={userForm.name}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      placeholder="Enter email address"
                      value={userForm.email}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      placeholder="Enter phone number"
                      value={userForm.phone}
                      onChange={handleFormChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      placeholder="Enter address"
                      value={userForm.address}
                      onChange={handleFormChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="status" className="block text-gray-700 font-medium mb-2">Account Status</label>
                    <select
                      id="status"
                      name="status"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      value={userForm.status}
                      onChange={handleFormChange}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="role" className="block text-gray-700 font-medium mb-2">User Role</label>
                    <select
                      id="role"
                      name="role"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      value={userForm.role}
                      onChange={handleFormChange}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 p-6 flex justify-end space-x-4">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700"
                  >
                    {isNew ? 'Add User' : 'Save Changes'}
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

export default UserManagement;