"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../models/dbClient');
const { NextFunction } = require('express');
const { postPoll, postQuestion, postOptions, getPollFull, getTopics } = require('../queries/pollQueries');
const createPoll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    const { newPollObj } = req.body;
    const { topic, questions } = newPollObj;
    // a single client needs to be used over a pool for transactional queries
    const client = db.connect();
    try {
        yield client.query('BEGIN');
        const newPoll = yield client.query(postPoll, [topic, user._id]);
        const newPoll_id = newPoll.rows[0]._id;
        console.log('newPoll_id:', newPoll_id);
        //loop through each question to insert to db based on the poll id
        for (let question of questions) {
            const newQuestion = yield client.query(postQuestion, [question.question, newPoll_id, question.options_type]);
            const newQuestion_id = newQuestion.rows[0]._id;
            console.log('newQuestion_id:', newQuestion_id);
            //loop through each option to insert to db based on the question id
            for (let option of question.options) {
                const newOption = yield client.query(postOptions, [option, newQuestion_id, question.options_type]);
                const newOption_id = newOption.rows[0]._id;
                console.log('newOption_id:', newOption_id);
            }
            ;
        }
        yield client.query('COMMIT');
    }
    catch (err) {
        return next({
            log: 'Error creating poll',
            message: { err: 'Server error creating poll' }
        });
    }
    finally {
        client.release();
        next();
    }
});
const getSpecificPoll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { pollID } = req.body;
    try {
        console.log('pollID:', pollID);
        const poll = yield db.query(getPollFull, [pollID]);
        console.log('poll:', poll.rows);
        res.locals.poll = poll.rows;
        next();
    }
    catch (err) {
        console.log('err:', err);
        return next({
            log: 'Error getting poll',
            message: { err: 'Server error getting poll' }
        });
    }
});
const getAllTopics = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const polls = yield db.query(getTopics);
        res.locals.topics = polls.rows;
        next();
    }
    catch (err) {
        return next({
            log: 'Error getting polls',
            message: { err: 'Server error getting polls' }
        });
    }
});
module.exports = {
    createPoll,
    getSpecificPoll,
    getAllTopics
};
