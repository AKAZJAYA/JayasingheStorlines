import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Enhanced Database connection with proper configuration
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Connection pool settings
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity

      // Heartbeat settings
      heartbeatFrequencyMS: 10000, // Send a ping every 10 seconds

      // Retry settings
      retryWrites: true,
      retryReads: true,

      // Connection timeout
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Disable mongoose buffering to prevent timeout issues
    mongoose.set("bufferCommands", false);
    // mongoose.set("BufferMaxEntries", 0);

    // Handle connection events
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB reconnected");
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("MongoDB connection closed through app termination");
      process.exit(0);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/admin", adminRoutes);

// Test endpoint to verify API is working
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

// Enhanced error handling middleware
app.use((err, req, res, next) => {
  console.error("Error details:", {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  // Handle MongoDB/Mongoose specific errors
  if (err.name === "MongooseError" || err.name === "MongoError") {
    return res.status(503).json({
      success: false,
      message: "Database temporarily unavailable. Please try again.",
      error: process.env.NODE_ENV === "development" ? err.message : null,
    });
  }

  res.status(500).json({
    success: false,
    message: "An error occurred on the server",
    error: process.env.NODE_ENV === "development" ? err.message : null,
  });
});

app.listen(PORT, () => {
  console.log(`Jayasinghe Storelines API running on port ${PORT}`);
});

export default app;
