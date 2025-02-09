"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController_1 = require("../controllers/userController");
var router = express_1.default.Router();
// GET all blogs
router.get("/", userController_1.getAllUsers);
router.get("/:id", userController_1.getUserbyId);
// GET single blog by ID
exports.default = router;
