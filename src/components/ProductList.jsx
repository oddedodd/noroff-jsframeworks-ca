import { useState, useEffect } from 'react';
import { useSearch } from '../context/SearchContext';
import ProductCard from './ProductCard';

/**
 * Product list component that displays a grid of product cards
 * @component
 * @returns {JSX.Element} A responsive grid of product cards showing either search results or all products
 * @example
 * return (
 *   <ProductList />
 * )
 * 
 * The component:
 * - Fetches product data from the API on mount
 * - Displays loading state while fetching
 * - Shows search results when available (via SearchContext)
 * - Falls back to showing all products when no search results
 * - Renders products in a responsive grid using the ProductCard component
 */
const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchResults } = useSearch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://v2.api.noroff.dev/online-shop');
        const data = await response.json();
        setAllProducts(data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Display search results if available, otherwise show all products
  const displayProducts = searchResults.length > 0 ? searchResults : allProducts;

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;