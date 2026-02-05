import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { checkAuth } from './store/slices/authSlice';
import { fetchCart } from './store/slices/cartSlice';
import { fetchWishlist } from './store/slices/wishlistSlice';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import PrivateRoute from './components/PrivateRoute';
import AdminLayout from './components/layouts/AdminLayout';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import UserOrders from './pages/Orders'; // Rename to avoid conflict with Admin Orders
import OrderSuccess from './pages/OrderSuccess';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AddProduct from './pages/admin/AddProduct';
import ProductList from './pages/admin/ProductList';
import AdminOrders from './pages/admin/Orders';
import AdminUsers from './pages/admin/Users';

// Footer Pages
import About from './pages/About';
import Contact from './pages/Contact';
import Stores from './pages/Stores';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Refund from './pages/Refund';

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check authentication on mount
    dispatch(checkAuth()).then((result) => {
      if (result.type === 'auth/checkAuth/fulfilled') {
        dispatch(fetchCart());
        dispatch(fetchWishlist());
      }
    });
  }, [dispatch]);

  // Protected Admin Route Component
  const AdminRoute = ({ children }) => {
    if (!isAuthenticated) return <Navigate to="/login" />;
    if (user?.role !== 'admin') return <Navigate to="/" />;
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>

        {/* Public Routes with Main Layout */}
        <Route path="*" element={
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:slug" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
                <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
                <Route path="/orders" element={<PrivateRoute><UserOrders /></PrivateRoute>} />
                <Route path="/order-success/:orderId" element={<PrivateRoute><OrderSuccess /></PrivateRoute>} />

                {/* Footer Page Routes */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/stores" element={<Stores />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/return" element={<Refund />} />
              </Routes>
            </main>
            <Footer />
            <CartDrawer />
          </div>
        } />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
