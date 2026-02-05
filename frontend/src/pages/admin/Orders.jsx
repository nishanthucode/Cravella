import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminOrders } from '../../store/slices/adminSlice';
import { FiEye } from 'react-icons/fi';

export default function Orders() {
    const dispatch = useDispatch();
    const { orders, loading } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(getAdminOrders());
    }, [dispatch]);

    if (loading) return <div className="text-center py-10">Loading orders...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Orders Management</h1>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 text-sm">
                            <tr>
                                <th className="px-6 py-3 font-medium">Order ID</th>
                                <th className="px-6 py-3 font-medium">Customer</th>
                                <th className="px-6 py-3 font-medium">Date</th>
                                <th className="px-6 py-3 font-medium">Items</th>
                                <th className="px-6 py-3 font-medium">Total</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-mono text-gray-500">#{order._id.slice(-6).toUpperCase()}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        {order.user ? order.user.name : 'Guest User'}
                                        <div className="text-xs text-gray-500">{order.user?.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {order.orderItems.length} items
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">₹{order.totalAmount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.isDelivered ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {order.isDelivered ? 'Delivered' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-blue-600">
                                            <FiEye size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
