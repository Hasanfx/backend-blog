"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = void 0;
var dotenv_1 = require("dotenv");
var express_1 = require("express");
var next_1 = require("next");
var route_1 = require("./src/routes/route");
dotenv_1.default.config();
var cors_1 = require("cors");
var dev = process.env.NODE_ENV !== 'production';
exports.JWT_SECRET = process.env.JWT_SECRET;
var app = (0, next_1.default)({ dev: dev });
var handle = app.getRequestHandler();
app.prepare().then(function () {
    var server = (0, express_1.default)();
    var corsOptions = {
        origin: process.env.FRONT_END,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        optionsSuccessStatus: 200 // For legacy browser support
    };
    // In your server.ts file  
    server.use((0, cors_1.default)(corsOptions));
    var PORT = process.env.PORT || 5000;
    // Middleware to parse JSON
    server.use(express_1.default.json());
    // Logger middleware
    server.use(function (req, res, next) {
        console.log("".concat(req.method, " ").concat(req.path));
        next();
    });
    // API Routes
    server.use('/api', route_1.default);
    // Next.js handling (should be last)
    server.all('*', function (req, res) {
        return handle(req, res);
    });
    // Error handling middleware
    server.use(function (err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });
    server.listen(PORT, function (err) {
        if (err)
            throw err;
        console.log("> Ready on http://localhost:".concat(PORT));
    });
});
