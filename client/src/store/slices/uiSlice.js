import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNavbarOpen: false,
  isCategoryMenuOpen: false,
  isUserMenuOpen: false,
  activeModal: null, // Can be 'login', 'register', 'quickView', etc.
  toast: {
    show: false,
    message: "",
    type: "info", // 'success', 'error', 'info', 'warning'
    duration: 3000,
  },
  searchResults: [],
  isSearching: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleNavbar: (state) => {
      state.isNavbarOpen = !state.isNavbarOpen;
    },
    closeNavbar: (state) => {
      state.isNavbarOpen = false;
    },
    toggleCategoryMenu: (state) => {
      state.isCategoryMenuOpen = !state.isCategoryMenuOpen;
    },
    closeCategoryMenu: (state) => {
      state.isCategoryMenuOpen = false;
    },
    toggleUserMenu: (state) => {
      state.isUserMenuOpen = !state.isUserMenuOpen;
    },
    closeUserMenu: (state) => {
      state.isUserMenuOpen = false;
    },
    showModal: (state, action) => {
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
    },
    showToast: (state, action) => {
      state.toast = {
        show: true,
        message: action.payload.message,
        type: action.payload.type || "info",
        duration: action.payload.duration || 3000,
      };
    },
    hideToast: (state) => {
      state.toast.show = false;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setIsSearching: (state, action) => {
      state.isSearching = action.payload;
    },
  },
});

export const {
  toggleNavbar,
  closeNavbar,
  toggleCategoryMenu,
  closeCategoryMenu,
  toggleUserMenu,
  closeUserMenu,
  showModal,
  closeModal,
  showToast,
  hideToast,
  setSearchResults,
  setIsSearching,
} = uiSlice.actions;

export default uiSlice.reducer;
