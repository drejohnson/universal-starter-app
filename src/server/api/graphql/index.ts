import * as express from 'express';
import * as cors from 'cors';
import { apolloServer } from 'apollo-server';
import Schema from './schema';
import Mocks from './mocks';

const graphQLServer = express();

graphQLServer.options('*', cors())
  .use(cors());

graphQLServer.use('/graphql', apolloServer({
  graphiql: true,
  pretty: true,
  schema: Schema,
  mocks: Mocks,
}));

export default graphQLServer;

