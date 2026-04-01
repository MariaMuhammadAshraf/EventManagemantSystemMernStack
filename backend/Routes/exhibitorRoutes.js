// import express from "express";
// // import { protect } from "../middleware/authMiddleware.js"; // ❌ Zaroorat nahi hai toh remove kar diya
// import Booth from "../Models/Booth.js"; 
// import Lead from "../Models/Lead.js";

// const router = express.Router();

// // 🔓 Ab ye route bina token ke bhi data dega (Sirf testing ke liye)
// router.get("/stats", async (req, res) => {
//   try {
//     // Note: Bina protect ke req.user._id nahi milega, 
//     // isliye hum saare documents count kar rahe hain ya hardcoded ID use kar sakte hain.
//     const totalBooths = await Booth.countDocuments(); 
//     const leadsCollected = await Lead.countDocuments();

//     res.json({
//       totalBooths,
//       leadsCollected,
//       visitors: Math.floor(leadsCollected * 1.5), 
//       conversionRate: "14%",
//     });
//   } catch (error) {
//     console.error("Dashboard Stats Error:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// export default router;



import express from "express";
import Booth from "../Models/Booth.js";
import Lead from "../Models/Lead.js";
import User from "../Models/userModel.js";
import ExhibitorProfile from "../Models/ExhibitorProfile.js";

const router = express.Router();

// =============================
// 📊 Dashboard Stats (Existing)
// =============================
router.get("/stats", async (req, res) => {
  try {
    const totalBooths = await Booth.countDocuments();
    const leadsCollected = await Lead.countDocuments();

    res.json({
      totalBooths,
      leadsCollected,
      visitors: Math.floor(leadsCollected * 1.5),
      conversionRate: "14%",
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// =====================================
// 🟢 POST /api/exhibitors/register  (NO JWT)
// Body must contain: userId
// =====================================
router.post("/register", async (req, res) => {
  try {
    const { userId, ...profileData } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const user = await User.findById(userId);
    if (!user || user.role !== "exhibitor") {
      return res.status(403).json({ message: "Only exhibitors allowed" });
    }

    // Prevent duplicate profile
    const existingProfile = await ExhibitorProfile.findOne({ user: userId });
    if (existingProfile) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const profile = await ExhibitorProfile.create({
      user: userId,
      ...profileData,
    });

    res.status(201).json({
      message: "Registered successfully as exhibitor",
      profile,
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// =====================================
// 🔵 GET /api/exhibitors/me/:userId   (NO JWT)
// =====================================
router.get("/me/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const profile = await ExhibitorProfile.findOne({ user: userId });

    // same shape as your old /me response
    res.json({
      name: user.name,
      email: user.email,
      role: user.role,
      exhibitorProfile: profile,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// =====================================
// 🟡 PUT /api/exhibitors/me/:userId   (NO JWT)
// =====================================
router.put("/me/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const profile = await ExhibitorProfile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    Object.assign(profile, req.body);
    await profile.save();

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});
// =====================================
// 🟣 GET /api/exhibitors  (Admin list)
// =====================================
router.get("/", async (req, res) => {
  try {
    const profiles = await ExhibitorProfile.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(profiles);
  } catch (error) {
    console.error("Get Exhibitors Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});
// =============================
// 📊 Dashboard Stats (Dynamic)
// =============================
router.get("/stats", async (req, res) => {
  try {
    const [
      totalBooths,
      leadsCollected,
      totalExhibitors,
      exhibitorIdsWithBooths,
      exhibitorIdsWithLeads,
    ] = await Promise.all([
      Booth.countDocuments(),
      Lead.countDocuments(),
      User.countDocuments({ role: "exhibitor" }),
      Booth.distinct("exhibitorId"),
      Lead.distinct("exhibitor"),
    ]);

    const exhibitorsWithBooths = exhibitorIdsWithBooths.length;
    const exhibitorsWithLeads = exhibitorIdsWithLeads.length;

    // Example conversion:
    // % of booth exhibitors who got at least 1 lead
    const conversionRate =
      exhibitorsWithBooths > 0
        ? `${Math.round((exhibitorsWithLeads / exhibitorsWithBooths) * 100)}%`
        : "0%";

    res.json({
      totalBooths,
      leadsCollected,

      // backwards compatible (tumhare old frontend me visitors tha)
      visitors: totalExhibitors,

      // new fields (for showing all)
      totalExhibitors,
      exhibitorsWithBooths,
      exhibitorsWithLeads,

      conversionRate,
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await ExhibitorProfile.findById(id);

    if (!profile) {
      return res.status(404).json({ message: "Exhibitor not found" });
    }

    // delete profile
    await ExhibitorProfile.findByIdAndDelete(id);

    // delete linked user
    await User.findByIdAndDelete(profile.user);

    res.json({ message: "Exhibitor and user deleted successfully" });

  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: error.message });
  }
});
// ✅ GET ONLY EXHIBITOR USERS (For Dropdown)
router.get("/list", async (req, res) => {
  try {
    const exhibitors = await User.find({ role: "exhibitor" })
      .select("_id name email");

    res.json(exhibitors);
  } catch (error) {
    console.error("Dropdown Exhibitors Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});
export default router;