import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunks for dashboard data
export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      // Fetch combined stats from multiple endpoints
      const [usersRes, productsRes, ordersRes, salesRes] = await Promise.all([
        axios.get("/api/admin/users/stats"),
        axios.get("/api/admin/products/stats"),
        axios.get("/api/admin/orders/stats"),
        axios.get("/api/admin/sales/overview"),
      ]);

      return {
        users: usersRes.data,
        products: productsRes.data,
        orders: ordersRes.data,
        sales: salesRes.data,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch dashboard data" });
    }
  }
);

export const fetchRecentOrders = createAsyncThunk(
  "dashboard/fetchRecentOrders",
  async (limit = 5, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/admin/orders", {
        params: { limit, sort: "createdAt", order: "desc" },
      });
      return response.data.orders;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTopProducts = createAsyncThunk(
  "dashboard/fetchTopProducts",
  async (limit = 5, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/admin/sales/top-products", {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  stats: {
    users: {
      totalUsers: 0,
      activeUsers: 0,
      newUsers: 0,
      growth: 0,
    },
    products: {
      totalProducts: 0,
      activeProducts: 0,
      outOfStock: 0,
      lowStock: 0,
    },
    orders: {
      totalOrders: 0,
      pendingOrders: 0,
      completedOrders: 0,
      revenue: 0,
      growth: 0,
    },
    sales: {
      totalSales: 0,
      totalRevenue: 0,
      avgOrderValue: 0,
      conversionRate: 0,
    },
  },
  recentOrders: [],
  topProducts: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    refreshDashboard: (state) => {
      state.lastUpdated = new Date().toISOString();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.stats = action.payload;
        state.loading = false;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch dashboard stats";
      })
      .addCase(fetchRecentOrders.fulfilled, (state, action) => {
        state.recentOrders = action.payload;
      })
      .addCase(fetchTopProducts.fulfilled, (state, action) => {
        state.topProducts = action.payload;
      });
  },
});

export const { clearError, refreshDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;