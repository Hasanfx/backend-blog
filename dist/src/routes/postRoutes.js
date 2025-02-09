"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var postController_1 = require("../controllers/postController");
var authMiddleware_1 = require("../middlewares/authMiddleware");
var router = express_1.default.Router();
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
