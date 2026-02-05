import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../store/slices/productSlice';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ProductList() {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts({ limit: 100 })); // Fetch all products
    }, [dispatch]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await dispatch(deleteProduct(id)).unwrap(); // Assuming deleteProduct action exists
                toast.success('Product deleted successfully');
                dispatch(fetchProducts({ limit: 100 })); // Refresh list
            } catch (error) {
                toast.error('Failed to delete product');
            }
        }
    };

    if (loading) return <div className="text-center py-10">Loading products...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Products</h1>
                <Link
                    to="/admin/products/add"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                    <FiPlus /> Add New Product
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4">Image</th>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Stock</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded object-cover" />
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                                <td className="px-6 py-4 text-gray-600">{product.category}</td>
                                <td className="px-6 py-4 font-medium">₹{product.variants[0]?.price}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${product.variants[0]?.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                        {product.variants[0]?.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-blue-600 hover:text-blue-800 mr-3">
                                        <FiEdit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FiTrash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
