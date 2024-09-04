

const getUserByID = `
SELECT * FROM users 
WHERE _id = $1;
`;

const postUser = `
INSERT INTO users (name, email, password, age, region) 
VALUES ($1, $2, $3, $4, $5) 
RETURNING _id;
`;


module.exports = {
    getUserByID,
    postUser,
}
