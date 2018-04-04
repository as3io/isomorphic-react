const path = require('path');
const webpack = require('webpack');

const { resolve } = path;

const srcDir = resolve(__dirname, 'src');
const buildDir = resolve(__dirname, 'dist');
const nodeModules = resolve(__dirname, 'node_modules');

module.exports = () => {
  return {
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: [
        srcDir,
        nodeModules,
      ],
    },
    entry: [
      resolve(srcDir, 'index.js')
    ],
    output: {
      path: buildDir,
      filename: 'app.[hash].js',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [ srcDir ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react'],
            },
          },
        },
      ],
    },
  };
};
