import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  FiUser,
  FiUserPlus,
  FiEdit,
  FiTrash2,
  FiX,
  FiSearch,
  FiFilter,
  FiCheck,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
} from "react-icons/fi";
import {
  fetchUsers,
  fetchUserStats,
  createUser,
  updateUser,
  deleteUser,
  setFilters,
  setPage,
  clearError,
  clearCurrentUser,
} from "../store/slices/userSlice";

const UserManagement = () => {
  const dispatch = useDispatch();

  // Redux state
  const {
    users = [],
    stats = {},
    loading = false,
    error = null,
    pagination = { page: 1, limit: 10, total: 0, totalPages: 0 },
    filters = { search: "", role: "all", status: "all" },
  } = useSelector((state) => state.users);

  // Local state
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "user",
    isActive: true,
  });
  const [isNew, setIsNew] = useState(true);

  // Local filter states for immediate UI updates
  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const [statusFilter, setStatusFilter] = useState(filters.status || "all");
  const [roleFilter, setRoleFilter] = useState(filters.role || "all");

  // Fetch data on component mount
  useEffect(() => {
    console.log("Stats from Redux:", stats); // Debug log
    dispatch(
      fetchUsers({
        page: pagination.page,
        limit: pagination.limit,
        search: filters.search,
        role: filters.role === "all" ? "" : filters.role,
        status: filters.status === "all" ? "" : filters.status,
      })
    );

    // Fetch user stats
    dispatch(fetchUserStats())
      .then((result) => {
        console.log("Fetch user stats result:", result); // Debug log
      })
      .catch((error) => {
        console.error("Error fetching user stats:", error); // Debug log
      });
  }, [dispatch, pagination.page, filters]);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(
        setFilters({
          search: searchQuery,
          role: roleFilter,
          status: statusFilter,
        })
      );
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, roleFilter, statusFilter, dispatch]);

  // Clear error on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handlePageChange = (pageNumber) => {
    dispatch(setPage(pageNumber));
  };

  const handleAddUser = () => {
    setUserForm({
      name: "",
      email: "",
      phone: "",
      role: "user",
      isActive: true,
    });
    setIsNew(true);
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setUserForm({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      role: user.role,
      isActive: user.isActive,
    });
    setIsNew(false);
    setShowModal(true);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await dispatch(deleteUser(userId)).unwrap();
        // Optionally show success message
      } catch (error) {
        console.error("Error deleting user:", error);
        // Handle error (show toast, etc.)
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isNew) {
        await dispatch(createUser(userForm)).unwrap();
      } else {
        await dispatch(
          updateUser({
            userId: userForm.id,
            userData: userForm,
          })
        ).unwrap();
      }
      setShowModal(false);
      // Optionally show success message
    } catch (error) {
      console.error("Error saving user:", error);
      // Handle error (show toast, etc.)
    }
  };

  const getStatusBadge = (user) => {
    const isActive = user.isActive;
    if (isActive) {
      return (
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
          Active
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
          Inactive
        </span>
      );
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return (
          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
            Admin
          </span>
        );
      case "user":
        return (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
            User
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
            {role}
          </span>
        );
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const getUsersPerPage = 10;
  const indexOfFirstUser = (pagination.page - 1) * getUsersPerPage;
  const indexOfLastUser = Math.min(
    indexOfFirstUser + getUsersPerPage,
    pagination.total
  );

  return (
    <div className="space-y-6">
      {/* Error handling */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

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
              <p className="text-2xl font-semibold">
                {loading ? (
                  <div className="animate-pulse bg-gray-200 h-6 w-12 rounded"></div>
                ) : (
                  stats?.totalUsers?.toLocaleString() ||
                  pagination?.total?.toLocaleString() ||
                  "0"
                )}
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
              <FiCheck size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm">Active Users</h3>
              <p className="text-2xl font-semibold">
                {loading ? (
                  <div className="animate-pulse bg-gray-200 h-6 w-12 rounded"></div>
                ) : (
                  stats?.activeUsers?.toLocaleString() ||
                  users
                    ?.filter((user) => user.isActive)
                    ?.length?.toLocaleString() ||
                  "0"
                )}
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
              <FiUser size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm">Admins</h3>
              <p className="text-2xl font-semibold">
                {loading ? (
                  <div className="animate-pulse bg-gray-200 h-6 w-12 rounded"></div>
                ) : (
                  stats?.adminUsers?.toLocaleString() ||
                  users
                    ?.filter((user) => user.role === "admin")
                    ?.length?.toLocaleString() ||
                  "0"
                )}
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
            <div className="p-3 bg-orange-100 rounded-full text-orange-600">
              <FiUser size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm">New Users</h3>
              <p className="text-2xl font-semibold">
                {loading ? (
                  <div className="animate-pulse bg-gray-200 h-6 w-12 rounded"></div>
                ) : (
                  stats?.newUsers?.toLocaleString() || "0"
                )}
              </p>
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
        ) : users.length === 0 ? (
          <div className="p-8 text-center">
            <FiUser size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 mb-2">No users found</p>
            <p className="text-gray-500 text-sm">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 mr-3">
                            <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .substring(0, 2)}
                            </div>
                          </div>
                          <div className="ml-1">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.email}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.phone || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(user)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getRoleBadge(user.role)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(user.joinDate || user.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            className="text-gray-600 hover:text-primary"
                            onClick={() => handleViewUser(user)}
                            title="View Details"
                          >
                            <FiUser />
                          </button>
                          <button
                            className="text-gray-600 hover:text-blue-600"
                            onClick={() => handleEditUser(user)}
                            title="Edit User"
                          >
                            <FiEdit />
                          </button>
                          <button
                            className="text-gray-600 hover:text-red-600"
                            onClick={() => handleDeleteUser(user._id)}
                            title="Delete User"
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
                <span className="font-medium">{indexOfFirstUser + 1}</span> to{" "}
                <span className="font-medium">{indexOfLastUser}</span> of{" "}
                <span className="font-medium">{pagination.total}</span> users
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
                <h2 className="text-xl font-semibold text-gray-800">
                  User Details
                </h2>
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
                    {selectedUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">
                      {selectedUser.name}
                    </h3>
                    <div className="flex mt-1 space-x-2">
                      {getStatusBadge(selectedUser)}
                      {getRoleBadge(selectedUser.role)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm text-gray-500 mb-1">
                        Contact Information
                      </h4>
                      <div className="flex items-center">
                        <FiMail className="text-gray-400 mr-2" />
                        <span>{selectedUser.email}</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <FiPhone className="text-gray-400 mr-2" />
                        <span>{selectedUser.phone || "N/A"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm text-gray-500 mb-1">
                        Account Information
                      </h4>
                      <div className="flex items-center">
                        <FiCalendar className="text-gray-400 mr-2" />
                        <span>
                          Joined:{" "}
                          {formatDate(
                            selectedUser.joinDate || selectedUser.createdAt
                          )}
                        </span>
                      </div>
                      <div className="flex items-center mt-2">
                        <FiUser className="text-gray-400 mr-2" />
                        <span>
                          Loyalty Points: {selectedUser.loyaltyPoints || 0}
                        </span>
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
                  {isNew ? "Add New User" : "Edit User"}
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
                    <label
                      htmlFor="name"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Full Name *
                    </label>
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
                    <label
                      htmlFor="email"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Email Address *
                    </label>
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
                    <label
                      htmlFor="phone"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Phone Number
                    </label>
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

                  {isNew && (
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Password *
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                        placeholder="Enter password"
                        value={userForm.password || ""}
                        onChange={handleFormChange}
                        required={isNew}
                      />
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="role"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      User Role
                    </label>
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

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={userForm.isActive}
                        onChange={handleFormChange}
                        className="mr-2"
                      />
                      <span className="text-gray-700 font-medium">
                        Active Account
                      </span>
                    </label>
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
                    disabled={loading}
                  >
                    {loading
                      ? "Saving..."
                      : isNew
                      ? "Add User"
                      : "Save Changes"}
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
