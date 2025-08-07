import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiSearch,
  FiFilter,
  FiEdit,
  FiTrash2,
  FiX,
  FiChevronDown,
  FiTag,
  FiAlertCircle,
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
  clearUploadedImages,
} from "../store/slices/productSlice";
import ImageUploader from "../components/ImageUploader";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, stats, loading, error, pagination, filters } = useSelector(
    (state) => state.products || {}
  );

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
  const [specifications, setSpecifications] = useState([
    { key: "", value: "" },
  ]);

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
    "Sports",
    "Books",
    "Home & Garden",
  ];

  // Load products on component mount and when filters change
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
    pagination.limit,
    searchTerm,
    filterCategory,
    filterStatus,
    sortConfig,
  ]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== filters.search) {
        dispatch(setFilters({ search: searchTerm }));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, filters.search, dispatch]);

  const handleAddNew = () => {
    setCurrentProduct({
      name: "",
      sku: "",
      description: "",
      price: "",
      discountPrice: "",
      category: "",
      stock: "",
      imageUrl: "",
      additionalImages: [],
      status: "active",
      isFeatured: false,
      isNewArrival: false,
      isOnSale: false,
    });
    setIsNew(true);
    setShowModal(true);
    dispatch(clearUploadedImages());
    setSpecifications([{ key: "", value: "" }]);
  };

  const handleEdit = (product) => {
    setCurrentProduct({
      ...product,
      additionalImages: product.additionalImages || [],
    });
    setIsNew(false);
    setShowModal(true);
    dispatch(clearUploadedImages());

    // Convert Map-like object to array of key-value pairs for the form
    if (product.specifications) {
      const specsArray = Object.entries(product.specifications).map(
        ([key, value]) => ({ key, value })
      );
      setSpecifications(
        specsArray.length > 0 ? specsArray : [{ key: "", value: "" }]
      );
    } else {
      setSpecifications([{ key: "", value: "" }]);
    }
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

  const handleImagesUploaded = (images) => {
    setCurrentProduct((prev) => ({
      ...prev,
      imageUrl: images[0] || prev.imageUrl,
      additionalImages: images.slice(1),
    }));
  };

  const handleSpecificationChange = (index, field, value) => {
    const updatedSpecs = [...specifications];
    updatedSpecs[index][field] = value;
    setSpecifications(updatedSpecs);
  };

  const addSpecificationField = () => {
    setSpecifications([...specifications, { key: "", value: "" }]);
  };

  const removeSpecificationField = (index) => {
    const updatedSpecs = specifications.filter((_, i) => i !== index);
    setSpecifications(updatedSpecs);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();

    try {
      // Convert specifications array to object
      const specsObj = {};
      specifications.forEach((spec) => {
        if (spec.key.trim() && spec.value.trim()) {
          specsObj[spec.key.trim()] = spec.value.trim();
        }
      });

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
        additionalImages: currentProduct.additionalImages || [],
        status: currentProduct.status,
        isFeatured: currentProduct.isFeatured || false,
        isNewArrival: currentProduct.isNewArrival || false,
        isOnSale: currentProduct.isOnSale || false,
        specifications: specsObj,
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

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";
    setSortConfig({ key, direction });
  };

  if (loading && !products.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-center justify-between">
          <div className="flex items-center">
            <FiAlertCircle className="text-red-400 mr-3" />
            <span className="text-red-800">{error}</span>
          </div>
          <button
            className="text-red-400 hover:text-red-600"
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
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("name")}
                >
                  Product
                  {sortConfig.key === "name" && (
                    <span className="ml-1">
                      {sortConfig.direction === "ascending" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("category")}
                >
                  Category
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("price")}
                >
                  Price
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("stock")}
                >
                  Stock
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("status")}
                >
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
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
                      Rs. {product.price?.toLocaleString() || "0"}
                    </div>
                    {product.discountPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        Rs. {product.discountPrice.toLocaleString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`text-sm ${
                        product.stock === 0
                          ? "text-red-600"
                          : product.stock <= 10
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {product.stock || 0}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.status === "active"
                          ? "bg-green-100 text-green-800"
                          : product.status === "inactive"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {product.status || "Unknown"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  pagination.page === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 bg-white hover:bg-gray-50"
                }`}
                onClick={() =>
                  pagination.page > 1 && handlePageChange(pagination.page - 1)
                }
                disabled={pagination.page === 1}
              >
                Previous
              </button>
              <button
                className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  pagination.page === pagination.totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 bg-white hover:bg-gray-50"
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
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">
                    {(pagination.page - 1) * pagination.limit + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(
                      pagination.page * pagination.limit,
                      pagination.total
                    )}
                  </span>{" "}
                  of <span className="font-medium">{pagination.total}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      pagination.page === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                    onClick={() =>
                      pagination.page > 1 &&
                      handlePageChange(pagination.page - 1)
                    }
                    disabled={pagination.page === 1}
                  >
                    Previous
                  </button>
                  <button
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      pagination.page === pagination.totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                    onClick={() =>
                      pagination.page < pagination.totalPages &&
                      handlePageChange(pagination.page + 1)
                    }
                    disabled={
                      pagination.page === pagination.totalPages || loading
                    }
                  >
                    Next
                  </button>
                </nav>
              </div>
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
                <div className="p-6 space-y-6">
                  {/* Image Upload Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Product Images
                    </label>
                    <ImageUploader
                      onImagesUploaded={handleImagesUploaded}
                      existingImages={
                        currentProduct?.imageUrl
                          ? [
                              currentProduct.imageUrl,
                              ...(currentProduct.additionalImages || []),
                            ]
                          : currentProduct?.additionalImages || []
                      }
                    />
                  </div>

                  {/* Product Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                    {/* Specifications */}
                    <div className="md:col-span-2">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Specifications
                        </label>
                        <button
                          type="button"
                          onClick={addSpecificationField}
                          className="text-primary hover:text-primary-dark flex items-center text-sm"
                        >
                          <FiPlus size={16} className="mr-1" /> Add
                          Specification
                        </button>
                      </div>

                      {specifications.map((spec, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-5 gap-2 mb-2 items-start"
                        >
                          <input
                            type="text"
                            placeholder="Name (e.g., Weight)"
                            className="col-span-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                            value={spec.key}
                            onChange={(e) =>
                              handleSpecificationChange(
                                index,
                                "key",
                                e.target.value
                              )
                            }
                          />
                          <input
                            type="text"
                            placeholder="Value (e.g., 2.5 kg)"
                            className="col-span-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                            value={spec.value}
                            onChange={(e) =>
                              handleSpecificationChange(
                                index,
                                "value",
                                e.target.value
                              )
                            }
                          />
                          <button
                            type="button"
                            onClick={() => removeSpecificationField(index)}
                            className="p-2 text-red-500 hover:text-red-700 focus:outline-none"
                            disabled={specifications.length === 1}
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      ))}
                      <p className="text-xs text-gray-500 mt-1">
                        Add product specifications like dimensions, material,
                        etc.
                      </p>
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
