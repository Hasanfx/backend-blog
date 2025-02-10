"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// GET all blogs
router.get("/", postController_1.getAllPosts);
// GET single blog by ID
router.get("/:id", postController_1.getPostById);
// POST new blog
router.post("/", authMiddleware_1.verifyToken, postController_1.createPost);
// DELETE blog by ID
router.delete("/:id", authMiddleware_1.verifyToken, postController_1.deletePost);
// UPDATE blog by ID
exports.default = router;
