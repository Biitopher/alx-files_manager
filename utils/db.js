import { MongoClient } from 'mongodb';

class DBClient {
  /** Creates a DBClient instance **/
  constructor() {
    const {
      DB_HOST = 'localhost',
      DB_PORT = 27017,
      DB_DATABASE = 'files_manager',
    } = process.env;

    this.client = new MongoClient(`mongodb://${DB_HOST}:${DB_PORT}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.isDBConnected = false;

    this.client.connect((err) => {
      if (err) {
        console.error('MongoDB connection error:', err.message || err.toString());
        this.isDBConnected = false;
      } else {
        this.isDBConnected = true;
      }
    });
  }

  isAlive() {
    return this.isDBConnected;
  }

  async nbUsers() {
    if (!this.isDBConnected) {
      throw new Error('Database connection not established');
    }

    const usersCollection = this.client.db().collection('users');
    const count = await usersCollection.countDocuments();
    return count;
  }

  async nbFiles() {
    if (!this.isDBConnected) {
      throw new Error('Database connection not established');
    }

    const filesCollection = this.client.db().collection('files');
    const count = await filesCollection.countDocuments();
    return count;
  }
}

const dbClient = new DBClient();

export default dbClient;
