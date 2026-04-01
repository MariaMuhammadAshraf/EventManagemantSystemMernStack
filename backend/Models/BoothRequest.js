import mongoose from "mongoose";

const boothRequestSchema = new mongoose.Schema(
  {
    expoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expo",
      required: true,
    },
    exhibitorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hall: {
      type: String,
      enum: ["Hall A", "Hall B"],
      required: true,
    },
    boothName: {
      type: String,
      required: true,
      trim: true,
    },
    company: String,
    description: String,
    productsServices: {
      type: [String],
      default: [],
    },
    staff: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    adminNote: String,
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rejectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    approvedAt: Date,
    rejectedAt: Date,
  },
  { timestamps: true }
);

const BoothRequest = mongoose.model("BoothRequest", boothRequestSchema);

export default BoothRequest;
