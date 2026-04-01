// // backend/Models/bookmarkModel.js
// import mongoose from "mongoose";

// // ✅ Bookmark schema
// const bookmarkSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true, // every bookmark must belong to a user
//     },
//     expo: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Expo",
//       required: true, // every bookmark must point to an expo
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now, // when bookmark was created
//     },
//   },
//   { timestamps: true } // adds createdAt & updatedAt automatically
// );

// // ✅ Prevent duplicate bookmarks per user
// bookmarkSchema.index({ user: 1, expo: 1 }, { unique: true });

// // ✅ Export model
// const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
// export default Bookmark;



import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expo",
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ Prevent duplicates
bookmarkSchema.index({ user: 1, expo: 1 }, { unique: true });

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
export default Bookmark;