import express, { Express, Request, Response, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import CustomError from './types';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000

app.use(express.json());

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send('index.html');
    } catch (err) {
        return next({
            log: 'Error sending index.html to client',
            message: { err: 'Server error loading page'}
        });
    }
});

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    res.status(status).json({
        error: {
            message: err.message || 'An unexpected middleware error occurred',
            status,
            log: err.log || 'Express error handler caught unknown middleware error'
        }
    })
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});