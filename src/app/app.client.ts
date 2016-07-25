// Polyfill fetch
import 'isomorphic-fetch';

import ApolloClient, {
  createNetworkInterface
} from 'apollo-client';

export const client = new ApolloClient({
  networkInterface: createNetworkInterface('http://localhost:8888/graphql'),
});
