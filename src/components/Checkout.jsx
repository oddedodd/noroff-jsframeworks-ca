import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';

/**
 * Checkout component that displays order summary and checkout form
 * @component
 * @returns {JSX.Element} A checkout page with order details and payment form
 * @example
 * return (
 *   <Checkout />
 * )
 */
const Checkout = () => {
  /** @type {Object} cart - Cart state from Redux store containing items and total */
  const { items, total } = useSelector((state) => state.cart);
  
  /** @type {Function} dispatch - Redux dispatch function */
  const dispatch = useDispatch();
  
  /** @type {Function} navigate - React Router navigation function */
  const navigate = useNavigate();

  /**
   * Handles form submission, clears cart and redirects to home
   * @param {Event} e - Form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearCart());
    navigate('/');
    alert('Thank you for your purchase!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.title} x {item.quantity}</span>
              <span>${((item.discountedPrice || item.price) * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input type="text" required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input type="email" required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1">Address</label>
            <textarea required className="w-full p-2 border rounded" rows="3"></textarea>
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;