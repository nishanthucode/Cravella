import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios.js';

// Get dashboard stats
export const getAdminStats = createAsyncThunk(
    'admin/getStats',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/admin/stats');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Get all orders
export const getAdminOrders = createAsyncThunk(
    'admin/getOrders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/admin/orders');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Get all users
export const getAdminUsers = createAsyncThunk(
    'admin/getUsers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/admin/users');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        stats: null,
        orders: [],
        users: [],
        products: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Stats
            .addCase(getAdminStats.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAdminStats.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload;
            })
            .addCase(getAdminStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Orders
            .addCase(getAdminOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAdminOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(getAdminOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Users
            .addCase(getAdminUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAdminUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getAdminUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default adminSlice.reducer;
