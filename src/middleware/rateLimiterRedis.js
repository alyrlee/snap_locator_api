const redis = require('redis');
const { RateLimiterRedis } = require('rate-limiter-flexible');

// Create redis client
const redisClient = redis.createClient({
  host: 'redis',
  port: 6379,
});

// Setup Rate Limiter
const rateLimiter = new RateLimiterRedis({
  redis: redisClient, // redis client instance
  keyPrefix: 'snap_api:rl', // prefix your keys with some name
  points: 50, // 50 requests
  duration: 1, // per 1 second by IP
});

// Setup the middleware using the rate limiter config
const rateLimiterMiddleware = (req, res, next) => {
  // On the basis of ip address, but can be modified according to your needs
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send('Too Many Requests');
    });
};

module.exports = rateLimiterMiddleware;