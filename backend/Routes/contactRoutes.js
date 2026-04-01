// import express from "express";
// import Contact from "../Models/Contact.js";

// const router = express.Router();

// // ------------------ Create a new contact message ------------------
// router.post("/", async (req, res) => {
//   try {
//     const { name, email, message } = req.body;
//     if (!name || !email || !message)
//       return res.status(400).json({ message: "All fields are required" });

//     const newMessage = new Contact({ name, email, message });
//     await newMessage.save();

//     res.status(201).json({ message: "Message sent successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // ------------------ Get all messages (Admin) ------------------
// router.get("/", async (req, res) => {
//   try {
//     const messages = await Contact.find().sort({ createdAt: -1 });
//     res.json(messages);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // ------------------ Delete a message (Admin) ------------------
// router.delete("/:id", async (req, res) => {
//   try {
//     await Contact.findByIdAndDelete(req.params.id);
//     res.json({ message: "Message deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // ------------------ Update a message (Admin) ------------------
// router.put("/:id", async (req, res) => {
//   try {
//     const { name, email, message } = req.body;
//     const updatedMessage = await Contact.findByIdAndUpdate(
//       req.params.id,
//       { name, email, message },
//       { new: true }
//     );
//     res.json(updatedMessage);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;


import express from "express";
import Contact from "../Models/Contact.js";

const router = express.Router();

// Create new contact message
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ message: "All fields are required" });

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all messages (Admin)
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages); // returns array
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a message (Admin)
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update a message (Admin)
router.put("/:id", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const updatedMessage = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email, message },
      { new: true }
    );
    res.json(updatedMessage);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
