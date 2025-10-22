import express from "express";
const router = express.Router();
import {
  insertUser,
  getUserByEmail,
  getUserById,
  updatePassword,
  storeUserRefreshJWT,
} from "../model/user/User.model.js";
import { hashPassword, comparePassword } from "../helper/bcrypt.helper.js";
import { createAccessJWT, createRefreshJWT } from "../helper/jwt.helper.js";
import { userAuthorization } from "../middlewares/authorization.middleware.js";
import {
  setPasswordResetPin,
  deletePasswordResetPin,
  getPinByEmail,
} from "../model/reset-pin/resetPin.model.js";
import sendMail from "../helper/email.helper.js";
import {
  loginValidation,
  resetPassReqValidation,
  resetPassValidation,
} from "../middlewares/validation.middleware.js";
import { deleteJWT } from "../helper/redis.helper.js";

router.all("/", (req, res, next) => {
  next();
});

// Get User Profile Router
router.get("/", userAuthorization, async (req, res) => {
  const _id = req.userId;

  const userProf = await getUserById(_id);
  res.json({ userProf });
});

// Signup
router.post("/", async (req, res) => {
  const { name, company, phone, email, password, address } = req.body;

  if (!name || !company || !phone || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await hashPassword(password);
    const newUser = await insertUser({ name, company, phone, email, password: hashedPassword, address });

    return res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", loginValidation, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user || !user._id) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const accessJWT = await createAccessJWT({ id: `${user._id}` });
    const refreshJWT = await createRefreshJWT({ id: `${user._id}` });

    res.status(200).json({ message: "User logged in", accessJWT, refreshJWT });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});


// Password reset request
router.post("/reset-password", resetPassReqValidation, async (req, res) => {
  const { email } = req.body;

  try {
    await deletePasswordResetPin(email);
    const user = await getUserByEmail(email);

    if (user && user._id) {
      const setPin = await setPasswordResetPin(email);
      const mail = await sendMail(email, setPin.pin, "request-password-reset");

      if (mail && mail.messageId) {
        return res.json({
          message:
            "An email will be sent to you containing the password reset pin",
        });
      }

      res
        .status(400)
        .json({ message: "Something went wrong, try again later" });
    } else {
      res.status(400).json({
        message:
          "If the email exists, we will send you the pin to change your password",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Password reset
router.patch("/reset-password", resetPassValidation, async (req, res) => {
  const { email, pin, newPassword } = req.body;
  try {
    const pinFromDb = await getPinByEmail(email);

    if (pinFromDb && pinFromDb.pin === pin) {
      const hashedPassword = await hashPassword(newPassword);
      const user = await updatePassword(email, hashedPassword);
      if (user && user._id) {
        await deletePasswordResetPin(email);
        await sendMail(email, pin, "reset-successful");
        return res.json({ message: "Password changed successfully" });
      }
    }
    return res.status(500).json({ message: "Invalid or Expired Pin" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
});

// User logout
router.delete("/logout", userAuthorization, async (req, res) => {
  const { authorization } = req.headers;
  const userId = req.userId;
  try {
    await deleteJWT(authorization);
    await storeUserRefreshJWT(userId, "");
    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/authorize", userAuthorization, async (req, res) => {
  res.status(200).json({ message: "Authorized" });
});

export default router;
