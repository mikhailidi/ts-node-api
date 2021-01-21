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

const PORT = 4000; // Should be from .dotenv
const DB = new MemoryDatabase();
const server: Server = new Server(DB, PORT);

server.connectToDatabase();
server.loadControllers(controllers);

export default server.run();
