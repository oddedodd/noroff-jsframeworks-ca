import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
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

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-8">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto">
        <div className="flex flex-col">
          <div className="w-full relative">
            <img
              src={product.image.url}
              alt={product.image.alt || product.title}
              className="w-full h-[400px] object-cover"
            />
            <button 
              onClick={() => setIsLightboxOpen(true)}
              className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <div className="p-8">
            <h1 className="text-2xl font-semibold mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="mb-4">
              <span className="text-2xl font-bold text-blue-600">
                ${product.discountedPrice < product.price 
                  ? (
                    <>
                      <span className="line-through text-gray-400 text-xl mr-2">${product.price}</span>
                      ${product.discountedPrice}
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
            <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors w-full md:w-auto">
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