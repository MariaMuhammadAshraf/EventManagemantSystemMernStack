import express from "express";
import Booth from "../Models/Booth.js";

const router = express.Router();

/**
 * ✅ POST /api/booths
 * Exhibitor creates booth inside an expo (NO JWT)
 * Body:
 * { expoId, exhibitorId, boothName, company, description, productsServices, staff }
 */
router.post("/", async (req, res) => {
  try {
    const {
      expoId,
      exhibitorId,
      boothName,
      company,
      description,
      productsServices = [],
      staff = [],
    } = req.body;

    if (!expoId) return res.status(400).json({ message: "expoId is required" });
    if (!exhibitorId) return res.status(400).json({ message: "exhibitorId is required" });
    if (!boothName) return res.status(400).json({ message: "boothName is required" });

    const booth = await Booth.create({
      expoId,
      exhibitorId,
      boothName,
      company,
      description,
      productsServices: Array.isArray(productsServices) ? productsServices : [],
      staff: Array.isArray(staff) ? staff : [],
    });

    res.status(201).json({ message: "Booth created", booth });
  } catch (err) {
    // unique index error (one booth per expo per exhibitor)
    if (err.code === 11000) {
      return res.status(409).json({ message: "You already created a booth for this expo." });
    }
    res.status(500).json({ message: err.message });
  }
});

/**
 * ✅ GET /api/booths/exhibitor/:exhibitorId?expoId=...
 * Fetch exhibitor booths (optionally by expo)
 */
router.get("/exhibitor/:exhibitorId", async (req, res) => {
  try {
    const { exhibitorId } = req.params;
    const { expoId } = req.query;

    const filter = { exhibitorId };
    if (expoId) filter.expoId = expoId;

    const booths = await Booth.find(filter).sort({ createdAt: -1 });
    res.json(booths);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * ✅ PUT /api/booths/:boothId
 * Update booth details
 */
router.put("/:boothId", async (req, res) => {
  try {
    const { boothId } = req.params;

    const updated = await Booth.findByIdAndUpdate(boothId, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Booth not found" });

    res.json({ message: "Booth updated", booth: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
