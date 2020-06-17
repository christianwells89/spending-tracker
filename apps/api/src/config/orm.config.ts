import { Container } from 'typedi';
import { createConnection, useContainer } from 'typeorm';

import { entities } from 'domain/entities';

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
    synchronize: true, // TODO: turn this off when things are stable and use migrations
  });
}
