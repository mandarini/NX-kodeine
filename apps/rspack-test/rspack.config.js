const nodeExternals = require('webpack-node-externals');
const path = require('path');
const { composePlugins, withNx } = require('@nx/rspack');

module.exports = composePlugins(withNx(), config => {
  config.externals = [
    nodeExternals({
      modulesDir: path.join(__dirname, '../../', 'node_modules'),
    }),
  ];
  config.target = 'node';
  return config;
});
