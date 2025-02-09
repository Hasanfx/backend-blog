import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import next from 'next';
import route from './src/routes/route';
dotenv.config();
import cors from 'cors';

const dev = process.env.NODE_ENV !== 'production';
export const JWT_SECRET = process.env.JWT_SECRET!;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();



  const corsOptions = {
    origin:process.env.FRONT_END,
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200 // For legacy browser support
  };

// In your server.ts file  

server.use(cors(corsOptions));
const PORT = process.env.PORT || 5000;

  // Middleware to parse JSON
  server.use(express.json());
  
  // Logger middleware
  server.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });

  // API Routes
  server.use('/api', route);

  // Next.js handling (should be last)
  server.all('*', (req: Request, res: Response) => {
    return handle(req, res);
  });

  // Error handling middleware
  server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  server.listen(PORT, (err?: Error) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
