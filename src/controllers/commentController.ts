import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const createComment = async (req: Request, res: Response) => {
  const { postId, content } = req.body;
  
  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        postId: parseInt(postId),
      },
    });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Error creating comment' });
  }
};

export const getCommentsForPost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: parseInt(postId) },
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comments' });
  }
};
