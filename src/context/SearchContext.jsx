import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  return (
    <SearchContext.Provider value={{ selectedProduct, setSelectedProduct, searchResults, setSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}; 