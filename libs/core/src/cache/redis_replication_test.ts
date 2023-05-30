import { REDIS_CACHE_MANAGER } from './cache_manager';

export const testRedisCacheManager = () => {
  const redisCache = REDIS_CACHE_MANAGER();

  // listen for redis connection error event
  const redisClient = redisCache.store.getClient();

  redisClient.on('error', error => {
    // handle error here
    console.log(error);
  });

  const ttl = 5;

  redisCache.set('foo', 'bar', { ttl: ttl }, err => {
    if (err) {
      throw err;
    }

    redisCache.get('foo', (err, result) => {
      console.log(result);
      redisCache.del('foo', err => {
        console.log('deleted foo');
      });
    });
  });

  function getUser(id, cb?) {
    setTimeout(() => {
      console.log('Returning user from slow database.');
      if (cb) {
        cb(null, { id: id, name: 'Bob' });
      }
    }, 100);
  }

  const userId = 123;
  const key = `user_${userId}`;

  // Note: ttl is optional in wrap()
  redisCache.wrap(
    key,
    cb => {
      getUser(userId, cb);
    },
    { ttl: ttl },
    (err, user) => {
      console.log(user);

      // Second time fetches user from redisCache
      redisCache
        .wrap(key, () => getUser(userId))
        .then(console.log)
        .catch(err => {
          // handle error
        });
    }
  );
};
