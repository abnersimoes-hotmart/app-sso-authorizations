require('dotenv').config()

const { merge } = require('webpack-merge')
const path = require('path')

const common = require('./webpack.common.js')
const paths = require('./paths.js')

module.exports = merge(common, {
  entry: path.resolve(path.join(paths.SRC, '/index.tsx')),
  output: {
    filename: 'bundle.js',
    path: path.resolve(paths.BUILD),
    library: '@hotmart/app-sso-consents',
    libraryTarget: 'umd',
    publicPath: `${process.env.APP_URL}/`,
    chunkFilename: '[name].[contenthash].js'
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
})
