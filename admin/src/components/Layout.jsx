import React, { useState } from "react";
import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiShoppingBag,
  FiShoppingCart,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiBell,
  FiSearch,
  FiArrowRight,
  FiBarChart2,
  FiTruck,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { adminLogout } from "../store/slices/adminAuthSlice";
import logoImg from "../assets/logo.png";

const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const { isAuthenticated, user, loading } = useSelector(
    (state) => state.adminAuth
  );

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    dispatch(adminLogout());
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navigation = [
    { name: "Dashboard", icon: <FiHome />, href: "/" },
    { name: "User Management", icon: <FiUsers />, href: "/users" },
    { name: "Products", icon: <FiShoppingBag />, href: "/products" },
    { name: "Orders", icon: <FiShoppingCart />, href: "/orders" },
    // { name: "Deliveries", href: "/deliveries", icon: <FiTruck /> },
    // { name: "Sales", icon: <FiBarChart2 />, href: "/sales" },
    { name: "Settings", icon: <FiSettings />, href: "/settings" },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        className={`bg-white border-r border-gray-200 ${
          isCollapsed ? "w-20" : "w-64"
        } transition-all duration-300 ease-in-out flex flex-col`}
        initial={false}
        animate={{ width: isCollapsed ? 80 : 256 }}
      >
        {/* Logo and brand */}
        <div className="flex items-center h-16 px-4 border-b border-gray-200">
          {!isCollapsed ? (
            <Link to="/" className="flex items-center">
              <img
                src={logoImg}
                alt="Jayasinghe Admin"
                className="h-10 w-auto"
              />
              <div className="ml-2">
                <h1 className="text-lg font-bold text-primary">Jayasinghe</h1>
                <p className="text-xs text-gray-600">ADMIN PANEL</p>
              </div>
            </Link>
          ) : (
            <Link to="/" className="mx-auto">
              <img
                src={logoImg}
                alt="Jayasinghe Admin"
                className="h-10 w-auto"
              />
            </Link>
          )}

          <button
            onClick={toggleSidebar}
            className={`text-gray-500 hover:text-gray-700 ${
              isCollapsed ? "ml-2" : "ml-auto"
            }`}
          >
            {isCollapsed ? <FiArrowRight /> : <FiMenu />}
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 py-6 px-2 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`
                flex items-center px-3 py-3 rounded-lg transition-colors
                ${
                  isActive(item.href)
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }
                ${isCollapsed ? "justify-center" : ""}
              `}
            >
              <span className="text-xl">{item.icon}</span>
              {!isCollapsed && <span className="ml-3">{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className={`
              flex items-center text-red-600 hover:text-red-700 px-3 py-3 rounded-lg hover:bg-red-50 w-full
              ${isCollapsed ? "justify-center" : ""}
            `}
          >
            <FiLogOut className="text-xl" />
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-6">
            <h1 className="text-xl font-semibold text-gray-800">
              {navigation.find((item) => isActive(item.href))?.name ||
                "Dashboard"}
            </h1>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all w-64"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full">
                <FiBell />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center">
                <img
                  src={
                    user?.image ||
                    "https://randomuser.me/api/portraits/men/32.jpg"
                  }
                  alt="Admin User"
                  className="h-8 w-8 rounded-full border-2 border-primary"
                />
                <div className="ml-2 hidden md:block">
                  <div className="text-sm font-medium">
                    {user?.name || "Admin User"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {user?.role || "Super Admin"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
