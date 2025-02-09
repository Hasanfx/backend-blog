import express from "express";
import { createComment, getCommentsForPost} from "../controllers/commentController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = express.Router();

// GET all blogs
router.get("/:id", getCommentsForPost);

// GET single blog by ID
router.post("/",verifyToken, createComment);


export default router;
