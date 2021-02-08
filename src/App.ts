import { RequestHandler } from 'express';
import { json } from 'body-parser';
import Server from './Server';
import Controller from './controllers/Controller';
import { MemoryDatabase } from './db/MemoryDatabase';
import TenantPaymentController from './controllers/TenantPaymentController';
import TenantPaymentService from './services/TenantPaymentService';
import TenantPaymentRepository from './repositories/TenantPaymentRepository';

const controllers: Array<Controller> = [
  new TenantPaymentController(
    new TenantPaymentService(new TenantPaymentRepository()) // Should be done via dependency injection
  )
];

const globalMiddleware: Array<RequestHandler> = [
  json(),
];

const PORT = Number(process.env.PORT) || 4000;
const DB = new MemoryDatabase();
const server: Server = new Server(DB, PORT);

server.connectToDatabase();
server.loadMiddleware(globalMiddleware);
server.loadControllers(controllers);
server.loadErrorHandlers();

export default server.run();
