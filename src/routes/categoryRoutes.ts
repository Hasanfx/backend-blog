import express from "express";
import { createCategory,getCategories } from "../controllers/categoryController";

const router = express.Router();

router.get("/", getCategories);

router.post("/", createCategory);



export default router;
