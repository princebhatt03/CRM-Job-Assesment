import { verifyAccessJWT } from "../helper/jwt.helper.js";
import { getJWT } from "../helper/redis.helper.js";

export const userAuthorization = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "User is not logged in" });
    }

    // Remove "Bearer " if included
    if (token.startsWith("Bearer ")) token = token.split(" ")[1];

    // Verify JWT
    const decoded = await verifyAccessJWT(token);

    if (!decoded?.id) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }

    // Check Redis for token validity
    const userId = await getJWT(token);
    if (!userId) {
      return res.status(403).json({ message: "Forbidden: Token expired or invalidated" });
    }

    req.userId = userId;
    next();
  } catch (error) {
    console.error("Authorization error:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};
