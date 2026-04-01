


import mongoose from "mongoose";

const expoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    theme: { type: String },               // ✅ ADD
    description: { type: String },         // ✅ ADD

    location: { type: String, required: true },

    startDate: Date,
    endDate: Date,
    registrationDeadline: Date,             // ✅ ADD

    image: String,

    availability: {
      type: String,
      enum: ["available", "not_available"],
      default: "available",
    },
  },
  { timestamps: true }
);

const Expo = mongoose.model("Expo", expoSchema);
export default Expo;
