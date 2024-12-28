import { Router } from "express";

import {
  login,
  logout,
  register,
  verifyEmail,
} from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", isLoggedIn, logout);
router.post("/verify-email", verifyEmail);

export default router;
