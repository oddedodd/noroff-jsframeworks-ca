import { ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="relative">
      <Link to="/cart" className="text-gray-600 hover:text-gray-900">
        <ShoppingCart className="h-6 w-6" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {itemCount}
          </span>
        )}
      </Link>
    </div>
  );
};

export default Cart; 