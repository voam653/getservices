import http from 'http';
import app from './config/express';

http.createServer(app).listen(8080, () => {
    console.log('Server listening at the port: ' + this.address().port);
});

