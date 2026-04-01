 

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    messages: [messageSchema],
    lastMessage: { type: String, default: "" },
    lastMessageAt: { type: Date },
  },
  { timestamps: true }
);

 

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
