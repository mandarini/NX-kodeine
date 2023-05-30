import { Logger } from '@nestjs/common';
import Redis, { Redis as IRedis } from 'ioredis';

export class SingletonRedisClient {
  private static _instance: SingletonRedisClient = new SingletonRedisClient();

  private _client: IRedis;
  private context = '';
  private config: Redis.RedisOptions = {};
  private logger: Logger;

  // private constructor() {}

  public static getInstance(context?: string, config?: Redis.RedisOptions) {
    this._instance.context = context;
    this._instance.config = config;
    this._instance.logger = new Logger(
      this._instance.context || this.constructor.name
    );
    return this._instance;
  }

  public setContext(context: string) {
    this.logger = new Logger(context);
    this.context = context;
    return this;
  }

  public setConfig(config: Redis.RedisOptions) {
    this.config = config;
    return this;
  }

  public getClient() {
    if (!this._client) {
      // console.log(`NEW CLIENT: ${Math.random()}`);
      this._client = new Redis({ ...this.config });
      this.handleReconnects();
    }

    return this._client;
  }

  public handleReconnects() {
    // Listen to 'error' events to the Redis connection
    this._client.on('error', error => {
      if (error.code === 'ECONNRESET') {
        this.logger.warn('Connection to Redis Session Store timed out.');
      } else if (error.code === 'ECONNREFUSED') {
        this.logger.error('Connection to Redis Session Store refused!');
      } else this.logger.error(error);
    });

    // Listen to 'reconnecting' event to Redis
    this._client.on('reconnecting', err => {
      if (this._client.status === 'reconnecting')
        this.logger.warn('Reconnecting to Redis Session Store...');
      else this.logger.error('Error reconnecting to Redis Session Store.');
    });

    // Listen to the 'connect' event to Redis
    this._client.on('connect', err => {
      if (!err) this.logger.log('Connected to Redis Session Store!');
    });

    return this;
  }
}
