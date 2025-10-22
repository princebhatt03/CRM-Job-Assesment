import express from "express";
import { verifyRefreshJWT, createAccessJWT } from "../helper/jwt.helper.js";
import { getUserById } from "../model/user/User.model.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(400).json({ message: "Token is required" });

  try {
    const decoded = await verifyRefreshJWT(authorization);
    const user = await getUserById(decoded.id);

    if (!decoded.id || !user?._id || user.refreshJWT.token !== authorization) {
      return res.status(403).json({
        message: "Forbidden",
        reason: !decoded.id
          ? "Invalid token"
          : !user
          ? "User not found"
          : "Refresh Token mismatch",
      });
    }

    const accessJWT = await createAccessJWT({ id: `${user._id}` });
    return res.status(200).json({ accessJWT });
  } catch (error) {
    return res.status(500).json({
      message: "Forbidden",
      reason: error.message || "An unexpected error occurred",
    });
  }
});

export default router;
