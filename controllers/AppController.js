import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static async getStatus(req, res) {
    const redisAlive = redisClient.isAlive();
    const dbAlive = dbClient.isAlive();
    const status = {
      redis: redisAlive,
      db: dbAlive
    };
    res.status(200).json(status);
  }

  static async getStats(req, res) {
    const nbUsers = await dbClient.nbUsers();
    const nbFiles = await dbClient.nbFiles();
    const stats = {
      users: nbUsers,
      files: nbFiles
    };
    res.status(200).json(stats);
  }
}

export default AppController;
