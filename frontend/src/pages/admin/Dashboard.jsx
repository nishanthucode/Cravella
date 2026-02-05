import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminStats } from '../../store/slices/adminSlice';
import { FiUsers, FiBox, FiShoppingBag, FiDollarSign } from 'react-icons/fi';

export default function Dashboard() {
    const dispatch = useDispatch();
    const { stats, loading } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(getAdminStats());
    }, [dispatch]);

    if (loading || !stats) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    const statCards = [
        { label: 'Total Users', value: stats.totalUsers, icon: <FiUsers />, color: 'bg-blue-500' },
        { label: 'Total Products', value: stats.totalProducts, icon: <FiBox />, color: 'bg-green-500' },
        { label: 'Total Orders', value: stats.totalOrders, icon: <FiShoppingBag />, color: 'bg-yellow-500' },
        { label: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: <FiDollarSign />, color: 'bg-purple-500' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                            </div>
                            <div className={`p-3 rounded-full text-white ${stat.color}`}>
                                <span className="text-xl">{stat.icon}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800">Recent Orders</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 text-sm">
                            <tr>
                                <th className="px-6 py-3 font-medium">Order ID</th>
                                <th className="px-6 py-3 font-medium">Customer</th>
                                <th className="px-6 py-3 font-medium">Amount</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {stats.recentOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-600">#{order._id.slice(-6).toUpperCase()}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.user ? order.user.name : 'Guest'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">₹{order.totalAmount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.isDelivered ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {order.isDelivered ? 'Delivered' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                            {stats.recentOrders.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        No orders found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
