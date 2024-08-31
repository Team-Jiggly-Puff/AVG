"use strict";
const { Pool } = require('pg');
const URI = process.env.SQL_URI;
const pool = new Pool({
    connectionString: URI,
});
