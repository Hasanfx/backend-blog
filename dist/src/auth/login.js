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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const server_1 = require("next/server");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client"); // Adjust based on your Prisma setup
const SECRET_KEY = process.env.JWT_SECRET; // Store this in .env
const prisma = new client_1.PrismaClient();
function POST(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = yield req.json();
            // Find user in the database
            const user = yield prisma.user.findUnique({ where: { email } });
            if (!user)
                return server_1.NextResponse.json({ error: "User not found" }, { status: 401 });
            // Compare passwords
            const validPassword = yield bcryptjs_1.default.compare(password, user.password);
            if (!validPassword)
                return server_1.NextResponse.json({ error: "Invalid password" }, { status: 401 });
            // Generate JWT token
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
            // Send token in a secure HTTP-only cookie
            const response = server_1.NextResponse.json({ message: "Login successful" });
            response.cookies.set("token", token, { httpOnly: true, secure: true, path: "/" });
            return response;
        }
        catch (error) {
            return server_1.NextResponse.json({ error: "Internal server error" }, { status: 500 });
        }
    });
}
