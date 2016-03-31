var app = require('./server-config.js');
// Connect to db
require('./app/config');


var port = 4568;

app.listen(port);

console.log('Server now listening on port ' + port);
