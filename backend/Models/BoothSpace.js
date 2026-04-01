// backend/models/BoothSpace.js
import mongoose from "mongoose";

const boothSpaceSchema = new mongoose.Schema(
  {
    expoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expo",
      required: true,
      index: true,
    },
    hall: { type: String, required: true, trim: true }, // Hall A
    code: { type: String, required: true, trim: true }, // A-01
    size: { type: String, default: "3x3", trim: true },
    price: { type: Number, default: 0 },

    status: { type: String, enum: ["available", "reserved"], default: "available" },
    reservedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    reservedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

boothSpaceSchema.index({ expoId: 1, hall: 1, code: 1 }, { unique: true });

const BoothSpace = mongoose.model("BoothSpace", boothSpaceSchema);
export default BoothSpace;
