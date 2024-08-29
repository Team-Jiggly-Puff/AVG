

const postResponse = `
INSERT INTO repsponses (user_id, option_id)
VALUES ($1, $2)
RETURNING _id;
`;