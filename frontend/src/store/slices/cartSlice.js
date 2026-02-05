import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  total: 0,
  isDrawerOpen: false,
  loading: false,
  error: null
};

// Async thunks
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/api/cart', { withCredentials: true });
    return data.cart;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
  }
});

export const addToCart = createAsyncThunk('cart/addToCart', async (itemData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/api/cart/add', itemData, { withCredentials: true });
    return data.cart;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to add item');
  }
});

export const updateCartItem = createAsyncThunk('cart/updateCartItem', async (itemData, { rejectWithValue }) => {
  try {
    const { data } = await axios.put('/api/cart/update', itemData, { withCredentials: true });
    return data.cart;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update item');
  }
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (itemData, { rejectWithValue }) => {
  try {
    const { data } = await axios.delete('/api/cart/remove', {
      data: itemData,
      withCredentials: true
    });
    return data.cart;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to remove item');
  }
});

export const clearCart = createAsyncThunk('cart/clearCart', async (_, { rejectWithValue }) => {
  try {
    await axios.delete('/api/cart/clear', { withCredentials: true });
  } catch (error) {
    return rejectWithValue(error.response?.data?.message);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.isDrawerOpen = true;
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
    },
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || [];
        state.total = action.payload.total || 0;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to cart
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.total = action.payload.total || 0;
        state.isDrawerOpen = true; // Auto-open drawer on add
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Update cart item
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.total = action.payload.total || 0;
      })
      // Remove from cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.total = action.payload.total || 0;
      })
      // Clear cart
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
        state.total = 0;
      });
  }
});

export const { openDrawer, closeDrawer, toggleDrawer } = cartSlice.actions;
export default cartSlice.reducer;
