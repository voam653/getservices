const http = require('http');
const app = require('./config/express');

http.createServer(app).listen(8080, () => {
    console.log('Server listening at the port: 8080');
});

