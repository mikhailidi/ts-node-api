import express, { Application, RequestHandler } from 'express';
import http from 'http';
import Controller from './controllers/Controller';
import { IDatabase } from './interfaces/Database';
import { requestValidationHandler } from './middlewares/request-validation-handler';

export default class Server {
  private app: Application;
  private database: IDatabase;
  private readonly port: number;

  constructor(database: IDatabase, port: number) {
    this.app = express();
    this.database = database;
    this.port = port;
  }

  public run(): http.Server {
    return this.app.listen(this.port, () => console.log(`Server is running on http://localhost:${this.port}`));
  }

  public loadControllers(controllers: Array<Controller>): void {
    controllers.forEach(controller => {
        this.app.use(controller.path, controller.setRoutes());
    });
  };

  public loadMiddleware(middlewares: Array<RequestHandler>): void {
    middlewares.forEach(middleware => {
        this.app.use(middleware);
    });
  };

  public loadErrorHandlers(): void {
    this.app.use(requestValidationHandler);
  }

  public connectToDatabase(): void {
    try {
      this.database.connect();
    } catch(err) {
        console.log(err);
    };
  }
}
