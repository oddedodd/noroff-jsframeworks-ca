import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import { Link } from 'react-router-dom';

const DisplayCart = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <Link to="/" className="text-blue-600 hover:text-blue-700">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
            <img src={item.image.url} alt={item.title} className="w-24 h-24 object-cover rounded" />
            <div className="flex-grow">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-600">${item.discountedPrice || item.price}</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right">
        <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
        <Link
          to="/checkout"
          className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default DisplayCart; 