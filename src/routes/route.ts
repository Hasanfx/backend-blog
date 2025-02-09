import express from "express";
import postRoutes from "./postRoutes";
import userRoutes from "./userRoutes";
import commentRoutes from "./commentRoutes";
import authRoute from "./authRoutes";
import {verifyToken} from "../middlewares/authMiddleware"

const router = express.Router();

// Use different routes
router.use("/posts", postRoutes);
router.use("/users", userRoutes);
router.use("/comments", commentRoutes);
router.use("/auth", authRoute);

export default router;
