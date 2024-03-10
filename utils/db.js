import { MongoClient } from 'mongodb';

const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${DB_HOST}/${DB_PORT}`;

class DBClient {
  /** Creates a DBClient instance * */
  constructor() {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
      if (!err) {
        this.client = client.db(DB_DATABASE);
        this.usersCollection = this.client.collection('users');
        this.filesCollection = this.client.collection('files');
      } else {
        console.log(err.message);
        this.client = false;
      }
    });
  }

  isAlive() {
    return Boolean(this.client);
  }

  async nbUsers() {
    const count = this.usersCollection.countDocuments();
    return count;
  }

  async nbFiles() {
    const count = this.filesCollection.countDocuments();
    return count;
  }
}

const dbClient = new DBClient();

export default dbClient;
