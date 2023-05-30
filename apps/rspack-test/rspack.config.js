const { composePlugins, withNx } = require('@nx/rspack');

const externalDependencies = [
  '@nestjs/core',
  '@nestjs/common',
  // '@nestjs/swagger',
  'class-transformer',
];

const lazyImports = [
  '@nestjs/core',
  '@nestjs/microservices',
  '@nestjs/platform-express',
  '@nestjs',
  '@nestjs/microservices/microservices-module',
  'cache-manager',
  'class-validator',
  'class-transformer/storage',
  'engine.io',
  'express',
  'aws-crt',
  'mongodb',
  '@mongodb-js/zstd',
  'mongodb-client-encryption',
];

module.exports = composePlugins(withNx(), config => {
  config.externals = [
    function (obj, callback) {
      const resource = obj.request;

      if (externalDependencies.includes(resource)) {
        require.resolve(resource);
        callback(null, resource);
        return;
      }

      if (!lazyImports.includes(resource)) {
        return callback();
      }

      try {
        require.resolve(resource);
      } catch (err) {
        callback(null, resource);
      }
      callback();
    },
  ];

  return config;
});
