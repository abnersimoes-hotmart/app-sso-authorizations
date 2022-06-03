/* eslint-disable */
const path = require('path')

const loader = require('style-loader')

module.exports.pitch = function (request) {
  var result = loader.pitch.call(this, request)
  var index = result.indexOf('options.setAttributes = setAttributes;')
  var resourcePath = this.resourcePath
  var relativePath = path.relative(path.resolve(__dirname, '..'), resourcePath)

  if (index <= -1) {
    return result
  }
  var insertIndex = index - 1

  var insertAttr = `
    options.attributes["is-from-cosmos"] = '${relativePath.includes('@hotmart/cosmos')}'
      `

  if (process.env.NODE_ENV === 'development') {
    insertAttr += ` options.attributes["path"] = '${relativePath}'`
  }

  return result.slice(0, insertIndex) + insertAttr + result.slice(insertIndex)
}
