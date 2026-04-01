// // backend/Models/userModel.js
// import mongoose from "mongoose";


// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     email: { type: String, required: true, unique: true, lowercase: true },
//     password: { type: String, required: true },

//     role: {
//       type: String,
//       enum: ["admin", "attendee", "exhibitor", "user"],
//       default: "user",
//     },
//    // ✅ Yeh field add karna lazmi hai warna StrictPopulateError ayega
//   bookmarks: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Bookmark" // Ya "Booking", jo aap use kar rahe hain
//   }]
// }, { timestamps: true });

// const User = mongoose.model("User", userSchema);
// export default User;




import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "attendee", "exhibitor", "user"],
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    bookmarks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bookmark"
    }]
  }, { timestamps: true });

// userModel.js mein line 60 ke aas paas:
userSchema.pre("save", async function () { 
  // Agar password change nahi hua toh kuch mat karein
  if (!this.isModified("password")) return; 

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // Yahan next() likhne ki zaroorat nahi hai async function mein
  } catch (error) {
    throw new Error(error); // Yeh error backend terminal mein dikhayega
  }
});

// ... schema definition ke baad ...

// ✅ 1. Pehle Method define karein
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ✅ 2. PHIR model banayein aur export karein
const User = mongoose.model("User", userSchema);
export default User;