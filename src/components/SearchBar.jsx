import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useSearch } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";

/**
 * Search bar component that provides product search functionality with dropdown results
 * @component
 * @returns {JSX.Element} A search input with dropdown results showing matching products
 * @example
 * return (
 *   <SearchBar />
 * )
 * 
 * The component:
 * - Provides real-time search as user types
 * - Shows loading state while fetching results
 * - Displays matching products in a dropdown
 * - Each result shows product image, title and price
 * - Clicking a result navigates to that product's details page
 * - Uses debouncing to limit API calls
 */
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { setSearchResults, searchResults, setSelectedProduct } = useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchTerm.trim()) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch('https://v2.api.noroff.dev/online-shop');
        const data = await response.json();
        const filtered = data.data.filter(product =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filtered);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, setSearchResults]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setSearchTerm('');
    setShowDropdown(false);
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="relative w-full md:w-48 lg:w-100">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowDropdown(true);
        }}
        placeholder="Search products..."
        className="w-full px-4 py-2 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
      />

      {showDropdown && searchTerm && (
        <div className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : (
            <>
              {searchResults.length > 0 ? (
                searchResults.map(product => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                  >
                    <img
                      src={product.image.url}
                      alt={product.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <div className="font-medium">{product.title}</div>
                      <div className="text-sm text-gray-600">${product.price}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">No products found</div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;