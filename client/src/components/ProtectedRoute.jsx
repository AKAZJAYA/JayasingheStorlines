import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../store/slices/authSlice";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const [showAuthMessage, setShowAuthMessage] = useState(false);

  // If verification completes and user isn't authenticated, show message instead of redirecting
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      setShowAuthMessage(true);
    }
  }, [loading, isAuthenticated]);

  // If still loading, show spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        <span className="ml-2">Verifying your session...</span>
      </div>
    );
  }

  // If authenticated, render protected content
  if (isAuthenticated) {
    return <Outlet />;
  }

  // If not authenticated, show auth message with refresh option
  if (showAuthMessage) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Authentication Required</h2>
          <p className="mb-6 text-gray-600">
            You need to be logged in to access this page.
          </p>
          <div className="flex space-x-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Refresh Page
            </button>
            <a
              href="/auth"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    );
  }

  // This is a fallback, should rarely be seen
  return null;
};

export default ProtectedRoute;