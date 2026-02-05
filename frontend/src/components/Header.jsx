import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiShoppingBag, FiHeart, FiUser, FiLogOut, FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import { logout } from '../store/slices/authSlice';
import { toggleDrawer } from '../store/slices/cartSlice';
import { toast } from 'react-toastify';
import { IoLogoWhatsapp } from 'react-icons/io';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const [search, setSearch] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    await dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${search}`);
    }
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start">
            <span className="text-2xl font-bold tracking-wide">CRAVELLA</span>
            <span className="text-[10px] tracking-[0.2em] text-gray-500 -mt-1">SWEETS CO.</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="What are you looking for?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 text-sm"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                <FiSearch className="text-gray-600" size={18} />
              </button>
            </div>
          </form>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <button className="text-gray-700 hover:text-gray-900 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span className="text-sm font-medium">EN</span>
            </button>

            {/* WhatsApp */}
            <a
              href="https://wa.me/911234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white p-2 rounded-md hover:bg-[#20bd5a] transition"
            >
              <IoLogoWhatsapp size={20} />
            </a>

            {/* Wishlist */}
            {isAuthenticated && (
              <Link to="/wishlist" className="text-gray-700 hover:text-gray-900">
                <FiHeart size={22} />
              </Link>
            )}

            {/* Cart */}
            <button
              onClick={() => dispatch(toggleDrawer())}
              className="relative text-gray-700 hover:text-gray-900"
            >
              <FiShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="text-gray-700 hover:text-gray-900"
                >
                  <FiUser size={22} />
                </button>
                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-20 border">
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
                      >
                        <FiLogOut size={16} /> Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-gray-900">
                <FiUser size={22} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}