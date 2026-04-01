
// import express from "express";
// import User from "../Models/userModel.js";
// import nodemailer from "nodemailer"; // Email bhejne ke liye

// const router = express.Router();

// /* ================= FORGOT PASSWORD (DYNAMIC) ================= */
// router.post("/forgot-password", async (req, res) => {
//   try {
//     const { email } = req.body;

//     // 1. Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User with this email does not exist" });
//     }

//     // 2. Nodemailer Transporter Setup (Aap yahan apni Gmail details daal sakte hain)
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "mariaqueen120@gmail.com", // Aapka email
//         pass: "ojxd rtsd nfxu yriw",    // Aapka Gmail App Password
//       },
//     });

//     // 3. Email Content
//     const mailOptions = {
//       from: "EventSphere <mariaqueen120@gmail.com>",
//       to: user.email,
//       subject: "Password Recovery - EventSphere",
//       html: `
//         <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
//           <h2>Hello ${user.name},</h2>
//           <p>You requested your password for EventSphere.</p>
//           <div style="background: #f4f4f4; padding: 15px; border-radius: 10px; border: 1px solid #ddd;">
//             <p style="margin: 0;">Your current password is: <strong>${user.password}</strong></p>
//           </div>
//           <p>Please login and change your password for security.</p>
//           <br>
//           <p>Regards,<br>Team EventSphere</p>
//         </div>
//       `,
//     };

//     // 4. Send Email
//     await transporter.sendMail(mailOptions);

//     res.status(200).json({ message: "Password has been sent to your email!" });

//   } catch (error) {
//     console.error("Forgot Password Error:", error);
//     res.status(500).json({ message: "Failed to send email. Please try again later." });
//   }
// });

// /* ================= GET ALL USERS (ADMIN) ================= */
// router.get("/", async (req, res) => {
//   try {
//     const users = await User.find().sort({ createdAt: -1 });
//     res.status(200).json(users);
//   } catch (error) {
//     console.error("Fetch users error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /* ================= SIGNUP ================= */
// router.post("/", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const existing = await User.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const user = await User.create({
//       name,
//       email,
//       password,
//       role: "user",
//     });

//     res.status(201).json({
//       message: "Signup successful",
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /* ================= LOGIN ================= */
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required" });
//     }

//     const user = await User.findOne({ email });

//     if (!user || user.password !== password) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     res.json({
//       message: "Login successful",
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /* ================= UPDATE USER (ADMIN EDIT) ================= */
// router.put("/:id", async (req, res) => {
//   try {
//     const { name, email, role } = req.body;

//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       { name, email, role },
//       { new: true }
//     );

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({
//       message: "User updated successfully",
//       user,
//     });
//   } catch (error) {
//     console.error("Update user error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /* ================= DELETE USER (ADMIN DELETE) ================= */
// router.delete("/:id", async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (error) {
//     console.error("Delete user error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // GET ALL EXHIBITORS
// router.get("/exhibitors", async (req, res) => {
//   try {
//     const exhibitors = await User.find({ role: "exhibitor" }).select("name email company");
//     res.json(exhibitors);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch exhibitors" });
//   }
// });

// // GET BOOKMARKS
// router.get("/:userId/bookmarks", async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const user = await User.findById(userId).populate("bookmarks");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json({ bookmarks: user.bookmarks });
//   } catch (error) {
//     console.error("Error fetching bookmarks:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;





import express from "express";
import User from "../Models/userModel.js";
import nodemailer from "nodemailer";
import crypto from "crypto"; // ✅ Token banane ke liye
import bcrypt from "bcryptjs";

const router = express.Router();

/* ================= FORGOT PASSWORD ================= */
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    // Email ko clean karein (Trim aur Lowercase)
    const cleanEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(404).json({ message: "User with this email does not exist" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; 
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mariaqueen120@gmail.com",
        pass: "ojxd rtsd nfxu yriw", 
      },
    });

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    
    // ⭐ TESTING KE LIYE: Link terminal mein bhi print hoga
    console.log("------------------------------------------");
    console.log("🔗 RESET LINK FOR", cleanEmail, ":", resetUrl);
    console.log("------------------------------------------");

    const mailOptions = {
      from: '"EventSphere" <mariaqueen120@gmail.com>',
      to: user.email,
      subject: "Password Reset Request - EventSphere",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #0ea5e9;">EventSphere Password Reset</h2>
          <p>You requested a password reset. Click the button below to set a new password:</p>
          <a href="${resetUrl}" style="background: #0ea5e9; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
          <p style="margin-top: 20px; color: #666;">This link will expire in 1 hour.</p>
        </div>
      `
    };

    // ✅ SIRF EK BAAR sendMail call karein await ke saath
    await transporter.sendMail(mailOptions);
    console.log("✅ EMAIL SENT SUCCESSFULLY TO:", user.email);

    res.status(200).json({ message: "Reset link sent!" });

  } catch (error) {
    console.error("❌ FORGOT PASSWORD ERROR:", error);
    res.status(500).json({ message: "Email sending failed. Please try again." });
  }
});
/* ================= RESET PASSWORD (NEW API) ================= */
// ✅ New Password Set karne ka logic (Reset Password)
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { password } = req.body;
    // ⭐ YE LINES ADD KAREIN (8-character limit ke liye)
    if (!password || password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }
    
    // 1. Token check karein aur expiration check karein
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Reset link is invalid or has expired." });
    }

    // 2. Naya password set karein (bcrypt auto-hash karega agar model me pre-save laga hai)
    user.password = password; 
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error("Reset Error:", error);
    res.status(500).json({ message: "Server error during reset." });
  }
});
/* ================= LOGIN (Direct Bcrypt Use) ================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 🛡️ Method ki jagah direct bcrypt use karein
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("❌ LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= REGISTER (NEW) ================= */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Check karein ke user pehle se toh nahi bana hua
    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // 2. Naya User banayein 
    // (Aapne model mein pre-save hashing lagayi hai, isliye yahan bcrypt.hash ki zaroorat nahi)
    const newUser = new User({
      name,
      email: email.trim().toLowerCase(),
      password,
      role: role || "user"
    });

    await newUser.save();

    res.status(201).json({ 
      message: "User registered successfully!",
      user: { _id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
    });

  } catch (error) {
    console.error("❌ SIGNUP ERROR:", error);
    res.status(500).json({ message: "Server error during registration. Check backend console." });
  }
});
// Get all users for Admin
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}).select("-password"); // Password hide karke baqi data layein
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// ✅ Sahi Update Route (PUT /api/users/:id)
router.put("/:id", async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Sirf wahi cheezein update karein jo frontend se aayi hain
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    // Password ko mat cherna agar frontend se naya password nahi aaya
    // hamara model ka logic isay handle kar lega (if !isModified)

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    console.error("❌ UPDATE ERROR:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
});
/* ================= DELETE USER (Admin Only) ================= */
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // 1. Check karein ke user exist karta hai ya nahi
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🛡️ Optional: Rokna ke Admin apne aap ko delete na kare (Security)
    // if (user.role === "admin") {
    //   return res.status(403).json({ message: "Admin account cannot be deleted" });
    // }

    // 2. User ko delete karein
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("❌ DELETE ERROR:", error);
    res.status(500).json({ message: "Server error while deleting user" });
  }
});
// userRoutes.js mein ye code check karein
router.get("/exhibitors", async (req, res) => {
  try {
    // ⚠️ Check karein ke Atlas mein role "exhibitor" hi hai (Small 'e')
    const exhibitors = await User.find({ role: "exhibitor" }).select("name company _id");
    
    console.log("Found Exhibitors:", exhibitors); // Backend terminal mein check karein
    res.json(exhibitors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exhibitors" });
  }
});

// ... (Baqi saare routes same rahengi unhe mat cherna)
export default router;