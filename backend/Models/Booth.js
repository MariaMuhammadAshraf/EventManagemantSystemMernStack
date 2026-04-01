import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    role: { type: String, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, trim: true },
  },
  { _id: false }
);

const boothSchema = new mongoose.Schema(
  {
    expoId: { type: mongoose.Schema.Types.ObjectId, ref: "Expo", required: true, index: true },
    exhibitorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },

    hall: { type: String, enum: ["Hall A", "Hall B"], required: true },
    boothNo: { type: Number, required: true }, // 1..15 per hall

    boothName: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    description: { type: String, trim: true, maxlength: 1500 },

    productsServices: { type: [String], default: [] },
    staff: { type: [staffSchema], default: [] },
  },
  { timestamps: true }
);

// ✅ exhibitor can have multiple booths now (NO unique here)
boothSchema.index({ expoId: 1, exhibitorId: 1 });

// ✅ keep hall slot unique (enforces 15 max practically + unique boothNo)
boothSchema.index({ expoId: 1, hall: 1, boothNo: 1 }, { unique: true });

const Booth = mongoose.model("Booth", boothSchema);


export default Booth;
