import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductBySlug } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { toggleWishlistItem } from '../store/slices/wishlistSlice';
import { toast } from 'react-toastify';
import { FiHeart, FiShoppingBag, FiShare2 } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';
import { SiVisa, SiMastercard, SiApplepay, SiGooglepay } from 'react-icons/si';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { currentProduct: product, loading } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchProductBySlug(slug));
  }, [slug, dispatch]);

  useEffect(() => {
    if (product?.variants?.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  const isInWishlist = product && wishlistItems.some(item => item._id === product._id);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setCurrentImageIndex(0);
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }
    if (!selectedVariant) {
      toast.error('Please select a variant');
      return;
    }
    if (selectedVariant.stock === 0) {
      toast.error('This variant is out of stock');
      return;
    }
    try {
      await dispatch(addToCart({
        productId: product._id,
        variantId: selectedVariant._id,
        quantity: 1
      })).unwrap();
      toast.success('Added to cart!');
    } catch (error) {
      toast.error(error || 'Failed to add to cart');
    }
  };

  const handleWishlistToggle = async () => {
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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-200 h-96 rounded-lg"></div>
            <div className="space-y-4">
              <div className="bg-gray-200 h-8 w-3/4 rounded"></div>
              <div className="bg-gray-200 h-6 w-1/2 rounded"></div>
              <div className="bg-gray-200 h-24 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 mb-4">Product not found</p>
        <Link to="/products" className="text-blue-600 hover:underline">
          Back to products
        </Link>
      </div>
    );
  }

  const images = selectedVariant?.images?.length > 0 ? selectedVariant.images : product.images;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Images */}
        <div>
          <div className="relative mb-4 bg-gray-50 rounded-lg overflow-hidden">
            <img
              src={images[currentImageIndex]}
              alt={product.name}
              className="w-full h-[500px] object-cover"
            />
            <button
              onClick={handleWishlistToggle}
              className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition"
            >
              {isInWishlist ? (
                <FaHeart className="text-red-500" size={20} />
              ) : (
                <FiHeart size={20} />
              )}
            </button>
            <button className="absolute top-4 right-16 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition">
              <FiShare2 size={20} />
            </button>
          </div>

          {images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`border-2 rounded-lg overflow-hidden ${currentImageIndex === idx ? 'border-gray-900' : 'border-transparent'
                    }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
          {selectedVariant && (
            <p className="text-gray-600 mb-6">{selectedVariant.name}</p>
          )}

          {/* Price */}
          {selectedVariant && (
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold">₹{selectedVariant.price}</span>
              {product.priceRange && product.priceRange.max > selectedVariant.price && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    ₹{product.priceRange.max}
                  </span>
                  <span className="text-red-600 font-semibold">
                    Save: ₹{product.priceRange.max - selectedVariant.price}
                  </span>
                </>
              )}
            </div>
          )}

          {/* Size Selector */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Available Sizes:</h3>
            <div className="flex flex-wrap gap-2">
              {product.variants.map(variant => (
                <button
                  key={variant._id}
                  onClick={() => handleVariantChange(variant)}
                  disabled={variant.stock === 0}
                  className={`px-5 py-2 rounded-md border-2 transition font-medium text-sm ${selectedVariant?._id === variant._id
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : variant.stock === 0
                      ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'border-gray-300 hover:border-gray-900'
                    }`}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 mb-6">
            <a
              href={`https://wa.me/911234567890?text=I want to order ${product.name} - ${selectedVariant?.name}`}
              className="w-full bg-[#25D366] text-white py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition font-medium text-lg"
            >
              <IoLogoWhatsapp size={24} />
              Order by WhatsApp
            </a>
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant || selectedVariant?.stock === 0}
              className="w-full bg-gray-900 text-white py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed font-medium text-lg"
            >
              <FiShoppingBag size={20} />
              Add to Bag
            </button>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-3 mb-6">
            <SiApplepay size={40} className="text-gray-700" />
            <SiVisa size={40} className="text-blue-700" />
            <SiMastercard size={40} className="text-red-600" />
            <SiGooglepay size={40} className="text-gray-700" />
          </div>

          {/* Payment Plans */}
          <div className="border rounded-lg p-4 mb-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">tabby</span>
              <span className="text-sm text-gray-600">
                Pay in 4 interest-free payments of 500 SAR.
                <a href="#" className="text-blue-600 ml-1">Learn More</a>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-pink-600">tamara</span>
              <span className="text-sm text-gray-600">
                Pay in 4 interest-free payments of 500 SAR.
                <a href="#" className="text-blue-600 ml-1">Learn More</a>
              </span>
            </div>
          </div>

          {/* Security Badge */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Secure Payments</span>
            <span className="ml-2">100% secure payments</span>
          </div>

          {/* About Product */}
          <div className="mt-8">
            <h3 className="font-bold text-lg mb-4">About This Product</h3>
            <div className="prose prose-sm text-gray-600">
              <p className="mb-3">{product.description}</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Crafted with care and attention to detail</li>
                <li>Perfect blend of rich flavors</li>
                <li>Expertly crafted by our chefs</li>
                <li>Perfect choice for celebrations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {product.relatedProducts?.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {product.relatedProducts.map(related => (
              <ProductCard key={related._id} product={related} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}