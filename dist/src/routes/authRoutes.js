"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authController_1 = require("../controllers/authController");
var authMiddleware_1 = require("../middlewares/authMiddleware");
var router = express_1.default.Router();
router.post("/signup", authController_1.signup);
router.post("/login", authController_1.login, authMiddleware_1.verifyToken);
router.post("/logout", authController_1.logout);
exports.default = router;
