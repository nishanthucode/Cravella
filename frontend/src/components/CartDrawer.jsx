import { useSelector, useDispatch } from 'react-redux';
import { closeDrawer, removeFromCart, updateCartItem } from '../store/slices/cartSlice';
import { FiX, FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDebounce } from '../utils/hooks';

export default function CartDrawer() {
  const dispatch = useDispatch();
  const { items, total, isDrawerOpen } = useSelector((state) => state.cart);

  const handleRemove = async (productId, variantId) => {
    try {
      await dispatch(removeFromCart({ productId, variantId })).unwrap();
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error(error || 'Failed to remove item');
    }
  };

  const handleUpdateQty = useDebounce(async (productId, variantId, newQty) => {
    if (newQty < 1) return;
    try {
      await dispatch(updateCartItem({ productId, variantId, quantity: newQty })).unwrap();
    } catch (error) {
      toast.error(error || 'Failed to update quantity');
    }
  }, 300);

  if (!isDrawerOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={() => dispatch(closeDrawer())}
      />
      <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white z-50 shadow-2xl flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <button onClick={() => dispatch(closeDrawer())} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <button 
                onClick={() => dispatch(closeDrawer())}
                className="text-primary hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-4 border-b pb-4">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">{item.variantName}</p>
                    <p className="text-primary font-semibold mt-1">₹{item.price}</p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleUpdateQty(item.product._id, item.variantId, item.quantity - 1)}
                        className="w-6 h-6 rounded border flex items-center justify-center hover:bg-gray-100"
                      >
                        <FiMinus size={12} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQty(item.product._id, item.variantId, item.quantity + 1)}
                        className="w-6 h-6 rounded border flex items-center justify-center hover:bg-gray-100"
                      >
                        <FiPlus size={12} />
                      </button>
                      <button
                        onClick={() => handleRemove(item.product._id, item.variantId)}
                        className="ml-auto text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total:</span>
              <span className="text-xl font-bold text-primary">₹{total.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={() => dispatch(closeDrawer())}
              className="block w-full bg-primary text-white text-center py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={() => dispatch(closeDrawer())}
              className="block w-full mt-2 border border-gray-300 text-gray-700 text-center py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}