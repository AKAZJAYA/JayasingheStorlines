import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const API_URL = "/products";

// Helper function to transform Cloudinary URLs for optimization
export const getOptimizedImageUrl = (url, options = {}) => {
  if (!url || !url.includes("cloudinary.com")) return url;

  // Default transformation options
  const {
    width = 600,
    height = 600,
    crop = "fill",
    quality = "auto",
    fetchFormat = "auto",
  } = options;

  // Extract base URL and transformation path
  const baseUrl = url.split("/upload/")[0];
  const imagePath = url.split("/upload/")[1];

  // Build transformation string
  const transformation = `w_${width},h_${height},c_${crop},q_${quality},f_${fetchFormat}`;

  // Return transformed URL
  return `${baseUrl}/upload/${transformation}/${imagePath}`;
};

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

export const fetchOnSaleProducts = createAsyncThunk(
  "products/fetchOnSaleProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/on-sale`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch on-sale products" }
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

// Add support for reporting image loading failures
export const reportImageLoadFailure = createAsyncThunk(
  "products/reportImageLoadFailure",
  async ({ productId, imageUrl }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/${productId}/image-failure`, {
        imageUrl,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to report image failure" }
      );
    }
  }
);

export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${productId}/similar`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch similar products" }
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
  onSaleProducts: [],
  productsByCategory: {},
  currentProduct: null,
  loading: false,
  error: null,
  imageErrors: {}, // Track image loading errors by productId
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
    // Add a reducer to handle Cloudinary image transformations for product images
    optimizeProductImages: (state) => {
      if (state.products && state.products.length > 0) {
        state.products = state.products.map((product) => ({
          ...product,
          imageUrl: product.imageUrl
            ? getOptimizedImageUrl(product.imageUrl)
            : product.imageUrl,
          additionalImages: product.additionalImages
            ? product.additionalImages.map((img) => getOptimizedImageUrl(img))
            : product.additionalImages,
        }));
      }

      if (state.currentProduct) {
        state.currentProduct = {
          ...state.currentProduct,
          imageUrl: state.currentProduct.imageUrl
            ? getOptimizedImageUrl(state.currentProduct.imageUrl)
            : state.currentProduct.imageUrl,
          additionalImages: state.currentProduct.additionalImages
            ? state.currentProduct.additionalImages.map((img) =>
                getOptimizedImageUrl(img)
              )
            : state.currentProduct.additionalImages,
        };
      }
    },
    // Track image loading failures
    markImageLoadFailure: (state, action) => {
      const { productId, imageUrl } = action.payload;
      if (!state.imageErrors[productId]) {
        state.imageErrors[productId] = [];
      }
      if (!state.imageErrors[productId].includes(imageUrl)) {
        state.imageErrors[productId].push(imageUrl);
      }
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
      .addCase(fetchOnSaleProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOnSaleProducts.fulfilled, (state, action) => {
        state.onSaleProducts = action.payload.products || action.payload;
        state.loading = false;
      })
      .addCase(fetchOnSaleProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch on-sale products";
      })
      .addCase(addProductReview.fulfilled, (state, action) => {
        if (state.currentProduct) {
          state.currentProduct.reviews = action.payload.reviews;
          state.currentProduct.ratings = action.payload.ratings;
        }
      })
      .addCase(reportImageLoadFailure.fulfilled, (state, action) => {
        // Optional: Handle successful reporting of image load failures
        // This could be used to update backend metrics or trigger notifications
      })
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.similarProducts = action.payload.products || action.payload;
        state.loading = false;
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch similar products";
      });
  },
});

export const {
  setFilters,
  setPage,
  clearProductDetails,
  clearError,
  optimizeProductImages,
  markImageLoadFailure,
} = productSlice.actions;

export default productSlice.reducer;
