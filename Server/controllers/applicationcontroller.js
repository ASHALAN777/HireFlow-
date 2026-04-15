const Application = require("../Models/Applicationschema");
const Job = require("../Models/job-schema");
const logger = require("../middleware/logger");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// post apply for a job — candidate only
const applyJob = async (req, res) => {
  try {
    const { jobId, coverLetter, resumeUrl } = req.body;

    const job = await Job.findById(jobId);

    if (!job) return res.status(404).json({ message: "Job not found" });

    const alreadyApplied = await Application.findOne({
      job: jobId,
      candidate: req.user._id,
    });
    if (alreadyApplied)
      return res.status(400).json({ message: "Already applied for this job" });

    const application = await Application.create({
      job: jobId,
      candidate: req.user._id,
      resumeUrl: resumeUrl,
      coverLetter,
    });

    res.status(201).json(application);
  } catch (error) {
    logger.error(`Error in applyJob: ${error.message}`)
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
};

// get all applications — admin only
const getAllApplications = async (req, res) => {
  try {
    const adminjobs = await Job.find({ postedBy: req.user._id }).select("_id");
    const jobids = adminjobs.map((j) => j._id);
    const applications = await Application.find({ job: { $in: jobids } })
      .populate("candidate", "name email")
      .populate("job", "title location")
      .sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    logger.error(`Error in getAllApplications: ${error.message}`)
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
};

// get Specific Application by ID — admin only
const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate("candidate", "name email phone address experience skills bio")
      .populate("job", "title location salary jobType");

    if (!application)
      return res.status(404).json({ message: "Application not found" });

    res.status(200).json(application);
  } catch (error) {
    logger.error(`Error in getApplicationById: ${error.message}`);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
};

// get my applications — candidate onl
const getMyApplications = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const applications = await Application.find({ candidate: userId })
      .populate("job", "title location salary jobType")
      .sort({ createdAt: -1 });
    logger.info("APPLICATIONS FOUND:", applications.length);
    res.status(200).json(applications);
  } catch (error) {
    logger.error(`Error in getMyApplications: ${error.message}`);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
};

//  update application status — admin only
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!application)
      return res.status(404).json({ message: "Application not found" });
    res.status(200).json(application);
  } catch (error) {
    logger.error(`Error in updateStatus: ${error.message}`);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
};

module.exports = {
  applyJob,
  getAllApplications,
  getMyApplications,
  updateStatus,
  getApplicationById,
};
