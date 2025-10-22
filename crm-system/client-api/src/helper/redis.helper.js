import redis from "redis";

const redisURL = process.env.REDIS_URL || "redis://127.0.0.1:6380";

const client = redis.createClient({
  url: redisURL,
});

const connectRedis = async () => {
  try {
    await client.connect();
    console.log(`✅ Redis client connected successfully to ${redisURL}`);
  } catch (err) {
    console.error("❌ Failed to connect to Redis:", err);
  }
};

const disconnectRedis = async () => {
  try {
    await client.quit();
    console.log("🔌 Redis client disconnected successfully");
  } catch (err) {
    console.error("❌ Failed to disconnect from Redis:", err);
  }
};

const setJWT = async (key, value) => {
  try {
    const res = await client.set(key, value, { EX: 60 * 60 }); // 1 hour expiry
    return res;
  } catch (err) {
    throw err;
  }
};

const getJWT = async (key) => {
  try {
    const res = await client.get(key);
    return res;
  } catch (err) {
    throw err;
  }
};

const deleteJWT = async (key) => {
  try {
    const res = await client.del(key);
    return res;
  } catch (err) {
    throw err;
  }
};

export { setJWT, getJWT, deleteJWT, connectRedis, disconnectRedis };
