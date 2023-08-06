import Redis from 'ioredis';

export const redisReplicationStore = (...args: Array<Record<string, any>>) => {
  const { masterConf, slaveConf, ...options } = args[0];

  const master = new Redis({ ...options, ...masterConf });
  const slave = new Redis({ ...options, ...slaveConf });
  const storeArgs: any = master.options;

  const self: any = {
    name: 'redis',
    isCacheableValue:
      storeArgs.isCacheableValue ||
      (value => value !== undefined && value !== null),
  };

  self.getClient = (type: 'client' | 'subscriber') =>
    type === 'subscriber' ? slave : master;
  self.getSlave = () => self.getClient('subscriber');
  self.getMaster = () => self.getClient('client');

  self.set = (key, value, options, cb) =>
    new Promise((resolve, reject) => {
      if (typeof options === 'function') {
        cb = options;
        options = {};
      }
      options = options || {};

      if (!cb) {
        cb = (err, result) => (err ? reject(err) : resolve(result));
      }

      if (!self.isCacheableValue(value)) {
        return cb(new Error(`"${value}" is not a cacheable value`));
      }

      const ttl =
        options.ttl || options.ttl === 0 ? options.ttl : storeArgs.ttl;
      const val = JSON.stringify(value) || '"undefined"';

      if (ttl) {
        master.setex(key, ttl, val, handleResponse(cb));
      } else {
        master.set(key, val, handleResponse(cb));
      }
    });

  self.get = (key, options, cb) =>
    new Promise((resolve, reject) => {
      if (typeof options === 'function') {
        cb = options;
      }

      if (!cb) {
        cb = (err, result) => (err ? reject(err) : resolve(result));
      }

      slave.get(key, handleResponse(cb, { parse: true }));
    });

  self.mget = (...args) =>
    new Promise((resolve, reject) => {
      let cb;
      let options = {};

      if (typeof args[args.length - 1] === 'function') {
        cb = args.pop();
      }

      if (
        args[args.length - 1] instanceof Object &&
        args[args.length - 1].constructor === Object
      ) {
        options = args.pop();
      }

      if (!cb) {
        cb = (err, result) => (err ? reject(err) : resolve(result));
      }

      slave.mget.apply(slave, [...args, handleResponse(cb, { parse: true })]);
    });

  self.del = (key, options, cb) => {
    if (typeof options === 'function') {
      cb = options;
    }

    master.del(key, handleResponse(cb));
  };

  self.reset = cb => master.flushdb(handleResponse(cb));
  self.flushdb = cb => self.reset(cb);
  self.quit = cb => [
    slave.quit(handleResponse(cb)),
    master.quit(handleResponse(cb)),
  ];

  self.keys = (pattern, cb) =>
    new Promise((resolve, reject) => {
      if (typeof pattern === 'function') {
        cb = pattern;
        pattern = '*';
      }

      if (!cb) {
        cb = (err, result) => (err ? reject(err) : resolve(result));
      }

      slave.keys(pattern, handleResponse(cb));
    });

  self.ttl = (key, cb) => slave.ttl(key, handleResponse(cb));

  return self;
};

function handleResponse(cb, opts?) {
  return (err, result) => {
    if (err) {
      return cb && cb(err);
    }

    if (opts?.parse) {
      try {
        result = JSON.parse(result);
      } catch (e) {
        return cb && cb(e);
      }
    }

    return cb && cb(null, result);
  };
}

const methods = {
  create: (...args) => redisReplicationStore(...args),
};

export default methods;
// export const create = (...args: any[]) => redisReplicationStore(...args);
