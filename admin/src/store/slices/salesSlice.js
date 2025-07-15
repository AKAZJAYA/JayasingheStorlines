import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api/admin/sales";

// Async thunks
export const fetchSalesOverview = createAsyncThunk(
  "sales/fetchSalesOverview",
  async (period, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/overview`, {
        params: { period },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSalesByCategory = createAsyncThunk(
  "sales/fetchSalesByCategory",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/by-category`, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTopSellingProducts = createAsyncThunk(
  "sales/fetchTopSellingProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/top-products`, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSalesTrends = createAsyncThunk(
  "sales/fetchSalesTrends",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/trends`, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  overview: {
    totalSales: 0,
    totalRevenue: 0,
    avgOrderValue: 0,
    conversionRate: 0,
    growth: {
      sales: 0,
      revenue: 0,
      avgOrder: 0,
      conversion: 0,
    },
  },
  salesByCategory: [],
  topProducts: [],
  salesTrends: [],
  loading: false,
  error: null,
  timeframe: "month",
  filters: {
    category: "all",
    dateFrom: "",
    dateTo: "",
  },
};

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    setTimeframe: (state, action) => {
      state.timeframe = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesOverview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalesOverview.fulfilled, (state, action) => {
        state.overview = action.payload;
        state.loading = false;
      })
      .addCase(fetchSalesOverview.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch sales overview";
      })
      .addCase(fetchSalesByCategory.fulfilled, (state, action) => {
        state.salesByCategory = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchTopSellingProducts.fulfilled, (state, action) => {
        state.topProducts = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchSalesTrends.fulfilled, (state, action) => {
        state.salesTrends = Array.isArray(action.payload) ? action.payload : [];
      });
  },
});

export const { setTimeframe, setFilters, clearError } = salesSlice.actions;
export default salesSlice.reducer;
