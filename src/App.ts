import Server from './Server';
import Controller from './controllers/Controller';
import { MemoryDatabase } from './db/MemoryDatabase';

const PORT = 4000; // Should be from .dotenv
const DB = new MemoryDatabase();
const server: Server = new Server(DB, PORT);

const controllers: Array<Controller> = [
];

server.connectToDatabase();
server.loadControllers(controllers);

export default server.run();
