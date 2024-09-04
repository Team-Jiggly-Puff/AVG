import express, { Request, Response, NextFunction } from 'express';
const { createPoll, getSpecificPoll } = require('../controllers/pollController.ts');

const router = express.Router();

router.get('/all', (req: Request, res: Response, next: NextFunction) => {

});

router.get('/:id', getSpecificPoll, (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.locals.polls);
});

router.post('/new', createPoll, (req: Request, res: Response, next: NextFunction) => {

})

router.post('/vote', (req: Request, res: Response, next: NextFunction) => {

});

export default router;