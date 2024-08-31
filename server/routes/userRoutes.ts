import express, { Request, Response, NextFunction } from 'express';

const { createUser, getUser } = require('../controllers/userController.ts');

const router = express.Router();

router.post('/signin', (req: Request, res: Response, next: NextFunction) => {

});

router.post('/signup', createUser, (req: Request, res: Response, next: NextFunction) => {

});

// potentially a sign out route?

export default router;