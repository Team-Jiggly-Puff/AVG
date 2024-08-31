const { Pool } = require('pg');

const URI = process.env.SQL_URI;

const pool = new Pool({
  connectionString: URI,
});

module.exports = {
  query: (text: string, params: (string | number)[], callback: Function) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
  connect: () => {
    console.log('client connected');
    return pool.connect();
  }
}