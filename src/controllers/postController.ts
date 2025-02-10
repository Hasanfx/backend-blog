import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../types/customRequest"; // Correct import path
import { jwtDecode } from "jwt-decode";
import * as jwt from "jsonwebtoken"



const prisma = new PrismaClient();

export const createPost = async (req: Request, res: Response): Promise<void> => {
    try {
        // Get the token from the Authorization header
        const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"
        
        if (!token) {
            return
             res.status(401).json({ error: "No token provided" });
        }

        // Decode the JWT token and get userId
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string); // Verify and decode the token
        const userId = decoded.userId;

        // Create a new post and associate it with the user
        const newPost = await prisma.post.create({
            data: {
                ...req.body,
                author: {
                    connect: { id: userId }
                }
            }
        });

        res.status(201).json({
            message: "Post created successfully",
            post: newPost
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Server error while creating blog"
        });
    }
};


export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const posts = await prisma.post.findMany();
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error while fetching posts" });
    }
};
export const getPostById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10); // Convert ID to number

    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid post ID" });
        return;
    }

    try {
        const post = await prisma.post.findUnique({
            where: { id }
        });

        if (!post) {
            res.status(404).json({ error: "Post not found" });
            return;
        }

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error while fetching post" });
    }
};

export const deletePost = async (req: AuthRequest, res: Response) => {
    const postId = parseInt(req.params.id);
    const userId = req.userId; 

    if (isNaN(postId)) {
        res.status(400).json({ error: "Invalid post ID" });
        return;
    }

    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            res.status(404).json({ error: "Post not found" });
            return;
        }

        // Convert userId to number if needed
        if (post.authorId !== parseInt(userId!)) {
            res.status(403).json({ error: "Forbidden" });
            return; 
        }
        

        await prisma.post.delete({
            where: { id: postId },
        });

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error:any) {
        console.log(error.message)
        res.status(500).json({ error: "Server error" });
    }
};


