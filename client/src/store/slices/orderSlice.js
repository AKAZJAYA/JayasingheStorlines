import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const API_URL = "/orders";

// Create order
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await api.post(API_URL, orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to create order" }
      );
    }
  }
);

// Fetch order details
export const fetchOrderDetails = createAsyncThunk(
  "orders/fetchOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch order details" }
      );
    }
  }
);

// Fetch user orders
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}`, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch orders" }
      );
    }
  }
);

// Cancel order
export const cancelOrder = createAsyncThunk(
  "orders/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_URL}/${orderId}/cancel`, {
        reason: "Cancelled by customer",
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to cancel order" }
      );
    }
  }
);

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
    setOrderPage: (state, action) => {
      state.pagination.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create order";
      })
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.order;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch order details";
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.pagination = {
          ...state.pagination,
          total: action.payload.total,
          totalPages: action.payload.totalPages,
          page: action.payload.currentPage,
        };
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch orders";
      })
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        // Update the order in the orders array
        const index = state.orders.findIndex(
          (order) => order._id === action.payload.order._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload.order;
        }
        // Update current order if it's the one being cancelled
        if (
          state.currentOrder &&
          state.currentOrder._id === action.payload.order._id
        ) {
          state.currentOrder = action.payload.order;
        }
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to cancel order";
      });
  },
});

export const { clearOrderError, setOrderPage } = orderSlice.actions;
export default orderSlice.reducer;
