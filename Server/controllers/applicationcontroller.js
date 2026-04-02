const Application = require("../Models/Applicationschema");
const Job = require("../Models/job-schema");
const { isValidObjectId } = require("mongoose");

// POST apply for a job — candidate only
const applyJob = async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;

    

    // check if job exists
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // check if already applied
    const alreadyApplied = await Application.findOne({
      job: jobId,
      candidate: req.user._id,
    });
    if (alreadyApplied)
      return res.status(400).json({ message: "Already applied for this job" });

    const application = await Application.create({
      job: jobId,
      candidate: req.user._id,
      resumeUrl: req.body.resumeUrl,
      coverLetter,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET all applications — admin only
const getAllApplications = async (req, res) => {
  try {
    const adminjobs = await Job.find({ postedBy: req.user._id }).select("_id");
    const jobids = adminjobs.map((j) => j._id);
    const applications = await Application.find({job:{$in:jobids}})
      .populate("candidate", "name email")
      .populate("job", "title location")
      .sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// get Specific Application by ID — admin only
const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate("candidate", "name email phone address experience skills bio")
      .populate("job", "title location salary jobType")

    if (!application) return res.status(404).json({ message: "Application not found" })

    res.status(200).json(application)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

// GET my applications — candidate only
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ candidate: req.user._id })
      .populate("job", "title location salary jobType")
      .sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// PUT update application status — admin only (kanban)
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
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  applyJob,
  getAllApplications,
  getMyApplications,
  updateStatus,
  getApplicationById
};
