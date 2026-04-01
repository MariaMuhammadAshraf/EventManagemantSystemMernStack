import express from "express";
import BoothRequest from "../Models/BoothRequest.js";
import Booth from "../Models/Booth.js";
import User from "../Models/userModel.js";

const router = express.Router();

const getUserFromHeader = async (req) => {
  const userId = req.headers["x-user-id"];
  if (!userId) return null;
  return await User.findById(userId).select("_id role name email");
};

/* =====================================================
   EXHIBITOR: CREATE BOOTH REQUEST
   POST /api/booth-requests
===================================================== */
router.post("/", async (req, res) => {
  try {
    const user = await getUserFromHeader(req);
    if (!user) return res.status(401).json({ message: "x-user-id missing" });
    if (user.role !== "exhibitor") return res.status(403).json({ message: "Only exhibitor allowed" });

    const { expoId, hall, boothName, company, description, productsServices = [], staff = [] } = req.body;

    if (!expoId) return res.status(400).json({ message: "expoId required" });
    if (!["Hall A", "Hall B"].includes(hall))
      return res.status(400).json({ message: "Only Hall A or Hall B allowed" });
    if (!boothName || !boothName.trim())
      return res.status(400).json({ message: "boothName required" });

    // ✅ exhibitor max 5 booths per expo (request time)
    const boothCount = await Booth.countDocuments({ expoId, exhibitorId: user._id });
    if (boothCount >= 5) {
      return res.status(400).json({ message: "Exhibitor can only add max 5 booths per expo" });
    }

    // ✅ only one pending request per expo at a time (simple UX)
    const pendingReq = await BoothRequest.findOne({ expoId, exhibitorId: user._id, status: "pending" });
    if (pendingReq) {
      return res.status(409).json({ message: "Request already pending for this expo" });
    }

    const request = await BoothRequest.create({
      expoId,
      exhibitorId: user._id,
      hall,
      boothName: boothName.trim(),
      company: (company || "").trim(),
      description: (description || "").trim(),
      productsServices,
      staff,
      status: "pending",
    });

    res.status(201).json({ message: "Request sent to admin", request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =====================================================
   EXHIBITOR: GET MY REQUESTS
   GET /api/booth-requests/my?expoId=...
===================================================== */
router.get("/my", async (req, res) => {
  try {
    const user = await getUserFromHeader(req);
    if (!user) return res.status(401).json({ message: "x-user-id missing" });
    if (user.role !== "exhibitor") return res.status(403).json({ message: "Only exhibitor allowed" });

    const filter = { exhibitorId: user._id };
    if (req.query.expoId) filter.expoId = req.query.expoId;

    const list = await BoothRequest.find(filter).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =====================================================
   ADMIN: GET REQUESTS (FILTER BY status + expoId)
   GET /api/booth-requests?status=pending&expoId=...
===================================================== */
router.get("/", async (req, res) => {
  try {
    const user = await getUserFromHeader(req);
    if (!user) return res.status(401).json({ message: "x-user-id missing" });
    if (user.role !== "admin") return res.status(403).json({ message: "Only admin allowed" });

    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.expoId) filter.expoId = req.query.expoId;

    const requests = await BoothRequest.find(filter)
      .populate("expoId", "title")
      .populate("exhibitorId", "name email")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =====================================================
   ADMIN: APPROVE REQUEST -> CREATE BOOTH
   POST /api/booth-requests/:id/approve
===================================================== */
router.post("/:id/approve", async (req, res) => {
  try {
    const user = await getUserFromHeader(req);
    if (!user) return res.status(401).json({ message: "x-user-id missing" });
    if (user.role !== "admin")
      return res.status(403).json({ message: "Only admin allowed" });

    const request = await BoothRequest.findById(req.params.id);
    if (!request)
      return res.status(404).json({ message: "Request not found" });

    if (request.status !== "pending")
      return res.status(400).json({ message: "Already processed" });

    // ✅ 1. Exhibitor max 5 booths per expo
    const exhibitorCount = await Booth.countDocuments({
      expoId: request.expoId,
      exhibitorId: request.exhibitorId,
    });

    if (exhibitorCount >= 5) {
      return res.status(400).json({
        message: "Exhibitor can only add max 5 booths per expo",
      });
    }

    // ✅ 2. Hall max 15 booths
    const hallCount = await Booth.countDocuments({
      expoId: request.expoId,
      hall: request.hall,
    });

    if (hallCount >= 15) {
      return res.status(400).json({
        message: `${request.hall} is full (15 max booths allowed)`,
      });
    }

    // ✅ 3. Get next booth number safely
    const boothsInHall = await Booth.find({
      expoId: request.expoId,
      hall: request.hall,
    }).select("boothNo");

    const usedNumbers = boothsInHall.map((b) => b.boothNo);

    let boothNo = 1;
    while (usedNumbers.includes(boothNo)) {
      boothNo++;
    }

    if (boothNo > 15) {
      return res.status(400).json({
        message: `${request.hall} is full (15 max booths allowed)`,
      });
    }

    const booth = await Booth.create({
      expoId: request.expoId,
      exhibitorId: request.exhibitorId,
      hall: request.hall,
      boothNo,
      boothName: request.boothName,
      company: request.company,
      description: request.description,
      productsServices: request.productsServices,
      staff: request.staff,
    });

    request.status = "approved";
    request.adminNote = req.body.adminNote || "";
    request.approvedBy = user._id;
    request.approvedAt = new Date();
    await request.save();

    res.json({
      message: "Booth approved successfully",
      booth,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});
/* =====================================================
   ADMIN: REJECT REQUEST
   POST /api/booth-requests/:id/reject
===================================================== */
router.post("/:id/reject", async (req, res) => {
  try {
    const user = await getUserFromHeader(req);
    if (!user) return res.status(401).json({ message: "x-user-id missing" });
    if (user.role !== "admin") return res.status(403).json({ message: "Only admin allowed" });

    const request = await BoothRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });
    if (request.status !== "pending") return res.status(400).json({ message: "Already processed" });

    request.status = "rejected";
    request.adminNote = req.body.adminNote || "";
    request.rejectedBy = user._id;
    request.rejectedAt = new Date();
    await request.save();

    res.json({ message: "Request rejected", request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =====================================================
   ADMIN: STATS PER EXPO
   GET /api/booth-requests/stats/expo/:expoId
===================================================== */
router.get("/stats/expo/:expoId", async (req, res) => {
  try {
    const user = await getUserFromHeader(req);
    if (!user) return res.status(401).json({ message: "x-user-id missing" });
    if (user.role !== "admin") return res.status(403).json({ message: "Only admin allowed" });

    const expoId = req.params.expoId;

    const hallACount = await Booth.countDocuments({ expoId, hall: "Hall A" });
    const hallBCount = await Booth.countDocuments({ expoId, hall: "Hall B" });

    const pendingCount = await BoothRequest.countDocuments({
      expoId,
      status: "pending",
    });

    res.json({
      expoId,
      halls: {
        "Hall A": { used: hallACount, remaining: Math.max(15 - hallACount, 0) },
        "Hall B": { used: hallBCount, remaining: Math.max(15 - hallBCount, 0) },
      },
      pendingRequests: pendingCount,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
