import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const API_URL = "/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get(API_URL, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch products" }
      );
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch product details" }
      );
    }
  }
);

export const fetchFeaturedProducts = createAsyncThunk(
  "products/fetchFeaturedProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/featured`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch featured products" }
      );
    }
  }
);

export const fetchNewArrivals = createAsyncThunk(
  "products/fetchNewArrivals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/new-arrivals`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch new arrivals" }
      );
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/category/${category}`);
      return { category, products: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch products by category",
        }
      );
    }
  }
);

export const addProductReview = createAsyncThunk(
  "products/addProductReview",
  async ({ productId, reviewData }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${API_URL}/${productId}/reviews`,
        reviewData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to add review" }
      );
    }
  }
);

const initialState = {
  products: [],
  featuredProducts: {
    products: [],
    count: 0,
    success: false,
  },
  newArrivals: [],
  productsByCategory: {},
  currentProduct: null,
  loading: false,
  error: null,
  filters: {
    category: null,
    priceRange: [0, Infinity],
    sortBy: "popular",
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      // Reset pagination when filters change
      state.pagination.page = 1;
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    clearProductDetails: (state) => {
      state.currentProduct = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products || [];
        state.pagination.total = action.payload.total || 0;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch products";
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.currentProduct = action.payload.product || action.payload;
        state.loading = false;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch product details";
      })
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        // Handle different response structures from the backend
        if (action.payload.products) {
          state.featuredProducts = {
            products: action.payload.products,
            count: action.payload.count || action.payload.products.length,
            success: action.payload.success || true,
          };
        } else if (Array.isArray(action.payload)) {
          state.featuredProducts = {
            products: action.payload,
            count: action.payload.length,
            success: true,
          };
        } else {
          state.featuredProducts = {
            products: [],
            count: 0,
            success: false,
          };
        }
        state.loading = false;
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch featured products";
        state.featuredProducts = {
          products: [],
          count: 0,
          success: false,
        };
      })
      .addCase(fetchNewArrivals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewArrivals.fulfilled, (state, action) => {
        state.newArrivals = action.payload.products || action.payload;
        state.loading = false;
      })
      .addCase(fetchNewArrivals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch new arrivals";
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.productsByCategory[action.payload.category] =
          action.payload.products.products || action.payload.products;
        state.loading = false;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch products by category";
      })
      .addCase(addProductReview.fulfilled, (state, action) => {
        if (state.currentProduct) {
          state.currentProduct.reviews = action.payload.reviews;
          state.currentProduct.rating = action.payload.rating;
        }
      });
  },
});

export const { setFilters, setPage, clearProductDetails, clearError } =
  productSlice.actions;
export default productSlice.reducer;
