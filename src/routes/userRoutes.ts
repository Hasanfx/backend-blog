import express from "express";
import {  getAllUsers, getUserbyId} from "../controllers/userController";

const router = express.Router();

// GET all blogs
router.get("/", getAllUsers);
router.get("/:id", getUserbyId);

// GET single blog by ID


export default router;
