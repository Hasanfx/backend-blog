import express from "express";
import { signup,login,logout } from "../controllers/authController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = express.Router();


router.post("/signup", signup);
router.post("/login",login,verifyToken);
router.post("/logout", logout);



export default router;
