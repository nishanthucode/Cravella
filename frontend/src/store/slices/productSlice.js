import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
  filters: {
    category: '',
    search: '',
    minPrice: '',
    maxPrice: '',
    sort: 'newest'
  },
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    pages: 1
  }
};

// Async thunks
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/api/products', { params });
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
  }
});

export const fetchProductBySlug = createAsyncThunk('products/fetchProductBySlug', async (slug, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/products/${slug}`);
    return data.product;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Product not found');
  }
});

// Admin actions
export const createProduct = createAsyncThunk('products/createProduct', async (productData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/api/admin/products', productData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create product');
  }
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/api/admin/products/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: '',
        search: '',
        minPrice: '',
        maxPrice: '',
        sort: 'newest'
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single product
      .addCase(fetchProductBySlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(p => p._id !== action.payload);
      });
  }
});

export const { setFilter, clearFilters } = productSlice.actions;
export default productSlice.reducer;
