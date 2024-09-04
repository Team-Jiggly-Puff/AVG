"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const { getSpecificPoll, createPoll, getAllTopics } = require('./controllers/pollController');
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '..', '..', 'client')));
app.use(express_1.default.static(path_1.default.join(__dirname, '..', '..', 'build')));
app.get('/', (req, res, next) => {
    try {
        console.log('I AM GETTING HT');
        res.send(path_1.default.join(__dirname, '..', 'build', 'index.html'));
    }
    catch (err) {
        return next({
            log: 'Error sending index.html to client',
            message: { err: 'Server error loading page' }
        });
    }
});
app.get('*', (req, res) => {
    console.log('I AM GETTING HIT');
    console.log(path_1.default.join(__dirname, '..', '..', 'build', 'index.html'));
    res.sendFile(path_1.default.join(__dirname, '..', '..', 'build', 'index.html'));
});
// This is just for testing purposes
app.get('/api/pollTest', getSpecificPoll, (req, res, next) => {
    res.status(200).json(res.locals.poll);
});
app.get('/api/topicsTest', getAllTopics, (req, res, next) => {
    res.status(200).json(res.locals.topics);
});
//_______________________________________________________
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
        error: {
            message: err.message || 'An unexpected middleware error occurred',
            status,
            log: err.log || 'Express error handler caught unknown middleware error'
        }
    });
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
