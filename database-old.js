var mysql = require('mysql')
var pool = mysql.createPool({
    connectionLimit: 10,
    //host: 'localhost',
    host: '185.165.40.216',
    user: 'rails',
    password: 'ruby0ruby0',
    database: 'uascoshahrdari15',
    port: '4406'
})
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
module.exports = pool