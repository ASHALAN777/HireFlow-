const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["Admin", "Candidate"],
    default: "Candidate"
  },

  // both
  phone: { type: String, default: null },
  address: { type: String, default: null },
  profileImage: { type: String, default: null },

  // candidate only
  experience: { type: String, default: null }, // fresher, 1-2 years etc
  resumeUrl: { type: String, default: null },
  skills: { type: [String], default: [] },
  bio: { type: String, default: null },

  // admin only
  companyName: { type: String, default: null },
  companyWebsite: { type: String, default: null },
  companySize: { type: String, default: null },
  jobRole: { type: String, default: null }, // HR, CTO, Founder etc

  // forgot password
  resetOTP: { type: String, default: null },
  resetOTPExpiry: { type: Date, default: null }

}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)