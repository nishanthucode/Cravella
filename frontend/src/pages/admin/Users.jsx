import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminUsers } from '../../store/slices/adminSlice';
import { FiMail } from 'react-icons/fi';

export default function Users() {
    const dispatch = useDispatch();
    const { users, loading } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(getAdminUsers());
    }, [dispatch]);

    if (loading) return <div className="text-center py-10">Loading users...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Users Management</h1>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-600 text-sm">
                        <tr>
                            <th className="px-6 py-3 font-medium">Name</th>
                            <th className="px-6 py-3 font-medium">Email</th>
                            <th className="px-6 py-3 font-medium">Role</th>
                            <th className="px-6 py-3 font-medium">Joined Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    {user.name}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <FiMail size={16} />
                                        {user.email}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {user.role.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
