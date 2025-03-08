import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useSearch } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setSearchResults, searchResults, setSelectedProduct } = useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      if (searchTerm.length === 0) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch('https://v2.api.noroff.dev/online-shop');
        const data = await response.json();
        
        const filteredProducts = data.data.filter(product =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        setSearchResults(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, setSearchResults]);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setSearchTerm("");
    navigate("/products"); // Navigate to products page when item is selected
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-md px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <Search className="absolute left-2 top-2.5 text-gray-500" size={20} />
      </div>

      {/* Search Results Dropdown */}
      {searchTerm.length > 0 && (
        <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg max-h-96 overflow-y-auto z-50">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : searchResults.length > 0 ? (
            <ul>
              {searchResults.map((product) => (
                <li
                  key={product.id}
                  onClick={() => handleProductSelect(product)}
                  className="p-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={product.image.url}
                      alt={product.image.alt || product.title}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div>
                      <div className="font-medium">{product.title}</div>
                      <div className="text-sm text-gray-500">
                        ${product.price}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 