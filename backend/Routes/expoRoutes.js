import express from "express";
import Expo from "../Models/Expo.js";
import Booking from "../Models/Booking.js";
// Isko aise badlein:
import protect  from "../middleware/authMiddleware.js";

const router = express.Router();

/* =====================================================
   BOOK EXPO (LOGIN REQUIRED)
   👉 Sirf logged-in user hi yahan aa sakta hai
===================================================== */
router.post("/:id/book", protect, async (req, res) => {
  try {
    // check if already booked
    const alreadyBooked = await Booking.findOne({
      user: req.user._id,
      expo: req.params.id,
    });

    if (alreadyBooked) {
      return res.status(400).json({
        message: "Expo already booked",
      });
    }

    // create booking
    const booking = await Booking.create({
      user: req.user._id,
      expo: req.params.id,
    });

    res.status(201).json({
      message: "Expo booked successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =====================================================
   CREATE EXPO
===================================================== */
router.post("/", async (req, res) => {
  try {
    const expo = new Expo(req.body);
    await expo.save();
    res.status(201).json(expo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* =====================================================
   GET ALL EXPOS
===================================================== */
router.get("/", async (req, res) => {
  try {
    const expos = await Expo.find().sort({ createdAt: -1 });
    res.json(expos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =====================================================
   GET SINGLE EXPO
===================================================== */
router.get("/:id", async (req, res) => {
  try {
    const expo = await Expo.findById(req.params.id);
    if (!expo) {
      return res.status(404).json({ message: "Expo not found" });
    }
    res.json(expo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =====================================================
   UPDATE EXPO
===================================================== */
router.put("/:id", async (req, res) => {
  try {
    const expo = await Expo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(expo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* =====================================================
   DELETE EXPO
===================================================== */
router.delete("/:id", async (req, res) => {
  try {
    await Expo.findByIdAndDelete(req.params.id);
    res.json({ message: "Expo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =====================================================
   UPDATE AVAILABILITY
===================================================== */
router.put("/:id/availability", async (req, res) => {
  try {
    const expo = await Expo.findByIdAndUpdate(
      req.params.id,
      { availability: req.body.availability },
      { new: true }
    );
    res.json(expo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const expo = await Expo.findById(req.params.id);
    if (!expo) return res.status(404).json({ message: "Expo not found" });
    res.json(expo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
