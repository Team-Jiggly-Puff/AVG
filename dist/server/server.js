"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const pollRoutes_1 = __importDefault(require("./routes/pollRoutes"));
const { getSpecificPoll, createPoll, getAllTopics } = require('./controllers/pollController');
const { getUser } = require('./controllers/userController');
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '..', '..', 'build')));
app.use('/api/users', userRoutes_1.default);
app.use('/api/polls', pollRoutes_1.default);
app.get('/', (req, res, next) => {
    try {
        res.sendFile(path_1.default.join(__dirname, '..', '..', 'build', 'index.html'));
    }
    catch (err) {
        return next({
            log: 'Error sending index.html to client',
            message: { err: 'Server error loading page' }
        });
    }
});
app.get('/bundle.js', (req, res) => { res.sendFile(path_1.default.join(__dirname, '..', '..', 'build', 'bundle.js')); });
// This is just for testing purposes
app.get('/api/pollTest/:id', getSpecificPoll, (req, res, next) => {
    res.status(200).json(res.locals.poll);
});
app.get('/api/topicsTest', getAllTopics, (req, res, next) => {
    res.status(200).json(res.locals.topics);
});
app.post('/api/postPollTest', getUser, createPoll, (req, res, next) => {
    res.status(200).json(res.locals.newPoll);
});
//_______________________________________________________
app.get('*', (req, res) => {
    const url = req.url;
    // Check if the request is for a static file (e.g., .js, .css)
    if (url.endsWith('.js') || url.endsWith('.css') || url.endsWith('.png') || url.endsWith('.jpg')) {
        res.sendFile(path_1.default.join(__dirname, '..', '..', 'build', url));
    }
    else {
        // Otherwise, serve index.html for React Router to handle
        res.sendFile(path_1.default.join(__dirname, '..', '..', 'build', 'index.html'));
    }
});
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
