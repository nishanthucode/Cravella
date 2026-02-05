import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts, setFilter } from '../store/slices/productSlice';
import ProductCard from '../components/ProductCard';
import { FiSliders } from 'react-icons/fi';

export default function Products() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading, filters } = useSelector((state) => state.products);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['Cakes', 'Pastries', 'Desserts', 'Beverages', 'Snacks'];

  useEffect(() => {
    const params = {
      category: searchParams.get('category') || '',
      search: searchParams.get('search') || '',
      sort: searchParams.get('sort') || 'newest'
    };
    dispatch(setFilter(params));
    dispatch(fetchProducts(params));
  }, [searchParams, dispatch]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    const params = {};
    Object.keys(newFilters).forEach(k => {
      if (newFilters[k]) params[k] = newFilters[k];
    });
    setSearchParams(params);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 px-4 py-2 border rounded-lg"
        >
          <FiSliders /> Filters
        </button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block w-64 flex-shrink-0`}>
          <div className="bg-white rounded-lg shadow p-6 sticky top-20">
            <h3 className="font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  checked={!filters.category}
                  onChange={() => handleFilterChange('category', '')}
                  className="mr-2"
                />
                All
              </label>
              {categories.map(cat => (
                <label key={cat} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={filters.category === cat}
                    onChange={() => handleFilterChange('category', cat)}
                    className="mr-2"
                  />
                  {cat}
                </label>
              ))}
            </div>

            <h3 className="font-semibold mt-6 mb-4">Sort By</h3>
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="bg-gray-200 h-80 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-4">No products found</p>
              <button
                onClick={() => handleFilterChange('category', '')}
                className="text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}