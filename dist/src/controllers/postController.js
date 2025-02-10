"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.getPostById = exports.getAllPosts = exports.createPost = void 0;
const client_1 = require("@prisma/client");
const jwt = __importStar(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Get the token from the Authorization header
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Extract token from "Bearer <token>"
        if (!token) {
            return;
            res.status(401).json({ error: "No token provided" });
        }
        // Decode the JWT token and get userId
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify and decode the token
        const userId = decoded.userId;
        // Create a new post and associate it with the user
        const newPost = yield prisma.post.create({
            data: Object.assign(Object.assign({}, req.body), { author: {
                    connect: { id: userId }
                } })
        });
        res.status(201).json({
            message: "Post created successfully",
            post: newPost
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Server error while creating blog"
        });
    }
});
exports.createPost = createPost;
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield prisma.post.findMany();
        res.status(200).json(posts);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error while fetching posts" });
    }
});
exports.getAllPosts = getAllPosts;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10); // Convert ID to number
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid post ID" });
        return;
    }
    try {
        const post = yield prisma.post.findUnique({
            where: { id }
        });
        if (!post) {
            res.status(404).json({ error: "Post not found" });
            return;
        }
        res.status(200).json(post);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error while fetching post" });
    }
});
exports.getPostById = getPostById;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = parseInt(req.params.id);
    const userId = req.userId;
    if (isNaN(postId)) {
        res.status(400).json({ error: "Invalid post ID" });
        return;
    }
    try {
        const post = yield prisma.post.findUnique({
            where: { id: postId },
        });
        if (!post) {
            res.status(404).json({ error: "Post not found" });
            return;
        }
        // Convert userId to number if needed
        if (post.authorId !== parseInt(userId)) {
            res.status(403).json({ error: "Forbidden" });
            return;
        }
        yield prisma.post.delete({
            where: { id: postId },
        });
        res.status(200).json({ message: "Post deleted successfully" });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Server error" });
    }
});
exports.deletePost = deletePost;
