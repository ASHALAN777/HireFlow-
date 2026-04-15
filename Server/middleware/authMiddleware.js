const jwt = require("jsonwebtoken");
const redisClient = require("./redis");
// const { redisClient } = require("@upstash/redis");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.access_token;

    if (!token) {
      return res.status(401).json({ message: "UNAUTHORIZED" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);

    ////                  NEW REDIS PART  start       //////

    try {
      const cachedUser = await redisClient.get(`session:${decoded._id}`);

      if (cachedUser) {
        req.user = JSON.parse(cachedUser);
        return next();
      }
    } catch (redisError) {
      logger.error("Redis Middleware Error:", redisError.message);
    }

    //                  NEW REDIS PART  END       //////

    req.user = {
      _id: decoded._id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "ACCESS_TOKEN_EXPIRED" });
    }
    return res.status(401).json({ message: "UNAUTHORIZED" });
  }
};

module.exports = authMiddleware;
