const db = require('../models/dbClient');
const { NextFunction } = require('express');
import { Request, Response, NextFunction } from 'express';
const { postPoll, postQuestion, postOptions, getPollFull, getTopics } = require('../queries/pollQueries');

const createPoll = async (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  const { newPollObj } = req.body;
  const { topic, questions } = newPollObj;

  // a single client needs to be used over a pool for transactional queries
  const client = db.connect();

  try{
    await client.query('BEGIN');
    
    const newPoll = await client.query(postPoll, [topic, user._id]);
    const newPoll_id = newPoll.rows[0]._id;
    console.log('newPoll_id:', newPoll_id);

    //loop through each question to insert to db based on the poll id
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
  const { pollID } =  req.body;

  try{
    console.log('pollID:', pollID);
    const poll = await db.query(getPollFull, [pollID]);
    console.log('poll:', poll.rows);
    res.locals.poll = poll.rows;
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