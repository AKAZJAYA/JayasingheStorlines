import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const API_URL = "/cart";

// Async thunks
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch cart" }
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await api.post(API_URL, productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to add item to cart" }
      );
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_URL}/${productId}`, { quantity });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update cart item" }
      );
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${API_URL}/${productId}`);
      return productId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to remove cart item" }
      );
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      await api.delete(API_URL);
      return true;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to clear cart" }
      );
    }
  }
);

export const applyPromoCode = createAsyncThunk(
  "cart/applyPromoCode",
  async (code, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/promo`, { code });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to apply promo code" }
      );
    }
  }
);

export const removePromoCode = createAsyncThunk(
  "cart/removePromoCode",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${API_URL}/promo`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to remove promo code" }
      );
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
    clearCartError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        const cartData = action.payload.cart || action.payload;
        state.items = cartData.items || [];
        state.subtotal = cartData.subtotal || 0;
        state.total = cartData.subtotal || 0; // Will be recalculated with other factors
        state.discount = cartData.discount || 0;

        // Handle promo code data
        if (cartData.promoCode && cartData.promoCode.code) {
          state.promoCode = cartData.promoCode.code;
          state.promoDiscount =
            cartData.promoCode.discount * cartData.subtotal || 0;
        } else {
          state.promoCode = null;
          state.promoDiscount = 0;
        }

        // Calculate total with all factors
        state.total =
          state.subtotal -
          state.discount -
          state.promoDiscount +
          state.shippingCost;

        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch cart";
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const cartData = action.payload.cart || action.payload;
        state.items = cartData.items || [];
        state.subtotal = cartData.subtotal || 0;

        // Recalculate total with all factors
        state.total =
          state.subtotal -
          state.discount -
          state.promoDiscount +
          state.shippingCost;

        state.loading = false;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add item to cart";
      })
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const cartData = action.payload.cart || action.payload;
        state.items = cartData.items || [];
        state.subtotal = cartData.subtotal || 0;

        // Recalculate total with all factors
        state.total =
          state.subtotal -
          state.discount -
          state.promoDiscount +
          state.shippingCost;

        state.loading = false;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update cart item";
      })
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        // Filter out the removed item
        state.items = state.items.filter(
          (item) => item.product.toString() !== action.payload
        );

        // Recalculate subtotal
        state.subtotal = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );

        // Recalculate total with all factors
        state.total =
          state.subtotal -
          state.discount -
          state.promoDiscount +
          state.shippingCost;

        state.loading = false;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to remove cart item";
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
        state.subtotal = 0;
        state.total = 0;
        state.discount = 0;
        state.promoCode = null;
        state.promoDiscount = 0;
        state.loading = false;
      })
      .addCase(applyPromoCode.fulfilled, (state, action) => {
        const cartData = action.payload.cart || action.payload;

        if (cartData.promoCode && cartData.promoCode.code) {
          state.promoCode = cartData.promoCode.code;
          state.promoDiscount =
            cartData.promoCode.discount * cartData.subtotal || 0;
        }

        // Recalculate total with updated promo discount
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

        // Recalculate total without promo discount
        state.total = state.subtotal - state.discount + state.shippingCost;

        state.loading = false;
      });
  },
});

export const { calculateTotals, setShippingCost, clearCartError } =
  cartSlice.actions;
export default cartSlice.reducer;
