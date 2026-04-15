const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const userName =
      req.user && req.user.name
        ? req.user.name.replace(/\s+/g, "_")
        : "user_" + Date.now();
    const customFileName = `resume_${userName}_${Date.now()}.pdf`;
    const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(fileBase64, {
      folder: "hireflow_resumes",
      public_id: customFileName,
      resource_type: "raw",
    });

    res.status(200).json({
      message: "Uploaded to Cloudinary!",
      resumeUrl: result.secure_url,
    });
  } catch (error) {
    logger.error("Cloudinary Error:", error);
    res.status(500).json({ message: "Cloudinary upload failed" });
  }
};

module.exports = { uploadResume };
