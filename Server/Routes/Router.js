const {
  signupvalidation,
  loginvalidation,
  updateProfileValidation,
} = require("../middleware/AuthValidation");

require("dotenv").config();

const {
  Signupcontrol,
  Logincontrol,
} = require("../controllers/AuthController");

const authMiddleware = require("../middleware/authMiddleware");
const refresher = require("../middleware/refreshMiddleware");
const {
  forgotpassword,
  otpverify,
  resetpassword,
} = require("../controllers/forgotPassword");

const User = require("../Models/user-schema");
const { updateProfile } = require("../controllers/profileController");
const router = require("express").Router();

// Auth routes
router.post("/signup", signupvalidation, Signupcontrol);
router.post("/login", loginvalidation, Logincontrol);

router.post("/logout", (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    sameSite: "none",
    secure: process.env.NODE_ENV === "production",
  });
  res.clearCookie("refresh_token", {
    httpOnly: true,
    sameSite: "none",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ message: "Logged out" });
});

// get current user
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password -resetOTP -resetOTPExpiry -__v -resumeUrl -profileImage",
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ authenticated: true, user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// update current  user
router.put(
  "/update-profile",
  authMiddleware,
  updateProfileValidation,
  updateProfile,
);

// get all users
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("name email role");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/refresh", refresher);
router.post("/forgot-password", forgotpassword);
router.post("/verify-otp", otpverify);
router.post("/reset-password", resetpassword);

module.exports = router;
