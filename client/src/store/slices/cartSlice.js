import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api/cart";

// Async thunks
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${productId}`, { quantity });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (productId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${productId}`);
      return productId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      await axios.delete(API_URL);
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const applyPromoCode = createAsyncThunk(
  "cart/applyPromoCode",
  async (code, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/promo`, { code });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removePromoCode = createAsyncThunk(
  "cart/removePromoCode",
  async (_, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/promo`);
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  items: [],
  subtotal: 0,
  total: 0,
  discount: 0,
  shippingCost: 0,
  promoCode: null,
  promoDiscount: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    calculateTotals: (state) => {
      state.subtotal = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      state.total =
        state.subtotal -
        state.discount -
        state.promoDiscount +
        state.shippingCost;
    },
    setShippingCost: (state, action) => {
      state.shippingCost = action.payload;
      state.total =
        state.subtotal -
        state.discount -
        state.promoDiscount +
        state.shippingCost;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.subtotal = action.payload.subtotal;
        state.total = action.payload.total;
        state.discount = action.payload.discount || 0;
        state.promoCode = action.payload.promoCode || null;
        state.promoDiscount = action.payload.promoDiscount || 0;
        state.shippingCost = action.payload.shippingCost || 0;
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch cart";
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.subtotal = action.payload.subtotal;
        state.total = action.payload.total;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add item to cart";
      })
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.subtotal = action.payload.subtotal;
        state.total = action.payload.total;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update cart item";
      })
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
        // Recalculate totals
        state.subtotal = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        state.total =
          state.subtotal -
          state.discount -
          state.promoDiscount +
          state.shippingCost;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to remove cart item";
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
        state.subtotal = 0;
        state.total = 0;
        state.discount = 0;
        state.promoCode = null;
        state.promoDiscount = 0;
        state.shippingCost = 0;
        state.loading = false;
      })
      .addCase(applyPromoCode.fulfilled, (state, action) => {
        state.promoCode = action.payload.promoCode;
        state.promoDiscount = action.payload.promoDiscount;
        state.total =
          state.subtotal -
          state.discount -
          state.promoDiscount +
          state.shippingCost;
        state.loading = false;
      })
      .addCase(removePromoCode.fulfilled, (state) => {
        state.promoCode = null;
        state.promoDiscount = 0;
        state.total = state.subtotal - state.discount + state.shippingCost;
        state.loading = false;
      });
  },
});

export const { calculateTotals, setShippingCost } = cartSlice.actions;
export default cartSlice.reducer;
