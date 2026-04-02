const User = require("../Models/user-schema")

const updateProfile = async (req, res) => {
  try {
    const {
      name, phone, address,
      experience, skills, bio,
      companyName, companyWebsite, companySize, jobRole,resumeUrl
    } = req.body

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name, phone, address,
        experience, skills, bio,
        companyName, companyWebsite, companySize, jobRole,resumeUrl
      },
      { new: true }
    ).select("-password")

    res.status(200).json({ message: "Profile updated", user })
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
}

module.exports = { updateProfile }