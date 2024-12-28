import { Router } from "express";
import { getAllUsers, getUserById, me } from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/users", isLoggedIn, getAllUsers);
router.get("/users/:id", isLoggedIn, getUserById);
router.get("/users/me", isLoggedIn, me);

export default router;
