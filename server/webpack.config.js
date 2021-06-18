const ESLintPlugin = require('eslint-webpack-plugin')
const execFile = require('child_process').execFileSync
const fs = require('fs/promises')
const nodeExternals = require('webpack-node-externals')
const path = require('path')
const webpack = require('webpack')

const pkj = require('./package.json')

const FILENAME = `${pkj.name}.lib.js`
const INPUT_PATH = path.resolve(__dirname, 'src')
const OUTPUT_PATH = path.resolve(__dirname, 'dist')

module.exports = (env, argv) => ({
  entry: INPUT_PATH,
  target: 'node',
  devtool: argv.mode === 'development' ? 'inline-source-map' : 'source-map',
  // __dirname issue: global __dirname differed
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  output: {
    filename: FILENAME,
    path: OUTPUT_PATH,
    publicPath: OUTPUT_PATH,
  },
  resolve: {
    alias: {
      config: path.resolve(__dirname, 'config.js'),
      errors: path.resolve(__dirname, 'src', 'errors.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  regenerator: true,
                },
              ],
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new ESLintPlugin(),
    // add line in the top of the bundle, raw to not wrap the string in the comment
    new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
    {
      apply: compiler =>
        compiler.hooks.done.tap('executable', () =>
          fs
            .readdir(OUTPUT_PATH)
            .then(files =>
              files.forEach(filename =>
                execFile('chmod', ['a+x', path.resolve(OUTPUT_PATH, filename)])
              )
            )
        ),
    },
  ],
})
