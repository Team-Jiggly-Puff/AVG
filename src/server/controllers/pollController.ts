const db = require('../models/dbClient');
const { NextFunction } = require('express');
import { Request, Response, NextFunction } from 'express';
const { postPoll, postQuestion, postOptions, getPollFull, getTopics } = require('../queries/pollQueries.ts');
import { Poll, Question, Option } from '../../common/types/types';


const createPoll = async (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  console.log('user:', user);
  const { newPollObj } = req.body;
  const { topic, questions } = newPollObj;

  // a single client needs to be used over a pool for transactional queries
  
  const client = await db.connect();
  try{
    
    await client.query('BEGIN').then(() => console.log('Transaction started'));
    
    const newPoll = await client.query(postPoll, [topic, user._id]);
    const newPoll_id = newPoll.rows[0]._id;
    console.log('newPoll_id:', newPoll_id);

    // loop through each question to insert to db based on the poll id
    for (let question of questions){
      const newQuestion = await client.query(postQuestion, [question.question, newPoll_id, question.options_type]);
      const newQuestion_id = newQuestion.rows[0]._id;
      console.log('newQuestion_id:', newQuestion_id);

      //loop through each option to insert to db based on the question id
      for (let option of question.options){
        const newOption = await client.query(postOptions, [option, newQuestion_id, question.options_type]);
        const newOption_id = newOption.rows[0]._id;
        console.log('newOption_id:', newOption_id);
      };
    }
    await client.query('COMMIT');


  } catch(err){
    return next({
      log: 'Error creating poll',
      message: { err: 'Server error creating poll'}
    });
  } finally {
    client.release();
    next();
  }

};

const getSpecificPoll = async (req: Request, res: Response, next: NextFunction) => {
  const { id } =  req.params;
  console.log('req.params:', req.params);

  try{
    
    const poll = await db.query(getPollFull, [id]);
    // console.log('poll:', poll.rows);
    const options = poll.rows; 

      // now we need to format the data to be a nested object
    const pollObj: Poll = {
      topic: options[0].topic,
      created_by: options[0].created_by,
      questions: []
    };

    //this will be the questions pushed to the questions array
    let questionObj: Question = {
      question: options[0].question,
      options_type: options[0].options_type,
      options: [],
    };

    //iterating through all options, pushing them to the questionObj,
    //and pushing questionObj to the pollObj when the question changes
    options.forEach((option:Option, index:number) => {
      if (option.question !== questionObj.question || index === options.length - 1){
        pollObj.questions.push(questionObj);
        questionObj = {
          question: option.question,
          options_type: option.options_type,
          options: []
        };
      }
      questionObj.options.push(option.option);
    });
    res.locals.poll = pollObj;
    console.log('pollObj:', res.locals.poll);
    next();
  } catch(err){
    console.log('err:', err); 
    return next({
      log: 'Error getting poll',
      message: { err: 'Server error getting poll'}
    });
  }
};

const getAllTopics = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const polls = await db.query(getTopics);
    res.locals.topics = polls.rows;
    next();
  } catch(err){
    return next({
      log: 'Error getting polls',
      message: { err: 'Server error getting polls'}
    });
  }
}

module.exports = {
  createPoll,
  getSpecificPoll,
  getAllTopics
}