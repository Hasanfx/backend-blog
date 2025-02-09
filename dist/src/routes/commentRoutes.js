"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var commentController_1 = require("../controllers/commentController");
var authMiddleware_1 = require("../middlewares/authMiddleware");
var router = express_1.default.Router();
// GET all blogs
router.get("/:id", commentController_1.getCommentsForPost);
// GET single blog by ID
router.post("/", authMiddleware_1.verifyToken, commentController_1.createComment);
exports.default = router;
