import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              src={product.image.url}
              alt={product.image.alt || product.title}
              className="h-96 w-full object-cover md:w-96"
            />
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
    </div>
  );
};

export default ProductDetails; 