import express, { Request, Response, NextFunction } from 'express';
const { createPoll, getSpecificPoll, getAllTopics, respondToPoll } = require('../controllers/pollController.ts');
const { getUser } = require('../controllers/userController.ts');
const router = express.Router();

router.get('/topics', getAllTopics, (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.locals.topics);
});

router.get('/:id', getSpecificPoll, (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.locals.poll);
});

router.post('/new', getUser, createPoll, (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.locals.newPoll);
});

router.post('/vote', getUser, respondToPoll, (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json('Poll response recorded');
});


export default router;