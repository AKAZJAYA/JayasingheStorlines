import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Async thunks for dashboard data
export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      // Fetch combined stats from multiple endpoints
      const [usersRes, productsRes, ordersRes, salesRes] = await Promise.all([
        api.get("/admin/users/stats"),
        api.get("/admin/products/stats"),
        api.get("/admin/orders/stats"),
        api.get("/admin/sales/overview"),
      ]);

      return {
        users: usersRes.data,
        products: productsRes.data,
        orders: ordersRes.data,
        sales: salesRes.data,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch dashboard data" }
      );
    }
  }
);

export const fetchRecentOrders = createAsyncThunk(
  "dashboard/fetchRecentOrders",
  async (limit = 5, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/orders", {
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
      const response = await api.get("/admin/sales/top-products", {
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
        state.error =
          action.payload?.message || "Failed to fetch dashboard stats";
      })
      .addCase(fetchRecentOrders.fulfilled, (state, action) => {
        state.recentOrders = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchTopProducts.fulfilled, (state, action) => {
        // Handle different response formats from backend
        if (Array.isArray(action.payload)) {
          state.topProducts = action.payload;
        } else if (action.payload && Array.isArray(action.payload.products)) {
          state.topProducts = action.payload.products;
        } else if (action.payload && Array.isArray(action.payload.data)) {
          state.topProducts = action.payload.data;
        } else {
          state.topProducts = [];
        }
      })
      .addCase(fetchRecentOrders.rejected, (state, action) => {
        state.error =
          action.payload?.message || "Failed to fetch recent orders";
      })
      .addCase(fetchTopProducts.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to fetch top products";
      });
  },
});

export const { clearError, refreshDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
