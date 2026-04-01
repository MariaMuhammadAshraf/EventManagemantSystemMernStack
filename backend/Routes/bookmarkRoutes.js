// import express from "express";
// import Booth from "../Models/Booth.js";

// const router = express.Router();

// /* =====================================================
//    GET ALL BOOTHS (ADMIN USE)
//    GET /api/booths?expoId=...
// ===================================================== */
// router.get("/", async (req, res) => {
//   try {
//     const filter = {};
//     if (req.query.expoId) filter.expoId = req.query.expoId;

//     const booths = await Booth.find(filter).sort({ createdAt: -1 });
//     res.json(booths);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// /* =====================================================
//    GET BOOTHS OF A SPECIFIC EXHIBITOR (ONLY HIS BOOTHS)
//    GET /api/booths/exhibitor/:exhibitorId?expoId=...
// ===================================================== */
// router.get("/exhibitor/:exhibitorId", async (req, res) => {
//   try {
//     const filter = { exhibitorId: req.params.exhibitorId };
//     if (req.query.expoId) filter.expoId = req.query.expoId;

//     const booths = await Booth.find(filter).sort({ createdAt: -1 });
//     res.json(booths);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// /* =====================================================
//    UPDATE BOOTH (EXHIBITOR MANAGE)
//    PUT /api/booths/:id
// ===================================================== */
// router.put("/:id", async (req, res) => {
//   try {
//     const booth = await Booth.findById(req.params.id);
//     if (!booth) return res.status(404).json({ message: "Booth not found" });

//     const updated = await Booth.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json({ message: "Booth updated", booth: updated });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// /* =====================================================
//    DELETE BOOTH (OPTIONAL ADMIN)
//    DELETE /api/booths/:id
// ===================================================== */
// router.delete("/:id", async (req, res) => {
//   try {
//     await Booth.findByIdAndDelete(req.params.id);
//     res.json({ message: "Booth deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// export default router;



import express from "express";
import mongoose from "mongoose";
import Bookmark from "../Models/bookmarkModel.js";

const router = express.Router();

/* ==============================
   TOGGLE BOOKMARK
============================== */
router.post("/", async (req, res) => {
  try {
    const { userId, expoId } = req.body;

    if (!userId || !expoId) {
      return res.status(400).json({ message: "Missing IDs" });
    }

    const existing = await Bookmark.findOne({
      user: userId,
      expo: expoId,
    });

    if (existing) {
      await Bookmark.deleteOne({ _id: existing._id });
      return res.status(200).json({ message: "Bookmark removed" });
    }

    await Bookmark.create({
      user: userId,
      expo: expoId,
    });

    return res.status(200).json({ message: "Bookmark added" });

  } catch (error) {
    console.error("BOOKMARK ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

/* ==============================
   GET USER BOOKMARKS
============================== */
router.get("/:userId", async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({
      user: req.params.userId,
    }).populate("expo");

    res.json({ bookmarks });

  } catch (error) {
    console.error("FETCH ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;