import { ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * Cart component that displays a shopping cart icon with item count
 * @component
 * @returns {JSX.Element} A shopping cart icon with an optional item count badge
 * @example
 * return (
 *   <Cart />
 * )
 */
export const Cart = () => {
  /** @type {Array} cartItems - Array of items in cart from Redux store */
  const cartItems = useSelector((state) => state.cart.items);
  
  /** @type {number} itemCount - Total quantity of items in cart */
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