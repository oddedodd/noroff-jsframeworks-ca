import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-sm transition-shadow"
    >
      <img
        src={product.image.url}
        alt={product.image.alt || product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-red-600">
            NOK {product.discountedPrice < product.price 
              ? (
                <>
                  <span className="line-through text-gray-400 text-sm mr-2"> {product.price},-</span>
                  NOK {product.discountedPrice},-
                </>
              ) 
              : product.price}
          </span>
          {product.discountedPrice < product.price && (
            <span className="text-sm text-green-600 font-medium">
              Save {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}%
            </span>
          )}
        </div>
        <div className="text-center mt-4">
          <a 
            href={`/product/${product.id}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate(`/product/${product.id}`);
            }}
            className="text-red-600 hover:text-red-700 hover:underline transition-colors"
          >
            View details
          </a>
        </div>
      </div>
      
    </div>
  );
};

export default ProductCard;