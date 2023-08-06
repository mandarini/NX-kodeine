const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { composePlugins, withNx } = require('@nx/rspack');
const { merge } = require('webpack-merge');

module.exports = composePlugins(withNx(), (config, { options, context }) => {
  const __config = merge(config, {
    // optimization: {
    //   sideEffects: false,
    //   usedExports: true,
    //   // minimize: true,
    // },
    // target: 'node',
    // builtins: { decorator: { legacy: true, emitMetadata: true } },
    externals: [
      nodeExternals({
        modulesDir: path.join(__dirname, '../../', 'node_modules'),
      }),
    ],
  });

  console.log('__config', __config);
  return __config;
});
