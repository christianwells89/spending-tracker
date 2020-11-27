import * as cors from 'cors';
import * as express from 'express';

export function initializeServer(): express.Application {
  const app = express();

  // TODO: use nginx to serve the web client from the same origin
  app.use(cors());

  // TODO: add other middleware like JWTAuth etc.

  // Only express route right now is a healthcheck, everything else is through GraphQL
  app.get('/healthcheck', () => 'Everything is good!');

  return app;
}
