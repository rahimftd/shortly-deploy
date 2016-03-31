var app = require('./server-config.js');

var port = 4568;

app.listen(port);

console.log('Server now listening on port ' + port);

console.log(process.env.NODE_ENV);
console.log(process.env);
