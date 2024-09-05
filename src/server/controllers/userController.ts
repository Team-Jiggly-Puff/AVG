import { Request, Response, NextFunction } from 'express';
const { postUser, getUserByID } = require('../queries/userQueries');
const db = require('../models/dbClient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (userID: number) => {
  return jwt.sign({ userID }, process.env.JWT_SECRET, { expiresIn: '3h' });
};


const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password, age, region } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.query(postUser, [username, email, hashedPassword, age, region]);
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
  console.log('req.body in getUser:', req.body);
  const { user_id } = req.body;

  try {
    const user = await db.query(getUserByID, [user_id]);
    res.locals.user = user.rows[0];
    console.log('user:', user.rows[0]);
    console.log('res.locals.user:', res.locals.user);
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