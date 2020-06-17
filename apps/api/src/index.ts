import * as express from 'express';
import 'reflect-metadata';

import { initializeGraphQL } from 'config/graphql.config';
import { initializeOrm } from 'config/orm.config';

// There's a bug with ts-node that prevents being able to use top level await. Can't set type to
// module in package.json so can't set module to required esnext in tsconfig.json.
(async (): Promise<void> => {
  // Make sure all dates are in UTC
  process.env.TZ = 'UTC';

  const port = process.env.PORT ?? 3000;

  await initializeOrm();

  const app = express();

  // Only express route right now is a healthcheck, everything else is through GraphQL
  app.get('/healthcheck', () => 'Everything is good!');

  const apolloServer = await initializeGraphQL(app);

  app.listen(port, () => {
    console.log(`Express app listening on port ${port}`);
    console.log(`GraphQL server ready at http://localhost:${port}${apolloServer.graphqlPath}`);
  });
})();
