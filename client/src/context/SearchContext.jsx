import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = (query) => {
    setIsSearching(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      // Mock search results for demonstration
      const mockResults = [
        { id: 1, name: 'Smart 4K LED TV 55"', category: 'Electronics', price: 159990 },
        { id: 2, name: 'Air Conditioner Inverter 1.5 Ton', category: 'Cooling', price: 129990 },
        { id: 3, name: 'Modern Coffee Table', category: 'Furniture', price: 45990 },
        { id: 4, name: 'Smartphone XZ Pro', category: 'Phones', price: 189990 },
      ].filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 500);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <SearchContext.Provider value={{
      searchQuery,
      setSearchQuery,
      searchResults,
      isSearching,
      performSearch,
      clearSearch
    }}>
      {children}
    </SearchContext.Provider>
  );
};