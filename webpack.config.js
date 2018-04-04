const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const { resolve } = path;

const srcDir = resolve(__dirname, 'src');
const nodeModules = resolve(__dirname, 'node_modules');

const browserConfig = {
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      srcDir,
      nodeModules,
    ],
  },
  entry: './src/browser/index.js',
  output: {
    path: resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, use: 'babel-loader' },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    })
  ]
}

const serverConfig = {
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      srcDir,
      nodeModules,
    ],
  },
  entry: './src/server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: 'server.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, use: 'babel-loader' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    })
  ]
}

module.exports = [browserConfig, serverConfig]
