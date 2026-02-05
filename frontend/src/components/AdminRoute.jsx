import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AdminRoute() {
    const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    // Check if authenticated and has admin role
    if (isAuthenticated && user?.role === 'admin') {
        return <Outlet />;
    }

    // Redirect to login if not authenticated or not admin
    return <Navigate to="/login" replace />;
}
