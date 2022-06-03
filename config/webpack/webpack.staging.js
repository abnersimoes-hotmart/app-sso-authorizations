require('dotenv').config({ debug: true })

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const axios = require('axios')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const paths = require('./paths.js')
const common = require('./webpack.common.js')

const APP_PORT = process.env.APP_PORT || 3001
const SECURITY_BASE_URL = process.env.SECURITY_BASE_URL
const SECURITY_USERNAME = process.env.SECURITY_USERNAME
const SECURITY_PASSWORD = process.env.SECURITY_PASSWORD

const url = `${SECURITY_BASE_URL}/security/oauth/token?grant_type=password&username=${SECURITY_USERNAME}&password=${SECURITY_PASSWORD}`

let token = ''

const securityLogin = async () => {
  try {
    const result = await axios.post(
      url,
      {},
      {
        headers: { Authorization: process.env.AUTH_CLIENT_SECRET }
      }
    )
    token = result.data.access_token
  } catch (error) {
    throw error
  }
}

module.exports = async () => {
  if (process.env.IS_CAS === 'false') {
    await securityLogin()
  }
  return merge(common, {
    mode: 'development',
    entry: [
      // Runtime code for hot module replacement
      'webpack/hot/dev-server.js',
      // Dev server client for web socket transport, hot and live reload logic
      `webpack-dev-server/client/index.js?hot=true&live-reload=true&port=${APP_PORT}`,

      path.join(paths.SRC, '/index.tsx')
    ],
    plugins: [
      // Plugin for hot module replacement
      new webpack.HotModuleReplacementPlugin(),

      /**
       * DEFINE PLUGIN
       */
      new webpack.DefinePlugin({
        ACCESS_TOKEN: `'${token}'`
      }),

      /**
       * HTML PLUGIN
       */
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: paths.TEMPLATE,
        inject: true,
        favicon: path.join(paths.PUBLIC, '/favicon.ico')
      }),

      /**
       * BUNDLE ANALYZER
       */
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        generateStatsFile: false,
        statsOptions: { source: false }
      })
    ],
    devServer: {
      client: { overlay: false },
      host: '0.0.0.0',
      allowedHosts: 'all',
      port: APP_PORT,
      hot: true,
      compress: true,
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, '../../')
      }
    }
  })
}
