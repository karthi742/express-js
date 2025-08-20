const mysql = require('mysql2/promise');

const pool = mysql.createPool({
 host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  port: process.env.MYSQLPORT,
  database: process.env.MYSQLDATABASE,
})

module.exports = pool