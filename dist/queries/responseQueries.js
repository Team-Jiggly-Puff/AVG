"use strict";
const postResponse = `
INSERT INTO responses (user_id, option_id)
VALUES ($1, $2)
RETURNING _id;
`;
