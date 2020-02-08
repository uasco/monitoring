var pool = require('./database')
var result = pool.query('SELECT client_infos.name FROM client_infos', function (err, result, fields) {
    if (err) throw new Error(err)
    // Do something with result.
    console.log(result);
})
