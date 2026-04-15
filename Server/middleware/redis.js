const { createClient } = require("redis");
require("dotenv").config();

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",

  socket: {
    tls: true,
    connectTimeout: 10000, // 10 seconds timeout
    keepAlive: 5000,
    reconnectStrategy: (retries) => Math.min(retries * 50, 500),
  },
});

redisClient.on("error", (err) => {
  if (err.message.includes("Socket closed unexpectedly")) return;
  logger.info("Redis Client Error", err);
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    logger.info(" Redis Connected Successfully");
  } catch (error) {
    logger.error(" Redis Connection Failed:", error);
  }
};

connectRedis();

module.exports = redisClient;

/////                  http version                   ////

// const { Redis } = require("@upstash/redis");
// require("dotenv").config();

// const redisClient = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN,
// });

// (async () => {
//     try {
//          redisClient.set('test', 'success');       ///remove
//         const result =  redisClient.get('test');
//         logger.info(" HTTP Redis connected successfully:", result);
//     } catch (err) {
//         logger.error(" Redis Error:", err.message);
//     }
// })();

// module.exports = redisClient;

//                   local redis                          //

// const { createClient } = require('redis');

// const redisClient = createClient({
//     url: 'redis://localhost:6379' // Points to your local machine
// });

// redisClient.on('error', (err) => logger.info('Redis Local Error', err));

// (async () => {
//     await redisClient.connect();
//     logger.info("🚀 LOCAL Redis Connected (TCP)!");
// })();

// module.exports = redisClient;
