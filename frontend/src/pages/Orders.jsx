import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/api/orders', { withCredentials: true });
        setOrders(data.orders);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 w-48 mb-8 rounded"></div>
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">You haven't placed any orders yet</p>
          <Link to="/products" className="text-primary hover:underline">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between mb-4">
                <div>
                  <p className="font-semibold">Order #{order.orderNumber}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">₹{order.total.toFixed(2)}</p>
                  <p className="text-sm text-green-600">{order.status}</p>
                </div>
              </div>
              <div className="border-t pt-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-2">
                    <span>{item.productName} - {item.variantName} × {item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}