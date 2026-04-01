import mongoose from "mongoose";

const exhibitorProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // 1 user = 1 profile
    },

    companyName: { type: String, required: true },
    companyDescription: String,
    productsServices: String,
    website: String,
    logoUrl: String,
    contactPerson: String,
    phone: String,
    address: String,

    documents: [String],
  },
  { timestamps: true }
);

const ExhibitorProfile = mongoose.model(
  "ExhibitorProfile",
  exhibitorProfileSchema
);

export default ExhibitorProfile;