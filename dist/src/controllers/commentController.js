"use strict";
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
exports.getCommentsForPost = exports.createComment = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, content } = req.body;
    try {
        const newComment = yield prisma.comment.create({
            data: {
                content,
                postId: parseInt(postId),
            },
        });
        res.status(201).json(newComment);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating comment' });
    }
});
exports.createComment = createComment;
const getCommentsForPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    try {
        const comments = yield prisma.comment.findMany({
            where: { postId: parseInt(postId) },
        });
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching comments' });
    }
});
exports.getCommentsForPost = getCommentsForPost;
