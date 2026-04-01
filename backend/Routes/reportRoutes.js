import express from "express";
import User from "../Models/userModel.js";
import Expo from "../Models/Expo.js";
import Feedback from "../Models/Feedback.js"; // ✅ 1. Sahi path se import karein

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const [admins, attendees, exhibitors, availableExpos, customerQueries] = await Promise.all([
      User.countDocuments({ role: "admin" }),
      User.countDocuments({ role: "attendee" }),
      User.countDocuments({ role: "exhibitor" }),
      Expo.countDocuments({ availability: "available" }),
      // ✅ 2. Feedback model se real count nikaalein
      Feedback.countDocuments() 
    ]);

    res.json({
      users: { admins, attendees, exhibitors },
      expos: { available: availableExpos },
      customerQueries // ✅ 3. Ye variable frontend ko bhej rahe hain
    });
  } catch (err) {
    console.error("Reports API Error:", err);
    res.status(500).json({ message: "Failed to fetch reports" });
  }
});

export default router;