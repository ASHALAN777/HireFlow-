const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const resumeUrl = `/uploads/${req.file.filename}`;

    res.status(200).json({
      message: "Resume uploaded successfully",
      resumeUrl,
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed" });
  }
};

module.exports = { uploadResume };