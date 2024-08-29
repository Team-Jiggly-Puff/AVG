

const getUserByID = `
SELECT * FROM users 
WHERE _id = $1;
`;

const createUser = `
INSERT INTO users (name, email, password, age, region, privilege) 
VALUES ($1, $2, $3, $4, $5, $6) 
RETURNING _id;
`;

// Right now this is not being sorted by anything. might need to have it sorted by topic or something
const getUserResponses = `
SELECT users.username, polls.topic, questions.question, options.option, option_id
FROM responses
JOIN users ON users._id = responses.user_id
JOIN options ON options._id = responses.option_id
JOIN questions ON questions._id = options.question_id
JOIN polls ON polls._id = questions.poll_id
WHERE users.username = $1;
`;

module.exports = {
    getUserByID,
    createUser,
    getUserResponses,
}
