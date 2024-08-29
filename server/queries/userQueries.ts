

const getUserByID = `
SELECT * FROM users 
WHERE _id = $1;
`;

const createUser = `
INSERT INTO users (name, email, password, age, region, privilege) 
VALUES ($1, $2, $3, $4, $5, $6) 
RETURNING _id;
`;


module.exports = {
    getUserByID,
    createUser,
}
