import express from "express";
import AboutPage from "../Models/AboutPage.js";

const router = express.Router();

// Get About data
router.get("/", async (req, res) => {
  try {
    const about = await AboutPage.findOne();
    if (!about) return res.json(null);
    res.json(about);
  } catch (err) {
    console.error("GET /api/about error", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update / Save About data
router.put("/", async (req, res) => {
  try {
    let about = await AboutPage.findOne();

    if (!about) {
      about = new AboutPage(req.body);
    } else {
      about.hero = req.body.hero || {};
      about.mission = req.body.mission || {};
      about.vision = req.body.vision || {};
      about.features = {
        heading: req.body.features?.heading || "Our Features",
        items: req.body.features?.items || [],
      };
      about.cta = req.body.cta || {};
    }

    await about.save();
    res.status(200).json(about);
  } catch (err) {
    console.error("PUT /api/about error", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete About data
router.delete("/", async (req, res) => {
  try {
    await AboutPage.deleteMany({});
    res.status(200).json({ message: "About page deleted!" });
  } catch (err) {
    console.error("DELETE /api/about error", err);
    res.status(500).json({ message: "Error deleting about page data" });
  }
});

export default router;
