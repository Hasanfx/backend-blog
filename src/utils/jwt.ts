// import jwt, { SignOptions } from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables

// const JWT_SECRET: string = process.env.JWT_SECRET || "default_secret";
// const JWT_EXPIRES_IN: string | number = process.env.JWT_EXPIRES_IN || "1h";

// /**
//  * Generate a JWT token for a user.
//  * @param userId - The user's unique ID.
//  * @returns JWT token as a string.
//  */
// export const generateToken = (userId: string): string => {
//   const options: SignOptions = { expiresIn: JWT_EXPIRES_IN };
//   return jwt.sign({ id: userId }, JWT_SECRET, options);
// };

// /**
//  * Verify and decode a JWT token.
//  * @param token - The JWT token to verify.
//  * @returns The decoded payload or null if invalid.
//  */
// export const verifyToken = (token: string): any => {
//   try {
//     return jwt.verify(token, JWT_SECRET);
//   } catch (error) {
//     return null;
//   }
// };
