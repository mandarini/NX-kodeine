import * as cacheManager from 'cache-manager';
import * as redisStore from 'cache-manager-ioredis';

import { memoize } from '../utils';
import { RedisCacheManagerClient } from './cache_manager.interface';

/// DEPRECATE THIS in favor of CacheManagerModule
export const REDIS_CACHE_MANAGER_SETTINGS = () => {
  const defaultConfig = {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    connectTimeout: 500,
    retryStrategy: null,
    ttl: +(process.env['REDIS_TTL'] || 3600), // 1 hour
  };

  const redisConf = {
    connectionName: process.env['APP_NAME'],
    host: process.env['REDIS_HOST'],
    port: +(process.env['REDIS_PORT'] || 6379),
    password: process.env['REDIS_PASS'],
    db: +(process.env['REDIS_DB'] || 0),
    ...defaultConfig,
  };

  return {
    store: redisStore as unknown,
    ...redisConf,
  };
};

/// DEPRECATE THIS in favor of CacheManagerModule
export const MEMOIZED_REDIS_CACHE_MANAGER: (
  options?: any
) => RedisCacheManagerClient = memoize(cacheManager.caching);

/// DEPRECATE THIS in favor of CacheManagerModule
export const REDIS_CACHE_MANAGER = (options?: any) => {
  return MEMOIZED_REDIS_CACHE_MANAGER({
    ...REDIS_CACHE_MANAGER_SETTINGS(),
    ...options,
  });
};
