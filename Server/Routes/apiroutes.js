const express = require("express")
const router = express.Router()

//import files//

const { getAllJobs, getJobById, createJob, updateJob, deleteJob,getPublicJobs } = require("../controllers/Jobcontroller")
const { applyJob, getAllApplications, getMyApplications, updateStatus,getApplicationById } = require("../controllers/applicationcontroller")
const { scoreResume } = require("../controllers/aicontroller")
const { uploadResume } = require("../controllers/uploadcontroller")

const authMiddleware = require("../middleware/authMiddleware")
const isAdmin = require("../middleware/rolemiddleware")
const upload = require("../middleware/uploadmiddleware")
const { createJobValidation, updateJobValidation, applyJobValidation } = require("../middleware/AuthValidation")

// importtt done

// Jobs
router.get("/jobs/public", getPublicJobs)    // public, no auth
router.get("/jobs", authMiddleware, isAdmin, getAllJobs )   // admin,  auth
router.get("/jobs/:id", getJobById)   // public, no auth
router.post("/jobs", authMiddleware, isAdmin, createJobValidation, createJob)
router.put("/jobs/:id", authMiddleware, isAdmin, updateJobValidation, updateJob)
router.delete("/jobs/:id", authMiddleware, isAdmin, deleteJob)

// Applications
router.post("/applications", authMiddleware, applyJobValidation,applyJob)
router.get("/applications", authMiddleware, isAdmin, getAllApplications) //shw application

router.get("/applications/:id", authMiddleware, isAdmin, getApplicationById)
router.get("/applications/me", authMiddleware, getMyApplications)
router.put("/applications/:id/status", authMiddleware, isAdmin, updateStatus)


// AI
router.post("/ai/score", authMiddleware, scoreResume)

// Upload
router.post("/upload/resume", authMiddleware, upload.single("resume"), uploadResume)

module.exports = router