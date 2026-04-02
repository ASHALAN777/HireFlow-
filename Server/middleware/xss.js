const xss = require("xss");

const xssClean = (obj) => {
  if (typeof obj === "string") return xss(obj);
  if (obj && typeof obj === "object") {
    for (const key in obj) {
      obj[key] = xssClean(obj[key]);
    }
  }
  return obj;
};

const xssMiddleware = (req, res, next) => {
  if (req.body) req.body = xssClean(req.body);
  next();
};

module.exports = xssMiddleware;