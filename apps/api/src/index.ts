import 'reflect-metadata';

import { initializeGraphQL } from './config/graphql.config';
import { initializeOrm } from './config/orm.config';
import { initializeServer } from './config/server.config';

const bootstrap = async (): Promise<void> => {
  // Make sure all dates are in UTC
  process.env.TZ = 'UTC';

  const port = process.env.PORT ?? 3001;

  await initializeOrm();
  const app = initializeServer();
  const apolloServer = await initializeGraphQL(app);

  app.listen(port, () => {
    console.log(`Express app listening on port ${port}`);
    console.log(`GraphQL server ready at http://localhost:${port}${apolloServer.graphqlPath}`);
  });
};

bootstrap();
