import { Request, Response, NextFunction } from 'express';
const { postUser, getUserByID } = require('../queries/userQueries.ts');
const db = require('../models/dbClient.ts');


const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password, age, region } = req.body;

  try {
    const newUser = await db.query(postUser, [username, email, password, age, region]);
    res.locals.newUser = newUser.rows[0];
    next();
  } catch (err) {
    return next({
      log: 'Error creating user',
      message: { err: 'Server error creating user'}
    });
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const user = await db.query(getUser, [id]);
    res.locals.user = user.rows[0];
    next();
  } catch (err) {
    return next({
      log: 'Error getting user',
      message: { err: 'Server error getting user'}
    });
  }
};

module.exports = {
  createUser,
  getUser,
};