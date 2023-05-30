export const REDIS_CACHE_SERVICE = Symbol('REDIS_CACHE_SERVICE');

export type RedisCacheManagerClient = {
  store: {
    name: 'redis';
    isCacheableValue: (...args: any[]) => any;
    getClient: (...args: any[]) => any;
    getSlave: (...args: any[]) => any;
    getMaster: (...args: any[]) => any;
    set: (...args: any[]) => any;
    get: (...args: any[]) => any;
    mget: (...args: any[]) => any;
    del: (...args: any[]) => any;
    reset: (...args: any[]) => any;
    flushdb: (...args: any[]) => any;
    keys: (...args: any[]) => any;
    ttl: (...args: any[]) => any;
    quit: (...args: any[]) => any;
  };
  ignoreCacheErrors: false;
  refreshThreshold: false;
  _isCacheableValue: (...args: any[]) => any;
  checkRefreshThreshold: (...args: any[]) => any;
  wrap: (...args: any[]) => any;
  get: (...args: any[]) => any;
  mget: (...args: any[]) => any;
  set: (...args: any[]) => any;
  del: (...args: any[]) => any;
  reset: (...args: any[]) => any;
  flushdb: (...args: any[]) => any;
  keys: (...args: any[]) => any;
  ttl: (...args: any[]) => any;
  quit: (...args: any[]) => any;
};
