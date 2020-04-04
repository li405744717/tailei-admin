const {override, fixBabelImports, addPostcssPlugins, addWebpackAlias, addLessLoader, addBabelPlugins, addBabelPresets, useBabelRc, addExternalBabelPlugins} = require('customize-cra');
const path = require('path');
var webpack = require('webpack');

const overrideConfig = () => config => {

  if (config) {
    if (config.mode == 'production') {
      config.output.publicPath = '/adminStatic/'
    }
  }
  return config;
}
module.exports = override(
  // useBabelRc(),
  fixBabelImports('import',
    {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }
  ),
  overrideConfig(),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {'@primary-color': '#1890FF'},
  }),
  addExternalBabelPlugins("@babel/plugin-proposal-class-properties"),
  // addWebpackPlugin(
  //   new Webpack.DefinePlugin({
  //     optimization: {
  //       splitChunks: {
  //         chunks: "all",
  //         minSize: 2000,
  //         minChunks: 1,
  //         maxAsyncRequests: 5,
  //         maxInitialRequests: 3,
  //         name: 'vendor',
  //       },
  //     }
  //   })
  // ),
  addPostcssPlugins([
    // require('postcss-plugin-px2rem')({
    //   rootValue: 75,
    //   minPixelValue: 1,
    //   selectorBlackList: ["canvas"],
    //   exclude: /node_modules|bootstrap/i,
    //   // propBlackList: ['border'],
    //   mediaQuery: true,
    // })
  ]),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  })
);
