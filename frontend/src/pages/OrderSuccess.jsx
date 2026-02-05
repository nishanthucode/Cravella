import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FiCheckCircle } from 'react-icons/fi';

export default function OrderSuccess() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`/api/orders/${orderId}`, { withCredentials: true });
        setOrder(data.order);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Order not found</p>
          <Link to="/orders" className="text-primary hover:underline">View all orders</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <FiCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-6">Thank you for your order</p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Order Number:</span>
            <span>{order.orderNumber}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Total Amount:</span>
            <span className="text-primary font-bold">₹{order.total.toFixed(2)}</span>
          </div>
          <div className="border-t pt-4">
            <p className="font-semibold mb-2">Items:</p>
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between py-1 text-sm">
                <span>{item.productName} - {item.variantName} × {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Link to="/orders" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark">
            View Orders
          </Link>
          <Link to="/products" className="border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}