const util = require('util')
const mysql = require('mysql')
const mysql_database = process.env.MYSQL_DATABASE1;
const mysql_database_name = process.env.MYSQL_DATABASE_NAME1;
const mysql_database_user = process.env.MYSQL_DATABASE_USER1;
const mysql_database_password = process.env.MYSQL_DATABASE_PASSWORD1;
const mysql_database_port = process.env.MYSQL_DATABASE_PORT1;
const pool = mysql.createPool({
  multipleStatements: true,
  connectionLimit: 10,
  host: mysql_database,
  user: mysql_database_user,
  password: mysql_database_password,
  database: mysql_database_name,
  port: mysql_database_port,
  timezone: 'Asia/Tehran'
})

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.')
    }
  }

  if (connection) connection.release()

  return
})

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query)

module.exports = pool