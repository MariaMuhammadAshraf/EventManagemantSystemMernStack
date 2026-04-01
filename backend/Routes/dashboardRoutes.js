import express from "express";
import User from "../Models/userModel.js";
import Expo from "../Models/Expo.js";

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const [totalUsers, exhibitors, activeExpos, totalAttendees] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: { $regex: /exhibitor/i } }), // Case-insensitive check
      Expo.countDocuments({ availability: "available" }),
      // ✅ Attendee count: "attendee" word ko case-insensitive check karega
      User.countDocuments({ role: { $regex: /attendee/i } }) 
    ]);

   
    

    res.json({
      totalUsers,
      exhibitors,
      activeExpos,
      totalAttendees,
      revenue: 0 
    });
  } catch (err) {
    console.error("Dashboard Stats Error:", err);
    res.status(500).json({ message: "Dashboard stats failed" });
  }
});
// ❗ YEH LINE MISSING THI JISKI WAJAH SE ERROR AA RAHA THA
export default router;