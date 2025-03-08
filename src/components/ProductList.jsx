import { useState, useEffect } from 'react';
import { useSearch } from '../context/SearchContext';

const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchResults, selectedProduct } = useSearch();

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

  // Determine which products to display
  const displayProducts = selectedProduct 
    ? [selectedProduct] 
    : searchResults.length > 0 
      ? searchResults 
      : allProducts;

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={product.image.url}
              alt={product.image.alt || product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-blue-600">
                  ${product.discountedPrice < product.price 
                    ? (
                      <>
                        <span className="line-through text-gray-400 text-sm mr-2">${product.price}</span>
                        ${product.discountedPrice}
                      </>
                    ) 
                    : product.price}
                </span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;