import express, { Request, Response, NextFunction } from 'express';

const { createUser, getUser, getUserResponses, signInUser, verifyUser } = require('../controllers/userController.ts');

const router = express.Router();

router.post('/signin', signInUser, (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(res.locals.user);
});

router.post('/signup', createUser, (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(res.locals.newUser);
});

// potentially a sign out route?
router.post('/signout', (req: Request, res: Response, next: NextFunction) => {
    
});

router.get('/verify', verifyUser, (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json('User verified');
});

router.get('/responses', getUser, getUserResponses, (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(res.locals.pollResponses);
});

export default router;