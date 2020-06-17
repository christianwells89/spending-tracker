import { ApolloServer } from 'apollo-server-express';
import { Application as ExpressApp } from 'express';
import { buildSchema, registerEnumType } from 'type-graphql';
import { Container as container } from 'typedi';

import { AccountType, Currency } from '@st/types';
import { resolvers } from 'domain/resolvers';

export async function initializeGraphQL(app: ExpressApp): Promise<ApolloServer> {
  registerEnumType(AccountType, { name: 'AccountType', description: 'Types of accounts' });
  registerEnumType(Currency, { name: 'Currency', description: 'Currencies supported' });

  const schema = await buildSchema({ resolvers, container });
  const apolloServer = new ApolloServer({ schema });
  apolloServer.applyMiddleware({ app });

  return apolloServer;
}
