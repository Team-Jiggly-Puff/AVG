import express, { Express, Request, Response, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000

app.use(express.json());

app.use(express.static(path.join(__dirname, '..','..','client')));
app.use(express.static(path.join(__dirname,'..','..','build')));
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('I AM GETTING HT');
        res.send(path.join(__dirname,'..','build','index.html'));
    } catch (err) {
        return next({
            log: 'Error sending index.html to client',
            message: { err: 'Server error loading page'}
        });
    }
});

app.get('*',(req: Request, res: Response) => {
    console.log('I AM GETTING HIT');
    console.log(path.join(__dirname,'..','..','build','index.html'));
    res.sendFile(path.join(__dirname,'..','..','build','index.html'));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack); 
    res.status(err.status || 500).json({
      error: {
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
      },
    });
  });

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});