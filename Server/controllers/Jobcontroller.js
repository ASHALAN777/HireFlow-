const Job = require("../Models/job-schema");

const getPublicJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true })
      .populate("postedBy", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true, postedBy: req.user._id  })
      .populate("postedBy", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "postedBy",
      "name email"
    );
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const createJob = async (req, res) => {
  try {
    const { title, description, skills, location, salary, jobType } = req.body;
    const job = await Job.create({
      title,
      description,
      skills,
      location,
      salary,
      jobType,
      postedBy: req.user._id,
    });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // ADD OWNERSHIP CHECK
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        message: "Unauthorized - you can only edit your own jobs" 
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedJob);

  } catch (error) {
    res.status(400).json({ message: "Invalid job data" });
  } }


const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // ADD OWNERSHIP CHECK
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        message: "Unauthorized - you can only delete your own jobs" 
      });
    }

    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  } }

module.exports = { getAllJobs, getJobById, createJob, updateJob, deleteJob, getPublicJobs };