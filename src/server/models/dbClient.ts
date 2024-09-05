const { Pool } = require('pg');
require('dotenv').config();
const URI = process.env.SQL_URI;
console.log('URI:', URI);

const pool = new Pool({
  connectionString: URI,
});

// module.exports = {
//   query: (text: string, params: (string | number)[], callback: Function) => {
//     console.log('executed query', text);
//     console.log('params:', params);
//     return pool.query(text, params, callback);
//   },
//   connect: () => {
//     console.log('client connected');
//     return pool.connect();
//   }
// }

export const query = (text: string, params: (string | number)[] = []) => {
  console.log('executed query', text);
  console.log('params:', params);
  return pool.query(text, params);
};

export const connect = () => {
  console.log('client connected');
  return pool.connect();
};