import { Container } from 'typedi';
import { Connection, createConnection, useContainer } from 'typeorm';

import { entities } from 'domain/entities';
import { seedDatabase } from '../../db/seed';

export async function initializeOrm(): Promise<void> {
  useContainer(Container);

  await createConnection({
    type: 'mysql',
    host: process.env.TYPEORM_HOST ?? 'localhost',
    port: 3306,
    username: process.env.TYPEORM_USERNAME ?? 'user',
    password: process.env.TYPEORM_PASSWORD ?? 'password',
    database: process.env.TYPEORM_DATABASE ?? 'budget',
    entities,
    dateStrings: true,
    synchronize: true, // TODO: turn this off when things are stable and use migrations
  });

  // TODO: turn this off when when things are stable and this app is actually being used
  await seedDatabase();
}

export function initializeTestOrm(): Promise<Connection> {
  useContainer(Container);

  return createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'user',
    password: 'password',
    database: 'test',
    entities,
    dateStrings: true,
    dropSchema: true, // force drop so it can run cleanly every time
    synchronize: true, // TODO: turn this off when things are stable and use migrations
  });
}
