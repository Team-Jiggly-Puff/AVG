import express, { Express, Request, Response, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000

app.use(express.json());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send("Express + TypeScript Server");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});