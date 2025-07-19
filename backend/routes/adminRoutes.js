import express from "express";
import {
  adminLogin,
  adminLogout,
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,
} from "../controllers/adminAuthController.js";

import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserStats,
} from "../controllers/adminUserController.js";

import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductStats,
  bulkUpdateProducts,
  uploadProductImages,
  deleteProductImage,
} from "../controllers/adminProductController.js";

import {
  getAllOrders,
  getOrder,
  updateOrderStatus,
  updateOrder,
  deleteOrder,
  getOrderStats,
} from "../controllers/adminOrderController.js";

import {
  getSalesOverview,
  getSalesByCategory,
  getTopSellingProducts,
  getSalesTrends,
} from "../controllers/adminSalesController.js";

import {
  getAllDeliveries,
  createDelivery,
  updateDelivery,
  updateDeliveryStatus,
  assignDriver,
  getDeliveryStats,
  getDrivers,
} from "../controllers/adminDeliveryController.js";

import { adminProtect } from "../middleware/adminAuth.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

// Auth routes (public)
router.post("/auth/login", adminLogin);

// Protected routes
router.use(adminProtect);

// Auth routes (protected)
router.post("/auth/logout", adminLogout);
router.get("/auth/me", getAdminProfile);
router.put("/auth/profile", updateAdminProfile);
router.put("/auth/change-password", changeAdminPassword);

// User management routes
router.get("/users", getAllUsers);
router.get("/users/stats", getUserStats);
router.get("/users/:id", getUser);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// Product management routes
router.get("/products", getAllProducts);
router.get("/products/stats", getProductStats);
router.post("/products", createProduct);
router.put("/products/bulk-update", bulkUpdateProducts);
router.post(
  "/products/upload-images",
  upload.array("images", 10),
  uploadProductImages
);
router.delete("/products/delete-image/:publicId", deleteProductImage);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

// Order management routes
router.get("/orders", getAllOrders);
router.get("/orders/stats", getOrderStats);
router.get("/orders/:id", getOrder);
router.put("/orders/:id/status", updateOrderStatus);
router.put("/orders/:id", updateOrder);
router.delete("/orders/:id", deleteOrder);

// Sales management routes
router.get("/sales/overview", getSalesOverview);
router.get("/sales/by-category", getSalesByCategory);
router.get("/sales/top-products", getTopSellingProducts);
router.get("/sales/trends", getSalesTrends);

// Delivery management routes
router.get("/deliveries", getAllDeliveries);
router.get("/deliveries/stats", getDeliveryStats);
router.get("/deliveries/drivers", getDrivers);
router.post("/deliveries", createDelivery);
router.put("/deliveries/:id", updateDelivery);
router.put("/deliveries/:id/status", updateDeliveryStatus);
router.put("/deliveries/:id/assign-driver", assignDriver);

export default router;
