import DB from './db';
import app from './app';
import { createServer } from 'http';
import config from './config/config.env';


const { port, env } = config;
const server = createServer(app);


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

async function onClose() {
    if (DB.conn)
        await DB.conn.close(false);
}


server.on('error', onError);
server.on('close', onClose);
server.listen(port, async() => {
    console.log(`   App is live on localhost:${port} | env ${env}`);
    const db = await DB.startConnection();
    if (!db) server.close();
});
