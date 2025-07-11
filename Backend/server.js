import express from "express";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import partnerRoutes from "./routes/partner.route.js";
import productRoutes from "./routes/product.route.js";
import customerRoutes from "./routes/customer.route.js";
import wishlistRoutes from "./routes/wishlist.route.js";
import orderRoutes from "./routes/order.route.js";
import cartRoutes from "./routes/cart.route.js";
import reviewRoutes from "./routes/review.route.js";
import adminRoutes from "./routes/admin.route.js";
import cookieParser from 'cookie-parser';
import warehouseRoutes from "./routes/warehouse.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Change this to your frontend URL
    credentials: true, // Allow cookies & auth headers
    methods: "GET,POST,PUT,DELETE",
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes); 
app.use("/api/admins", adminRoutes); 
app.use("/api/warehouse", warehouseRoutes);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
  connectDB();
});
