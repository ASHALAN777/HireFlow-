const mongoose = require("mongoose");
const logger = require("../middleware/logger");

const mongo_url = process.env.MONGO_URI;

mongoose
  .connect(mongo_url)
  .then(() => {
    logger.info("Mongo connect succesfully");
  })

  .catch((err) => {
    logger.info("Mongo connection error:", err);
  });
