

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


module.exports = {
    getUserByID,
    postUser,
    getUserByEmail,
}
