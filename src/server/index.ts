import app from './app';

const port = app.get('port');
const env = app.get('env');
const server = app.listen(port);

server.on('listening', () =>
  console.log(`Application running in ${env} mode on port: ${port}`)
);
