var forever = require('forever-monitor');

var child = new(forever.Monitor)('server2.js', {
    max: 100,
    // silent: true,
    options: []
});

child.on('exit', function() {
    console.log('app.js has exited after 100 restarts');
});

child.start();