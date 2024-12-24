import { Router } from "express";
import {
  login,
  register,
  getAllUsers,
  getUserById,
  logout,
  me,
} from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/users", isLoggedIn, getAllUsers);
router.get("/users/:id", isLoggedIn, getUserById);
router.post("/logout", isLoggedIn, logout);
router.get("/me", isLoggedIn, me);

export default router;
