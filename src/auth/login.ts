import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import  { PrismaClient } from "@prisma/client"; // Adjust based on your Prisma setup

const SECRET_KEY = process.env.JWT_SECRET!; // Store this in .env

const prisma= new PrismaClient()
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Find user in the database
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 401 });

    // Compare passwords
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return NextResponse.json({ error: "Invalid password" }, { status: 401 });

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

    // Send token in a secure HTTP-only cookie
    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("token", token, { httpOnly: true, secure: true, path: "/" });
    
    return response;
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
