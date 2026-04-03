import express from "express";
import dotenv from "dotenv";

// Baki routes ke niche ye add karein

dotenv.config();
import cors from "cors";

import connectDB from "./config/db.js";

// ROUTES
import userRoutes from "./Routes/userRoutes.js";
import expoRoutes from "./Routes/expoRoutes.js";
import aboutRoutes from "./Routes/aboutRoutes.js";
import contactRoutes from "./Routes/contactRoutes.js";
import leadRoutes from "./Routes/leadRoutes.js"; 
import boothRoutes from "./Routes/boothRoutes.js";
import reportRoutes from "./Routes/reportRoutes.js";
import Bookmark from "./Models/bookmarkModel.js"; // Bookmark ko pehle register karein
import dashboardRoutes from "./Routes/dashboardRoutes.js";
import bookmarkRoutes from "./Routes/bookmarkRoutes.js";
import boothRequestRoutes from "./Routes/boothRequestRoutes.js";
import chatRoutes from "./Routes/chatRoutes.js";
import exhibitorRoutes from "./Routes/exhibitorRoutes.js";
import appointmentRoutes from "./Routes/appointmentRoutes.js";
import feedbackRoutes from "./Routes/feedbackRoutes.js";

 
const app = express();

// MIDDLEWARE
// app.use(cors());
// app.use(express.json());

// ✅ MIDDLEWARE (Inka sequence top par hona zaroori hai)
app.use(cors({
  origin: "*", // Filhal sab allow kar rahe hain taake connection ban jaye
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// STATIC FILES (for uploads)
app.use("/uploads", express.static("uploads"));

// DATABASE
connectDB();

// ROUTES
app.use("/api/users", userRoutes);
app.use("/api/expos", expoRoutes);       
app.use("/api/about", aboutRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/leads", leadRoutes);       
app.use("/api/booths", boothRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/booth-requests", boothRequestRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/exhibitors", exhibitorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/feedback", feedbackRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API is running...");
});

// SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
export default app;