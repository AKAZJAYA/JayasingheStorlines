import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

// Ensure environment variables are loaded
dotenv.config();

// Add this to verify Cloudinary credentials are available
console.log("Cloudinary config check:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? "Set" : "Missing",
  api_key: process.env.CLOUDINARY_API_KEY ? "Set" : "Missing",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "Set" : "Missing",
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "jayasinghe-storelines/products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [
      { width: 1200, height: 1200, crop: "limit" },
      { quality: "auto" },
      { fetch_format: "auto" },
    ],
    public_id: (req, file) => {
      // Generate unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      return `product_${timestamp}_${randomString}`;
    },
  },
});

// Configure multer with error handling
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 10, // Maximum 10 files
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

export { cloudinary, upload };
