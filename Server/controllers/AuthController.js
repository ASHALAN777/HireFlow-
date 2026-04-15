const UserModel = require("../Models/user-schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const redisClient = require("../middleware/redis");
const sgMail = require("@sendgrid/mail");
const logger = require("../middleware/logger");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const Signupcontrol = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const lowerEmail = email.toLowerCase();

    const user = await UserModel.findOne({ email: lowerEmail });
    if (user) {
      return res
        .status(409)
        .json({ message: "User already exists", success: false });
    }

    const userModel = new UserModel({
      name,
      email: lowerEmail,
      password,
      role,
    });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();

    try {
      await sgMail.send({
        from: process.env.SENDGRID_FROM,
        to: lowerEmail,
        subject: "Registration Successful! 🎉",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Welcome, ${name}! 🎉</h2>
            <p>Your registration was <strong>successful!</strong></p>
            <p>You can now login with your email and password.</p>
            <p>Email: <strong>${lowerEmail}</strong></p>
          </div>`,
      });
    } catch (emailError) {
      logger.error("Email failed:", emailError.message);
    }

    res.status(201).json({
      message: "Signup successful",
      success: true,
    });
  } catch (error) {
    logger.error("Signup error:", error.message);
    return res.status(500).json({
      message: "Signup failed",
      success: false,
    });
  }
};

const Logincontrol = async (req, res) => {
  try {
    const { email, password } = req.body;

    const cacheKey = `hash:${email.toLowerCase()}`;

    let user = await redisClient.get(cacheKey); // remove

    if (user) {
      user = JSON.parse(user);
      logger.info("User hash found in Redis");
    } else {
      user = await UserModel.findOne({ email: email.toLowerCase() });

      if (!user) {
        return res
          .status(401)
          .json({ message: "Email not found", success: false });
      }
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res
        .status(401)
        .json({ message: "Wrong password", success: false });
    }

    const access_token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.ACCESS_SECRET_KEY,
      { expiresIn: "20m" },
    );
    const refresh_token = jwt.sign(
      { _id: user._id },
      process.env.REFRESH_SECRET_KEY,
      { expiresIn: "15d" },
    );

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 20 * 60 * 1000,
    });

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    const userSession = {
      _id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    try {
      await redisClient.setEx(
        `session:${user._id}`,
        3600,
        JSON.stringify(userSession),
      );
      logger.info(` Session cached in Redis for user: ${user.email}`);
    } catch (redisErr) {
      logger.error("Redis Cache Error:", redisErr.message);
    }

    res.status(200).json({
      message: "Login successful",
      success: true,
      role: user.role,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    logger.error("Login error:", error.message);
    return res.status(500).json({
      message: "Login failed",
      success: false,
    });
  }
};

module.exports = { Logincontrol, Signupcontrol };
