import express, { Express, Request, Response, NextFunction } from 'express';
import session from 'express-session';
import passport from '../config/passport';
import cookieParser from 'cookie-parser';
import path from 'path';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import CustomError from '../common/types/pollTypes';
import userRoutes from './routes/userRoutes';
import pollRoutes from './routes/pollRoutes';
import { SESSION_SECRET } from '../utils/secrets';
import '../config/passport';
const { getSpecificPoll, createPoll, getAllTopics } = require('./controllers/pollController.ts');
const { getUser } = require('./controllers/userController.ts');


dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000

app.use(express.json());

app.use(express.static(path.join(__dirname,'..','..','build')));

app.use(cookieParser());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // should be set to true if using HTTPS but rn no
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', userRoutes);
app.use('/api/polls', pollRoutes);
app.use('/auth', authRoutes)

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//     try {
//         console.log('I AM GETTING HIT');
//         res.send(path.join(__dirname,'..','build','index.html'));
//     } catch (err) {
//         return next({
//             log: 'Error sending index.html to client',
//             message: { err: 'Server error loading page'}
//         });
//     }
// });

// app.get('*',(req: Request, res: Response) => {
//     console.log('I AM GETTING HIT');
//     console.log(path.join(__dirname,'..','..','build','index.html'));
//     res.sendFile(path.join(__dirname,'..','..','build','index.html'));
// });

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
