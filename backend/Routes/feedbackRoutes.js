import express from "express";
import Feedback from "../Models/Feedback.js";

const router = express.Router();

// ✅ Submit Feedback
router.post("/", async (req, res) => {
  try {
    const { type, rating, message, priority, userId } = req.body;

    const feedback = await Feedback.create({
      user: userId,
      type,
      rating,
      message,
      priority,
      status: "Pending",
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get Logged-in User Feedback
router.get("/my/:userId", async (req, res) => {
  try {
    const data = await Feedback.find({ user: req.params.userId })
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get All Feedback (Admin)
router.get("/", async (req, res) => {
  try {
    const data = await Feedback.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Admin Update Feedback
router.put("/:id", async (req, res) => {
  try {
    const { status, adminResponse } = req.body;

    const updated = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status, adminResponse },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;