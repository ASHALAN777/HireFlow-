require("dotenv").config();
const User = require("../Models/user-schema");
const jwt = require("jsonwebtoken");
const redisClient = require("../middleware/redis");

const authchecker = async (req, res) => {
  try {
    //   const user = await User.findById(req.user._id).select(
    //     "-password -resetOTP -resetOTPExpiry -__v -resumeUrl -profileImage",
    //   );
    //   if (!user) {
    //     return res.status(404).json({ message: "User not found" });
    //   }
    //   res.json({ authenticated: true, user });
    // } catch (err) {
    //   res.status(500).json({ message: "Server error" });
    // }

    if (req.user && req.user.name) {
      logger.info("User data loaded from Redis Middleware");
      return res.json({
        authenticated: true,
        user: req.user,
      });
    }
    logger.info("User data not found in Redis, fetching from database");
    const user = await User.findById(req.user._id).select(
      "-password -resetOTP -resetOTPExpiry -__v -resumeUrl -profileImage",
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userSession = {
      _id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    try {
      await redisClient.setEx(
        //remove
        `session:${user._id}`,
        3600,
        JSON.stringify(userSession),
      );
      logger.info(` Session cached in Redis for user: ${user.email}`);
    } catch (redisErr) {
      logger.error("Redis Cache Error:", redisErr.message);
    }
    res.json({ authenticated: true, user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = authchecker;
