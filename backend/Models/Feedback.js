import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    type: {
      type: String,
      enum: ["Suggestion", "Issue", "General"],
      default: "General",
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },

    message: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },

    adminResponse: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);