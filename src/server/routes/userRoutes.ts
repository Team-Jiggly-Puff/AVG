import express, { Request, Response, NextFunction } from 'express';

const { createUser, getUser, getUserResponses, signInUser, verifyUser, signOutUser } = require('../controllers/userController.ts');

const router = express.Router();

router.post('/signin', signInUser, (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(res.locals.user);
});

router.post('/signup', createUser, signInUser, (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(res.locals.newUser);
});

// potentially a sign out route?
router.get('/signout', signOutUser, (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json('User signed out');
});

router.get('/verify', verifyUser, (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(res.locals.user);
});

router.get('/responses', verifyUser, getUserResponses, (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(res.locals.pollResponses);
});

export default router;