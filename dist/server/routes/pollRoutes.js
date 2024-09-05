"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { createPoll, getSpecificPoll, getAllTopics } = require('../controllers/pollController');
const { getUser } = require('../controllers/userController');
const router = express_1.default.Router();
router.get('/topics', getAllTopics, (req, res, next) => {
    res.status(200).json(res.locals.topics);
});
router.get('/:id', getSpecificPoll, (req, res, next) => {
    res.status(200).json(res.locals.poll);
});
router.post('/new', getUser, createPoll, (req, res, next) => {
});
router.post('/vote', (req, res, next) => {
});
exports.default = router;
