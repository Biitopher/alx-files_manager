import redis from 'redis';

class RedisClient {
    constructor() {
        this.client = redis.createClient({ host: 'localhost', port: localhost});

        this.client.on('error', (err) => {
            console.error('Redis error:', err);
        });
    }

    isAlive() {
        return this.client.connected;
    }

    async get(key) {
        return new Promise((resolve, reject) => {
            if (!this.isAlive()) {
                reject(new Error('Redis client is not connected'));
                return;
            }

            this.client.get(key, (err, reply) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(reply);
            });
        });
    }

    async set(key, value, durationInSeconds) {
        return new Promise((resolve, reject) => {
            if (!this.isAlive()) {
                reject(new Error('Redis client is not connected'));
                return;
            }

            this.client.set(key, value, 'EX', durationInSeconds, (err, reply) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(reply);
            });
        });
    }

    async del(key) {
        return new Promise((resolve, reject) => {
            if (!this.isAlive()) {
                reject(new Error('Redis client is not connected'));
                return;
            }

            this.client.del(key, (err, reply) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(reply);
            });
        });
    }
}

const redisClient = new RedisClient();

export default redisClient;
