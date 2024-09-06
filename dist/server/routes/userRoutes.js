"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { createUser, getUser } = require('../controllers/userController');
const router = express_1.default.Router();
router.post('/signin', (req, res, next) => {
});
router.post('/signup', createUser, (req, res, next) => {
});
// potentially a sign out route?
router.post('/signout', (req, res, next) => {
});
exports.default = router;
