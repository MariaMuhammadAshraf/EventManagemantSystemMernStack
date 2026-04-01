// backend/config/db.js
import mongoose from "mongoose";
import User from "../Models/userModel.js";

// ---- default users seed ----
const createDefaultUsers = async () => {
  const defaultUsers = [
    {
      name: "Admin",
      email: "admin@gmail.com",
      password: "admin123",
      role: "admin",
    },
    {
      name: "Attendee",
      email: "attendee@gmail.com",
      password: "attendee123",
      role: "attendee",
    },
    {
      name: "Exhibitor",
      email: "exhibitor@gmail.com",
      password: "exhibitor123",
      role: "exhibitor",
    },
  ];

  for (const userData of defaultUsers) {
    const exists = await User.findOne({ email: userData.email });
    if (!exists) {
      await User.create(userData);
      console.log(`✅ Default ${userData.role} user created: ${userData.email}`);
    } else {
      console.log(`ℹ️ ${userData.role} user already exists: ${userData.email}`);
    }
  }
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // agar URI me db name nahi diya hai to:
      // dbName: "eventsphere",
    });
    console.log("Mongo is connected");

    // DB connect hone ke baad default users ensure karo
    await createDefaultUsers();
  } catch (err) {
    console.log("Mongo connection Error:", err.message);
    process.exit(1);
  }
};

export default connectDB;