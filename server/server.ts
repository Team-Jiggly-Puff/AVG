import express, { Express, Request, Response, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000

app.use(express.json());

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        //res.send('index.html');
    } catch (err) {
        return next({
            log: 'Error sending index.html to client',
            message: { err: 'Server error loading page'}
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});