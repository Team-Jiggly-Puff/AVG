

const postResponse = `
INSERT INTO repsponses (user_id, option_id)
VALUES ($1, $2)
RETURNING _id;
`;

//Right now this is not being sorted by anything. might need to have it sorted by topic or something
const getResponsesByUser = `
SELECT users.username, polls.topic, questions.question, options.option, option_id
FROM responses
JOIN users ON users._id = responses.user_id
JOIN options ON options._id = responses.option_id
JOIN questions ON questions._id = options.question_id
JOIN polls ON polls._id = questions.poll_id
WHERE users.username = $1;
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

module.exports = {
    postResponse,
    getResponsesByUser,
    changeResponse,
    deleteResponseBy_id,
}