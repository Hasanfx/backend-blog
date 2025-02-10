"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const next_1 = __importDefault(require("next"));
const route_1 = __importDefault(require("./src/routes/route"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const dev = process.env.NODE_ENV !== 'production';
exports.JWT_SECRET = process.env.JWT_SECRET;
const app = (0, next_1.default)({ dev });
const handle = app.getRequestHandler();
app.prepare().then(() => {
    const server = (0, express_1.default)();
    const corsOptions = {
        origin: process.env.FRONT_END,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        optionsSuccessStatus: 200 // For legacy browser support
    };
    // In your server.ts file  
    server.use((0, cors_1.default)(corsOptions));
    const PORT = process.env.PORT || 5000;
    // Middleware to parse JSON
    server.use(express_1.default.json());
    // Logger middleware
    server.use((req, res, next) => {
        console.log(`${req.method} ${req.path}`);
        next();
    });
    // API Routes
    server.use('/api', route_1.default);
    // Next.js handling (should be last)
    server.all('*', (req, res) => {
        return handle(req, res);
    });
    // Error handling middleware
    server.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });
    server.listen(PORT, (err) => {
        if (err)
            throw err;
        console.log(`> Ready on http://localhost:${PORT}`);
    });
});
