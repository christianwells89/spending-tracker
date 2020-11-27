import { ApolloServerTestClient, createTestClient } from 'apollo-server-testing';

import { initializeGraphQL } from '../config/graphql.config';
import { initializeTestOrm } from '../config/orm.config';
import { initializeServer } from '../config/server.config';

// The beginnings of integration testing infrastructure. See below link for the final steps around
// init'ing the db connection and running initial migrations. Below that is a package to keep each
// test inside a transaction.
// https://github.com/typeorm/typeorm/issues/5308#issuecomment-653275643
// https://github.com/entrostat/typeorm-test-transactions

export async function getTestClient(): Promise<ApolloServerTestClient> {
  await initializeTestOrm();
  const app = initializeServer();
  const apolloServer = await initializeGraphQL(app);

  return createTestClient(apolloServer);
}
