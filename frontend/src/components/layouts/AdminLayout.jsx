import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiHome, FiBox, FiUsers, FiShoppingBag, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';
import { logout } from '../../store/slices/authSlice';

export default function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: <FiHome /> },
        { name: 'Products', path: '/admin/products', icon: <FiBox /> },
        { name: 'Orders', path: '/admin/orders', icon: <FiShoppingBag /> },
        { name: 'Users', path: '/admin/users', icon: <FiUsers /> },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-between h-16 px-6 bg-gray-800">
                        <span className="text-xl font-bold tracking-wider">CRAVELLA</span>
                        <button
                            className="lg:hidden text-gray-400 hover:text-white"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <FiX size={24} />
                        </button>
                    </div>

                    {/* Nav Links */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`}
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Logout */}
                    <div className="p-4 border-t border-gray-800">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-gray-800 hover:text-red-300 rounded-lg transition-colors"
                        >
                            <FiLogOut size={20} />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="flex items-center justify-between h-16 px-6 bg-white shadow-sm lg:hidden">
                    <button
                        className="text-gray-600 hover:text-gray-900"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <FiMenu size={24} />
                    </button>
                    <span className="font-semibold text-gray-800">Admin Panel</span>
                    <div className="w-6" /> {/* Spacer */}
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
