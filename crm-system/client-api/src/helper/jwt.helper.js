import jwt from "jsonwebtoken";
import { setJWT } from "./redis.helper.js";
import { storeUserRefreshJWT } from "../model/user/User.model.js";

const createAccessJWT = async (payload) => {
  try {
    const accessJWT = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "1h",
    });

    // Store in Redis
    await setJWT(accessJWT, payload.id);

    return accessJWT;
  } catch (err) {
    throw err;
  }
};

const createRefreshJWT = async (payload) => {
  try {
    const refreshJWT = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    // Store in MongoDB user
    await storeUserRefreshJWT(payload.id, refreshJWT);

    return refreshJWT;
  } catch (err) {
    throw err;
  }
};

const verifyAccessJWT = async (token) => {
  try {
    if (!token) throw new Error("Token missing");
    const result = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return result; // { id: userId, iat, exp }
  } catch (err) {
    throw err;
  }
};

const verifyRefreshJWT = async (token) => {
  try {
    if (!token) throw new Error("Token missing");
    const result = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return result;
  } catch (err) {
    throw err;
  }
};

export { createAccessJWT, createRefreshJWT, verifyAccessJWT, verifyRefreshJWT };
