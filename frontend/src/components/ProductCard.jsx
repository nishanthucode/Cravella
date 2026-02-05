import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlistItem } from '../store/slices/wishlistSlice';
import { toast } from 'react-toastify';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isInWishlist = wishlistItems.some(item => item._id === product._id);
  const priceRange = product.priceRange;

  // Calculate discount percentage
  const discountPercent = priceRange && priceRange.max > priceRange.min
    ? Math.round(((priceRange.max - priceRange.min) / priceRange.max) * 100)
    : 0;

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Please login to add to wishlist');
      return;
    }
    try {
      await dispatch(toggleWishlistItem(product._id)).unwrap();
      toast.success(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
    } catch (error) {
      toast.error(error || 'Failed to update wishlist');
    }
  };

  return (
    <Link to={`/product/${product.slug}`} className="group block">
      <div className="bg-white rounded-lg border hover:shadow-lg transition-shadow">
        <div className="relative overflow-hidden rounded-t-lg bg-gray-50">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Discount Badge */}
          {discountPercent > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              Save ₹{priceRange.max - priceRange.min}
            </div>
          )}

          {/* Wishlist Heart */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition z-10"
          >
            {isInWishlist ? (
              <FaHeart className="text-red-500" size={18} />
            ) : (
              <FiHeart size={18} className="text-gray-700" />
            )}
          </button>
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            {priceRange && (
              <>
                <span className="text-lg font-bold text-gray-900">
                  ₹{priceRange.min}
                </span>
                {priceRange.max > priceRange.min && (
                  <>
                    <span className="text-sm text-gray-400 line-through">
                      ₹{priceRange.max}
                    </span>
                    <span className="text-sm text-green-600 font-bold">
                      {discountPercent}% Off
                    </span>
                  </>
                )}
              </>
            )}
          </div>

          <div className="flex gap-2">
            <a
              href={`https://wa.me/911234567890?text=I'm interested in ${product.name}`}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 bg-[#25D366] text-white py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-[#20bd5a] transition text-sm font-medium"
            >
              <IoLogoWhatsapp size={18} />
            </a>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // This will navigate to product detail for variant selection
                window.location.href = `/product/${product.slug}`;
              }}
              className="flex-[2] border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
            >
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}