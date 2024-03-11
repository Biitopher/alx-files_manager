import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  /**
   * Returns if Redis is alive and if the DB is alive
   **/
  static getStatus(request, response) {
    const status = {
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    };
    response.status(200).send(status);
  }

  static async getStats(request, response) {
    const stats = {
      usersCount: await dbClient.nbUsers(),
      filesCount: await dbClient.nbFiles(),
    };
    response. status(200).send(stats);
  }
}

export default AppController;
