import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Fullscreen } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

/**
 * Product details component that displays detailed information about a specific product
 * @component
 * @returns {JSX.Element} A detailed product view with image, description, price, reviews and add to cart functionality
 * @example
 * return (
 *   <ProductDetails />
 * )
 * 
 * The component expects a product ID in the URL parameters and fetches the corresponding product data.
 * It displays:
 * - Product image with lightbox functionality
 * - Product title and description
 * - Price (with discount if applicable)
 * - Reviews (if available)
 * - Add to cart button
 */
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('https://v2.api.noroff.dev/online-shop');
        const data = await response.json();
        const foundProduct = data.data.find(p => p.id === id);
        setProduct(foundProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-8">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg overflow-hidden max-w-4xl mx-auto">
        <div className="flex flex-col">
          <div className="w-full relative">
            <img
              src={product.image.url}
              alt={product.image.alt || product.title}
              className="w-full h-[400px] object-cover"
            />
            <button 
              onClick={() => setIsLightboxOpen(true)}
              className="absolute bottom-4 right-4 bg-white p-2 cursor-pointer rounded-full shadow-md hover:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <Fullscreen />
              </svg>
            </button>
          </div>
          <div className="p-8">
            <h1 className="text-2xl font-semibold mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="mb-4">
              <span className="text-2xl font-bold text-red-600">
                {product.discountedPrice < product.price 
                  ? (
                    <>
                      <span className="line-through text-gray-400 text-xl mr-2">NOK {product.price},- </span>
                      NOK {product.discountedPrice},-
                    </>
                  ) 
                  : product.price}
              </span>
            </div>
            {product.reviews.length > 0 && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Reviews</h2>
                {product.reviews.map((review) => (
                  <div key={review.id} className="mb-2">
                    <div className="font-medium">{review.username}</div>
                    <div className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</div>
                    <p className="text-gray-600">{review.description}</p>
                  </div>
                ))}
              </div>
            )}
            <button 
              onClick={handleAddToCart}
              className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 cursor-pointer transition-colors w-full md:w-auto"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setIsLightboxOpen(false)}>
          <div className="max-w-4xl max-h-[90vh] relative">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={product.image.url}
              alt={product.image.alt || product.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;