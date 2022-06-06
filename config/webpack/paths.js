const path = require('path')

module.exports = {
  ROOT: path.resolve(__dirname, '../../'),
  BUILD: path.resolve(__dirname, '../../build'),
  SRC: path.resolve(__dirname, '../../src'),
  TEMPLATE: path.resolve(__dirname, '../../public/index.html'),
  PUBLIC: path.resolve(__dirname, '../../public'),
  API: path.resolve(__dirname, '../../src/api'),
  ASSETS: path.resolve(__dirname, '../../src/assets'),
  COMPONENTS: path.resolve(__dirname, '../../src/components'),
  CONFIG: path.resolve(__dirname, '../../src/config'),
  CONTEXT: path.resolve(__dirname, '../../src/context'),
  CUSTOM_HOOKS: path.resolve(__dirname, '../../src/hooks'),
  PAGES: path.resolve(__dirname, '../../src/pages'),
  HELPERS: path.resolve(__dirname, '../../src/helpers'),
  SERVICES: path.resolve(__dirname, '../../src/services'),
  STARTUP: path.resolve(__dirname, '../../src/startup'),
  UTILS: path.resolve(__dirname, '../../src/utils'),
  COSMOS: path.resolve(__dirname, '../../node_modules/@hotmart/cosmos/dist'),
  COSMOS_UTILITIES: path.resolve(__dirname, '../../node_modules/@hotmart/cosmos/dist/styles/utilities')
}
