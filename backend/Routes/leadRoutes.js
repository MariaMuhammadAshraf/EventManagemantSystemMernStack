import express from "express";
import Lead from "../Models/Lead.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { attendeeId, exhibitorId } = req.body;

    if (!attendeeId || !exhibitorId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (attendeeId === exhibitorId) {
      return res
        .status(400)
        .json({ message: "You cannot show interest in yourself" });
    }

    const lead = await Lead.create({
      attendee: attendeeId,
      exhibitor: exhibitorId,
    });

    res.status(201).json(lead);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "You already showed interest" });
    }
    res.status(500).json({ message: "Failed to send interest" });
  }
});

router.get("/exhibitor/:id", async (req, res) => {
  try {
    const leads = await Lead.find({ exhibitor: req.params.id })
      .populate("attendee", "name email");

    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch leads" });
  }
});
router.get("/attendee/:id", async (req, res) => {
  const leads = await Lead.find({ attendee: req.params.id })
    .populate("exhibitor", "name email")
    .sort({ createdAt: -1 });

  res.json(leads);
});

export default router;
