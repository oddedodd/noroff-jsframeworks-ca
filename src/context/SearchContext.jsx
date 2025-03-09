import { createContext, useContext, useState } from 'react';

/**
 * Context for managing search state across the application
 * @type {React.Context}
 */
const SearchContext = createContext();

/**
 * Provider component that wraps the app to provide search functionality
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 * @returns {JSX.Element} SearchContext Provider component
 * @example
 * return (
 *   <SearchProvider>
 *     <App />
 *   </SearchProvider>
 * )
 */
export const SearchProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  return (
    <SearchContext.Provider value={{ selectedProduct, setSelectedProduct, searchResults, setSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
};

/**
 * Custom hook to access search context
 * @returns {Object} Search context object containing:
 * @property {Object|null} selectedProduct - Currently selected product
 * @property {Function} setSelectedProduct - Function to update selected product
 * @property {Array} searchResults - Array of search result products
 * @property {Function} setSearchResults - Function to update search results
 * @throws {Error} If used outside of SearchProvider
 * @example
 * const { searchResults, setSearchResults } = useSearch();
 */
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};