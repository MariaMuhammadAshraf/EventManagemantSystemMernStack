import express from "express";
import Appointment from "../Models/Appointment.js";
import User from "../Models/userModel.js";

const router = express.Router();


// ✅ CREATE APPOINTMENT (Attendee)
router.post("/", async (req, res) => {
  try {
    const { attendee, exhibitor, date, timeSlot } = req.body;

    if (!attendee || !exhibitor || !date || !timeSlot) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAppointment = new Appointment({
      attendee,
      exhibitor,
      date,
      timeSlot,
    });

    const saved = await newAppointment.save();

    res.status(201).json(saved);
  } catch (error) {
    console.error("Create Appointment Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


// ✅ GET ALL APPOINTMENTS FOR ATTENDEE
router.get("/attendee/:id", async (req, res) => {
  try {
    const appointments = await Appointment.find({
      attendee: req.params.id,
    })
      .populate("exhibitor", "name email")  // ✅ Important
      .populate("attendee", "name email");  // ✅ Important

    res.json(appointments);
  } catch (error) {
    console.error("Attendee Fetch Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


// ✅ GET ALL APPOINTMENTS FOR EXHIBITOR
router.get("/exhibitor/:id", async (req, res) => {
  try {
    const appointments = await Appointment.find({
      exhibitor: req.params.id,
    })
      .populate("attendee", "name email")   // ✅ Important
      .populate("exhibitor", "name email"); // ✅ Important

    res.json(appointments);
  } catch (error) {
    console.error("Exhibitor Fetch Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


// ✅ APPROVE / REJECT (Exhibitor)
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate("attendee", "name email")
      .populate("exhibitor", "name email");

    if (!updated) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;