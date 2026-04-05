const mongoose = require("mongoose")

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  resumeUrl: {
    type: String,
    required: true
  },
  coverLetter: {
    type: String
  },
  aiScore: {
    type: Number,
    default: null
  },
  aiFeedback: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ["applied", "interview", "hired", "rejected"],
    default: "applied"
  }
}, { timestamps: true })

module.exports = mongoose.model("Application", applicationSchema)
