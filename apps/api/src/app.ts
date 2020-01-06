import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';

import { entities } from './entities';
import { routes } from './routes';

// Express app:
// - init middleware
// - init routes
// - init db connecton pool
// - listen

// TODO: implement inversify as the IOC container for dependency injection

export class App {
  private dbConnection: Connection;
  private expressApp: express.Application;

  constructor(private port: number = 3000) {}

  private async initializeDbConnection(): Promise<void> {
    this.dbConnection = await createConnection({
      type: 'mysql',
      host: process.env.TYPEORM_HOST || 'localhost',
      port: 3306,
      username: process.env.TYPEORM_USERNAME || 'user',
      password: process.env.TYPEORM_PASSWORD || 'password',
      database: process.env.TYPEORM_DATABASE || 'budget',
      entities,
      synchronize: true, // for now
    });
  }

  private initializeMiddlewares(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(cors());
    this.expressApp.use(helmet());
  }

  private initializeRoutes(): void {
    this.expressApp.use('/', routes);
  }

  async start(): Promise<void> {
    await this.initializeDbConnection();
    this.expressApp = express();
    this.initializeMiddlewares();
    this.initializeRoutes();

    this.expressApp.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
    });
  }
}
