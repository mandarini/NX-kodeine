const nodeExternals = require('webpack-node-externals');
const path = require('path');
const { composePlugins, withNx } = require('@nx/rspack');

module.exports = composePlugins(withNx(), config => {
  config.externals = [
    nodeExternals({
      modulesDir: '/Users/yangjian/project/NX/node_modules',
    }),
  ];
  config.target = 'node';
  return config;
});
