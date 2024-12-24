import { Router } from "express";
import {
  login,
  register,
  getAllUsers,
  getUserById,
  logout,
} from "../controllers/userController.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/logout", logout);

export default router;
