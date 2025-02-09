import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import { JWT_SECRET } from '../../server';
import * as jwt from "jsonwebtoken"
import * as jwt_decode from 'jwt-decode';


const prisma = new PrismaClient();

 export const getUserbyId = async (req: Request, res: Response): Promise<void> => {
     const id = parseInt(req.params.id, 10); // Convert ID to number
 
     if (isNaN(id)) {
         res.status(400).json({ error: "Invalid user ID" });
         return;
     }
 
     try {
         const user = await prisma.user.findUnique({
             where: { id }
         });
 
         if (!user) {
             res.status(404).json({ error: "User not found" });
             return;
         }
 
         res.status(200).json(user);
     } catch (error) {
         console.error(error);
         res.status(500).json({ error: "Server error while fetching user" });
     }
 };
 
  


export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

