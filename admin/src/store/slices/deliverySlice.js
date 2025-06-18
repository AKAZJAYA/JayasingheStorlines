import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api/admin/deliveries";

// Async thunks
export const fetchDeliveries = createAsyncThunk(
  "deliveries/fetchDeliveries",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchDeliveryStats = createAsyncThunk(
  "deliveries/fetchDeliveryStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/stats`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchDrivers = createAsyncThunk(
  "deliveries/fetchDrivers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/drivers`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createDelivery = createAsyncThunk(
  "deliveries/createDelivery",
  async (deliveryData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, deliveryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateDelivery = createAsyncThunk(
  "deliveries/updateDelivery",
  async ({ deliveryId, deliveryData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${deliveryId}`, deliveryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateDeliveryStatus = createAsyncThunk(
  "deliveries/updateDeliveryStatus",
  async ({ deliveryId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${deliveryId}/status`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const assignDriver = createAsyncThunk(
  "deliveries/assignDriver",
  async ({ deliveryId, driverId }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${deliveryId}/assign-driver`, { driverId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  deliveries: [],
  drivers: [],
  currentDelivery: null,
  stats: {
    total: 0,
    delivered: 0,
    inTransit: 0,
    pending: 0,
    failed: 0,
    scheduled: 0,
  },
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  filters: {
    search: "",
    status: "all",
    driver: "all",
    dateFrom: "",
    dateTo: "",
  },
};

const deliverySlice = createSlice({
  name: "deliveries",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    clearCurrentDelivery: (state) => {
      state.currentDelivery = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeliveries.fulfilled, (state, action) => {
        state.deliveries = action.payload.deliveries;
        state.pagination = {
          ...state.pagination,
          total: action.payload.total,
          totalPages: action.payload.totalPages,
          page: action.payload.currentPage,
        };
        state.loading = false;
      })
      .addCase(fetchDeliveries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch deliveries";
      })
      .addCase(fetchDeliveryStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        state.drivers = action.payload;
      })
      .addCase(createDelivery.fulfilled, (state, action) => {
        state.deliveries.unshift(action.payload);
      })
      .addCase(updateDelivery.fulfilled, (state, action) => {
        const index = state.deliveries.findIndex(delivery => delivery._id === action.payload._id);
        if (index !== -1) {
          state.deliveries[index] = action.payload;
        }
        if (state.currentDelivery && state.currentDelivery._id === action.payload._id) {
          state.currentDelivery = action.payload;
        }
      })
      .addCase(updateDeliveryStatus.fulfilled, (state, action) => {
        const index = state.deliveries.findIndex(delivery => delivery._id === action.payload._id);
        if (index !== -1) {
          state.deliveries[index] = action.payload;
        }
        if (state.currentDelivery && state.currentDelivery._id === action.payload._id) {
          state.currentDelivery = action.payload;
        }
      })
      .addCase(assignDriver.fulfilled, (state, action) => {
        const index = state.deliveries.findIndex(delivery => delivery._id === action.payload._id);
        if (index !== -1) {
          state.deliveries[index] = action.payload;
        }
        if (state.currentDelivery && state.currentDelivery._id === action.payload._id) {
          state.currentDelivery = action.payload;
        }
      });
  },
});

export const { setFilters, setPage, clearCurrentDelivery, clearError } = deliverySlice.actions;
export default deliverySlice.reducer;