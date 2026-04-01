import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    attendee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    exhibitor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

leadSchema.index({ attendee: 1, exhibitor: 1 }, { unique: true });

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
