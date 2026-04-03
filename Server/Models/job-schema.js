const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    salary: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: ["fulltime", "parttime", "internship", "remote"],
      default: "fulltime",
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// applicationSchema.index(
//   { job: 1, candidate: 1 },
//   { unique: true, name: "unique_application" },
// );

module.exports = mongoose.model("Job", jobSchema);

