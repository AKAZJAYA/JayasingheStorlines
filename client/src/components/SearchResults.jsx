import React from 'react';
import { motion } from 'framer-motion';
import { FiX, FiLoader } from 'react-icons/fi';
import { useSearch } from '../context/SearchContext';

const SearchResults = () => {
  const { searchQuery, searchResults, isSearching, clearSearch } = useSearch();

  if (!searchQuery) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20"
      onClick={clearSearch}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Search Results for "{searchQuery}"</h3>
          <button onClick={clearSearch} className="p-1 rounded-full hover:bg-gray-100">
            <FiX size={20} />
          </button>
        </div>
        
        <div className="max-h-[70vh] overflow-y-auto">
          {isSearching ? (
            <div className="flex items-center justify-center py-20">
              <FiLoader size={30} className="animate-spin text-primary" />
            </div>
          ) : searchResults.length > 0 ? (
            <div className="divide-y">
              {searchResults.map(item => (
                <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{item.name}</h4>
                    <span className="text-primary font-semibold">Rs. {item.price.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-500">Category: {item.category}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500">No results found for "{searchQuery}"</p>
              <p className="text-sm text-gray-400 mt-2">Try using different keywords or browse categories</p>
            </div>
          )}
        </div>
        
        <div className="p-4 bg-gray-50 border-t text-center">
          <button className="text-primary font-medium">View All Results</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SearchResults;