import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// The correct endpoint is under user routes
const API_URL = "/users/wishlist";

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch wishlist" }
      );
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.post(API_URL, { productId });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to add to wishlist" }
      );
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/${productId}`);
      return productId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to remove from wishlist" }
      );
    }
  }
);

const initialState = {
  collections: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleCollection: (state, action) => {
      const collectionId = action.payload;
      const collection = state.collections.find((c) => c.id === collectionId);
      if (collection) {
        collection.isOpen = !collection.isOpen;
      }
    },
    createCollection: (state, action) => {
      const { name } = action.payload;
      state.collections.push({
        id: Date.now().toString(),
        name,
        items: [],
        isOpen: true,
      });
    },
    removeCollection: (state, action) => {
      const collectionId = action.payload;
      state.collections = state.collections.filter(
        (c) => c.id !== collectionId
      );
    },
    moveItemToCollection: (state, action) => {
      const { itemId, sourceCollectionId, targetCollectionId } = action.payload;

      // Find source and target collections
      const sourceCollection = state.collections.find(
        (c) => c.id === sourceCollectionId
      );
      const targetCollection = state.collections.find(
        (c) => c.id === targetCollectionId
      );

      if (sourceCollection && targetCollection) {
        // Find the item in source collection
        const itemIndex = sourceCollection.items.findIndex(
          (item) => item.id === itemId
        );

        if (itemIndex !== -1) {
          // Move the item from source to target
          const item = sourceCollection.items[itemIndex];
          sourceCollection.items.splice(itemIndex, 1);
          targetCollection.items.push(item);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        // Transform the API response to match the expected structure
        const wishlistItems = action.payload.wishlist || [];

        // Create default "Favorites" collection if it doesn't exist
        if (wishlistItems.length > 0) {
          state.collections = [
            {
              id: "favorites",
              name: "Favorites",
              items: wishlistItems.map((item) => ({
                id: item._id,
                name: item.name,
                image: item.imageUrl || item.image,
                price: item.price,
                discountedPrice: item.discountPrice || item.price,
                discount: item.discountPercentage || 0,
                stock: item.stock > 0,
                addedOn: new Date().toLocaleDateString(),
              })),
              isOpen: true,
            },
          ];
        } else {
          state.collections = [];
        }

        state.loading = false;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch wishlist";
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        // Add the item to the default collection
        if (state.collections.length > 0) {
          state.collections[0].items.push(action.payload);
        } else {
          state.collections = [
            {
              id: "favorites",
              name: "Favorites",
              items: [action.payload],
              isOpen: true,
            },
          ];
        }
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        // Remove the product from all collections
        state.collections = state.collections.map((collection) => ({
          ...collection,
          items: collection.items.filter((item) => item.id !== action.payload),
        }));
      });
  },
});

export const {
  toggleCollection,
  createCollection,
  removeCollection,
  moveItemToCollection,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
