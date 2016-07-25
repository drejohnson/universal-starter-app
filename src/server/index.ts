import app from './app';
import _graphQLServer from './api/graphql';

const port = app.get('port');
const graphQLPort = app.get('graphQLPort');
const env = app.get('env');
const server = app.listen(port);
const graphQLServer = _graphQLServer.listen(graphQLPort);

server.on('listening', () =>
  console.log(`Application running in ${env} mode on port: ${port}`)
);

graphQLServer.on('listening', () =>
  console.log(`GraphQL Server running in ${env} mode on port: ${graphQLPort}`)
);
