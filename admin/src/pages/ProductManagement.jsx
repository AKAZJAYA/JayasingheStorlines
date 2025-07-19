import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPackage,
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiFilter,
  FiX,
  FiChevronDown,
  FiUpload,
  FiTag,
} from "react-icons/fi";
import {
  fetchProducts,
  fetchProductStats,
  createProduct,
  updateProduct,
  deleteProduct,
  setFilters,
  setPage,
  clearError,
} from "../store/slices/productSlice";

const ProductManagement = () => {
  const dispatch = useDispatch();

  // Redux state
  const {
    products = [],
    stats = {},
    loading = false,
    error = null,
    pagination = { page: 1, limit: 10, total: 0, totalPages: 0 },
    filters = {
      search: "",
      category: "all",
      status: "all",
      sortBy: "name",
      sortOrder: "asc",
    },
  } = useSelector((state) => state.products || {});

  // Local state
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isNew, setIsNew] = useState(true);
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [filterCategory, setFilterCategory] = useState(
    filters.category === "all" ? "" : filters.category
  );
  const [filterStatus, setFilterStatus] = useState(
    filters.status === "all" ? "" : filters.status
  );
  const [sortConfig, setSortConfig] = useState({
    key: filters.sortBy || "name",
    direction: filters.sortOrder === "desc" ? "descending" : "ascending",
  });

  // Categories derived from product data - fallback to common categories
  const categories = [
    "Electronics",
    "Smartphones",
    "Furniture",
    "Gaming",
    "Computers",
    "Audio",
    "Smart Home",
    "Appliances",
    "Fashion",
    "Books",
    "Sports",
    "Health",
    "Beauty",
    "Toys",
    "Automotive",
  ];

  // Fetch products on component mount and when filters change
  useEffect(() => {
    const params = {
      page: pagination.page,
      limit: pagination.limit,
      search: searchTerm,
      category: filterCategory || undefined,
      status: filterStatus || undefined,
      sort: sortConfig.key,
      order: sortConfig.direction === "descending" ? "desc" : "asc",
    };

    dispatch(fetchProducts(params));
    dispatch(fetchProductStats());
  }, [
    dispatch,
    pagination.page,
    searchTerm,
    filterCategory,
    filterStatus,
    sortConfig,
  ]);

  // Update filters with debounce for search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(
        setFilters({
          search: searchTerm,
          category: filterCategory || "all",
          status: filterStatus || "all",
          sortBy: sortConfig.key,
          sortOrder: sortConfig.direction === "descending" ? "desc" : "asc",
        })
      );
    }, 500); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchTerm, filterCategory, filterStatus, sortConfig, dispatch]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Handlers
  const handleAddNew = () => {
    setIsNew(true);
    setCurrentProduct({
      name: "",
      category: "",
      price: 0,
      discountPrice: 0,
      stock: 0,
      sku: "",
      description: "",
      status: "active",
      isFeatured: false,
      isNewArrival: false,
      isOnSale: false,
      imageUrl: "",
      images: [],
    });
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setIsNew(false);
    setCurrentProduct({
      ...product,
      isFeatured: product.isFeatured || false,
      isNewArrival: product.isNewArrival || false,
      isOnSale: product.isOnSale || false,
    });
    setShowModal(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await dispatch(deleteProduct(productId)).unwrap();
        // Refresh products list after deletion
        const params = {
          page: pagination.page,
          limit: pagination.limit,
          search: searchTerm,
          category: filterCategory || undefined,
          status: filterStatus || undefined,
          sort: sortConfig.key,
          order: sortConfig.direction === "descending" ? "desc" : "asc",
        };
        dispatch(fetchProducts(params));
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        name: currentProduct.name,
        sku: currentProduct.sku,
        description: currentProduct.description || "",
        price: Number(currentProduct.price),
        discountPrice: currentProduct.discountPrice
          ? Number(currentProduct.discountPrice)
          : undefined,
        category: currentProduct.category,
        stock: Number(currentProduct.stock),
        imageUrl: currentProduct.imageUrl || "",
        images: currentProduct.images || [],
        status: currentProduct.status,
        isFeatured: currentProduct.isFeatured || false,
        isNewArrival: currentProduct.isNewArrival || false,
        isOnSale: currentProduct.isOnSale || false,
      };

      if (isNew) {
        await dispatch(createProduct(productData)).unwrap();
      } else {
        await dispatch(
          updateProduct({
            productId: currentProduct._id,
            productData,
          })
        ).unwrap();
      }

      setShowModal(false);
      setCurrentProduct(null);

      // Refresh products list
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        search: searchTerm,
        category: filterCategory || undefined,
        status: filterStatus || undefined,
        sort: sortConfig.key,
        order: sortConfig.direction === "descending" ? "desc" : "asc",
      };
      dispatch(fetchProducts(params));
    } catch (error) {
      console.error("Failed to save product:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    dispatch(setPage(pageNumber));
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilterCategory("");
    setFilterStatus("");
    setSortConfig({ key: "name", direction: "ascending" });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
            Active
          </span>
        );
      case "inactive":
        return (
          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
            Inactive
          </span>
        );
      case "out_of_stock":
        return (
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
            Out of Stock
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
            {status}
          </span>
        );
    }
  };

  // Loading state
  if (loading && products.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
          <button
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => dispatch(clearError())}
          >
            <FiX />
          </button>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Product Management
        </h1>
        <div className="flex items-center space-x-4">
          {/* Stats display */}
          {stats.totalProducts > 0 && (
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Total: {stats.totalProducts}</span>
              <span>Active: {stats.activeProducts}</span>
              <span>Out of Stock: {stats.outOfStock}</span>
            </div>
          )}
          <button
            onClick={handleAddNew}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiPlus className="mr-2" /> Add New Product
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>

            <div className="relative">
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <FiTag className="absolute left-3 top-3 text-gray-400" />
              <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
            </div>

            <div className="relative">
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
              <FiFilter className="absolute left-3 top-3 text-gray-400" />
              <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>

          {(searchTerm || filterCategory || filterStatus) && (
            <button
              onClick={resetFilters}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <FiX className="mr-1" /> Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("_id")}
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("name")}
                >
                  Product
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("category")}
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("price")}
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("stock")}
                >
                  Stock
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("status")}
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
              {products.map((product, index) => (
                <tr
                  key={product._id || `product-${index}`}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      #{product._id ? product._id.slice(-6) : "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden">
                        <img
                          src={
                            product.imageUrl ||
                            "https://placehold.co/100x100/333/FFF?text=No+Image"
                          }
                          alt={product.name || "Product"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name || "Unnamed Product"}
                        </div>
                        <div className="text-sm text-gray-500">
                          SKU: {product.sku || "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {product.category || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      Rs. {product.price ? product.price.toLocaleString() : "0"}
                      {product.discountPrice && (
                        <div className="text-xs text-green-600">
                          Discount: Rs. {product.discountPrice.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {product.stock || 0}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(product.status || "unknown")}
                    {product.isFeatured && (
                      <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        Featured
                      </span>
                    )}
                    {product.isNewArrival && (
                      <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                        New
                      </span>
                    )}
                    {product.isOnSale && (
                      <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                        Sale
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                      disabled={loading || !product._id}
                    >
                      <FiEdit2 className="inline" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:text-red-900"
                      disabled={loading || !product._id}
                    >
                      <FiTrash2 className="inline" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No products found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filterCategory || filterStatus
                ? "Try adjusting your search or filter criteria"
                : "Get started by adding a new product"}
            </p>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {(pagination.page - 1) * pagination.limit + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(pagination.page * pagination.limit, pagination.total)}
              </span>{" "}
              of <span className="font-medium">{pagination.total}</span>{" "}
              products
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
                disabled={pagination.page === 1 || loading}
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
                  disabled={loading}
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
                disabled={pagination.page === pagination.totalPages || loading}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
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
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {isNew ? "Add New Product" : "Edit Product"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveProduct}>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 flex space-x-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={
                          currentProduct?.imageUrl ||
                          "https://placehold.co/100x100/333/FFF?text=No+Image"
                        }
                        alt="Product"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Image URL
                      </label>
                      <input
                        type="url"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        value={currentProduct?.imageUrl || ""}
                        onChange={(e) =>
                          setCurrentProduct({
                            ...currentProduct,
                            imageUrl: e.target.value,
                          })
                        }
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      value={currentProduct?.name || ""}
                      onChange={(e) =>
                        setCurrentProduct({
                          ...currentProduct,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SKU *
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      value={currentProduct?.sku || ""}
                      onChange={(e) =>
                        setCurrentProduct({
                          ...currentProduct,
                          sku: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      value={currentProduct?.category || ""}
                      onChange={(e) =>
                        setCurrentProduct({
                          ...currentProduct,
                          category: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price (Rs.) *
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      value={currentProduct?.price || ""}
                      onChange={(e) =>
                        setCurrentProduct({
                          ...currentProduct,
                          price: Number(e.target.value),
                        })
                      }
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discount Price (Rs.)
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      value={currentProduct?.discountPrice || ""}
                      onChange={(e) =>
                        setCurrentProduct({
                          ...currentProduct,
                          discountPrice: Number(e.target.value),
                        })
                      }
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      value={currentProduct?.stock || ""}
                      onChange={(e) =>
                        setCurrentProduct({
                          ...currentProduct,
                          stock: Number(e.target.value),
                        })
                      }
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      value={currentProduct?.status || "active"}
                      onChange={(e) =>
                        setCurrentProduct({
                          ...currentProduct,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="out_of_stock">Out of Stock</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      rows="3"
                      value={currentProduct?.description || ""}
                      onChange={(e) =>
                        setCurrentProduct({
                          ...currentProduct,
                          description: e.target.value,
                        })
                      }
                      placeholder="Product description..."
                    />
                  </div>

                  <div className="md:col-span-2 space-y-3">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="featured"
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          checked={currentProduct?.isFeatured || false}
                          onChange={(e) =>
                            setCurrentProduct({
                              ...currentProduct,
                              isFeatured: e.target.checked,
                            })
                          }
                        />
                        <label
                          htmlFor="featured"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Featured Product
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="newArrival"
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          checked={currentProduct?.isNewArrival || false}
                          onChange={(e) =>
                            setCurrentProduct({
                              ...currentProduct,
                              isNewArrival: e.target.checked,
                            })
                          }
                        />
                        <label
                          htmlFor="newArrival"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          New Arrival
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="onSale"
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          checked={currentProduct?.isOnSale || false}
                          onChange={(e) =>
                            setCurrentProduct({
                              ...currentProduct,
                              isOnSale: e.target.checked,
                            })
                          }
                        />
                        <label
                          htmlFor="onSale"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          On Sale
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 p-6 flex justify-end space-x-4">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowModal(false)}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading
                      ? "Saving..."
                      : isNew
                      ? "Add Product"
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

export default ProductManagement;
