import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearCart } from '../store/slices/cartSlice';
import { toast } from 'react-toastify';

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('/api/orders', { shippingAddress: address }, { withCredentials: true });
      await dispatch(clearCart());
      toast.success('Order placed successfully!');
      navigate(`/order-success/${data.order._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 mb-4">Your cart is empty</p>
        <a href="/products" className="text-primary hover:underline">Continue shopping</a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              required
              value={address.name}
              onChange={(e) => setAddress({ ...address, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              required
              value={address.phone}
              onChange={(e) => setAddress({ ...address, phone: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Address Line 1"
              required
              value={address.line1}
              onChange={(e) => setAddress({ ...address, line1: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Address Line 2"
              value={address.line2}
              onChange={(e) => setAddress({ ...address, line2: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City"
                required
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="State"
                required
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <input
              type="text"
              placeholder="Pincode"
              required
              value={address.pincode}
              onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition disabled:bg-gray-300"
            >
              {loading ? 'Placing Order...' : `Place Order (₹${total.toFixed(2)})`}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-4 mb-4">
              {items.map(item => (
                <div key={item.variantId} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-600">{item.variantName} × {item.quantity}</p>
                  </div>
                  <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}