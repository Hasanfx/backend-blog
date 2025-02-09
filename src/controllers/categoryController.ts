import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const newCategory = await prisma.category.create({
      data: { name },
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: 'Error creating category' });
  }
};


export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
};
