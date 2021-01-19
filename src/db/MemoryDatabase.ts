import { IDatabase } from "../interfaces/Database";

export class MemoryDatabase implements IDatabase {
  connect() {
    console.log('Let\'s pretend database was connected :)');
  }
}
