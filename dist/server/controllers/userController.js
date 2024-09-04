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
const { postUser, getUserByID } = require('../queries/userQueries');
const db = require('../models/dbClient');
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, age, region } = req.body;
    try {
        const newUser = yield db.query(postUser, [username, email, password, age, region]);
        res.locals.newUser = newUser.rows[0];
        next();
    }
    catch (err) {
        return next({
            log: 'Error creating user',
            message: { err: 'Server error creating user' }
        });
    }
});
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield db.query(getUser, [id]);
        res.locals.user = user.rows[0];
        next();
    }
    catch (err) {
        return next({
            log: 'Error getting user',
            message: { err: 'Server error getting user' }
        });
    }
});
module.exports = {
    createUser,
    getUser,
};
