// import express from "express";
// import mongoose from "mongoose";
// import Conversation from "../Models/Conversation.js";
 

// const router = express.Router();

// const requireUser = (req, res) => {
//   const userId = req.headers["x-user-id"];
//   if (!userId) {
//     res.status(401).json({ message: "Missing x-user-id" });
//     return null;
//   }
//   if (!mongoose.Types.ObjectId.isValid(userId)) {
//     res.status(400).json({ message: "Invalid x-user-id" });
//     return null;
//   }
//   return userId;
// };

// // ✅ Create OR Get Conversation
// router.post("/conversations", async (req, res) => {
//   try {
//     const userId = requireUser(req, res);
//     if (!userId) return;

//     const { otherUserId } = req.body;
//     if (!otherUserId) {
//       return res.status(400).json({ message: "Missing otherUserId" });
//     }
//     if (!mongoose.Types.ObjectId.isValid(otherUserId)) {
//       return res.status(400).json({ message: "Invalid otherUserId" });
//     }

//     const participants = [userId, otherUserId].sort();

//     let convo = await Conversation.findOne({
//       participants: { $all: participants },
//       $expr: { $eq: [{ $size: "$participants" }, 2] },
//     });

//     if (convo) return res.json(convo);

//     convo = await Conversation.create({ participants });
//     return res.status(201).json(convo);
//   } catch (err) {
//     if (err?.code === 11000) {
//       const userId = req.headers["x-user-id"];
//       const { otherUserId } = req.body;
//       const participants = [userId, otherUserId].sort();

//       const convo = await Conversation.findOne({
//         participants: { $all: participants },
//         $expr: { $eq: [{ $size: "$participants" }, 2] },
//       });
//       if (convo) return res.json(convo);
//     }
//     console.error(err);
//     return res.status(500).json({ message: "Error opening chat" });
//   }
// });

// // ✅ Get my conversations
// router.get("/conversations", async (req, res) => {
//   try {
//     const userId = requireUser(req, res);
//     if (!userId) return;

//     const convos = await Conversation.find({ participants: userId })
//       .populate("participants", "name email role company")
//       .sort({ updatedAt: -1 });

//     return res.json(convos);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Failed to load conversations" });
//   }
// });

// // ✅ Get messages in conversation
// router.get("/conversations/:id/messages", async (req, res) => {
//   try {
//     const userId = requireUser(req, res);
//     if (!userId) return;

//     const convoId = req.params.id;
//     if (!mongoose.Types.ObjectId.isValid(convoId)) {
//       return res.status(400).json({ message: "Invalid conversation id" });
//     }

//     const convo = await Conversation.findById(convoId);
//     if (!convo) return res.status(404).json({ message: "Conversation not found" });

//     const isMember = convo.participants.some((p) => String(p) === String(userId));
//     if (!isMember) return res.status(403).json({ message: "Not allowed" });

//     const msgs = await Conversation.find({ conversationId: convoId })
//       .populate("senderId", "name role email")
//       .sort({ createdAt: 1 });

//     return res.json(msgs);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Failed to load messages" });
//   }
// });

// // ✅ Send message
// router.post("/messages", async (req, res) => {
//   try {
//     const userId = requireUser(req, res);
//     if (!userId) return;

//     const { conversationId, text } = req.body;
//     if (!conversationId || !text?.trim()) {
//       return res.status(400).json({ message: "conversationId and text required" });
//     }
//     if (!mongoose.Types.ObjectId.isValid(conversationId)) {
//       return res.status(400).json({ message: "Invalid conversationId" });
//     }

//     const convo = await Conversation.findById(conversationId);
//     if (!convo) return res.status(404).json({ message: "Conversation not found" });

//     const isMember = convo.participants.some((p) => String(p) === String(userId));
//     if (!isMember) return res.status(403).json({ message: "Not allowed" });

//     const msg = await Conversation.create({
//       conversationId,
//       senderId: userId,
//       text: text.trim(),
//     });

//     convo.lastMessage = msg.text;
//     convo.lastMessageAt = new Date();
//     await convo.save();

//     const populated = await Conversation.findById(msg._id).populate(
//       "senderId",
//       "name role email"
//     );

//     return res.status(201).json(populated);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Failed to send message" });
//   }
// });

// export default router;

import express from "express";
import mongoose from "mongoose";
import Conversation from "../Models/Conversation.js";

const router = express.Router();

// Middleware to get userId from headers
const requireUser = (req, res) => {
  const userId = req.headers["x-user-id"];
  if (!userId) return res.status(401).json({ message: "Missing x-user-id" });
  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(400).json({ message: "Invalid x-user-id" });
  return userId;
};

// ------------------------
// Create or Get Conversation between two users
// ------------------------
router.post("/conversations", async (req, res) => {
  try {
    const userId = requireUser(req, res);
    if (!userId) return;

    const { otherUserId } = req.body;
    if (!otherUserId) return res.status(400).json({ message: "Missing otherUserId" });
    if (!mongoose.Types.ObjectId.isValid(otherUserId))
      return res.status(400).json({ message: "Invalid otherUserId" });

    const participants = [userId, otherUserId].sort();

    let convo = await Conversation.findOne({
      participants: { $all: participants },
      $expr: { $eq: [{ $size: "$participants" }, 2] },
    });

    if (convo) return res.json(convo);

    convo = await Conversation.create({ participants });
    return res.status(201).json(convo);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error opening chat" });
  }
});

// ------------------------
// Get all conversations for logged-in user
// ------------------------
// Get all conversations for logged-in user
router.get("/conversations", async (req, res) => {
  try {
    const userId = requireUser(req, res);
    if (!userId) return;

    // Is query ko thoda mazeed detail mein likhte hain
    const convos = await Conversation.find({ 
      participants: { $in: [new mongoose.Types.ObjectId(userId)] } 
    })
      .populate("participants", "name email role company")
      .sort({ updatedAt: -1 });

    console.log(`User ${userId} has ${convos.length} conversations.`);
    return res.json(convos);
  } catch (err) {
    console.error("Fetch Error:", err);
    return res.status(500).json({ message: "Failed to load" });
  }
});

// ------------------------
// Get messages in a conversation
// ------------------------
router.get("/conversations/:id/messages", async (req, res) => {
  try {
    const userId = requireUser(req, res);
    if (!userId) return;

    const convoId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(convoId))
      return res.status(400).json({ message: "Invalid conversation id" });

    const convo = await Conversation.findById(convoId).populate(
      "participants",
      "name email role company"
    );
    if (!convo) return res.status(404).json({ message: "Conversation not found" });

    const isMember = convo.participants.some((p) => String(p._id) === String(userId));
    if (!isMember) return res.status(403).json({ message: "Not allowed" });

    // Messages are stored inside the conversation itself
    const msgs = convo.messages || [];

    return res.json(msgs);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to load messages" });
  }
});

// ------------------------
// Send a message in a conversation
// ------------------------
router.post("/messages", async (req, res) => {
  try {
    const userId = requireUser(req, res);
    if (!userId) return;

    const { conversationId, text } = req.body;
    if (!conversationId || !text?.trim())
      return res.status(400).json({ message: "conversationId and text required" });
    if (!mongoose.Types.ObjectId.isValid(conversationId))
      return res.status(400).json({ message: "Invalid conversationId" });

    const convo = await Conversation.findById(conversationId);
    if (!convo) return res.status(404).json({ message: "Conversation not found" });

    const isMember = convo.participants.some((p) => String(p) === String(userId));
    if (!isMember) return res.status(403).json({ message: "Not allowed" });

    const message = {
      senderId: userId,
      text: text.trim(),
      createdAt: new Date(),
    };

    convo.messages = convo.messages || [];
    convo.messages.push(message);
    convo.lastMessage = message.text;
    convo.lastMessageAt = new Date();

    await convo.save();

    // populate sender info before sending back
    const populated = await Conversation.findById(convo._id).populate(
      "messages.senderId",
      "name role email"
    );

    return res.status(201).json(populated.messages.slice(-1)[0]); // return only the new message
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to send message" });
  }
});

export default router;
