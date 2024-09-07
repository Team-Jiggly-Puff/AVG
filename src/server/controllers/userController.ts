import { Request, Response, NextFunction } from 'express';
const { postUser, getUserByID, getUserByEmail, updateUserByID, getUsernames, getEmails} = require('../queries/userQueries.ts');
const { getResponsesByUser } = require('../queries/responseQueries.ts');
const db = require('../models/dbClient.ts');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import { Answer } from '../../common/types/pollTypes';
import { devNull } from 'os';
import userSlice from 'src/client/slices/userSlice';

interface Username{
  username:string
}
interface Email{
  email:string
}

//helper function
const generateToken = (userID: number) => {
  return jwt.sign({userID} , process.env.JWT_SECRET, { expiresIn: '3h' });
};

const checkUsernameAndEmail = async (username:string,email:string) => { //checks if username and email is unique
  const usernames = await db.query(getUsernames);
  const emails = await db.query(getEmails);
  const filteredUsernames = usernames.rows.filter((user:Username)=>user.username===username);
  const filteredEmails = emails.rows.filter((user:Email)=>user.email===email);
  if(filteredEmails.length>0 || filteredUsernames.length>0){
    return false;
  }else{
    return true;
  }
}

const createUser = async (req: Request, res: Response, next: NextFunction) => { //only works if user inputs a unique username
  const { username, email, password, age, region } = req.body;
  try {
    if(await checkUsernameAndEmail(username,email)){
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await db.query(postUser, [username, email, hashedPassword, age, region]);
      res.locals.newUser = newUser.rows[0]; //returns object that has id inside it{_id:[id]}
      return next();
    }else{
      return next(({
        log:'Username or email already exists',
        message:{err:'Username or email Already exists'}
      }))
    }
  } catch (err) {
    return next({
      log: 'Error creating user',
      message: { err: 'Server error creating user'}
    });
  }
};

    //puts user on res.locals.user
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  console.log('req.body in getUser:', req.body);
  const { user_id } = req.body;

  try {
    const user = await db.query(getUserByID, [user_id]);
    res.locals.user = user.rows[0];
    console.log('res.locals.user:', res.locals.user);
    next();
  } catch (err) {
    return next({
      log: 'Error getting user',
      message: { err: 'Server error getting user'}
    });
  }
};

const signInUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await db.query(getUserByEmail, [email]);
    console.log('user:',user.rows);
    if (!user.rows.length) {
      return next({
        log: 'Error signing in user',
        message: { err: 'User not found' },
      });
    }

    // bypassing password check for OAuth users
    // might not be needed now that we added pw as an empty string
    if (password) {
      const validPassword = await bcrypt.compare(password, user.rows[0].password);
      if (!validPassword) {
        return next({
          log: 'Error signing in user',
          message: { err: 'Invalid password' },
        });
      }
    }
    console.log('got to generateToken');
    console.log(user.rows[0]._id);
    const token = generateToken(user.rows[0]._id);
    console.log('got past generate token');
    res.cookie('loginToken', token, { httpOnly: true });
    res.locals.user = user.rows[0];
    next();
  } catch (err) {
    return next({
      log: 'Error signing in user',
      message: { err: 'Server error signing in user' },
    });
  }
};


const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  !req.cookies.loginToken ? next({
    log: 'User could not be verified',
    message: 'User could not be verified',
    status: 401
  }): null;
  
  const token = req.cookies ? req.cookies.loginToken : null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.query(getUserByID, [decoded.userID]);
    if (!user.rows.length) {
      return next({
        log: 'Error verifying user',
        message: { err: 'User not found'}
      });
    }else {
      res.locals.user = user.rows[0];
    }
    next();
  } catch (err) {
    return next({
      log: 'Error verifying user',
      message: { err: 'Server error verifying user'}
    });
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  console.log('we updatin')
  const { id } = req.params;
  const { username, email, password, age, region } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const parameters = [id, username, email, hashedPassword, Number(age), region];
  console.log('parameters', parameters)
  try {
    await db.query(updateUserByID, parameters);
    return next();
  } catch (err) {
    console.log(err);
    return next({
      log: 'Error updating user',
      message: { err: 'User not found' }
    });
  }
}

      //gets all responses a user has submitted
const getUserResponses = async (req: Request, res: Response, next: NextFunction) => {
  const user_id = res.locals.user._id;

  try {
    //first we get all responses by the user
    const results = await db.query(getResponsesByUser, [user_id]);
    const responses = results.rows;
    if(results.rows.length>0){
      //now we need to format the responses into an array of nested poll objects
      //that contain each question and the user's response to it

      //initialize the first poll object
      let currentPoll: {topic:string, questions:{question:string,option:string}[]} = {
        topic: responses[0].topic,
        questions: [],
      };
      //initialize the array of poll objects
      const pollResponses: typeof currentPoll[] = [];
      
      //iterate through each response, pushing the question and response to the current poll object
      //then pushing the poll to the pollResponses array when the topic changes
      responses.forEach((response: Answer, i: number) => {
        const { topic, question, option } = response;
        const questionObj = {
          question,
          option,
        };
        if (topic !== currentPoll.topic) {
          pollResponses.push(currentPoll);
          currentPoll = {
            topic,
            questions: [],
          };
        }
        currentPoll.questions.push(questionObj);
      });
      pollResponses.push(currentPoll);

      res.locals.pollResponses = pollResponses;
      next();
    }else{
      res.send([]);
    }
  } catch (err) {
    return next({
      log: 'Error getting user responses',
      message: { err: 'Server error getting user responses'}
    });
  }
};




module.exports = {
  createUser,
  getUser,
  getUserResponses,
  signInUser,
  verifyUser,
  updateUser
};