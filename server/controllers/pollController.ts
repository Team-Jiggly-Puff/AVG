const db = require('../models/dbClient.ts');
const { NextFunction } = require('express');
import { Request, Response, NextFunction } from 'express';

const createPoll = async (req: Request, res: Response, next: NextFunction) => {
  const { newPollObj } = req.body;
 
};