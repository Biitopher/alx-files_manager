import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  /**
   * Returns if Redis is alive and if the DB is alive
   **/
  static getStatus(req, res) {
    const status = {
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    };
    return res.status(200).send(status);
  }

  static async getStats(req, res) {
    const stats = {
      usersCount: await dbClient.nbUsers(),
      filesCount: await dbClient.nbFiles(),
    };
    return res.status(200).send(stats);
  }
}

export default AppController;
