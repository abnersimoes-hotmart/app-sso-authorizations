const path = require('path')
const webpack = require('webpack')

const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin

const paths = require('./paths.js')
const pkjson = require('../../package.json')

const environmentVars = ['PRODUCTION', 'APP_URL', 'API_LANGUAGES', 'APP_PLATFORM', 'API_SSO', 'CAS_CLIENT_ID', 'IS_CAS']

module.exports = {
  module: {
    rules: [
      /**
       * BABEL LOADER
       */
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },

      {
        test: /\.(png|jpg|gif|ico|svg|woff(2)?|ttf|eot)$/,
        type: 'asset/resource'
      },

      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: './custom-scripts/style-loader',
            options: {
              attributes: { from: 'vulcano-market' },
              styleTagTransform: require.resolve('../../custom-scripts/styleTagTransform')
            }
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    /**
     * ENV PLUGIN
     */
    new webpack.EnvironmentPlugin(environmentVars),
    new ModuleFederationPlugin({
      name: 'sso_consents',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/indexBW.tsx'
      },
      shared: {
        react: {
          singleton: true,
          eager: true,
          strictVersion: true,
          requiredVersion: pkjson.dependencies.react
        },
        'react-dom': {
          singleton: true,
          strictVersion: true,
          eager: true,
          requiredVersion: pkjson.dependencies['react-dom']
        },
        'react-i18next': {
          singleton: true,
          strictVersion: true,
          eager: true,
          requiredVersion: pkjson.dependencies['react-i18next']
        },
        '@hotmart/cosmos': {
          singleton: true
        }
      }
    })
  ],

  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    alias: {
      root: paths.ROOT,
      src: paths.SRC,
      api: paths.API,
      assets: paths.ASSETS,
      components: paths.COMPONENTS,
      config: paths.CONFIG,
      context: paths.CONTEXT,
      hooks: paths.CUSTOM_HOOKS,
      helpers: paths.HELPERS,
      services: paths.SERVICES,
      startup: paths.STARTUP,
      utils: paths.UTILS,
      '@cosmos': paths.COSMOS
    },
    fallback: {
      path: require.resolve('path-browserify'),
      fs: false,
      url: false
    }
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(paths.ROOT),
    library: '@hotmart/app-sso-consents',
    libraryTarget: 'umd',
    clean: true
  }
}
