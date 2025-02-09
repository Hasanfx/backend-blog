import express from "express";
import { createPost, getAllPosts, getPostById, deletePost } from "../controllers/postController";
import { verify } from "crypto";
import { verifyToken } from "../middlewares/authMiddleware";

const router = express.Router();

// GET all blogs
router.get("/", getAllPosts);

// GET single blog by ID
router.get("/:id", getPostById);

// POST new blog
router.post("/",verifyToken, createPost);

// DELETE blog by ID
router.delete("/:id",verifyToken, deletePost);

// UPDATE blog by ID

export default router;
