

const postResponse = `
INSERT INTO responses (user_id, option_id)
VALUES ($1, $2)
RETURNING _id;
`;

//Right now this is not being sorted by anything. might need to have it sorted by topic or something
const getResponsesByUser = `
SELECT users._id, users.username, polls.topic AS topic, questions.question AS question, options.option AS option, option_id
FROM responses
JOIN users ON users._id = responses.user_id
JOIN options ON options._id = responses.option_id
JOIN questions ON questions._id = options.question_id
JOIN polls ON polls._id = questions.poll_id
WHERE users._id = $1
ORDER BY polls._id, questions._id, options._id
`;

const changeResponse = `
UPDATE responses
SET option_id = $1
WHERE _id = $2
`;

const deleteResponseBy_id = `
DELETE FROM responses
WHERE _id = $1
`;

const getResponsesByPoll = `
SELECT o._id o.option, q.question p.topic 
FROM responses r
JOIN options o ON r.option_id = o._id
JOIN questions q ON o.question_id = q._id
JOIN polls p ON q.poll_id = p._id
WHERE p._id = $1
ORDER BY P._id, q._id, o._id
`;

const getResponsesByQuestion = `
SELECT o._id, o.option, q.question, p.topic, COUNT(r.option_id) AS response_count
FROM responses r
JOIN options o ON r.option_id = o._id
JOIN questions q ON o.question_id = q._id
JOIN polls p ON q.poll_id = p._id
WHERE q._id = $1
GROUP BY o._id, q._id, p._id
ORDER BY q._id, o._id`;


module.exports = {
    postResponse,
    getResponsesByUser,
    changeResponse,
    deleteResponseBy_id,
    getResponsesByPoll,
    getResponsesByQuestion
}