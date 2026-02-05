import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  loading: false,
  error: null
};

// Async thunks
export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/api/wishlist', { withCredentials: true });
    return data.wishlist;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch wishlist');
  }
});

export const toggleWishlistItem = createAsyncThunk('wishlist/toggleItem', async (productId, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/api/wishlist/toggle', { productId }, { withCredentials: true });
    return data.wishlist;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update wishlist');
  }
});

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Toggle wishlist item
      .addCase(toggleWishlistItem.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  }
});

export default wishlistSlice.reducer;
