import * as http from 'http';
import {app} from './app';

const port = Number(process.env.PORT) || 8080;

app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.setTimeout(3600000); // 1 hour in milliseconds
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: {syscall: string; code: string}) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  if (error.code === 'EACCES') {
    console.error(bind + ' requires elevated privileges');
  } else if (error.code === 'EADDRINUSE') {
    console.error(bind + ' is already in use');
  }
  throw error;
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  console.info('Listening on port ' + port);
}
