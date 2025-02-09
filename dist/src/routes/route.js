"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var postRoutes_1 = require("./postRoutes");
var userRoutes_1 = require("./userRoutes");
var commentRoutes_1 = require("./commentRoutes");
var authRoutes_1 = require("./authRoutes");
var router = express_1.default.Router();
// Use different routes
router.use("/posts", postRoutes_1.default);
router.use("/users", userRoutes_1.default);
router.use("/comments", commentRoutes_1.default);
router.use("/auth", authRoutes_1.default);
exports.default = router;
