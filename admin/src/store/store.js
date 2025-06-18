import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from './slices/adminAuthSlice';
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import orderReducer from "./slices/orderSlice";
import deliveryReducer from "./slices/deliverySlice";
import salesReducer from "./slices/salesSlice";
import dashboardReducer from "./slices/dashboardSlice";

export const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    users: userReducer,
    products: productReducer,
    orders: orderReducer,
    deliveries: deliveryReducer,
    sales: salesReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;