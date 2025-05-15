import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPackage, FiPlus, FiSearch, FiEdit2, FiTrash2, 
  FiFilter, FiX, FiChevronDown, FiUpload, FiTag
} from 'react-icons/fi';

const ProductManagement = () => {
  // State management
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: 'Samsung 65" QLED TV', 
      category: 'Electronics',
      price: 150000,
      stock: 24,
      sku: 'TV-QLED-65',
      status: 'active',
      featured: true,
      createdAt: '2023-01-15',
      imageUrl: 'https://placehold.co/100x100/333/FFF?text=QLED'
    },
    { 
      id: 2, 
      name: 'Apple iPhone 14 Pro', 
      category: 'Smartphones',
      price: 250000,
      stock: 42,
      sku: 'APL-IP14-PRO',
      status: 'active',
      featured: true,
      createdAt: '2023-02-05',
      imageUrl: 'https://placehold.co/100x100/333/FFF?text=iPhone'
    },
    { 
      id: 3, 
      name: 'Modern L-Shaped Sofa', 
      category: 'Furniture',
      price: 150000,
      stock: 8,
      sku: 'FUR-SOF-L01',
      status: 'active',
      featured: true,
      createdAt: '2023-01-20',
      imageUrl: 'https://placehold.co/100x100/333/FFF?text=Sofa'
    },
    { 
      id: 4, 
      name: 'Sony PlayStation 5', 
      category: 'Gaming',
      price: 100000,
      stock: 15,
      sku: 'SNY-PS5-DIG',
      status: 'active',
      featured: false,
      createdAt: '2023-03-10',
      imageUrl: 'https://placehold.co/100x100/333/FFF?text=PS5'
    },
    { 
      id: 5, 
      name: 'Dell XPS 15 Laptop', 
      category: 'Computers',
      price: 200000,
      stock: 12,
      sku: 'DEL-XPS-15',
      status: 'active',
      featured: false,
      createdAt: '2023-02-18',
      imageUrl: 'https://placehold.co/100x100/333/FFF?text=XPS'
    },
    { 
      id: 6, 
      name: 'Teak Wood Dining Table', 
      category: 'Furniture',
      price: 85000,
      stock: 6,
      sku: 'FUR-TBL-TK1',
      status: 'inactive',
      featured: false,
      createdAt: '2023-01-25',
      imageUrl: 'https://placehold.co/100x100/333/FFF?text=Table'
    },
    { 
      id: 7, 
      name: 'Wireless Noise Cancelling Headphones', 
      category: 'Audio',
      price: 45000,
      stock: 30,
      sku: 'AUD-HPH-NC1',
      status: 'active',
      featured: true,
      createdAt: '2023-03-01',
      imageUrl: 'https://placehold.co/100x100/333/FFF?text=Audio'
    },
    { 
      id: 8, 
      name: 'Smart Home Hub', 
      category: 'Smart Home',
      price: 25000,
      stock: 0,
      sku: 'SMH-HUB-001',
      status: 'out_of_stock',
      featured: false,
      createdAt: '2023-02-10',
      imageUrl: 'https://placehold.co/100x100/333/FFF?text=Hub'
    }
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isNew, setIsNew] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  
  // Filter and sort products
  const filteredProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === '' || product.category === filterCategory) &&
      (filterStatus === '' || product.status === filterStatus)
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // Categories derived from product data
  const categories = [...new Set(products.map(product => product.category))];

  // Handlers
  const handleAddNew = () => {
    setIsNew(true);
    setCurrentProduct({
      name: '',
      category: '',
      price: 0,
      stock: 0,
      sku: '',
      status: 'active',
      featured: false,
      imageUrl: 'https://placehold.co/100x100/333/FFF?text=New'
    });
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setIsNew(false);
    setCurrentProduct({...product});
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    
    if (isNew) {
      const newId = Math.max(...products.map(p => p.id), 0) + 1;
      setProducts([...products, { ...currentProduct, id: newId, createdAt: new Date().toISOString().split('T')[0] }]);
    } else {
      setProducts(products.map(p => p.id === currentProduct.id ? currentProduct : p));
    }
    
    setShowModal(false);
  };

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

  const resetFilters = () => {
    setSearchTerm('');
    setFilterCategory('');
    setFilterStatus('');
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>;
      case 'inactive':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Inactive</span>;
      case 'out_of_stock':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Out of Stock</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Product Management</h1>
        <button
          onClick={handleAddNew}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="mr-2" /> Add New Product
        </button>
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
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
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
                  onClick={() => requestSort('id')}
                >
                  ID
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('name')}
                >
                  Product
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('category')}
                >
                  Category
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('price')}
                >
                  Price
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('stock')}
                >
                  Stock
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
              {currentProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{product.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Rs. {product.price.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.stock}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(product.status)}
                    {product.featured && (
                      <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Featured</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleEdit(product)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <FiEdit2 className="inline" /> Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FiTrash2 className="inline" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{indexOfFirstProduct + 1}</span> to <span className="font-medium">
              {Math.min(indexOfLastProduct, filteredProducts.length)}
            </span> of <span className="font-medium">{filteredProducts.length}</span> products
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
              className="bg-white rounded-lg shadow-xl w-full max-w-3xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  {isNew ? 'Add New Product' : 'Edit Product'}
                </h2>
              </div>

              <form onSubmit={handleSaveProduct}>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 flex space-x-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                      <img src={currentProduct?.imageUrl} alt="Product" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Image
                      </label>
                      <div className="mt-1 flex items-center">
                        <button
                          type="button"
                          className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center"
                        >
                          <FiUpload className="mr-2" /> Upload Image
                        </button>
                        <span className="ml-4 text-xs text-gray-500">
                          Recommended size: 600x600px, Max 2MB
                        </span>
                      </div>
                    </div>
                  </div>
                
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      value={currentProduct?.name}
                      onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SKU
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      value={currentProduct?.sku}
                      onChange={(e) => setCurrentProduct({...currentProduct, sku: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      value={currentProduct?.category}
                      onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value})}
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                      <option value="new">+ Add New Category</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price (Rs.)
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      value={currentProduct?.price}
                      onChange={(e) => setCurrentProduct({...currentProduct, price: Number(e.target.value)})}
                      min="0"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      value={currentProduct?.stock}
                      onChange={(e) => setCurrentProduct({...currentProduct, stock: Number(e.target.value)})}
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
                      value={currentProduct?.status}
                      onChange={(e) => setCurrentProduct({...currentProduct, status: e.target.value})}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="out_of_stock">Out of Stock</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      checked={currentProduct?.featured}
                      onChange={(e) => setCurrentProduct({...currentProduct, featured: e.target.checked})}
                    />
                    <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                      Featured Product
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
                  >
                    {isNew ? 'Add Product' : 'Save Changes'}
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