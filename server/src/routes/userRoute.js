import { Router } from "express";
import { getAllUsers, getUserById, me } from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", isLoggedIn, getAllUsers);
router.get("/:id", isLoggedIn, getUserById);
router.get("/me", isLoggedIn, me);

export default router;
