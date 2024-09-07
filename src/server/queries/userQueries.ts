const getUserByID = `
SELECT * FROM users 
WHERE _id = $1;
`;

const postUser = `
INSERT INTO users (username, email, password, age, region) 
VALUES ($1, $2, $3, $4, $5) 
RETURNING _id;
`;

const getUserByEmail = `
SELECT * FROM users
WHERE email = $1;
`;

const updateUserByID = `
UPDATE users
SET username = $2, email = $3, password = $4, age = $5, region = $6
WHERE _id = $1;
`

const getUsernames = `
SELECT username FROM users
`

const getEmails = `
SELECT email FROM users
`

module.exports = {
    getUserByID,
    postUser,
    getUserByEmail,
    updateUserByID,
    getUsernames,
    getEmails
}
