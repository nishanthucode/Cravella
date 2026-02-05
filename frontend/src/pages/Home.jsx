import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';

export default function Home() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ featured: true, limit: 20 }));
  }, [dispatch]);

  const featuredProducts = products.slice(0, 5);
  const newArrivals = products.slice(0, 5);
  const bestSellers = products.slice(5, 10);

  return (
    <div>
      {/* Hero Banner - Clean Image Only */}
      <div className="relative h-[320px] bg-gray-100">
        <img
          src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1920&h=320&fit=crop&q=80"
          alt="Delicious Cakes"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* New Arrivals */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">New Arrivals</h2>
            <Link to="/products" className="text-blue-600 hover:underline text-sm font-medium">
              View All
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="bg-gray-200 h-96 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {newArrivals.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Best Sellers */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Best Sellers</h2>
            <Link to="/products?sort=popular" className="text-blue-600 hover:underline text-sm font-medium">
              View All
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="bg-gray-200 h-96 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {bestSellers.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Christmas Banner */}
        <div className="mb-16">
          <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: '#F5E6D3',
                backgroundImage: `
                  repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(139, 69, 19, 0.05) 35px, rgba(139, 69, 19, 0.05) 70px),
                  radial-gradient(circle at 20% 50%, #8B4513 2%, transparent 2%),
                  radial-gradient(circle at 60% 30%, #228B22 2%, transparent 2%),
                  radial-gradient(circle at 80% 70%, #DC143C 2%, transparent 2%),
                  radial-gradient(circle at 40% 80%, #8B4513 2%, transparent 2%)
                `,
                backgroundSize: '100% 100%, 200px 200px, 250px 250px, 180px 180px, 220px 220px'
              }}
            >
              <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="christmas-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                    <circle cx="50" cy="50" r="3" fill="#DC143C" />
                    <circle cx="150" cy="100" r="3" fill="#228B22" />
                    <circle cx="100" cy="150" r="3" fill="#8B4513" />
                    <path d="M 80 80 L 85 70 L 90 80 L 100 75 L 95 85 L 105 90 L 95 95 L 100 105 L 90 100 L 85 110 L 80 100 L 70 105 L 75 95 L 65 90 L 75 85 L 70 75 Z" fill="#DC143C" opacity="0.6" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#christmas-pattern)" />
              </svg>
            </div>
            <div className="relative h-full flex items-center justify-center px-4">
              <div className="text-center">
                <h3 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">Merry Christmas !</h3>
                <p className="text-lg md:text-xl text-gray-700">Your banner description goes here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}