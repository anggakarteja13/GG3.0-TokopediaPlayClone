import DB from './db';
import app from './app';
import { createServer } from 'http';
import config from './config/config.env';

const port = config.port;
app.set('port', port);
app.set('env', config.env);

const server = createServer(app);
server.on('error', onError);

server.listen(port, () => {
    console.log(`   App is live on localhost:${port} | env ${config.env}`);
});
DB.startConnection().then((result) => {
    if (!result)
        process.exit(1);
})

function onError(error: any) {
    if (error.syscall !== 'listen')
        throw error;

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
        default:
            throw error;
    }
}
