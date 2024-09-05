

const postPoll = `
INSERT INTO polls (topic, created_by)
VALUES ($1, $2)
RETURNING _id;
`;

const postQuestion = `
INSERT INTO questions (question, poll_id, options_type)
VALUES ($1, $2, $3)
RETURNING _id;
`;

const postOptions = `
INSERT INTO options (option, question_id, data_type)
VALUES ($1, $2, $3)
RETURNING _id;
`;

const getPollFull = `
SELECT  option, _id AS option_id, question_id, data_type, q.question, q.poll_id, p.topic, p.created_by
FROM options
JOIN questions q ON q._id = options.question_id
JOIN polls p ON p._id = q.poll_id
WHERE p._id = $1;
`;

const getTopics = `
SELECT topic, created_by, _id
FROM polls;
`;

const getQuestionsByPoll = `
SELECT question, options_type
FROM questions
WHERE poll_id = $1;
`;

const getOptionsByQuestions = `
SELECT option, data_type
FROM options
WHERE question_id = $1;
`;

module.exports = {
    postPoll,
    postQuestion,
    postOptions,
    getPollFull,
    getTopics,
    getQuestionsByPoll,
    getOptionsByQuestions,
}

